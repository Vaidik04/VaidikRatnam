"use client";

import React from "react";
import ageCycleData from "@/lib/lal-kitab/data/age-cycle.json";
import { Clock } from "lucide-react";

interface AgeTimelineProps {
  currentAge: number;
}

export function AgeTimeline({ currentAge }: AgeTimelineProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 border-b border-[#D4AF37]/25 pb-2">
        <Clock className="w-4 h-4 text-[#D4AF37]" />
        <h3 className="font-serif text-xl text-[#F6E7B4] font-normal">
          Lal Kitab Planetary Age-Cycle Timeline
        </h3>
      </div>
      <p className="text-xs text-[#A8B6AF] leading-relaxed">
        Lal Kitab assigns distinct lifecycle chapters to each of the nine grahas. The planet ruling your current age of <strong>{currentAge}</strong> governs your primary focus, karma consolidation, and life tests.
      </p>

      {/* Horizontal Scrollable Timeline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
        {ageCycleData.agePeriods.map((period) => {
          const isActive = currentAge >= period.startAge && currentAge <= period.endAge;
          return (
            <div
              key={period.planet}
              className={`p-4 rounded-xs border transition-all ${
                isActive
                  ? "bg-gradient-to-br from-[#14502F]/60 to-[#04170F] border-[#D4AF37] ring-1 ring-[#D4AF37]/50 shadow-lg"
                  : "bg-white/5 border-white/10 opacity-70 hover:opacity-100"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-serif text-base font-medium text-white">
                  {period.planet} ({period.sanskrit})
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                  isActive ? "bg-[#D4AF37] text-[#04170F] font-bold" : "bg-white/10 text-[#A8B6AF]"
                }`}>
                  Age {period.startAge} &ndash; {period.endAge}
                </span>
              </div>
              <p className="text-xs text-[#A8B6AF] leading-snug">
                {period.significance}
              </p>
              {isActive && (
                <div className="mt-3 pt-2 border-t border-[#D4AF37]/30 text-[10px] font-mono uppercase tracking-widest text-[#F1D98A]">
                  &bull; Currently Active Life Cycle &bull;
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

