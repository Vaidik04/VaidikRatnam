"use client";

import React, { useState } from "react";
import { ChevronDown, Sparkles, AlertCircle } from "lucide-react";

interface PlanetResult {
  name: string;
  devanagariName: string;
  house: number;
  sign: string;
  isRetrograde: boolean;
  status: "Exalted" | "Debilitated" | "Own House" | "Friendly" | "Neutral" | "Inimical";
  interpretation: string;
  reviewed: boolean;
}

interface PlanetAccordionProps {
  planets: PlanetResult[];
  className?: string;
}

export function PlanetAccordion({
  planets,
  className = "",
}: PlanetAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={`space-y-3 ${className}`}>
      {planets.map((p, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={p.name}
            className="border border-[#d4af37]/25 rounded-xl bg-[#0a2a1d]/60 overflow-hidden transition-all duration-300"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="w-full p-4 flex items-center justify-between text-left cursor-pointer hover:bg-[#0a2a1d] transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#04170f] border border-[#d4af37]/40 text-[#f1d98a] flex items-center justify-center font-serif text-sm font-bold">
                  {p.house}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-base sm:text-lg text-white font-medium">
                      {p.name}
                    </span>
                    <span className="font-serif text-xs text-[#d4af37] tracking-wider">
                      ({p.devanagariName})
                    </span>
                    {p.isRetrograde && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        Vakri (R)
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-[#a8b6af]">
                    House {p.house} • {p.sign} • {p.status}
                  </span>
                </div>
              </div>

              <ChevronDown
                className={`w-5 h-5 text-[#d4af37] transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isOpen && (
              <div className="p-4 pt-0 border-t border-white/5 bg-[#04170f]/40">
                <div className="mt-3 text-sm text-[#e2ece7] leading-relaxed">
                  {p.interpretation}
                </div>
                {!p.reviewed && (
                  <div className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-mono text-amber-300/80 bg-amber-500/10 px-2.5 py-1 rounded-sm border border-amber-500/20">
                    <AlertCircle className="w-3 h-3" />
                    <span>[CONTENT PENDING SCHOLARLY REVIEW]</span>
                  </div>
                )}
                <div className="mt-3 flex items-center gap-2 text-[11px] font-mono text-[#a8b6af]">
                  <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Authority: 1952 Gutka Edition (Pt. Roop Chand Joshi)</span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
