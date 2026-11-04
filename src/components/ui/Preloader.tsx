"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

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
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Start fade-out at 1300ms, remove at 1800ms
    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 1300);

    const endTimer = setTimeout(() => {
      setLoading(false);
      onComplete?.();
    }, 1800);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(endTimer);
    };
  }, [onComplete]);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[999] bg-[#0A241D] flex flex-col items-center justify-center pointer-events-none transition-opacity duration-500 ease-out ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Ambient Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.18)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center animate-fade-in">
        {/* Crest Container with Animated Golden Ring */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center mb-6">
          {/* Subtle Outer Pulsing Halo */}
          <div className="absolute inset-0 rounded-full border border-[#D4AF37]/40 animate-ping-slow scale-110 pointer-events-none" />
          <div className="absolute inset-0 rounded-full border border-[#D4AF37]/60 shadow-[0_0_30px_rgba(212,175,55,0.3)] pointer-events-none" />

          {/* Authentic Vaidik Ratnam 3D Monogram & High-Res Crest Fallback */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden shadow-2xl p-1 bg-[#0F3D2E] border border-[#D4AF37]">
            <ViewPortal
              cameraPosition={[0, 0, 4]}
              fallback={
                <Image
                  src="/images/brand/app-icon-emerald-512.png"
                  alt="Vaidik Ratnam Crest"
                  width={256}
                  height={256}
                  priority
                  className="w-full h-full object-cover rounded-full"
                />
              }
            >
              <Preloader3D />
            </ViewPortal>
          </div>
        </div>

        {/* Brand Name & Identity */}
        <div className="space-y-2">
          <h1 className="font-serif text-2xl sm:text-3xl tracking-[0.22em] text-[#F3E5AB] font-medium leading-none">
            VAIDIK RATNAM
          </h1>
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-[#D4AF37] font-sans font-medium">
            Jewellery &bull; Gemstones &bull; Astrology
          </p>

          {/* Golden Hairline Divider */}
          <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto my-3" />

          <p className="text-[11px] text-[#A8B6AF] italic font-serif tracking-wider">
            Timeless Jewellery &bull; Guided by Wisdom
          </p>
        </div>

        {/* Shimmering Progress Bar */}
        <div className="w-48 h-[2px] bg-white/10 rounded-full mt-8 overflow-hidden relative">
          <div className="h-full bg-gradient-to-r from-[#B59328] via-[#F3E5AB] to-[#B59328] animate-shimmer-load rounded-full" />
        </div>
      </div>

      <style jsx global>{`
        @keyframes pingSlow {
          0% {
            transform: scale(0.95);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.15);
            opacity: 0.3;
          }
          100% {
            transform: scale(0.95);
            opacity: 0.8;
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
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-ping-slow {
          animation: pingSlow 3s ease-in-out infinite;
        }
        .animate-shimmer-load {
          animation: shimmerLoad 1.6s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
