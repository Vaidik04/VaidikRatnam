import { describe, it, expect } from "vitest";
import { calculateGoldJewelleryEstimate } from "./gold-calculator";

describe("calculateGoldJewelleryEstimate", () => {
  it("calculates 22K gold estimate correctly with percentage making charge and 3% GST", () => {
    const res = calculateGoldJewelleryEstimate({
      goldRatePerGram24K: 8000,
      purity: "22K",
      netWeightGrams: 10,
      makingChargeType: "percentage",
      makingChargeValue: 12, // 12%
      stoneCharges: 0,
      gstRatePercentage: 3,
    });

    // 24K rate: 8000. 22K effective rate = 8000 * (22/24) = 7333.33
    expect(res.effectiveRatePerGram).toBeCloseTo(7333.33, 1);
    // Base gold cost for 10g = 73333.3
    expect(res.baseGoldCost).toBeCloseTo(73333.3, 1);
    // 12% making charge on 73333.3 = ~8800
    expect(res.makingChargeAmount).toBeCloseTo(8800, 0);
    // Subtotal before tax = base + making
    expect(res.subtotalBeforeTax).toBeCloseTo(82133.3, 0);
    // 3% GST on 82133.3 = ~2464
    expect(res.taxAmount).toBeCloseTo(2464, 0);
    // Total = subtotal + tax = ~84597
    expect(res.estimatedTotal).toBeCloseTo(84597, 0);
  });

  it("calculates estimate with fixed making charges and stones", () => {
    const res = calculateGoldJewelleryEstimate({
      goldRatePerGram24K: 8000,
      purity: "18K",
      netWeightGrams: 5,
      makingChargeType: "fixed",
      makingChargeValue: 5000,
      stoneCharges: 15000,
      gstRatePercentage: 3,
    });

    // 18K rate: 8000 * 0.75 = 6000
    expect(res.effectiveRatePerGram).toBe(6000);
    // Base gold cost for 5g = 30000
    expect(res.baseGoldCost).toBe(30000);
    expect(res.makingChargeAmount).toBe(5000);
    expect(res.stoneCharges).toBe(15000);
    expect(res.subtotalBeforeTax).toBe(50000);
    expect(res.taxAmount).toBe(1500); // 3% of 50000
    expect(res.estimatedTotal).toBe(51500);
  });

  it("calculates 925 sterling silver estimate correctly", () => {
    const res = calculateGoldJewelleryEstimate({
      goldRatePerGram24K: 100, // Spot silver rate ~100/g
      purity: "925_silver",
      netWeightGrams: 50,
      makingChargeType: "percentage",
      makingChargeValue: 20,
      stoneCharges: 0,
      gstRatePercentage: 3,
    });

    // 100 * 0.925 = 92.5
    expect(res.effectiveRatePerGram).toBe(92.5);
    // Base metal cost: 92.5 * 50 = 4625
    expect(res.baseGoldCost).toBe(4625);
    // Making charges 20% on 4625 = 925
    expect(res.makingChargeAmount).toBe(925);
    // Subtotal = 4625 + 925 = 5550
    expect(res.subtotalBeforeTax).toBe(5550);
    // Tax 3% = 166.5
    expect(res.taxAmount).toBe(166.5);
    expect(res.estimatedTotal).toBe(5716.5);
  });

  it("throws error on zero or negative values", () => {
    expect(() =>
      calculateGoldJewelleryEstimate({
        goldRatePerGram24K: 0,
        purity: "22K",
        netWeightGrams: 10,
        makingChargeType: "percentage",
        makingChargeValue: 10,
      })
    ).toThrow();
  });
});

