"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { ShieldCheck, Gem, Sun } from "lucide-react";

interface PillarMotionGraphicsProps {
  pillarId: string;
}

export function PillarMotionGraphics({ pillarId }: PillarMotionGraphicsProps) {
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotX(((y - centerY) / centerY) * -10);
    setRotY(((x - centerX) / centerX) * 10);
  };

  const handleMouseLeave = () => {
    setRotX(0);
    setRotY(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden [perspective:1000px] select-none"
    >
      {/* 3D Motion Stage */}
      <div
        className="relative w-full h-full rounded-2xl overflow-hidden border border-[#d4af37]/40 bg-radial from-[#0a2a1d] via-[#04170f] to-[#020b07] shadow-xl transition-transform duration-200 ease-out flex items-center justify-center"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
        }}
      >
        {/* Background Rotating Cosmic Aura */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
          <div className="w-80 h-80 animate-spin-slow">
            <Image
              src="/images/brand/element-astrology-circle-transparent.png"
              alt="Sacred Chakra"
              width={320}
              height={320}
              className="w-full h-full object-contain filter invert opacity-80"
            />
          </div>
        </div>

        {/* Ambient Pulsing Light Center */}
        <div className="absolute inset-0 bg-radial from-[#d4af37]/15 via-transparent to-transparent pointer-events-none" />

        {/* Specific Pillar Visuals */}
        {pillarId === "purity" && (
          <div className="relative z-10 flex flex-col items-center text-center p-4" style={{ transform: "translateZ(30px)" }}>
            <div className="relative w-24 h-24 mb-3 flex items-center justify-center">
              {/* Pulsing Concentric Gold Rings */}
              <div className="absolute inset-0 rounded-full border border-[#d4af37]/40 animate-ping-slow" />
              <div className="absolute inset-2 rounded-full border-2 border-dashed border-[#f1d98a]/60 animate-spin-slow" />
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#d4af37] via-[#f6e7b4] to-[#a8821f] p-0.5 shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                <div className="w-full h-full rounded-full bg-[#04170f] flex items-center justify-center">
                  <Image
                    src="/images/brand/element-lotus-transparent.png"
                    alt="Sacred Temple Lotus"
                    width={36}
                    height={36}
                    className="object-contain filter drop-shadow-[0_0_8px_#ffd700]"
                  />
                </div>
              </div>
            </div>
            <span className="text-xs font-serif text-[#f6e7b4] tracking-wider uppercase font-semibold">
              Temple Sanctum Discipline
            </span>
            <span className="text-[10px] font-mono text-[#a8b6af] mt-1">
              Molten &amp; Chased Before Digital Scales
            </span>
          </div>
        )}

        {pillarId === "illumination" && (
          <div className="relative z-10 flex flex-col items-center text-center p-4" style={{ transform: "translateZ(30px)" }}>
            <div className="relative w-24 h-24 mb-3 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-[#ffd700]/30 animate-pulse" />
              <div className="absolute inset-1 rounded-full border border-dashed border-[#d4af37]/60 animate-spin-reverse" />
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#ffd700] via-[#f1d98a] to-[#d4af37] p-0.5 shadow-[0_0_30px_rgba(255,215,0,0.35)]">
                <div className="w-full h-full rounded-full bg-[#04170f] flex items-center justify-center">
                  <Sun className="w-8 h-8 text-[#f6e7b4] animate-spin-slow" />
                </div>
              </div>
            </div>
            <span className="text-xs font-serif text-[#f6e7b4] tracking-wider uppercase font-semibold">
              Parashari Jyotish Principles
            </span>
            <span className="text-[10px] font-mono text-[#a8b6af] mt-1">
              Ethical Non-Fear Astrological Truth
            </span>
          </div>
        )}

        {pillarId === "gemstones" && (
          <div className="relative z-10 flex flex-col items-center text-center p-4" style={{ transform: "translateZ(30px)" }}>
            <div className="relative w-24 h-24 mb-3 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-[#10b981]/40 animate-ping-slow" />
              <div className="w-16 h-16 rounded-2xl rotate-45 bg-gradient-to-tr from-[#0f7a4a] via-[#10b981] to-[#34d399] p-0.5 shadow-[0_0_35px_rgba(16,185,129,0.45)]">
                <div className="w-full h-full rounded-2xl bg-[#04170f] flex items-center justify-center -rotate-45">
                  <Gem className="w-8 h-8 text-[#10b981] drop-shadow-[0_0_10px_#10b981]" />
                </div>
              </div>
            </div>
            <span className="text-xs font-serif text-[#f6e7b4] tracking-wider uppercase font-semibold">
              Zero Synthetic Enhancements
            </span>
            <span className="text-[10px] font-mono text-[#a8b6af] mt-1">
              Certified Earth-Mined Natural Ratnas
            </span>
          </div>
        )}

        {pillarId === "hallmarking" && (
          <div className="relative z-10 flex flex-col items-center text-center p-4" style={{ transform: "translateZ(30px)" }}>
            <div className="relative w-24 h-24 mb-3 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-[#d4af37]/40 animate-pulse" />
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#d4af37] via-[#f1d98a] to-[#a8821f] p-0.5 shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                <div className="w-full h-full rounded-full bg-[#04170f] flex items-center justify-center">
                  <ShieldCheck className="w-8 h-8 text-[#d4af37] drop-shadow-[0_0_10px_#ffd700]" />
                </div>
              </div>
            </div>
            <span className="text-xs font-serif text-[#f6e7b4] tracking-wider uppercase font-semibold">
              100% BIS 6-Digit HUID
            </span>
            <span className="text-[10px] font-mono text-[#a8b6af] mt-1">
              Verifiable Instantly on BIS Care App
            </span>
          </div>
        )}

        {/* Specular Light Sweep Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer pointer-events-none" />
      </div>
    </div>
  );
}
