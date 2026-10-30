export interface GoldEstimateInput {
  goldRatePerGram24K: number; // in INR
  purity: "24K" | "22K" | "18K" | "14K" | "925_silver";
  netWeightGrams: number;
  makingChargeType: "percentage" | "fixed";
  makingChargeValue: number;
  stoneCharges?: number;
  gstRatePercentage?: number; // default 3%
}

export interface GoldEstimateOutput {
  purityMultiplier: number;
  effectiveRatePerGram: number;
  baseGoldCost: number;
  makingChargeAmount: number;
  stoneCharges: number;
  subtotalBeforeTax: number;
  taxAmount: number;
  estimatedTotal: number;
}

export const PURITY_FACTORS: Record<string, number> = {
  "24K": 1.0,
  "22K": 22 / 24, // ~0.9167
  "18K": 18 / 24, // 0.75
  "14K": 14 / 24, // ~0.5833
  "925_silver": 0.925, // 92.5% Sterling Silver
};

export function calculateGoldJewelleryEstimate(input: GoldEstimateInput): GoldEstimateOutput {
  if (input.goldRatePerGram24K <= 0 || input.netWeightGrams <= 0) {
    throw new Error("Gold rate and net weight must be greater than zero.");
  }

  const purityMultiplier = PURITY_FACTORS[input.purity] ?? (22 / 24);
  const effectiveRatePerGram = Math.round(input.goldRatePerGram24K * purityMultiplier * 100) / 100;
  const baseGoldCost = Math.round(effectiveRatePerGram * input.netWeightGrams * 100) / 100;

  let makingChargeAmount = 0;
  if (input.makingChargeType === "percentage") {
    makingChargeAmount = Math.round(((baseGoldCost * input.makingChargeValue) / 100) * 100) / 100;
  } else {
    makingChargeAmount = Math.round(input.makingChargeValue * 100) / 100;
  }

  const stoneCharges = Math.round((input.stoneCharges || 0) * 100) / 100;
  const subtotalBeforeTax = Math.round((baseGoldCost + makingChargeAmount + stoneCharges) * 100) / 100;

  const gstRate = input.gstRatePercentage !== undefined ? input.gstRatePercentage : 3;
  const taxAmount = Math.round(((subtotalBeforeTax * gstRate) / 100) * 100) / 100;
  const estimatedTotal = Math.round((subtotalBeforeTax + taxAmount) * 100) / 100;

  return {
    purityMultiplier,
    effectiveRatePerGram,
    baseGoldCost,
    makingChargeAmount,
    stoneCharges,
    subtotalBeforeTax,
    taxAmount,
    estimatedTotal,
  };
}

