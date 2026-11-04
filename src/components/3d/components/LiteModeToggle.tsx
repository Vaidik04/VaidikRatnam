"use client";

import React from "react";
import { use3DCapability } from "../context/CapabilityContext";
import { Sparkles, EyeOff } from "lucide-react";

export function LiteModeToggle({ className = "" }: { className?: string }) {
  const { liteMode, setLiteMode, tier } = use3DCapability();

  return (
    <button
      type="button"
      onClick={() => setLiteMode(!liteMode)}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-wider transition-all border cursor-pointer ${
        liteMode
          ? "bg-[#d4af37]/15 text-[#f3e5ab] border-[#d4af37]/40 hover:bg-[#d4af37]/25"
          : "bg-black/30 text-[#a8b6af] border-white/10 hover:border-[#d4af37]/40 hover:text-white"
      } ${className}`}
      title={liteMode ? "Switch to 3D Real-Time Visuals" : "Switch to 2D Lite Mode (Lower battery & bandwidth)"}
    >
      {liteMode ? (
        <>
          <EyeOff className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>Lite Mode (3D Off)</span>
        </>
      ) : (
        <>
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37] animate-pulse" />
          <span>Real-time 3D ({tier})</span>
        </>
      )}
    </button>
  );
}
