"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { getDb, initDb, verifyPassword, hashPassword } from "@/lib/db";
import { createSession, destroySession } from "@/lib/auth/session";
import { StaffRole } from "@/lib/auth/roles";
import { redirect } from "next/navigation";
import { rateLimiter, getClientIp } from "@/lib/security/rate-limiter";
import { verifyTotpToken } from "@/lib/auth/totp";
import { repo } from "@/lib/db/repo";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid staff email").max(100),
  password: z.string().min(6, "Password must be at least 6 characters").max(128),
  totpCode: z.string().length(6).regex(/^\d{6}$/).optional().or(z.literal("")),
});

// Constant-time dummy hash to mitigate user enumeration timing attacks
const DUMMY_HASH = hashPassword("DummyPasswordForTimingMitigation123!");

export async function loginStaff(formData: unknown): Promise<{
  success: boolean;
  message?: string;
  requireTotp?: boolean;
}> {
  try {
    const reqHeaders = await headers();
    const clientIp = getClientIp(reqHeaders);
    const rateLimitKey = `login:${clientIp}`;

    // Rate limit: max 5 login attempts per 15 minutes, with a 15-minute lockout
    const rateCheck = rateLimiter.check(rateLimitKey, 5, 15 * 60 * 1000, 15 * 60 * 1000);
    if (!rateCheck.allowed) {
      const minutes = Math.ceil(rateCheck.retryAfterSeconds / 60);
      return {
        success: false,
        message: `Too many failed login attempts. Access is locked for security. Please try again in ${minutes} minute${minutes > 1 ? "s" : ""}.`,
      };
    }

    await initDb();
    const parsed = loginSchema.safeParse(formData);

    if (!parsed.success) {
      return {
        success: false,
        message: "Please enter valid staff credentials.",
      };
    }

    const { email, password, totpCode } = parsed.data;
    const cleanEmail = email.toLowerCase().trim();
    const db = getDb();

    const res = await db.execute({
      sql: `SELECT id, email, full_name, role, password_hash FROM staff_users WHERE email = ?`,
      args: [cleanEmail],
    });

    if (res.rows.length === 0) {
      // Execute constant-time dummy verification to prevent timing attack
      verifyPassword(password, DUMMY_HASH);

      await repo.addAuditLog({
        staff_email: cleanEmail,
        action: "login_failed",
        entity_type: "auth",
        details: `Failed login attempt for non-existent account from IP ${clientIp}`,
      });

      return {
        success: false,
        message: "Invalid credentials. Please verify your email and password.",
      };
    }

    const user = res.rows[0];
    const storedHash = user.password_hash as string;
    const isValid = verifyPassword(password, storedHash);

    if (!isValid) {
      await repo.addAuditLog({
        staff_email: cleanEmail,
        action: "login_failed",
        entity_type: "auth",
        details: `Incorrect password attempt from IP ${clientIp}`,
      });

      return {
        success: false,
        message: "Invalid credentials. Please verify your email and password.",
      };
    }

    // Optional TOTP Multi-Factor Authentication check if configured in business_settings
    const settings = await repo.getSettings().catch(() => ({} as Record<string, string>));
    const mfaSecret = settings[`mfa_secret_${user.id}`];

    if (mfaSecret) {
      if (!totpCode) {
        return {
          success: false,
          requireTotp: true,
          message: "Multi-Factor Authentication code required. Please enter your 6-digit authenticator code.",
        };
      }

      const isMfaValid = verifyTotpToken(mfaSecret, totpCode);
      if (!isMfaValid) {
        await repo.addAuditLog({
          staff_email: cleanEmail,
          action: "login_mfa_failed",
          entity_type: "auth",
          details: `Invalid MFA code attempt from IP ${clientIp}`,
        });

        return {
          success: false,
          requireTotp: true,
          message: "Invalid 6-digit MFA code. Please check your authenticator app.",
        };
      }
    }

    // Login successful: reset rate limiter for this IP
    rateLimiter.reset(rateLimitKey);

    // Set signed HTTP-only secure session cookie
    await createSession({
      staffId: user.id as string,
      email: user.email as string,
      fullName: user.full_name as string,
      role: user.role as StaffRole,
    });

    await repo.addAuditLog({
      staff_email: cleanEmail,
      action: "login_success",
      entity_type: "auth",
      details: `Successful staff login from IP ${clientIp}`,
    });

    return { success: true };
  } catch (err: unknown) {
    console.error("Staff login error:", err);
    return {
      success: false,
      message: "An unexpected error occurred during login. Please try again.",
    };
  }
}

export async function logoutStaff(): Promise<void> {
  await destroySession();
  redirect("/admin/login");
}
