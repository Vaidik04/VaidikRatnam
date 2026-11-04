"use client";

import React, { useState } from "react";
import { Calendar, ShieldAlert } from "lucide-react";

interface VarshphalExplorerProps {
  currentAge?: number;
  className?: string;
}

export function VarshphalExplorer({
  currentAge = 32,
  className = "",
}: VarshphalExplorerProps) {
  const [selectedAge, setSelectedAge] = useState<number>(currentAge);

  return (
    <div
      className={`p-6 rounded-2xl border border-[#d4af37]/30 bg-[#0a2a1d]/80 text-white ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#d4af37]/20 mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#d4af37]">
            <Calendar className="w-4 h-4" />
            <span>Lal Kitab Varshphal (Annual Progression)</span>
          </div>
          <h3 className="font-serif text-2xl text-white mt-1">
            Annual Kundali for Age {selectedAge}
          </h3>
        </div>

        {/* Feature Flag Notice */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Needs Scholar Sign-Off Before Public Release</span>
        </div>
      </div>

      {/* Age Selector Slider */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-xs font-mono text-[#a8b6af]">
          <span>Age: 1 Year</span>
          <span className="text-[#f1d98a] font-bold text-sm">
            Selected: Age {selectedAge} (Year {new Date().getFullYear() - currentAge + selectedAge})
          </span>
          <span>Age: 100 Years</span>
        </div>
        <input
          type="range"
          min={1}
          max={100}
          value={selectedAge}
          onChange={(e) => setSelectedAge(Number(e.target.value))}
          className="w-full accent-[#d4af37] cursor-pointer"
        />
      </div>

      {/* Varshphal Explanation & Status */}
      <div className="p-4 rounded-xl border border-white/10 bg-[#04170f]/60 text-xs text-[#a8b6af] space-y-2">
        <p>
          In traditional Lal Kitab methodology, the annual chart (Varshphal) is computed
          by rotating planets according to the cyclical ruler of the year and transit intersections.
        </p>
        <p className="text-white font-mono">
          • Reference Edition: 1952 Gutka Edition (Pt. Roop Chand Joshi)
          <br />
          • Calculation Module: <span className="text-amber-300">Feature Flag [VARSHPHAL_ACTIVE=FALSE]</span>
        </p>
      </div>
    </div>
  );
}

