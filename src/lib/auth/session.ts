import { cookies } from "next/headers";
import crypto from "crypto";
import { StaffRole } from "./roles";

const COOKIE_NAME = "vr_staff_session";

// Server-side token revocation set to ensure true server-side logout invalidation
const revokedTokens = new Set<string>();

// Get or generate session secret
let ephemeralSecret: string | null = null;

function getSessionSecret(): string {
  const envSecret = process.env.ADMIN_SESSION_SECRET;
  if (envSecret && envSecret.length >= 32) {
    return envSecret;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "FATAL SECURITY CONFIGURATION: ADMIN_SESSION_SECRET environment variable is missing or shorter than 32 characters. Server refusing to sign sessions with insecure fallback in production."
    );
  }

  // In non-production, generate an ephemeral cryptographically random secret on server boot
  if (!ephemeralSecret) {
    ephemeralSecret = crypto.randomBytes(32).toString("hex");
    console.warn(
      "[SECURITY NOTICE] ADMIN_SESSION_SECRET not set in development. Using ephemeral in-memory random secret."
    );
  }
  return ephemeralSecret;
}

export interface StaffSession {
  sessionId: string;
  staffId: string;
  email: string;
  role: StaffRole;
  fullName: string;
  exp: number;
}

export function signSessionToken(session: StaffSession): string {
  const secret = getSessionSecret();
  const payload = Buffer.from(JSON.stringify(session)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("base64url");
  return `${payload}.${signature}`;
}

export function verifySessionToken(token: string): StaffSession | null {
  try {
    if (!token || typeof token !== "string") return null;

    // Check if token was explicitly revoked on logout
    if (revokedTokens.has(token)) {
      return null;
    }

    const [payload, signature] = token.split(".");
    if (!payload || !signature) return null;

    const secret = getSessionSecret();
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(payload)
      .digest("base64url");

    const sigBuf = Buffer.from(signature);
    const expectedSigBuf = Buffer.from(expectedSignature);

    if (sigBuf.length !== expectedSigBuf.length) {
      return null;
    }

    if (!crypto.timingSafeEqual(sigBuf, expectedSigBuf)) {
      return null;
    }

    const session = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf-8")
    ) as StaffSession;

    // Check expiration (7 days validity)
    if (!session.exp || Date.now() > session.exp) {
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
  const sessionId = crypto.randomBytes(16).toString("hex");

  const token = signSessionToken({
    sessionId,
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
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (token) {
    // Add token to server-side revocation list
    revokedTokens.add(token);
  }
  cookieStore.delete(COOKIE_NAME);
}
