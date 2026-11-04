/**
 * LAL KITAB RULE ENGINE
 * Evaluates chart conditions against versioned reference rules.
 */

import { LalKitabChartModel } from "./chart-builder";
import { PlanetaryPosition } from "./astronomy";
import rinRules from "./data/rin-rules.json";
import ageCycleData from "./data/age-cycle.json";
import upayData from "./data/upay.json";

export interface FiredRule {
  id: string;
  category: "chart_type" | "rin" | "sleeping_state" | "upay";
  title: string;
  description: string;
  confidence: "confirmed" | "edition-dependent" | "disputed";
  remedy?: string;
  sourceEdition: string;
}

export interface RuleEngineEvaluationResult {
  chartType: {
    type: "Dharmi Teva" | "Andha Teva" | "Ratondha Teva" | "Nabalig Teva" | "Sadharan Teva (Normal)";
    description: string;
  };
  sleepingHouses: number[];
  sleepingPlanets: string[];
  detectedRins: Array<{
    id: string;
    name: string;
    cause: string;
    remedy: string;
  }>;
  activeAgePlanet: {
    planet: string;
    sanskrit: string;
    startAge: number;
    endAge: number;
    significance: string;
  };
  suggestedUpay: Array<{
    id: string;
    title: string;
    duration: string;
    practice: string;
    planet: string;
  }>;
  firedRules: FiredRule[];
}

export function evaluateLalKitabRules(
  chart: LalKitabChartModel,
  userAge = 32
): RuleEngineEvaluationResult {
  const firedRules: FiredRule[] = [];
  const planets = chart.houses.flatMap((h) => h.planets);

  const getPlanet = (name: string): PlanetaryPosition | undefined =>
    planets.find((p) => p.name === name);

  const getHouseOfPlanet = (name: string): number => {
    const p = getPlanet(name);
    return p ? p.signNumber : -1;
  };

  // 1. Sleeping Houses (Soya Hua Ghar)
  const sleepingHouses = chart.houses
    .filter((h) => h.planets.length === 0)
    .map((h) => h.houseNumber);

  // 2. Sleeping Planets (Soya Hua Graha)
  // In 1952 text: Planets in houses 1 to 6 without planets in 7 to 12 or vice versa
  const sleepingPlanets: string[] = [];
  for (const h of chart.houses) {
    if (h.planets.length > 0 && h.planets.some((p) => p.isRetrograde === false)) {
      // Simplified classical waking trigger rule
      if (h.houseNumber === 7 && getHouseOfPlanet("Sun") === 1) {
        // mutually waking
      }
    }
  }

  // 3. Chart Type Detection (Teva Classification)
  let chartType: RuleEngineEvaluationResult["chartType"] = {
    type: "Sadharan Teva (Normal)",
    description: "Standard balanced horoscope with active dynamic karmic influences.",
  };

  const jupiterHouse = getHouseOfPlanet("Jupiter");
  const saturnHouse = getHouseOfPlanet("Saturn");
  const sunHouse = getHouseOfPlanet("Sun");
  const moonHouse = getHouseOfPlanet("Moon");

  // Dharmi Teva: Jupiter in 9, 10 or 11
  if ([9, 10, 11].includes(jupiterHouse) || (moonHouse === 4 && saturnHouse === 4)) {
    chartType = {
      type: "Dharmi Teva",
      description: "A highly protected horoscope where divine benevolence mitigates intense planetary afflictions.",
    };
    firedRules.push({
      id: "chart_dharmi_teva",
      category: "chart_type",
      title: "Dharmi Teva Protection",
      description: chartType.description,
      confidence: "confirmed",
      sourceEdition: "1952_gutka",
    });
  } else if (saturnHouse === 7 && sunHouse === 1) {
    // Andha Teva
    chartType = {
      type: "Andha Teva",
      description: "Sun and Saturn opposing in 1st & 7th house; requires deliberate daytime decision-making.",
    };
    firedRules.push({
      id: "chart_andha_teva",
      category: "chart_type",
      title: "Andha Teva Condition",
      description: chartType.description,
      confidence: "confirmed",
      sourceEdition: "1952_gutka",
    });
  } else if (sunHouse === 7 && saturnHouse === 1) {
    chartType = {
      type: "Ratondha Teva",
      description: "Night sensitivity condition; major life commitments should be made in daylight.",
    };
  }

  // 4. Rin (Karmic Debt) Analysis
  const detectedRins: RuleEngineEvaluationResult["detectedRins"] = [];
  const venusHouse = getHouseOfPlanet("Venus");
  const ketuHouse = getHouseOfPlanet("Ketu");

  // Pitri Rin: Venus in House 2, 5, 9, 12
  if ([2, 5, 9, 12].includes(venusHouse) && [2, 5, 9, 12].includes(jupiterHouse)) {
    const r = rinRules.rinTypes.find((item) => item.id === "pitri_rin")!;
    detectedRins.push({
      id: r.id,
      name: r.name,
      cause: r.cause,
      remedy: r.safeRemedy,
    });
    firedRules.push({
      id: "rin_pitri",
      category: "rin",
      title: r.name,
      description: r.cause,
      remedy: r.safeRemedy,
      confidence: "confirmed",
      sourceEdition: "1952_gutka",
    });
  }

  // Matri Rin: Ketu in House 4
  if (ketuHouse === 4 || (moonHouse === 2 && getHouseOfPlanet("Rahu") === 2)) {
    const r = rinRules.rinTypes.find((item) => item.id === "matri_rin")!;
    detectedRins.push({
      id: r.id,
      name: r.name,
      cause: r.cause,
      remedy: r.safeRemedy,
    });
    firedRules.push({
      id: "rin_matri",
      category: "rin",
      title: r.name,
      description: r.cause,
      remedy: r.safeRemedy,
      confidence: "confirmed",
      sourceEdition: "1952_gutka",
    });
  }

  // 5. Active Age-Cycle Planet
  let activeAgePlanet = ageCycleData.agePeriods[0];
  for (const period of ageCycleData.agePeriods) {
    if (userAge >= period.startAge && userAge <= period.endAge) {
      activeAgePlanet = period;
      break;
    }
  }

  // 6. Upay Planner (Tailored safe remedies)
  const suggestedUpay: RuleEngineEvaluationResult["suggestedUpay"] = [];

  // Default grounding remedy for Sun & Moon
  const sunRemedies = upayData.remedies.Sun;
  if (sunRemedies && sunRemedies.length > 0) {
    suggestedUpay.push(sunRemedies[0]);
  }

  // Include active age-cycle planet remedy
  const agePlanetRemedies = (upayData.remedies as Record<string, typeof sunRemedies>)[activeAgePlanet.planet];
  if (agePlanetRemedies && agePlanetRemedies.length > 0) {
    suggestedUpay.push(agePlanetRemedies[0]);
  }

  return {
    chartType,
    sleepingHouses,
    sleepingPlanets,
    detectedRins,
    activeAgePlanet,
    suggestedUpay,
    firedRules,
  };
}
