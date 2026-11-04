"use client";

import React, { useState } from "react";
import {
  Calculator,
  MessageCircle,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { RateLockModal } from "@/components/tools/RateLockModal";
import { RollingNumber } from "@/components/ui/RollingNumber";

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

  // Ingot stack count based on weight (1 to 5 visual ingots)
  const barCount = Math.min(Math.max(Math.round(weight / 15), 1), 5);

  const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "919876543210";
  const message = `Namaste Vaidik Ratnam, I calculated an estimate on your website: ${weight}g of ${purity} Gold Jewellery (Approx ₹${totalEstimate.toLocaleString("en-IN")}). I would like to visit your shop and discuss available designs.`;

  return (
    <div className="bg-[#0a2a1d]/90 border border-[#d4af37]/35 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md text-[#faf7f0]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Interactive Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-7">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#f1d98a] text-xs font-mono uppercase tracking-widest mb-3">
              <Calculator className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Transparent Purity &amp; Pricing Engine</span>
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl text-white font-normal leading-tight">
              Calculate Your Gold Jewellery Estimate Live
            </h3>
            <p className="text-xs sm:text-sm text-[#a8b6af] mt-2 leading-relaxed font-light">
              We never believe in vague pricing or surprise deductions at the billing counter. Calculate today&apos;s real cost including certified hallmark gold rate, fair artisan making charges, and 3% Govt. GST.
            </p>
          </div>

          {/* Purity Selection (Coin Selectors) */}
          <div className="space-y-3">
            <label className="text-xs font-mono text-[#d4af37] uppercase tracking-wider block font-semibold">
              1. Select Gold Purity (Karat):
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(["22K", "18K", "14K", "24K"] as const).map((k) => {
                const isSelected = purity === k;
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setPurity(k)}
                    className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer relative overflow-hidden ${
                      isSelected
                        ? "bg-[#14502f] border-[#d4af37] text-white shadow-[0_0_20px_rgba(212,175,55,0.3)] scale-[1.02]"
                        : "bg-[#04170f]/80 border-white/10 text-[#a8b6af] hover:border-[#d4af37]/40 hover:text-white"
                    }`}
                  >
                    <span className="block font-serif text-lg font-bold text-[#f1d98a]">
                      {k} {k === "22K" ? "916" : k === "18K" ? "750" : k === "24K" ? "999" : "585"}
                    </span>
                    <span className="block text-[11px] font-mono text-[#a8b6af] mt-0.5">
                      ₹{rates[k].toLocaleString("en-IN")}/g
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Weight Slider & Quick Presets */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono text-[#d4af37] uppercase tracking-wider font-semibold">
                2. Net Gold Weight:
              </label>
              <span className="font-mono text-xl font-bold text-white bg-[#04170f] px-3.5 py-1 rounded-xl border border-[#d4af37]/40">
                {weight} <span className="text-xs text-[#d4af37]">grams</span>
              </span>
            </div>

            <input
              type="range"
              min={1}
              max={100}
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full h-2 bg-[#04170f] rounded-lg appearance-none cursor-pointer accent-[#d4af37] border border-white/10"
            />

            {/* Quick Presets */}
            <div className="flex items-center gap-2 pt-1 flex-wrap">
              <span className="text-[10px] font-mono text-[#a8b6af] uppercase tracking-wider mr-1">
                Presets:
              </span>
              {[8, 15, 25, 40, 60].map((w) => (
                <button
                  key={w}
                  type="button"
                  onClick={() => setWeight(w)}
                  className={`text-xs font-mono px-3 py-1 rounded-lg border transition-all cursor-pointer ${
                    weight === w
                      ? "bg-[#d4af37] text-[#04170f] font-bold border-[#f1d98a]"
                      : "bg-[#04170f]/80 text-[#a8b6af] border-white/10 hover:border-[#d4af37]/40 hover:text-white"
                  }`}
                >
                  {w}g
                </button>
              ))}
            </div>
          </div>

          {/* Making Charge Selection */}
          <div className="space-y-3">
            <label className="text-xs font-mono text-[#d4af37] uppercase tracking-wider block font-semibold">
              3. Artisan Karigari / Making Charges:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                { label: "10% (Chains / Plain)", val: 10 },
                { label: "12% (Kada / Bangles)", val: 12 },
                { label: "15% (Temple Nakshi)", val: 15 },
              ].map((item) => (
                <button
                  key={item.val}
                  type="button"
                  onClick={() => setMakingChargePct(item.val)}
                  className={`py-2 px-3 rounded-xl text-xs font-mono transition-all cursor-pointer border text-center ${
                    makingChargePct === item.val
                      ? "bg-[#14502f] text-[#f1d98a] border-[#d4af37] font-semibold shadow-md"
                      : "bg-[#04170f]/80 text-[#a8b6af] border-white/10 hover:border-[#d4af37]/40"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: 3D Motion Graphics Receipt Stage (5 cols) */}
        <div className="lg:col-span-5 bg-[#04170f]/95 border-2 border-[#d4af37]/50 rounded-2xl p-6 sm:p-7 shadow-2xl relative">
          <div className="absolute top-4 right-4 z-10">
            <span className="bg-[#14502f] text-[#f1d98a] text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full border border-[#d4af37]/50 shadow-md">
              Live Breakdown
            </span>
          </div>

          {/* 3D Motion Graphics Bullion Ingot Stage */}
          <div className="mb-6 h-36 w-full rounded-xl overflow-hidden bg-radial from-[#0a2a1d] via-[#04170f] to-[#020b07] border border-[#d4af37]/30 relative flex flex-col items-center justify-center p-4">
            <div className="relative flex items-center justify-center w-full h-full [perspective:600px]">
              {/* Layered Isometric 3D Gold Bars */}
              <div className="flex flex-col-reverse items-center gap-1.5 transition-all duration-300" style={{ transformStyle: "preserve-3d", transform: "rotateX(25deg) rotateY(-15deg)" }}>
                {Array.from({ length: barCount }).map((_, idx) => (
                  <div
                    key={idx}
                    className="w-32 h-6 rounded-md bg-gradient-to-r from-[#ffd700] via-[#f1d98a] to-[#a8821f] border border-[#fff2cc] shadow-[0_4px_12px_rgba(0,0,0,0.5)] flex items-center justify-between px-3 text-[10px] font-mono font-bold text-[#04170f]"
                    style={{
                      transform: `translateZ(${idx * 12}px)`,
                    }}
                  >
                    <span>VAIDIK</span>
                    <span>{purity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute bottom-2 inset-x-0 text-center">
              <span className="text-[10px] font-mono text-[#a8b6af] uppercase tracking-widest">
                {weight}g • {purity} 100% BIS Hallmarked Bullion
              </span>
            </div>
          </div>

          {/* Receipt Header */}
          <div className="border-b border-white/10 pb-4 mb-4">
            <span className="text-[10px] font-mono text-[#d4af37] uppercase tracking-widest block font-semibold">
              Live Studio Quotation
            </span>
            <h4 className="font-serif text-2xl text-white font-normal mt-0.5">
              {weight}g &bull; {purity} Gold Jewellery
            </h4>
            <span className="text-xs text-[#a8b6af] block mt-0.5 font-mono">
              Benchmark rate: ₹{currentRate.toLocaleString("en-IN")}/g
            </span>
          </div>

          {/* Math Breakdown Lines */}
          <div className="space-y-3 text-xs text-[#c8d4cf]">
            <div className="flex items-center justify-between">
              <span>Pure Gold ({weight}g &times; ₹{currentRate}):</span>
              <span className="font-mono font-semibold text-white">
                ₹{goldValue.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Making Charges ({makingChargePct}%):</span>
              <span className="font-mono text-[#f1d98a]">
                ₹{makingCharges.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Govt. GST (3% statutory):</span>
              <span className="font-mono text-white">
                ₹{gst.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="border-t-2 border-dashed border-[#d4af37]/40 pt-4 mt-4 flex items-baseline justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-[#f1d98a] block font-mono">
                  Total Studio Valuation:
                </span>
                <span className="text-[10px] text-[#a8b6af] block font-mono">
                  Exact net weight weighed before you
                </span>
              </div>
              <div className="text-right">
                <span className="font-mono text-2xl sm:text-3xl font-bold text-white block leading-tight">
                  <RollingNumber value={totalEstimate} prefix="₹" />
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-6 space-y-3">
            <a
              href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#14502f] hover:bg-[#1a663c] border border-[#d4af37]/50 text-white font-mono text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>Discuss Quotation on WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={() => setRateLockOpen(true)}
              className="w-full bg-gold-gradient text-[#04170f] font-mono font-bold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 hover:brightness-105 active:scale-[0.98] transition-all shadow-lg cursor-pointer gold-shimmer-sweep"
            >
              <Lock className="w-4 h-4" />
              <span>Lock Today&apos;s Rate (48 Hours)</span>
            </button>
          </div>

          {/* Footnote */}
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-1.5 text-[10px] font-mono text-[#a8b6af]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Digital Scale Guarantee: Net gold weighed separately from gems</span>
          </div>
        </div>
      </div>

      {/* Rate Lock Modal */}
      <RateLockModal
        isOpen={rateLockOpen}
        onClose={() => setRateLockOpen(false)}
        initialKarat={purity === "14K" ? "18K" : purity}
        rates={{
          gold24k: rates["24K"],
          gold22k: rates["22K"],
          silver: initialRates?.silver || 98,
        }}
      />
    </div>
  );
}
