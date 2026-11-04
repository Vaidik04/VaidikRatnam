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
import { MagneticButton } from "@/components/ui/MagneticButton";
import { RollingNumber } from "@/components/ui/RollingNumber";
import { HeroMotionStage } from "@/components/home/HeroMotionStage";

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
    <section className="relative overflow-hidden bg-[#04170F] text-[#FAF7F0] pt-28 sm:pt-32 lg:pt-36 pb-16 lg:pb-24 border-b border-[#D4AF37]/30">
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
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-[54px] xl:text-[60px] font-normal tracking-tight leading-[1.14]">
                Where Traditional Indian Artistry Meets
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
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0a2a1d]/85 border border-[#d4af37]/40 shadow-2xl backdrop-blur-md max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs font-mono">
                <span className="flex items-center gap-2 text-[#f1d98a] font-semibold tracking-wider uppercase text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
                  Live Bullion Benchmark
                </span>
                <Link
                  href="/tools/gold-budget-estimator"
                  className="text-[#d4af37] hover:text-[#f6e7b4] text-[11px] flex items-center gap-1 transition-colors"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Open Estimator &rarr;</span>
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-xl bg-[#04170f]/80 border border-white/10">
                  <span className="block text-[10px] text-[#a8b6af] uppercase tracking-wider font-mono">24K Bullion</span>
                  <span className="font-mono text-sm sm:text-base font-bold text-[#f1d98a]">
                    <RollingNumber value={gold24k} prefix="₹" />
                    <span className="text-[10px] text-[#d4af37]">/g</span>
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[#04170f]/90 border border-[#d4af37]/50 shadow-inner">
                  <span className="block text-[10px] text-[#d4af37] uppercase tracking-wider font-mono font-semibold">22K 916 BIS</span>
                  <span className="font-mono text-sm sm:text-base font-bold text-white">
                    <RollingNumber value={gold22k} prefix="₹" />
                    <span className="text-[10px] text-[#d4af37]">/g</span>
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[#04170f]/80 border border-white/10">
                  <span className="block text-[10px] text-[#a8b6af] uppercase tracking-wider font-mono">925 Silver</span>
                  <span className="font-mono text-sm sm:text-base font-bold text-[#e2ece7]">
                    <RollingNumber value={silver} prefix="₹" />
                    <span className="text-[10px] text-[#d4af37]">/g</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons with Magnetic Pull & Sparkle Burst */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link href="/jewellery" className="w-full sm:w-auto" data-cursor="View">
                <MagneticButton
                  variant="gold"
                  className="w-full sm:w-auto px-8 py-3.5 text-xs tracking-[0.2em] font-mono uppercase font-bold"
                >
                  <span>Explore Jewellery</span>
                  <ArrowRight className="w-4 h-4" />
                </MagneticButton>
              </Link>
              <Link href="/custom-design" className="w-full sm:w-auto" data-cursor="Craft">
                <MagneticButton
                  variant="outline"
                  className="w-full sm:w-auto px-7 py-3.5 text-xs tracking-[0.2em] font-mono uppercase"
                >
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span>Custom Karigari Studio</span>
                </MagneticButton>
              </Link>
            </div>

            {/* Trust Chips Row */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs font-mono text-[#A8B6AF]">
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

          {/* Right Column (Cinematic 3D Animated Motion Graphics Stage - 5 cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Ambient Deep Radial Backlight */}
            <div className="absolute inset-0 bg-[#D4AF37]/15 rounded-full blur-3xl transform -rotate-6 scale-95 pointer-events-none" />

            {/* 3D Motion Graphics Jewel Stage with 3D Tilt, Parallax Layers & Cursor Glare */}
            <HeroMotionStage />
          </div>

        </div>
      </div>
    </section>
  );
}
