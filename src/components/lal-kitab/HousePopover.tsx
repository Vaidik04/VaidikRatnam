"use client";

import React from "react";
import { X, Sparkles } from "lucide-react";

interface HousePopoverProps {
  houseNumber: number;
  houseMeaning: string;
  signName: string;
  planets: string[];
  isSleeping: boolean;
  onClose?: () => void;
  className?: string;
}

export function HousePopover({
  houseNumber,
  houseMeaning,
  signName,
  planets,
  isSleeping,
  onClose,
  className = "",
}: HousePopoverProps) {
  return (
    <div
      className={`p-5 rounded-xl border border-[#d4af37]/40 bg-[#04170f]/95 backdrop-blur-xl shadow-2xl text-white max-w-xs ${className}`}
    >
      <div className="flex items-center justify-between pb-3 border-b border-[#d4af37]/20 mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#d4af37]" />
          <span className="font-serif text-lg font-bold text-[#f1d98a]">
            House {houseNumber} ({signName})
          </span>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="text-[#a8b6af] hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="space-y-2 text-xs">
        <div>
          <span className="text-[#a8b6af] block uppercase tracking-wider text-[10px]">
            Signification (Karaka):
          </span>
          <span className="text-white font-medium">{houseMeaning}</span>
        </div>

        <div>
          <span className="text-[#a8b6af] block uppercase tracking-wider text-[10px]">
            Occupying Planets:
          </span>
          <span className="text-[#f1d98a] font-mono">
            {planets.length > 0 ? planets.join(", ") : "Empty"}
          </span>
        </div>

        <div className="pt-2 border-t border-white/10 flex items-center justify-between">
          <span className="text-[11px] text-[#a8b6af]">House State:</span>
          <span
            className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
              isSleeping
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
            }`}
          >
            {isSleeping ? "Sleeping (Soya Ghar)" : "Awake (Jaga Ghar)"}
          </span>
        </div>
      </div>
    </div>
  );
}
