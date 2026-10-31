import { describe, it, expect } from "vitest";
import { rateLimiter } from "./rate-limiter";
import { generateTotpSecret, generateTotpCode, verifyTotpToken } from "@/lib/auth/totp";
import { verifyPassword, hashPassword } from "@/lib/db";

describe("Application Security Engine Tests", () => {
  describe("Sliding Window Rate Limiter", () => {
    it("allows requests under the limit and blocks requests over the limit", () => {
      const testKey = `test-ip-${Date.now()}`;
      // Max 3 requests per 10 seconds
      expect(rateLimiter.check(testKey, 3, 10000).allowed).toBe(true);
      expect(rateLimiter.check(testKey, 3, 10000).allowed).toBe(true);
      expect(rateLimiter.check(testKey, 3, 10000).allowed).toBe(true);

      // 4th request must be blocked
      const blocked = rateLimiter.check(testKey, 3, 10000);
      expect(blocked.allowed).toBe(false);
      expect(blocked.retryAfterSeconds).toBeGreaterThan(0);

      // Reset works
      rateLimiter.reset(testKey);
      expect(rateLimiter.check(testKey, 3, 10000).allowed).toBe(true);
    });

    it("enforces temporary lockouts when blockDurationMs is specified", () => {
      const testKey = `test-lockout-${Date.now()}`;
      // Max 2 requests with a 5-second lockout
      expect(rateLimiter.check(testKey, 2, 5000, 5000).allowed).toBe(true);
      expect(rateLimiter.check(testKey, 2, 5000, 5000).allowed).toBe(true);

      const locked = rateLimiter.check(testKey, 2, 5000, 5000);
      expect(locked.allowed).toBe(false);
      expect(locked.retryAfterSeconds).toBeGreaterThanOrEqual(1);
    });
  });

  describe("TOTP Multi-Factor Authentication", () => {
    it("generates and verifies valid 6-digit TOTP tokens", () => {
      const secret = generateTotpSecret();
      expect(secret).toHaveLength(32); // 160 bits base32

      const code = generateTotpCode(secret);
      expect(code).toMatch(/^\d{6}$/);

      expect(verifyTotpToken(secret, code)).toBe(true);
      expect(verifyTotpToken(secret, "000000")).toBe(false);
      expect(verifyTotpToken(secret, "invalid")).toBe(false);
    });
  });

  describe("Password Hashing & Timing Defense", () => {
    it("hashes and verifies with salt and OWASP-compliant iterations", () => {
      const password = "TestSecurePassword2026!@#";
      const hash = hashPassword(password);
      expect(hash).toContain(":210000:");

      expect(verifyPassword(password, hash)).toBe(true);
      expect(verifyPassword("WrongPassword!", hash)).toBe(false);
    });
  });
});
