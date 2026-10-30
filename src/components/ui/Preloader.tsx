"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { T } from "@/design/tokens";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Force at least 2 seconds duration for cinematic effect
    const timer = setTimeout(() => {
      setLoading(false);
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-[#04170f] flex items-center justify-center pointer-events-none">
      {/* VR Monogram SVG Drawing Animation */}
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Simple SVG stroke draw - the monogram */}
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#d4af37] fill-none stroke-[2]">
          <path
            d="M20 20 L50 80 L80 20"
            strokeDasharray="200"
            strokeDashoffset="200"
            className="animate-draw-monogram"
          />
        </svg>

        {/* Glow behind monogram */}
        <div className="absolute inset-0 bg-[#d4af37]/20 blur-2xl rounded-full" />
      </div>

      <style jsx global>{`
        @keyframes drawMonogram {
          0% { stroke-dashoffset: 200; }
          100% { stroke-dashoffset: 0; }
        }
        .animate-draw-monogram {
          animation: drawMonogram 1.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}