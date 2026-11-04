"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatedLogo } from "@/components/brand/AnimatedLogo";

const ViewPortal = dynamic(
  () => import("@/components/3d/canvas/ViewPortal").then((m) => m.ViewPortal),
  { ssr: false }
);
const Preloader3D = dynamic(
  () => import("@/components/3d/components/Preloader3D").then((m) => m.Preloader3D),
  { ssr: false }
);

export function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [loading, setLoading] = useState(true);
  const [splitting, setSplitting] = useState(false);

  useEffect(() => {
    // Run once per browser session
    try {
      const hasPreloaded = sessionStorage.getItem("vaidik_ratnam_preloaded");
      if (hasPreloaded) {
        queueMicrotask(() => setLoading(false));
        onComplete?.();
        return;
      }
    } catch {
      // ignore security restrictions
    }

    // 1. Monogram strokes in & 3D light catches for 1400ms
    // 2. At 1400ms, split like temple doors
    const splitTimer = setTimeout(() => {
      setSplitting(true);
    }, 1400);

    // 3. Remove preloader from DOM at 2100ms
    const endTimer = setTimeout(() => {
      setLoading(false);
      try {
        sessionStorage.setItem("vaidik_ratnam_preloaded", "true");
      } catch {
        // ignore
      }
      onComplete?.();
    }, 2100);

    return () => {
      clearTimeout(splitTimer);
      clearTimeout(endTimer);
    };
  }, [onComplete]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[999] pointer-events-none select-none overflow-hidden">
      {/* Left Temple Door Panel */}
      <div
        className={`absolute top-0 bottom-0 left-0 w-1/2 bg-[#04170F] border-r border-[#D4AF37]/50 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] z-10 ${
          splitting ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="absolute inset-0 bg-radial from-[#0A2A1D]/40 to-transparent pointer-events-none" />
      </div>

      {/* Right Temple Door Panel */}
      <div
        className={`absolute top-0 bottom-0 right-0 w-1/2 bg-[#04170F] border-l border-[#D4AF37]/50 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] z-10 ${
          splitting ? "translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="absolute inset-0 bg-radial from-[#0A2A1D]/40 to-transparent pointer-events-none" />
      </div>

      {/* Center Sacred Monogram & Crest Content */}
      <div
        className={`absolute inset-0 z-20 flex flex-col items-center justify-center max-w-sm mx-auto px-6 text-center transition-all duration-500 ${
          splitting ? "opacity-0 scale-105" : "opacity-100 scale-100"
        }`}
      >
        {/* Animated VR Monogram Emblem */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center mb-6">
          <div className="absolute inset-0 rounded-full border border-[#D4AF37]/30 animate-ping-slow scale-110 pointer-events-none" />
          <div className="absolute inset-0 rounded-full border border-[#D4AF37]/60 shadow-[0_0_35px_rgba(212,175,55,0.25)] pointer-events-none" />

          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden p-1 bg-[#04170F] border border-[#D4AF37]">
            <ViewPortal
              cameraPosition={[0, 0, 4]}
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <AnimatedLogo variant="gold-on-dark" size="md" showLockup={false} />
                </div>
              }
            >
              <Preloader3D />
            </ViewPortal>
          </div>
        </div>

        {/* Brand Name & Identity */}
        <div className="space-y-2">
          <h1 className="font-serif text-2xl sm:text-3xl tracking-[0.24em] text-gold-gradient font-medium leading-none">
            VAIDIK RATNAM
          </h1>
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-[#D4AF37] font-mono">
            Jewellery &bull; Gemstones &bull; Astrology
          </p>

          {/* Hairline Divider with Diamond */}
          <div className="gold-divider-diamond text-[#D4AF37] my-3 max-w-[200px] mx-auto">
            <span className="text-[10px]">&diams;</span>
          </div>

          <p className="text-xs text-[#FAF7F0]/70 italic font-serif tracking-wider">
            Timeless Jewellery &bull; Guided by Wisdom
          </p>
        </div>

        {/* Shimmering Gold Progress Line */}
        <div className="w-48 h-[2px] bg-white/10 rounded-full mt-8 overflow-hidden relative">
          <div className="h-full bg-gradient-to-r from-[#A8821F] via-[#F1D98A] to-[#A8821F] animate-shimmer-load rounded-full" />
        </div>
      </div>

      <style jsx global>{`
        @keyframes pingSlow {
          0%, 100% {
            transform: scale(0.96);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.12);
            opacity: 0.25;
          }
        }
        @keyframes shimmerLoad {
          0% {
            width: 0%;
            margin-left: 0%;
          }
          50% {
            width: 70%;
            margin-left: 15%;
          }
          100% {
            width: 100%;
            margin-left: 0%;
          }
        }
        .animate-ping-slow {
          animation: pingSlow 2.8s ease-in-out infinite;
        }
        .animate-shimmer-load {
          animation: shimmerLoad 1.4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
