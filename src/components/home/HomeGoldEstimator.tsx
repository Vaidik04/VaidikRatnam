"use client";

import React, { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  Calculator,
  Scale,
  ArrowRight,
  MessageCircle,
  Lock,
} from "lucide-react";
import { RateLockModal } from "@/components/tools/RateLockModal";
import { RollingNumber } from "@/components/ui/RollingNumber";

const ViewPortal = dynamic(
  () => import("@/components/3d/canvas/ViewPortal").then((m) => m.ViewPortal),
  { ssr: false }
);
const GoldCalculator3D = dynamic(
  () => import("@/components/3d/components/GoldCalculator3D").then((m) => m.GoldCalculator3D),
  { ssr: false }
);

interface HomeGoldEstimatorProps {
  initialRates?: {
    gold24k?: number;
    gold22k?: number;
    silver?: number;
  };
}

export function HomeGoldEstimator({ initialRates }: HomeGoldEstimatorProps) {
  const [purity, setPurity] = useState<"22K" | "18K" | "14K" | "24K">("22K");
  const [weight, setWeight] = useState<number>(15);
  const [makingChargePct, setMakingChargePct] = useState<number>(12);
  const [rateLockOpen, setRateLockOpen] = useState<boolean>(false);

  const gold24k = initialRates?.gold24k || 8150;
  const rates = {
    "24K": gold24k,
    "22K": Math.round(gold24k * (22 / 24)),
    "18K": Math.round(gold24k * (18 / 24)),
    "14K": Math.round(gold24k * (14 / 24)),
  };

  const currentRate = rates[purity];
  const goldValue = weight * currentRate;
  const makingCharges = Math.round(goldValue * (makingChargePct / 100));
  const subtotal = goldValue + makingCharges;
  const gst = Math.round(subtotal * 0.03);
  const totalEstimate = subtotal + gst;

  const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "919876543210";
  const message = `Namaste Vaidik Ratnam, I calculated an estimate on your website: ${weight}g of ${purity} Gold Jewellery (Approx ₹${totalEstimate.toLocaleString("en-IN")}). I would like to visit your shop and discuss available designs.`;

  return (
    <div className="bg-[#FAF8F5] border border-[#E8DFC8] rounded-xs p-6 sm:p-8 lg:p-10 shadow-xs">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Explanatory & Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F3D2E]/10 border border-[#D4AF37]/40 text-[#0F3D2E] text-xs font-semibold uppercase tracking-wider mb-2">
              <Calculator className="w-3.5 h-3.5 text-[#B59328]" />
              <span>Transparent Purity & Pricing Engine</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#0F3D2E] font-normal">
              Calculate Your Gold Jewellery Estimate Live
            </h3>
            <p className="text-xs sm:text-sm text-[#4B3F36] mt-1.5 leading-relaxed font-light">
              We never believe in vague pricing or surprise deductions at the billing counter. Calculate today&apos;s real cost including certified hallmark gold rate, fair artisan making charges, and 3% Govt. GST.
            </p>
          </div>

          {/* Controls */}
          <div className="space-y-4 pt-2">
            {/* Purity selector */}
            <div>
              <label className="block text-xs font-semibold text-[#0F3D2E] uppercase tracking-wider mb-2">
                Select Gold Purity:
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(["22K", "18K", "14K", "24K"] as const).map((karat) => (
                  <button
                    key={karat}
                    type="button"
                    onClick={() => setPurity(karat)}
                    className={`py-2 px-3 rounded-xs text-xs font-mono font-semibold transition-all cursor-pointer border ${
                      purity === karat
                        ? "bg-[#0F3D2E] text-[#F3E5AB] border-[#D4AF37] shadow-xs"
                        : "bg-white text-[#4B3F36] border-[#E8DFC8] hover:border-[#D4AF37]/60"
                    }`}
                  >
                    <span className="block text-sm">{karat}</span>
                    <span className="block text-[10px] font-normal opacity-80">
                      ₹{rates[karat].toLocaleString("en-IN")}/g
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Weight Slider */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <label className="font-semibold text-[#0F3D2E] uppercase tracking-wider">
                  Gold Weight (Grams):
                </label>
                <span className="font-mono font-bold text-sm text-[#0F3D2E] bg-white px-2.5 py-0.5 rounded-xs border border-[#E8DFC8]">
                  {weight} grams
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                step="0.5"
                value={weight}
                onChange={(e) => setWeight(parseFloat(e.target.value))}
                className="w-full accent-[#0F3D2E] cursor-pointer"
              />
              <div className="flex gap-1.5 mt-2">
                {[8, 15, 25, 40, 60].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setWeight(preset)}
                    className={`text-[11px] font-mono px-2 py-0.5 rounded-xs border transition-colors cursor-pointer ${
                      weight === preset
                        ? "bg-[#D4AF37] text-[#0F3D2E] font-bold border-[#D4AF37]"
                        : "bg-white text-[#4B3F36] border-[#E8DFC8] hover:bg-[#F9F5EB]"
                    }`}
                  >
                    {preset}g {preset === 8 ? "(1 Pavan)" : ""}
                  </button>
                ))}
              </div>
            </div>

            {/* Making Charge Selector */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <label className="font-semibold text-[#0F3D2E] uppercase tracking-wider">
                  Karigari (Making Charges):
                </label>
                <span className="font-mono text-xs text-[#0F3D2E] font-semibold">
                  {makingChargePct}% ({makingChargePct <= 10 ? "Simple Machine" : makingChargePct <= 14 ? "Traditional Handcraft" : "Intricate Nakshi / Temple"})
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "10% (Chains/Plain)", val: 10 },
                  { label: "12% (Kada/Bangles)", val: 12 },
                  { label: "15% (Temple Nakshi)", val: 15 },
                ].map((item) => (
                  <button
                    key={item.val}
                    type="button"
                    onClick={() => setMakingChargePct(item.val)}
                    className={`py-1.5 px-2 rounded-xs text-[11px] font-sans transition-colors cursor-pointer border text-center ${
                      makingChargePct === item.val
                        ? "bg-[#0F3D2E] text-[#F3E5AB] border-[#D4AF37] font-semibold"
                        : "bg-white text-[#4B3F36] border-[#E8DFC8] hover:bg-[#F9F5EB]"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Transparent Cost Breakdown Receipt Card (5 cols) */}
        <div className="lg:col-span-5 bg-white border-2 border-[#D4AF37]/50 rounded-xs p-6 shadow-md relative">
          <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 z-10">
            <span className="bg-[#0F3D2E] text-[#F3E5AB] text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-xs border border-[#D4AF37] shadow-xs">
              Live Breakdown
            </span>
          </div>

          {/* Interactive 3D Stack of Gold Bars & Coins */}
          <div className="mb-4 h-36 w-full rounded-xs overflow-hidden bg-gradient-to-b from-[#FAF8F5] to-[#F3EDE0] border border-[#E8DFC8] relative shadow-inner">
            <ViewPortal
              className="w-full h-full"
              fallback={
                <div className="w-full h-full flex items-center justify-center text-xs text-[#B59328] font-mono">
                  {weight}g &bull; {purity} Hallmarked Bullion
                </div>
              }
            >
              <GoldCalculator3D
                weightGrams={weight}
                purity={purity.toLowerCase() as "24k" | "22k" | "18k" | "14k"}
              />
            </ViewPortal>
          </div>

          <div className="border-b border-[#E8DFC8] pb-4 mb-4">
            <span className="text-[10px] font-mono text-[#B59328] uppercase tracking-widest block">
              Vaidik Ratnam Estimate
            </span>
            <h4 className="font-serif text-lg text-[#0F3D2E] font-semibold">
              {weight}g &bull; {purity} Hallmarked Gold
            </h4>
            <span className="text-[11px] text-[#4B3F36] block">
              Rate applied: ₹{currentRate.toLocaleString("en-IN")}/g (BIS Benchmark)
            </span>
          </div>

          {/* Math breakdown */}
          <div className="space-y-2.5 text-xs text-[#4B3F36]">
            <div className="flex items-center justify-between">
              <span>Pure Gold Value ({weight}g &times; ₹{currentRate}):</span>
              <span className="font-mono font-semibold text-[#0F3D2E]">
                ₹{goldValue.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Making Charges ({makingChargePct}%):</span>
              <span className="font-mono text-[#0F3D2E]">
                ₹{makingCharges.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Govt. GST (3% on Gold + Craft):</span>
              <span className="font-mono text-[#0F3D2E]">
                ₹{gst.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="border-t-2 border-dashed border-[#D4AF37] pt-3 mt-3 flex items-baseline justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-[#0F3D2E] block">
                  Total Studio Estimate:
                </span>
                <span className="text-[10px] text-[#4B3F36] block font-light">
                  Exact weight confirmed on shop scale
                </span>
              </div>
              <div className="text-right">
                <span className="font-mono text-2xl font-bold text-[#0F3D2E] block leading-tight">
                  <RollingNumber value={totalEstimate} prefix="₹" />
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-6 space-y-2.5">
            <button
              type="button"
              onClick={() => setRateLockOpen(true)}
              className="btn-gold-shimmer text-white w-full py-3 rounded-xs text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-[#F3E5AB]" />
              <span>Lock Today&apos;s Rate (₹{currentRate.toLocaleString("en-IN")}/g)</span>
            </button>

            <a
              href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold-pure w-full py-2.5 rounded-xs text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 shadow-xs cursor-pointer text-[#0F3D2E]"
            >
              <MessageCircle className="w-4 h-4 text-[#0F3D2E]" />
              <span>Discuss This Estimate on WhatsApp</span>
            </a>

            <Link
              href="/tools/gold-budget-estimator"
              className="w-full py-2 text-center text-xs text-[#0F3D2E] hover:text-[#B59328] font-semibold flex items-center justify-center gap-1 transition-colors"
            >
              <span>Open Detailed Buying & Hallmark Checklist</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <RateLockModal
            isOpen={rateLockOpen}
            onClose={() => setRateLockOpen(false)}
            initialKarat={purity === "14K" ? "18K" : purity}
            rates={initialRates}
          />

          {/* Micro trust guarantee */}
          <div className="mt-4 pt-3 border-t border-[#E8DFC8] flex items-center justify-center gap-2 text-[10px] text-[#4B3F36]">
            <Scale className="w-3.5 h-3.5 text-[#1B6442]" />
            <span>0% hidden loss &bull; Digital scale accuracy &bull; 100% buyback</span>
          </div>
        </div>
      </div>
    </div>
  );
}
