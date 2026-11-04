import { describe, it, expect } from "vitest";
import { calculatePlanetaryPositions, getLahiriAyanamsa, getJulianDay } from "./astronomy";
import { buildLalKitabChart } from "./chart-builder";
import { evaluateLalKitabRules } from "./rule-engine";
import { resolveHistoricalIndianOffset } from "./timezone";

describe("Lal Kitab Astronomical Engine", () => {
  it("calculates Julian Day accurately for J2000 epoch", () => {
    const jd = getJulianDay(2000, 1, 1, 12);
    expect(jd).toBe(2451545.0);
  });

  it("calculates Lahiri Ayanamsa close to 23.85° at J2000 epoch", () => {
    const jd = 2451545.0;
    const ayanamsa = getLahiriAyanamsa(jd);
    expect(ayanamsa).toBeGreaterThan(23.8);
    expect(ayanamsa).toBeLessThan(23.9);
  });

  it("computes 9 sidereal planets with signs and valid degrees", () => {
    const result = calculatePlanetaryPositions(1994, 5, 12, 14, 30, 26.9124, 75.7873, 5.5);
    expect(result.planets).toHaveLength(9);

    const sun = result.planets.find((p) => p.name === "Sun");
    expect(sun).toBeDefined();
    expect(sun?.signNumber).toBeGreaterThanOrEqual(1);
    expect(sun?.signNumber).toBeLessThanOrEqual(12);
    expect(sun?.degreeInSign).toBeGreaterThanOrEqual(0);
    expect(sun?.degreeInSign).toBeLessThan(30);

    const rahu = result.planets.find((p) => p.name === "Rahu");
    const ketu = result.planets.find((p) => p.name === "Ketu");
    expect(rahu?.isRetrograde).toBe(true);
    expect(ketu?.isRetrograde).toBe(true);
    // Rahu and Ketu are always opposite (difference of 180°)
    const diff = Math.abs((rahu?.longitude || 0) - (ketu?.longitude || 0));
    expect(Math.round(diff)).toBe(180);
  });

  it("correctly identifies historical Indian War Time (1942-1945)", () => {
    const wartime = resolveHistoricalIndianOffset(1943, 8, 15);
    expect(wartime.offsetHours).toBe(6.5);
    expect(wartime.offsetString).toBe("+06:30");

    const modernTime = resolveHistoricalIndianOffset(1995, 6, 20);
    expect(modernTime.offsetHours).toBe(5.5);
    expect(modernTime.offsetString).toBe("+05:30");
  });
});

describe("Lal Kitab Chart Construction & Rule Engine", () => {
  it("constructs a fixed-house chart with 12 houses where House 1 is Aries", () => {
    const calc = calculatePlanetaryPositions(1990, 10, 24, 8, 0, 28.6139, 77.209, 5.5);
    const chart = buildLalKitabChart(calc.planets);

    expect(chart.houses).toHaveLength(12);
    expect(chart.houses[0].houseNumber).toBe(1);
    expect(chart.houses[0].signSanskrit).toBe("Mesha");
    expect(chart.houses[11].houseNumber).toBe(12);
    expect(chart.houses[11].signSanskrit).toBe("Meena");
  });

  it("evaluates sleeping houses and chart type", () => {
    const calc = calculatePlanetaryPositions(1985, 3, 15, 6, 30, 26.9124, 75.7873, 5.5);
    const chart = buildLalKitabChart(calc.planets);
    const evaluation = evaluateLalKitabRules(chart, 38);

    expect(evaluation.sleepingHouses.length).toBeGreaterThan(0);
    expect(evaluation.chartType.type).toBeDefined();
    expect(evaluation.suggestedUpay.length).toBeGreaterThan(0);
  });
});
