"use client";

import React, { useEffect, useState } from "react";

export function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      onComplete?.();
    }, 1500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-[#0F3D2E] flex items-center justify-center pointer-events-none transition-opacity duration-500">
      <div className="relative w-32 h-32 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#D4AF37] fill-none stroke-[2]">
          <path
            d="M20 20 L50 80 L80 20"
            strokeDasharray="200"
            strokeDashoffset="200"
            className="animate-draw-monogram"
          />
        </svg>
        <div className="absolute inset-0 bg-[#D4AF37]/20 blur-2xl rounded-full" />
      </div>

      <style jsx global>{`
        @keyframes drawMonogram {
          0% { stroke-dashoffset: 200; }
          100% { stroke-dashoffset: 0; }
        }
        .animate-draw-monogram {
          animation: drawMonogram 1.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
