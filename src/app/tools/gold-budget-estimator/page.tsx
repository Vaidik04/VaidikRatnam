"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";
import { calculateGoldJewelleryEstimate } from "@/lib/tools/gold-calculator";
import {
  Calculator,
  Info,
  Sparkles,
  Scale,
  ShieldCheck,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";

const PURITY_OPTIONS = [
  {
    key: "22K" as const,
    label: "22K Gold (916)",
    purityPercent: "91.6% Pure Gold",
    metalCategory: "gold",
    description: "The gold standard for traditional bridal, antique temple, and heirloom jewellery in India.",
    borderTone: "border-[#C59B27]",
  },
  {
    key: "18K" as const,
    label: "18K Gold (750)",
    purityPercent: "75.0% Pure Gold",
    metalCategory: "gold",
    description: "Ideal for diamond settings and modern daily-wear; stronger alloy for holding precious stones.",
    borderTone: "border-[#B08D57]",
  },
  {
    key: "14K" as const,
    label: "14K Gold (585)",
    purityPercent: "58.5% Pure Gold",
    metalCategory: "gold",
    description: "Lightweight contemporary daily-wear and affordable diamond accents.",
    borderTone: "border-[#9CA3AF]",
  },
  {
    key: "24K" as const,
    label: "24K Pure (999)",
    purityPercent: "99.9% Pure Gold",
    metalCategory: "gold",
    description: "Pure investment bullion bars and auspicious sovereign coins (too soft for fine filigree jewellery).",
    borderTone: "border-[#EAB308]",
  },
  {
    key: "925_silver" as const,
    label: "925 Sterling Silver",
    purityPercent: "92.5% Pure Silver",
    metalCategory: "silver",
    description: "Solid sterling silver payals, kadas, astrological Moon/Venus settings, and sacred puja ware.",
    borderTone: "border-[#64748B]",
  },
];

const GOLD_WEIGHT_PRESETS = [
  { label: "Ring (5g)", value: 5, pieceType: "ring" },
  { label: "Earrings (10g)", value: 10, pieceType: "earrings" },
  { label: "Kada / Bangle (25g)", value: 25, pieceType: "bangle" },
  { label: "Bridal Haar (45g)", value: 45, pieceType: "necklace" },
  { label: "Heavy Choker (70g)", value: 70, pieceType: "necklace" },
];

const SILVER_WEIGHT_PRESETS = [
  { label: "Silver Ring (8g)", value: 8, pieceType: "ring" },
  { label: "Pendant (15g)", value: 15, pieceType: "pendant" },
  { label: "Payal / Anklets (50g)", value: 50, pieceType: "other" },
  { label: "Silver Kada (75g)", value: 75, pieceType: "bangle" },
  { label: "Puja Utensil (150g)", value: 150, pieceType: "other" },
];

export default function GoldBudgetEstimatorPage() {
  const [ratePer10g24K, setRatePer10g24K] = useState<number>(81500);
  const [ratePerKgSilver, setRatePerKgSilver] = useState<number>(98000);
  const [purity, setPurity] = useState<"24K" | "22K" | "18K" | "14K" | "925_silver">("22K");
  const [weightGrams, setWeightGrams] = useState<number>(20);
  const [selectedPieceType, setSelectedPieceType] = useState<string>("bangle");
  const [makingType, setMakingType] = useState<"percentage" | "fixed">("percentage");
  const [makingValue, setMakingValue] = useState<number>(14);
  const [stoneCharges, setStoneCharges] = useState<number>(0);
  const gstRate = 3;

  const isSilver = purity === "925_silver";
  const activeMetalRatePerGram = isSilver ? ratePerKgSilver / 1000 : ratePer10g24K / 10;

  let estimateResult = null;
  let calculationError = null;

  try {
    estimateResult = calculateGoldJewelleryEstimate({
      goldRatePerGram24K: activeMetalRatePerGram,
      purity,
      netWeightGrams: weightGrams,
      makingChargeType: makingType,
      makingChargeValue: makingValue,
      stoneCharges,
      gstRatePercentage: gstRate,
    });
  } catch (err: unknown) {
    calculationError = (err as Error).message;
  }

  const weightPresets = isSilver ? SILVER_WEIGHT_PRESETS : GOLD_WEIGHT_PRESETS;
  const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "919876543210";
  const rawWhatsapp = whatsappPhone.replace(/[^0-9]/g, "");

  const customDesignUrl = `/custom-design?pieceType=${selectedPieceType}&metal=${
    purity === "22K"
      ? "22k_yellow_gold"
      : purity === "18K"
      ? "18k_yellow_gold"
      : purity === "14K"
      ? "14k_yellow_gold"
      : purity === "925_silver"
      ? "925_sterling_silver"
      : "22k_yellow_gold"
  }&budget=${
    estimateResult
      ? estimateResult.estimatedTotal < 50000
        ? "under_50k"
        : estimateResult.estimatedTotal < 100000
        ? "50k_to_1lakh"
        : estimateResult.estimatedTotal < 250000
        ? "1lakh_to_2_5lakh"
        : estimateResult.estimatedTotal < 500000
        ? "2_5lakh_to_5lakh"
        : "above_5lakh"
      : "50k_to_1lakh"
  }&notes=${encodeURIComponent(
    `Transferred from shop calculator: ${weightGrams}g ${
      isSilver ? "925 Sterling Silver" : `${purity} Gold`
    } (Estimated budget: ₹${Math.round(estimateResult?.estimatedTotal || 0).toLocaleString("en-IN")})`
  )}`;

  const whatsappMessage = `Namaste Vaidik Ratnam, I calculated a gold estimate for a ${weightGrams}g ${
    isSilver ? "925 Sterling Silver" : `${purity} Gold`
  } piece (approx ₹${Math.round(estimateResult?.estimatedTotal || 0).toLocaleString(
    "en-IN"
  )}). I would like to visit your shop or discuss making this custom jewellery.`;

  return (
    <div className="min-h-screen flex flex-col bg-[#04170f] text-[#faf7f0] selection:bg-[#d4af37]/30 selection:text-[#f6e7b4]">
      <Header />

      <main className="flex-1 py-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-10">
        {/* Editorial Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0a2a1d] border border-[#d4af37]/40 text-[#f1d98a] text-xs uppercase tracking-[0.22em] font-mono font-medium shadow-md">
            <Calculator className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Interactive Financial Tool</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl text-white font-normal tracking-tight">
            Gold Jewellery Budget Estimator
          </h1>

          <p className="text-xs sm:text-sm text-[#a8b6af] leading-relaxed max-w-2xl mx-auto font-light">
            Understand exactly how transparent fine jewellery invoices are calculated in India. Enter current bullion rates, choose gold purities, and observe live itemized bill breakdowns with statutory 3% GST.
          </p>
        </div>

        {/* Legal Disclaimer Pill */}
        <div className="bg-[#0a2a1d]/80 border border-[#d4af37]/30 rounded-2xl p-4 flex items-start gap-3 text-xs text-[#e2ece7] shadow-xl">
          <Info className="w-4 h-4 mt-0.5 shrink-0 text-[#d4af37]" />
          <div>
            <strong className="font-semibold block mb-0.5 text-[#f1d98a]">Educational Valuation Disclaimer:</strong>
            This tool computes mathematical estimates using standard Indian goldsmithing formulas. Final shop quotations depend on exact assayed net gold weight on certified digital scales, daily gold movements, and custom craftsmanship complexity.
          </div>
        </div>

        {/* Main 2-Column Calculator Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ==================================================================
              LEFT: INTERACTIVE CONTROLS (7 cols)
              ================================================================== */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Bullion Rate Selector */}
            <Card className="p-6 bg-[#0a2a1d]/85 border border-[#d4af37]/35 rounded-2xl shadow-xl space-y-4 backdrop-blur-md text-white">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-mono uppercase tracking-[0.18em] text-[#d4af37] font-semibold">
                  1. Current {isSilver ? "Silver" : "Bullion"} Benchmark
                </span>
                <span className="text-xs text-[#f1d98a] font-medium font-mono">
                  {isSilver
                    ? `₹${(ratePerKgSilver / 1000).toFixed(1)}/g (999 Pure Silver)`
                    : `₹${(ratePer10g24K / 10).toLocaleString("en-IN")}/g (24K Gold)`}
                </span>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#a8b6af] mb-1.5">
                  {isSilver
                    ? "Spot Pure Silver Rate (₹ per Kg):"
                    : "24K Reference Gold Rate (₹ per 10 Grams):"}
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={isSilver ? 50000 : 40000}
                    max={isSilver ? 200000 : 150000}
                    step={100}
                    value={isSilver ? ratePerKgSilver : ratePer10g24K}
                    onChange={(e) =>
                      isSilver
                        ? setRatePerKgSilver(Number(e.target.value))
                        : setRatePer10g24K(Number(e.target.value))
                    }
                    className="w-full text-base font-serif font-bold text-[#182522] px-4 py-2.5 bg-[#FAF8F5] border border-[#D4CCC0] rounded-xs focus:outline-none focus:ring-1 focus:ring-[#173B32]"
                  />
                  <div className="flex gap-1.5 shrink-0">
                    {(isSilver ? [92000, 98000, 105000] : [78500, 81500, 84000]).map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() =>
                          isSilver ? setRatePerKgSilver(preset) : setRatePer10g24K(preset)
                        }
                        className={`text-[11px] px-2.5 py-2 rounded-xl border font-mono transition-colors cursor-pointer ${
                          (isSilver ? ratePerKgSilver : ratePer10g24K) === preset
                            ? "bg-gold-gradient text-[#04170f] font-bold border-[#d4af37]"
                            : "bg-[#04170f] text-[#f1d98a] border-[#d4af37]/30 hover:bg-[#d4af37]/15"
                        }`}
                      >
                        {isSilver ? `₹${(preset / 1000).toFixed(0)}/g` : `₹${(preset / 1000).toFixed(1)}k`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* 2. Purity Selection Cards */}
            <Card className="p-6 bg-[#0a2a1d]/85 border border-[#d4af37]/35 rounded-2xl shadow-xl space-y-4 backdrop-blur-md text-white">
              <span className="text-xs font-mono uppercase tracking-[0.18em] text-[#d4af37] font-semibold block border-b border-white/10 pb-3">
                2. Select Metal &amp; Karat Purity
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PURITY_OPTIONS.map((opt) => {
                  const isSelected = purity === opt.key;
                  return (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => setPurity(opt.key)}
                      className={`p-4 rounded-xl text-left border transition-all cursor-pointer relative overflow-hidden ${
                        isSelected
                          ? "bg-[#14502f] text-white border-[#d4af37] shadow-lg ring-1 ring-[#d4af37]/50"
                          : "bg-[#04170f]/90 text-[#f1d98a] border-[#d4af37]/25 hover:border-[#d4af37]/60 hover:bg-[#0f3a28]"
                      }`}
                    >
                      <div className="flex items-baseline justify-between mb-1">
                        <strong className="font-serif text-lg text-white block">{opt.label}</strong>
                        <span
                          className={`text-[10px] font-mono ${
                            isSelected ? "text-[#f6e7b4]" : "text-[#d4af37]"
                          }`}
                        >
                          {opt.purityPercent}
                        </span>
                      </div>
                      <p
                        className={`text-[11px] leading-snug font-sans ${
                          isSelected ? "text-[#e2ece7]" : "text-[#a8b6af]"
                        }`}
                      >
                        {opt.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </Card>

            {/* 3. Weight Slider & Making Charges */}
            <Card className="p-6 bg-[#0a2a1d]/85 border border-[#d4af37]/35 rounded-2xl shadow-xl space-y-5 backdrop-blur-md text-white">
              <span className="text-xs font-mono uppercase tracking-[0.18em] text-[#d4af37] font-semibold block border-b border-white/10 pb-3">
                3. Net {isSilver ? "Silver" : "Gold"} Weight &amp; Workmanship
              </span>

              {/* Weight Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#a8b6af] flex items-center gap-1.5">
                    <Scale className="w-4 h-4 text-[#d4af37]" />
                    <span>Net Weight (Grams):</span>
                  </label>
                  <span className="font-serif text-3xl font-bold text-[#f1d98a]">
                    {weightGrams} <span className="text-xs font-mono font-normal text-[#a8b6af]">Grams</span>
                  </span>
                </div>

                <input
                  type="range"
                  min={1}
                  max={isSilver ? 250 : 100}
                  step={0.5}
                  value={weightGrams}
                  onChange={(e) => setWeightGrams(Number(e.target.value))}
                  className="w-full accent-[#d4af37] cursor-pointer"
                />

                {/* Quick Presets */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {weightPresets.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => {
                        setWeightGrams(preset.value);
                        setSelectedPieceType(preset.pieceType);
                      }}
                      className={`text-[11px] px-3 py-1.5 rounded-lg border font-mono transition-colors cursor-pointer ${
                        weightGrams === preset.value
                          ? "bg-gold-gradient text-[#04170f] font-bold border-[#d4af37]"
                          : "bg-[#04170f] text-[#f1d98a] border-[#d4af37]/25 hover:bg-[#d4af37]/15"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Making Charges Control */}
              <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#a8b6af] mb-1.5">
                    Making / Karigari Charge Mode:
                  </label>
                  <div className="flex rounded-xl border border-[#d4af37]/35 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setMakingType("percentage")}
                      className={`flex-1 py-2 text-xs font-mono font-semibold uppercase tracking-wider cursor-pointer ${
                        makingType === "percentage"
                          ? "bg-gold-gradient text-[#04170f]"
                          : "bg-[#04170f] text-[#a8b6af]"
                      }`}
                    >
                      Percentage (%)
                    </button>
                    <button
                      type="button"
                      onClick={() => setMakingType("fixed")}
                      className={`flex-1 py-2 text-xs font-mono font-semibold uppercase tracking-wider cursor-pointer ${
                        makingType === "fixed"
                          ? "bg-gold-gradient text-[#04170f]"
                          : "bg-[#04170f] text-[#a8b6af]"
                      }`}
                    >
                      ₹ / Gram
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#a8b6af] mb-1.5">
                    {makingType === "percentage" ? "Making Charge (%)" : "Making Charge (₹ per Gram)"}:
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={makingType === "percentage" ? 50 : 5000}
                    value={makingValue}
                    onChange={(e) => setMakingValue(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 text-xs font-mono bg-[#04170f] border border-[#d4af37]/35 rounded-xl text-white focus:outline-none focus:border-[#d4af37]"
                  />
                  <span className="text-[10px] text-[#a8b6af] block mt-1 font-mono">
                    Standard bridal pieces typically range from 12% to 18%.
                  </span>
                </div>

                <div className="pt-2 border-t border-white/10 sm:col-span-2">
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#a8b6af] mb-1.5">
                    Studded Gemstone / Diamond Charges (₹, optional):
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={500}
                    value={stoneCharges}
                    onChange={(e) => setStoneCharges(Math.max(0, Number(e.target.value)))}
                    className="w-full px-3.5 py-2.5 text-xs font-mono bg-[#04170f] border border-[#d4af37]/35 rounded-xl text-white focus:outline-none focus:border-[#d4af37]"
                    placeholder="0"
                  />
                  <span className="text-[10px] text-[#a8b6af] block mt-1 font-mono">
                    Value of certified natural Ratna or diamonds (stone weight is always deducted from gold).
                  </span>
                </div>
              </div>
            </Card>
          </div>

          {/* ==================================================================
              RIGHT: ITEMISED HAUTE INVOICE RECEIPT (5 cols)
              ================================================================== */}
          <div className="lg:col-span-5 sticky top-28 space-y-4">
            <Card className="p-8 bg-[#0a2a1d] border-2 border-[#d4af37]/60 rounded-3xl shadow-2xl space-y-6 relative overflow-hidden backdrop-blur-md text-white">
              {/* Receipt Header */}
              <div className="border-b-2 border-dashed border-[#d4af37]/30 pb-5 text-center space-y-1">
                <span className="text-[9px] uppercase tracking-[0.28em] text-[#d4af37] font-semibold font-mono block">
                  Studio Estimation Breakdown
                </span>
                <h3 className="font-serif text-3xl font-normal text-white">
                  VAIDIK RATNAM
                </h3>
                <span className="text-[11px] text-[#f1d98a] font-mono block">
                  {isSilver ? "925 Sterling Silver" : `${purity} Gold`} &bull; {weightGrams}g Net Weight
                </span>
              </div>

              {calculationError ? (
                <div className="caution-ruby-glass rounded-xl p-4 text-xs">
                  {calculationError}
                </div>
              ) : estimateResult ? (
                <div className="space-y-4 text-xs font-mono">
                  {/* Applied Rates summary */}
                  <div className="p-3.5 bg-[#04170f] rounded-xl border border-[#d4af37]/30 space-y-1">
                    <div className="flex justify-between text-[#a8b6af]">
                      <span>Effective {isSilver ? "925 Silver" : purity} Rate:</span>
                      <strong className="text-[#f1d98a] font-mono">
                        ₹{Math.round(estimateResult.effectiveRatePerGram).toLocaleString("en-IN")}/g
                      </strong>
                    </div>
                    <div className="flex justify-between text-[#a8b6af]">
                      <span>Assayed Net Metal:</span>
                      <strong className="text-white font-mono">
                        {weightGrams} Grams
                      </strong>
                    </div>
                  </div>

                  {/* Bill Items */}
                  <div className="space-y-2.5 pt-2">
                    <div className="flex justify-between items-center text-[#a8b6af]">
                      <span>1. Net Bullion Value:</span>
                      <span className="font-mono font-medium text-white">
                        ₹{Math.round(estimateResult.baseGoldCost).toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-[#a8b6af]">
                      <span>
                        2. Handcrafting Charges ({makingType === "percentage" ? `${makingValue}%` : `₹${makingValue}/g`}):
                      </span>
                      <span className="font-mono font-medium text-white">
                        ₹{Math.round(estimateResult.makingChargeAmount).toLocaleString("en-IN")}
                      </span>
                    </div>

                    {stoneCharges > 0 && (
                      <div className="flex justify-between items-center text-[#a8b6af]">
                        <span>3. Studded Gemstones Cost:</span>
                        <span className="font-mono font-medium text-white">
                          ₹{stoneCharges.toLocaleString("en-IN")}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between items-center text-[#a8b6af] pt-2 border-t border-white/10">
                      <span>Pre-Tax Subtotal:</span>
                      <span className="font-mono font-medium text-[#f1d98a]">
                        ₹{Math.round(estimateResult.subtotalBeforeTax).toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-[#10b981]">
                      <span className="flex items-center gap-1 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
                        Statutory 3% GST:
                      </span>
                      <span className="font-mono font-semibold text-[#10b981]">
                        ₹{Math.round(estimateResult.taxAmount).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  {/* Grand Estimated Total */}
                  <div className="pt-4 border-t-2 border-[#d4af37]/40 bg-[#04170f] -mx-8 -mb-6 p-6 space-y-1">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs uppercase tracking-widest text-[#a8b6af] font-semibold font-mono">
                        Estimated Bill:
                      </span>
                      <span className="font-serif text-3xl font-bold text-[#f6e7b4]">
                        ₹{Math.round(estimateResult.estimatedTotal).toLocaleString("en-IN")}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#a8b6af] block font-mono">
                      Inclusive of all {isSilver ? "silver" : "gold"}, making, and government taxes.
                    </span>
                  </div>
                </div>
              ) : null}

              {/* Actions: Transfer to Custom Design or WhatsApp */}
              <div className="pt-4 space-y-2.5">
                <Link href={customDesignUrl} className="block w-full">
                  <button
                    type="button"
                    className="bg-gold-gradient text-[#04170f] w-full py-3.5 text-xs uppercase tracking-widest font-mono font-bold rounded-xl shadow-lg flex items-center justify-center gap-1.5 cursor-pointer hover:brightness-105 transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Order Custom Jewellery with this Weight &rarr;</span>
                  </button>
                </Link>

                <a
                  href={`https://wa.me/${rawWhatsapp}?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <button
                    type="button"
                    className="w-full py-3 bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366] hover:text-black text-xs font-mono font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-all shadow-md"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Discuss Estimate on WhatsApp</span>
                  </button>
                </a>
              </div>
            </Card>

            {/* Quick Assurance */}
            <div className="p-4 bg-[#0a2a1d] border border-[#d4af37]/35 rounded-2xl text-xs text-[#faf7f0] space-y-1 shadow-lg">
              <span className="font-medium flex items-center gap-1.5 text-[#f1d98a]">
                <ShieldCheck className="w-4 h-4 text-[#10b981]" />
                Shop Digital Scale Guarantee
              </span>
              <p className="text-[11px] text-[#a8b6af] font-light leading-relaxed">
                In our family shop, every piece is weighed in front of you on digital certified scales. You never pay gold rates on stones, lacquer, or thread.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
