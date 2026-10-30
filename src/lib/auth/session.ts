import { cookies } from "next/headers";
import crypto from "crypto";
import { StaffRole } from "./roles";

const COOKIE_NAME = "vr_staff_session";
const SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET ||
  "vaidikratnam_fallback_secret_must_be_configured_in_production_environments_at_least_32_bytes";

export interface StaffSession {
  staffId: string;
  email: string;
  role: StaffRole;
  fullName: string;
  exp: number;
}

export function signSessionToken(session: StaffSession): string {
  const payload = Buffer.from(JSON.stringify(session)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(payload)
    .digest("base64url");
  return `${payload}.${signature}`;
}

export function verifySessionToken(token: string): StaffSession | null {
  try {
    const [payload, signature] = token.split(".");
    if (!payload || !signature) return null;

    const expectedSignature = crypto
      .createHmac("sha256", SESSION_SECRET)
      .update(payload)
      .digest("base64url");

    if (
      !crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(expectedSignature)
      )
    ) {
      return null;
    }

    const session = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf-8")
    ) as StaffSession;

    // Check expiration (7 days validity)
    if (Date.now() > session.exp) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export async function createSession(data: {
  staffId: string;
  email: string;
  role: StaffRole;
  fullName: string;
}): Promise<void> {
  const cookieStore = await cookies();
  const exp = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
  const token = signSessionToken({
    ...data,
    exp,
  });

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });
}

export async function getSession(): Promise<StaffSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

