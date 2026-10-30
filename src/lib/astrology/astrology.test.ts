import { describe, it, expect } from "vitest";
import { LAGNA_PROFILES, NAVAGRAHA_DATA } from "./data";

describe("Vedic Astrology & Ratna Knowledge Base", () => {
  it("should contain all 12 Vedic Lagnas with valid profiles", () => {
    expect(LAGNA_PROFILES.length).toBe(12);

    const expectedSlugs = [
      "mesha",
      "vrishabha",
      "mithuna",
      "karka",
      "simha",
      "kanya",
      "tula",
      "vrishchika",
      "dhanu",
      "makara",
      "kumbha",
      "meena",
    ];

    expectedSlugs.forEach((slug) => {
      const profile = LAGNA_PROFILES.find((p) => p.slug === slug);
      expect(profile).toBeDefined();
      expect(profile?.sanskritName).toBeTruthy();
      expect(profile?.rulingPlanet).toBeTruthy();
      expect(profile?.lagneshRatna.stone).toBeTruthy();
      expect(profile?.panchameshRatna.stone).toBeTruthy();
      expect(profile?.bhagyeshRatna.stone).toBeTruthy();
      expect(profile?.prohibitedGemstones.length).toBeGreaterThan(0);
      expect(profile?.primaryMetal).toBeTruthy();
      expect(profile?.keyMantra).toBeTruthy();
    });
  });

  it("should verify classical Parashari rules for Mesha (Aries)", () => {
    const mesha = LAGNA_PROFILES.find((p) => p.slug === "mesha");
    expect(mesha).toBeDefined();
    // Lagnesha is Mars -> Red Coral
    expect(mesha?.lagneshRatna.stone).toContain("Red Coral");
    // 5th Lord is Sun -> Ruby
    expect(mesha?.panchameshRatna.stone).toContain("Ruby");
    // 9th Lord is Jupiter -> Yellow Sapphire
    expect(mesha?.bhagyeshRatna.stone).toContain("Yellow Sapphire");
    // Mercury rules 3rd & 6th -> Prohibited
    const emeraldAvoid = mesha?.prohibitedGemstones.find((p) => p.stone.includes("Emerald"));
    expect(emeraldAvoid).toBeDefined();
    expect(emeraldAvoid?.reason).toContain("6th");
  });

  it("should verify classical Parashari rules for Makara (Capricorn)", () => {
    const makara = LAGNA_PROFILES.find((p) => p.slug === "makara");
    expect(makara).toBeDefined();
    // Lagnesha is Saturn -> Blue Sapphire
    expect(makara?.lagneshRatna.stone).toContain("Blue Sapphire");
    // 5th Lord is Venus -> Diamond
    expect(makara?.panchameshRatna.stone).toContain("Diamond");
    // Sun rules 8th house -> Strictly Prohibited
    const rubyAvoid = makara?.prohibitedGemstones.find((p) => p.stone.includes("Ruby"));
    expect(rubyAvoid).toBeDefined();
    expect(rubyAvoid?.reason).toContain("8th");
  });

  it("should contain all 9 Navagrahas with sacred Beej Mantras", () => {
    const grahaKeys = Object.keys(NAVAGRAHA_DATA);
    expect(grahaKeys.length).toBe(9);

    grahaKeys.forEach((key) => {
      const g = NAVAGRAHA_DATA[key];
      expect(g.planet).toBeTruthy();
      expect(g.primaryRatna).toBeTruthy();
      expect(g.sanskritRatna).toBeTruthy();
      expect(g.beejMantra).toContain("Om");
      expect(g.auspiciousMetal).toBeTruthy();
      expect(g.wearingFinger).toBeTruthy();
      expect(g.lifeSignifications.length).toBeGreaterThan(2);
    });
  });
});

