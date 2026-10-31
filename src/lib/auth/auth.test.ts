import { describe, it, expect } from "vitest";
import { signSessionToken, verifySessionToken, StaffSession } from "./session";
import { hasPermission } from "./roles";
import { generateReference } from "@/lib/db";

describe("Staff Authentication & Token Verification", () => {
  const validSession: StaffSession = {
    sessionId: "sess-test-uuid-1",
    staffId: "staff-1",
    email: "owner@vaidikratnam.com",
    role: "owner",
    fullName: "Vaidik Owner",
    exp: Date.now() + 60 * 60 * 1000, // 1 hour ahead
  };

  it("signs and verifies a valid token successfully", () => {
    const token = signSessionToken(validSession);
    expect(typeof token).toBe("string");
    expect(token).toContain(".");

    const decoded = verifySessionToken(token);
    expect(decoded).not.toBeNull();
    expect(decoded?.email).toBe(validSession.email);
    expect(decoded?.role).toBe("owner");
  });

  it("rejects a tampered signature", () => {
    const token = signSessionToken(validSession);
    const [payload] = token.split(".");
    const tamperedToken = `${payload}.tamperedSignature123`;

    const decoded = verifySessionToken(tamperedToken);
    expect(decoded).toBeNull();
  });

  it("rejects an expired session token", () => {
    const expiredSession: StaffSession = {
      ...validSession,
      exp: Date.now() - 1000, // expired 1s ago
    };
    const token = signSessionToken(expiredSession);
    const decoded = verifySessionToken(token);
    expect(decoded).toBeNull();
  });
});

describe("Role Permissions Matrix (Least Privilege)", () => {
  it("allows owner full operational access", () => {
    expect(hasPermission("owner", "canManageProducts")).toBe(true);
    expect(hasPermission("owner", "canManageQuotes")).toBe(true);
    expect(hasPermission("owner", "canViewConfidentialNotes")).toBe(true);
    expect(hasPermission("owner", "canManageSettings")).toBe(true);
  });

  it("restricts inventory staff from confidential birth notes and settings", () => {
    expect(hasPermission("inventory_staff", "canManageProducts")).toBe(true);
    expect(hasPermission("inventory_staff", "canManageMedia")).toBe(true);
    expect(hasPermission("inventory_staff", "canViewConfidentialNotes")).toBe(false);
    expect(hasPermission("inventory_staff", "canManageQuotes")).toBe(false);
    expect(hasPermission("inventory_staff", "canManageSettings")).toBe(false);
  });

  it("restricts consultant to appointments and confidential notes only", () => {
    expect(hasPermission("consultant", "canManageAppointments")).toBe(true);
    expect(hasPermission("consultant", "canViewConfidentialNotes")).toBe(true);
    expect(hasPermission("consultant", "canManageProducts")).toBe(false);
    expect(hasPermission("consultant", "canManageQuotes")).toBe(false);
  });

  it("restricts content editor from private customer data", () => {
    expect(hasPermission("content_editor", "canManageArticles")).toBe(true);
    expect(hasPermission("content_editor", "canViewConfidentialNotes")).toBe(false);
    expect(hasPermission("content_editor", "canManageEnquiries")).toBe(false);
  });
});

describe("generateReference", () => {
  it("generates human-readable, non-guessable references with correct prefix", () => {
    const cdRef = generateReference("CD");
    const enqRef = generateReference("ENQ");
    const aptRef = generateReference("APT");

    expect(cdRef).toMatch(/^VR-CD-\d+[0-9A-F]+$/);
    expect(enqRef).toMatch(/^VR-ENQ-\d+[0-9A-F]+$/);
    expect(aptRef).toMatch(/^VR-APT-\d+[0-9A-F]+$/);

    // Assert uniqueness
    const ref2 = generateReference("CD");
    expect(cdRef).not.toBe(ref2);
  });
});
