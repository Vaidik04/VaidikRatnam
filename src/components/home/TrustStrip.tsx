"use client";

import React from "react";
import { ShieldCheck, Scale, Award, Gem } from "lucide-react";
import { Marquee } from "@/components/ui/Marquee";
import { MotionCoinsStrip } from "./MotionCoinsStrip";

const TRUST_STATS = [
  {
    num: "3",
    suffix: "Generations",
    label: "Hereditary Varanasi & Jaipur Goldsmiths",
    icon: Award,
  },
  {
    num: "100",
    suffix: "%",
    label: "BIS Hallmarked with 6-Digit Laser HUID",
    icon: ShieldCheck,
  },
  {
    num: "0",
    suffix: "%",
    label: "Hidden Weight Deductions • Digital Scale Honesty",
    icon: Scale,
  },
  {
    num: "100",
    suffix: "%",
    label: "Certified Untreated Earth-Mined Ratnas",
    icon: Gem,
  },
];

const TRUST_BADGES = [
  "100% BIS HALLMARKED 916 GOLD",
  "6-DIGIT LASER HUID VERIFIABLE",
  "IN-HOUSE HEREDITARY KARIGARS",
  "UNHEATED NATURAL RATNAS ONLY",
  "NET WEIGHT DIGITAL SCALE BILLING",
  "NON-FEAR PARASHARI JYOTISH",
  "GOVERNMENT APPROVED ASSAY TESTING",
];

export function TrustStrip() {
  return (
    <section className="relative bg-[#04170f] border-b border-[#d4af37]/25 text-white overflow-hidden py-12">
      {/* Background radial gold glow */}
      <div className="absolute inset-0 bg-radial from-[#0a2a1d] via-[#04170f] to-[#04170f] pointer-events-none opacity-80" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top 3D Animated Motion Medallions */}
        <div className="mb-8">
          <MotionCoinsStrip />
        </div>

        {/* 4 Stately Verified Counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-4 border-y border-[#d4af37]/20">
          {TRUST_STATS.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center sm:items-start text-center sm:text-left p-4 rounded-xl bg-[#0a2a1d]/40 border border-[#d4af37]/15 group hover:border-[#d4af37]/50 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2 text-[#d4af37]">
                  <Icon className="w-4 h-4" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#a8b6af]">
                    Authenticity Pillar
                  </span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gold-gradient">
                    {s.num}
                  </span>
                  <span className="font-serif text-xl sm:text-2xl text-[#f1d98a]">
                    {s.suffix}
                  </span>
                </div>
                <p className="text-xs text-[#a8b6af] mt-1 font-light leading-snug">
                  {s.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Continuous Luxury Marquee */}
        <div className="mt-8 pt-4">
          <Marquee speedSec={35} className="text-xs font-mono tracking-[0.25em] text-[#d4af37] uppercase">
            {TRUST_BADGES.map((b, i) => (
              <span key={i} className="inline-flex items-center gap-6 mx-4">
                <span>{b}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]/60" />
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}

