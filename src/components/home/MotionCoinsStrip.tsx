"use client";

import React, { useState } from "react";
import { ShieldCheck, Award, Scale, Gem } from "lucide-react";

const COINS = [
  { id: "gen", label: "Est. 3 Generations", subtitle: "1964 Heritage", icon: Award },
  { id: "huid", label: "Govt. 6-Digit HUID", subtitle: "BIS Care App", icon: ShieldCheck },
  { id: "scale", label: "Certified Digital Scales", subtitle: "0% Hidden Lac", icon: Scale },
  { id: "gem", label: "Untreated Natural Ratna", subtitle: "Govt. Lab Certified", icon: Gem },
];

export function MotionCoinsStrip() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="w-full py-4 flex items-center justify-center gap-6 sm:gap-12 flex-wrap">
      {COINS.map((coin, idx) => {
        const isHovered = hoveredIndex === idx;
        const Icon = coin.icon;

        return (
          <div
            key={coin.id}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="group relative flex items-center gap-3.5 cursor-pointer [perspective:800px]"
          >
            {/* 3D Animated Gold Medallion */}
            <div
              className={`relative w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-[#a8821f] via-[#f6e7b4] to-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.25)] transition-all duration-500 ease-out ${
                isHovered ? "scale-110 shadow-[0_0_25px_rgba(212,175,55,0.5)] rotate-y-180" : ""
              }`}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Inner Medallion Cavity */}
              <div className="w-full h-full rounded-full bg-[#04170f] flex items-center justify-center border border-[#d4af37]/40">
                <Icon className="w-5 h-5 text-[#f1d98a] group-hover:text-[#ffd700] transition-colors" />
              </div>

              {/* Shimmer sweep ring */}
              <div className="absolute inset-0 rounded-full border border-white/20 animate-pulse pointer-events-none" />
            </div>

            {/* Medallion Text */}
            <div className="text-left">
              <span className="text-xs font-serif text-[#f6e7b4] tracking-wide block font-medium group-hover:text-white transition-colors">
                {coin.label}
              </span>
              <span className="text-[10px] font-mono text-[#a8b6af] block tracking-wider uppercase">
                {coin.subtitle}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
