/**
 * LAL KITAB CHART BUILDER
 * 
 * In classical Lal Kitab tradition (Pt. Roop Chand Joshi):
 * 1. The chart has FIXED HOUSES where House 1 is eternally Aries (Mesha).
 * 2. Every planet is placed strictly into the House corresponding to the Zodiac Sign it occupies!
 *    - Planet in Aries (Sign 1) -> House 1
 *    - Planet in Taurus (Sign 2) -> House 2
 *    - ...
 *    - Planet in Pisces (Sign 12) -> House 12
 * 3. The standard Vedic Ascendant chart is calculated alongside as an optional secondary reference.
 */

import { PlanetaryPosition } from "./astronomy";
import pakkaGharData from "./data/pakka-ghar.json";

export interface LalKitabHouse {
  houseNumber: number;        // 1 to 12
  signNumber: number;         // 1 to 12 (in fixed chart, signNumber === houseNumber)
  signName: string;
  signSanskrit: string;
  naturalLord: string;
  planets: PlanetaryPosition[];
  isSleeping: boolean;        // Soya hua ghar (no resident planets)
  pakkaLords: string[];       // Planets whose permanent home is this house
}

export interface LalKitabChartModel {
  houses: LalKitabHouse[];
  fixedAscendantHouse: number; // Always 1
  vedicAscendantSign: number;  // Secondary Vedic reference
  referenceEdition: string;
  calculationTimestamp: string;
}

const HOUSE_SIGNS = [
  { sign: 1, name: "Aries", sanskrit: "Mesha" },
  { sign: 2, name: "Taurus", sanskrit: "Vrishabha" },
  { sign: 3, name: "Gemini", sanskrit: "Mithuna" },
  { sign: 4, name: "Cancer", sanskrit: "Karka" },
  { sign: 5, name: "Leo", sanskrit: "Simha" },
  { sign: 6, name: "Virgo", sanskrit: "Kanya" },
  { sign: 7, name: "Libra", sanskrit: "Tula" },
  { sign: 8, name: "Scorpio", sanskrit: "Vrischika" },
  { sign: 9, name: "Sagittarius", sanskrit: "Dhanu" },
  { sign: 10, name: "Capricorn", sanskrit: "Makara" },
  { sign: 11, name: "Aquarius", sanskrit: "Kumbha" },
  { sign: 12, name: "Pisces", sanskrit: "Meena" },
];

/**
 * Builds the canonical Fixed-House Lal Kitab Kundali from planetary positions.
 */
export function buildLalKitabChart(
  planets: PlanetaryPosition[],
  vedicAscendantSign = 1
): LalKitabChartModel {
  const houses: LalKitabHouse[] = [];

  for (let h = 1; h <= 12; h++) {
    const signMeta = HOUSE_SIGNS[h - 1];
    // In Lal Kitab, planets in Sign H reside in House H
    const residentPlanets = planets.filter((p) => p.signNumber === h);

    // Natural Lord from Kal Purush
    const naturalLord = (pakkaGharData.naturalHouseLords as Record<string, string>)[h.toString()] || "Mars";

    // Check which planets have this house as their Pakka Ghar
    const pakkaLords: string[] = [];
    for (const [planetName, houseList] of Object.entries(pakkaGharData.pakkaGhar)) {
      if ((houseList as number[]).includes(h)) {
        pakkaLords.push(planetName);
      }
    }

    houses.push({
      houseNumber: h,
      signNumber: h,
      signName: signMeta.name,
      signSanskrit: signMeta.sanskrit,
      naturalLord,
      planets: residentPlanets,
      isSleeping: residentPlanets.length === 0,
      pakkaLords,
    });
  }

  return {
    houses,
    fixedAscendantHouse: 1,
    vedicAscendantSign,
    referenceEdition: pakkaGharData.referenceEdition,
    calculationTimestamp: new Date().toISOString(),
  };
}

