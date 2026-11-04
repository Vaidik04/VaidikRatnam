"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, Sparkles, ShieldCheck, ArrowRight, HelpCircle } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function LalKitabHero({ onStartWizard }: { onStartWizard: () => void }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#04170F] via-[#0A2A1D] to-[#04170F] text-[#FAF7F0] pt-28 sm:pt-36 pb-20 border-b border-[#8E1B2E]/40">
      {/* Background Sacred Ambience & Ruby Glass Halo */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-radial from-[#8E1B2E]/20 via-[#D4AF37]/10 to-transparent pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-radial from-[#0F3A28]/40 to-transparent pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Authentic Tradition Charter */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8E1B2E]/20 border border-[#8E1B2E]/60 text-[#F6E7B4] text-xs font-mono uppercase tracking-widest">
              <BookOpen className="w-3.5 h-3.5 text-[#F1D98A]" />
              <span>Authentic 1952 Gutka Reference &bull; Lal Kitab Jyotish</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal leading-tight">
              Karmic Harmony &amp;{" "}
              <span className="italic text-gold-gradient block font-serif">
                Gentle Classical Remedies
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#FAF7F0]/85 font-light leading-relaxed max-w-2xl">
              Unlike classical Parashari Jyotish which focuses on ascendant lordship, <strong>Lal Kitab</strong> evaluates your horoscope on a fixed Kal Purush framework. It offers straightforward, ethical, and practical life practices without fear or costly rituals.
            </p>

            {/* Core Honest Principles (Never Fear-Based) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="caution-ruby-glass p-3.5 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#F1D98A] shrink-0 mt-0.5" />
                <span className="text-xs text-[#FAF7F0]/90 leading-snug">
                  <strong>Zero Fear Framing:</strong> Traditional karmic guidance, never scary or fatalistic predictions.
                </span>
              </div>

              <div className="caution-ruby-glass p-3.5 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#F1D98A] shrink-0 mt-0.5" />
                <span className="text-xs text-[#FAF7F0]/90 leading-snug">
                  <strong>Safe Remedies:</strong> Natural 43-day daily habits and charity. Gemstones are not the default.
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <MagneticButton
                onClick={onStartWizard}
                variant="gold"
                className="w-full sm:w-auto px-8 py-3.5 text-xs tracking-[0.2em]"
              >
                <span>Calculate Your Lal Kitab Kundali</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>

              <Link href="/jyotish/lal-kitab/methods" className="w-full sm:w-auto">
                <button
                  type="button"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xs border border-[#D4AF37]/50 text-[#F1D98A] hover:bg-[#D4AF37]/10 text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Methods &amp; Sources</span>
                </button>
              </Link>
            </div>
          </div>

          {/* Right Column: 3D Gold-Embossed Red Book Emblem */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-64 h-84 sm:w-72 sm:h-96 rounded-r-md bg-gradient-to-r from-[#59101C] via-[#8E1B2E] to-[#4D0D17] border-2 border-[#D4AF37] shadow-[0_20px_50px_rgba(142,27,46,0.5)] p-6 flex flex-col justify-between transform -rotate-3 hover:rotate-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] select-none">
              {/* Gold Filigree Spine & Corner Brackets */}
              <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]" />
              <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37]" />
              <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-[#D4AF37]" />
              <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37]" />

              <div className="text-center pt-6">
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#F1D98A] block mb-2">
                  1952 Gutka Edition
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-[#F6E7B4] tracking-widest font-normal uppercase">
                  लाल किताब
                </h3>
                <span className="text-xs uppercase font-serif tracking-[0.2em] text-white/80 block mt-1">
                  Lal Kitab
                </span>
              </div>

              {/* Center Diamond Yantra */}
              <div className="w-24 h-24 mx-auto rounded-full border border-[#D4AF37]/50 flex items-center justify-center p-2 shadow-inner">
                <div className="w-18 h-18 transform rotate-45 border border-[#F1D98A] flex items-center justify-center">
                  <span className="transform -rotate-45 font-serif text-lg text-[#F6E7B4]">&diams;</span>
                </div>
              </div>

              <div className="text-center pb-4 border-t border-[#D4AF37]/30 pt-3">
                <span className="text-[10px] font-mono text-[#F1D98A] block">
                  Reviewed by Vaidik Ratnam Scholars
                </span>
                <span className="text-[9px] text-white/60 font-sans block mt-0.5">
                  Astronomical Ephemeris &bull; Lahiri Ayanamsa
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

