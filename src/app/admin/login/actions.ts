"use server";

import { z } from "zod";
import { getDb, initDb, verifyPassword } from "@/lib/db";
import { createSession, destroySession } from "@/lib/auth/session";
import { StaffRole } from "@/lib/auth/roles";
import { redirect } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid staff email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function loginStaff(formData: unknown): Promise<{
  success: boolean;
  message?: string;
}> {
  try {
    await initDb();
    const parsed = loginSchema.safeParse(formData);

    if (!parsed.success) {
      return {
        success: false,
        message: "Please enter valid email and password.",
      };
    }

    const { email, password } = parsed.data;
    const db = getDb();

    const res = await db.execute({
      sql: `SELECT id, email, full_name, role, password_hash FROM staff_users WHERE email = ?`,
      args: [email.toLowerCase().trim()],
    });

    if (res.rows.length === 0) {
      return {
        success: false,
        message: "Invalid credentials. Please verify your email and password.",
      };
    }

    const user = res.rows[0];
    const isValid = verifyPassword(password, user.password_hash as string);

    if (!isValid) {
      return {
        success: false,
        message: "Invalid credentials. Please verify your email and password.",
      };
    }

    // Set signed HTTP-only session cookie
    await createSession({
      staffId: user.id as string,
      email: user.email as string,
      fullName: user.full_name as string,
      role: user.role as StaffRole,
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

