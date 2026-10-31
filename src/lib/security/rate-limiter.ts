/**
 * VAIDIK RATNAM — APPLICATION SECURITY ENGINE
 * Sliding-window rate limiter & IP protection for authentication, AI, and public forms.
 */

interface RateLimitRecord {
  timestamps: number[];
  blockedUntil?: number;
}

class MemoryRateLimiter {
  private records = new Map<string, RateLimitRecord>();
  private cleanupInterval: NodeJS.Timeout;

  constructor() {
    // Clean up stale entries every 5 minutes
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 5 * 60 * 1000);

    // Prevent interval from keeping process alive in tests
    if (this.cleanupInterval.unref) {
      this.cleanupInterval.unref();
    }
  }

  /**
   * Check and record a rate limit attempt
   * @param key Identifier (e.g. IP address or IP:route or user email)
   * @param maxRequests Maximum requests allowed within the window
   * @param windowMs Time window in milliseconds
   * @param blockDurationMs Optional duration to block if limit is exceeded
   */
  public check(
    key: string,
    maxRequests: number,
    windowMs: number,
    blockDurationMs = 0
  ): { allowed: boolean; remaining: number; retryAfterSeconds: number } {
    const now = Date.now();
    const record = this.records.get(key) || { timestamps: [] };

    // Check if key is temporarily blocked
    if (record.blockedUntil && record.blockedUntil > now) {
      const retryAfterSeconds = Math.ceil((record.blockedUntil - now) / 1000);
      return { allowed: false, remaining: 0, retryAfterSeconds };
    }

    // Filter out timestamps outside the active window
    const windowStart = now - windowMs;
    record.timestamps = record.timestamps.filter((t) => t > windowStart);

    if (record.timestamps.length >= maxRequests) {
      if (blockDurationMs > 0) {
        record.blockedUntil = now + blockDurationMs;
        this.records.set(key, record);
        return {
          allowed: false,
          remaining: 0,
          retryAfterSeconds: Math.ceil(blockDurationMs / 1000),
        };
      }

      const oldestInWindow = record.timestamps[0];
      const retryAfterSeconds = Math.ceil((oldestInWindow + windowMs - now) / 1000);
      return { allowed: false, remaining: 0, retryAfterSeconds: Math.max(1, retryAfterSeconds) };
    }

    // Request is allowed
    record.timestamps.push(now);
    this.records.set(key, record);

    return {
      allowed: true,
      remaining: maxRequests - record.timestamps.length,
      retryAfterSeconds: 0,
    };
  }

  /**
   * Reset rate limit record for a specific key (e.g. after successful login)
   */
  public reset(key: string): void {
    this.records.delete(key);
  }

  private cleanup(): void {
    const now = Date.now();
    const maxAge = 60 * 60 * 1000; // 1 hour
    for (const [key, record] of this.records.entries()) {
      if (
        (!record.blockedUntil || record.blockedUntil <= now) &&
        record.timestamps.every((t) => now - t > maxAge)
      ) {
        this.records.delete(key);
      }
    }
  }
}

// Global singleton instance
export const rateLimiter = new MemoryRateLimiter();

/**
 * Extract client IP address safely from standard headers
 */
export function getClientIp(headers: Headers): string {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    const firstIp = forwardedFor.split(",")[0].trim();
    if (firstIp) return firstIp;
  }
  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "127.0.0.1";
}

