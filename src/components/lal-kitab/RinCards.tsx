"use client";

import React from "react";
import { ShieldCheck, Heart, Sparkles, Feather } from "lucide-react";

interface RinItem {
  id: string;
  name: string;
  cause: string;
  remedy: string;
}

interface RinCardsProps {
  rins: RinItem[];
}

export function RinCards({ rins }: RinCardsProps) {
  if (rins.length === 0) {
    return (
      <div className="bg-[#04170F] border border-[#D4AF37]/40 rounded-xs p-6 text-center">
        <div className="w-12 h-12 rounded-full bg-[#14502F]/30 border border-[#D4AF37]/50 flex items-center justify-center mx-auto mb-3">
          <ShieldCheck className="w-6 h-6 text-[#48BB78]" />
        </div>
        <h4 className="font-serif text-lg text-[#F6E7B4] font-medium">
          Zero Major Karmic Debts Detected
        </h4>
        <p className="text-xs text-[#A8B6AF] mt-1.5 max-w-md mx-auto leading-relaxed">
          Your Lal Kitab chart does not trigger any classical Rin conditions (Pitri, Matri, Stri, or Swayam Rin). Continue practicing daily gratitude, honesty, and family harmony.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 border-b border-[#D4AF37]/25 pb-2">
        <Feather className="w-4 h-4 text-[#D4AF37]" />
        <h3 className="font-serif text-xl text-[#F6E7B4] font-normal">
          Classical Rin (Karmic Debt) Analysis
        </h3>
      </div>
      <p className="text-xs text-[#A8B6AF] leading-relaxed">
        In Lal Kitab, &ldquo;Rin&rdquo; represents ancestral obligations or unfinished past-life duties that can be peacefully resolved through voluntary acts of kindness, charity, and ethical family conduct.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        {rins.map((r) => (
          <div
            key={r.id}
            className="caution-ruby-glass p-5 rounded-xs space-y-3 relative overflow-hidden"
          >
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-full bg-[#8E1B2E]/30 border border-[#D4AF37]/50 text-[#F1D98A]">
                <Heart className="w-4 h-4 text-[#D4AF37]" />
              </span>
              <h4 className="font-serif text-base text-[#F6E7B4] font-semibold">
                {r.name}
              </h4>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#A8B6AF] block">
                Ancestral Causation:
              </span>
              <p className="text-xs text-[#FAF7F0]/90 mt-0.5 leading-snug">
                {r.cause}
              </p>
            </div>

            <div className="pt-2 border-t border-white/10">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#F1D98A] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                Safe Traditional Resolution:
              </span>
              <p className="text-xs text-[#F6E7B4] mt-1 leading-relaxed font-light">
                {r.remedy}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
