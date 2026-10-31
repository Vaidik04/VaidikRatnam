"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Scale,
  Gem,
  Calculator,
} from "lucide-react";

interface HeroProps {
  rates?: {
    gold24k?: number;
    gold22k?: number;
    silver?: number;
  };
}

export function Hero({ rates }: HeroProps = {}) {
  const gold24k = rates?.gold24k || 8150;
  const gold22k = rates?.gold22k || 7470;
  const silver = rates?.silver || 98;

  return (
    <section className="relative overflow-hidden bg-[#08241B] text-[#F9F5EB] pt-10 pb-16 lg:py-20 border-b border-[#D4AF37]/30">
      {/* Background Ambience: Subtle Radial Glows & Filigree */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-radial from-[#D4AF37]/10 via-[#18523F]/20 to-transparent pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-radial from-[#18523F]/30 to-transparent pointer-events-none -z-0" />

      {/* Rotating Background Astrology Cosmic Circle */}
      <div className="absolute -right-20 lg:right-10 top-1/2 -translate-y-1/2 w-[420px] lg:w-[620px] h-[420px] lg:h-[620px] opacity-10 pointer-events-none animate-spin-slow">
        <Image
          src="/images/brand/element-astrology-circle-transparent.png"
          alt="Astrology Cosmic Wheel"
          width={620}
          height={620}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column (Editorial Content - 7 cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            
            {/* Sacred Eyebrow Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0F3D2E]/80 border border-[#D4AF37]/40 shadow-xs">
              <div className="w-4 h-4 relative">
                <Image
                  src="/images/brand/element-lotus-transparent.png"
                  alt="Lotus"
                  width={16}
                  height={16}
                  className="object-contain"
                />
              </div>
              <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#F3E5AB]">
                Traditional Indian Family Jewellery &bull; Est. 3 Generations
              </span>
            </div>

            {/* Main Editorial Headline */}
            <div className="space-y-2">
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.12]">
                Where Sacred Indian Craft Meets{" "}
                <span className="text-gold-gradient font-serif italic block mt-1">
                  Pure Goldsmithing
                </span>
              </h1>
              <p className="font-serif italic text-[#D4AF37] text-lg sm:text-xl font-light">
                Timeless Jewellery &bull; Guided by Wisdom
              </p>
            </div>

            {/* Narrative Explanation */}
            <p className="text-sm sm:text-base text-[#DDE5DC] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              We are a multi-generational family shop, not a corporate chain. Sit with our karigars, view natural certified Ratna under daylight, and watch your 100% BIS Hallmarked 22K/18K gold weighed before your eyes on certified digital scales.
            </p>

            {/* Live Studio Bullion Rate Ticker Card */}
            <div className="p-4 rounded-xs bg-[#0F3D2E]/60 border border-[#D4AF37]/30 backdrop-blur-md max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-[11px]">
                <span className="flex items-center gap-1.5 font-semibold text-[#F3E5AB] uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-[#48BB78] animate-pulse" />
                  Today&apos;s Live Bullion Benchmark
                </span>
                <Link
                  href="/tools/gold-budget-estimator"
                  className="text-[10px] text-[#D4AF37] hover:underline flex items-center gap-1"
                >
                  <Calculator className="w-3 h-3" />
                  Open Gold Estimator
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 rounded-xs bg-black/20">
                  <span className="block text-[10px] text-[#A8B6AF] uppercase tracking-wider font-mono">24K Bullion</span>
                  <span className="font-mono text-sm sm:text-base font-bold text-[#F3E5AB]">₹{gold24k.toLocaleString("en-IN")}<span className="text-[10px] text-[#D4AF37]">/g</span></span>
                </div>
                <div className="p-2 rounded-xs bg-black/20 border border-[#D4AF37]/30">
                  <span className="block text-[10px] text-[#D4AF37] uppercase tracking-wider font-mono font-semibold">22K 916 BIS</span>
                  <span className="font-mono text-sm sm:text-base font-bold text-white">₹{gold22k.toLocaleString("en-IN")}<span className="text-[10px] text-[#D4AF37]">/g</span></span>
                </div>
                <div className="p-2 rounded-xs bg-black/20">
                  <span className="block text-[10px] text-[#A8B6AF] uppercase tracking-wider font-mono">925 Silver</span>
                  <span className="font-mono text-sm sm:text-base font-bold text-[#DDE5DC]">₹{silver.toLocaleString("en-IN")}<span className="text-[10px] text-[#D4AF37]">/g</span></span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link href="/jewellery" className="w-full sm:w-auto">
                <button
                  type="button"
                  className="btn-gold-pure w-full sm:w-auto px-8 py-3.5 rounded-xs text-xs uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-xl transition-all"
                >
                  <span>Explore Jewellery</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/custom-design" className="w-full sm:w-auto">
                <button
                  type="button"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xs text-xs uppercase tracking-[0.2em] font-semibold border border-[#D4AF37] text-[#F3E5AB] hover:bg-[#D4AF37]/15 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span>Custom Karigari Studio</span>
                </button>
              </Link>
            </div>

            {/* Trust Chips Row */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs text-[#A8B6AF]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>100% BIS Hallmarked (6-Digit HUID)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Gem className="w-4 h-4 text-[#D4AF37]" />
                <span>Certified Untreated Ratna</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-[#D4AF37]" />
                <span>Digital Scale Weight Guarantee</span>
              </div>
            </div>

          </div>

          {/* Right Column (Asymmetric Visual Editorial Staging - 5 cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Ambient Back Glow */}
            <div className="absolute inset-0 bg-[#D4AF37]/15 rounded-full blur-3xl transform -rotate-6 scale-90" />

            {/* Main Luxury Frame */}
            <div className="relative w-full max-w-md rounded-t-full rounded-b-lg border-2 border-[#D4AF37]/50 p-2.5 bg-[#0F3D2E]/90 shadow-2xl backdrop-blur-md">
              <div className="relative aspect-4/5 w-full rounded-t-full rounded-b-md overflow-hidden bg-black/40">
                <Image
                  src="/images/hero-jewellery.jpg"
                  alt="Vaidik Ratnam Handcrafted 22K Temple Jewellery"
                  fill
                  priority
                  className="object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 500px"
                />

                {/* Subtle vignette on photo */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#08241B]/80 via-transparent to-transparent pointer-events-none" />

                {/* Floating Crest Inside Photo */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-16 h-16 p-1 rounded-full bg-[#08241B]/90 border border-[#D4AF37]/80 shadow-xl backdrop-blur-md flex items-center justify-center overflow-hidden">
                  <Image
                    src="/images/brand/app-icon-emerald-256.png"
                    alt="VR Monogram"
                    width={56}
                    height={56}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>

              {/* Floating Trust Card (Bottom Overlay) */}
              <div className="absolute -bottom-6 left-4 right-4 p-3.5 rounded-xs bg-[#0F3D2E] border border-[#D4AF37] shadow-2xl flex items-center gap-3 backdrop-blur-md">
                <div className="w-10 h-10 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div className="flex-1">
                  <strong className="text-xs font-serif text-[#F3E5AB] tracking-wide block">
                    Govt. BIS Hallmarked
                  </strong>
                  <span className="text-[10px] text-[#DDE5DC] block">
                    Verify the 6-digit HUID code with the BIS Care App
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
