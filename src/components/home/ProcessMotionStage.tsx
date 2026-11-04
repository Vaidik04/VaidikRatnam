"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Hammer, Flame, Gem, FileEdit, ShieldCheck } from "lucide-react";

interface ProcessMotionStageProps {
  activeStep: number;
}

export function ProcessMotionStage({ activeStep }: ProcessMotionStageProps) {
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
    setRotX(((y - centerY) / centerY) * -9);
    setRotY(((x - centerX) / centerX) * 9);
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
      className="relative aspect-square sm:aspect-[4/3] rounded-3xl overflow-hidden [perspective:1200px] select-none"
    >
      <div
        className="relative w-full h-full rounded-3xl overflow-hidden border border-[#d4af37]/40 bg-radial from-[#0a2a1d] via-[#04170f] to-[#020b07] shadow-2xl transition-transform duration-300 ease-out flex items-center justify-center p-8 text-center"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
        }}
      >
        {/* Layer 0: Ambient Cosmic Background Aura */}
        <div className="absolute inset-0 bg-radial from-[#d4af37]/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 flex items-center justify-center opacity-15 pointer-events-none">
          <div className="w-96 h-96 animate-spin-slow">
            <Image
              src="/images/brand/element-astrology-circle-transparent.png"
              alt="Sacred Chakra"
              width={400}
              height={400}
              className="w-full h-full object-contain filter invert opacity-90"
            />
          </div>
        </div>

        {/* Phase 1: Sacred Concept */}
        {activeStep === 1 && (
          <div className="relative z-10 flex flex-col items-center" style={{ transform: "translateZ(35px)" }}>
            <div className="w-24 h-24 rounded-2xl bg-[#04170f] border-2 border-dashed border-[#d4af37] flex items-center justify-center mb-5 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
              <FileEdit className="w-12 h-12 text-[#f1d98a] animate-pulse" />
            </div>
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#d4af37] block mb-1">
              Phase 01 • Architectural Geometry
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
              Heirloom Sketch &amp; Proportions
            </h3>
            <p className="text-xs sm:text-sm text-[#a8b6af] max-w-md mt-2 leading-relaxed">
              Every curve, prong, and open-back light aperture is hand-drafted in accordance with classical Indian Silpa Sastra standards.
            </p>
          </div>
        )}

        {/* Phase 2: Master CAD & Wax Carving */}
        {activeStep === 2 && (
          <div className="relative z-10 flex flex-col items-center" style={{ transform: "translateZ(35px)" }}>
            <div className="w-24 h-24 rounded-2xl bg-[#0f3a28] border-2 border-[#10b981]/50 flex items-center justify-center mb-5 shadow-[0_0_35px_rgba(16,185,129,0.35)]">
              <Hammer className="w-12 h-12 text-[#10b981] animate-bounce" />
            </div>
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#10b981] block mb-1">
              Phase 02 • Sub-Millimeter Precision
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
              Lost-Wax Matrix Sculpting
            </h3>
            <p className="text-xs sm:text-sm text-[#a8b6af] max-w-md mt-2 leading-relaxed">
              Carved in high-density jewel wax to inspect stone seats, girdle depths, and balance before touching a single grain of gold.
            </p>
          </div>
        )}

        {/* Phase 3: Molten Gold Pour */}
        {activeStep === 3 && (
          <div className="relative z-10 flex flex-col items-center" style={{ transform: "translateZ(35px)" }}>
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#ff4400] via-[#ffaa00] to-[#ffd700] p-1 flex items-center justify-center mb-5 shadow-[0_0_50px_rgba(255,100,0,0.6)] animate-pulse">
              <div className="w-full h-full rounded-full bg-[#04170f] flex items-center justify-center">
                <Flame className="w-12 h-12 text-[#ff8800] animate-spin-slow" />
              </div>
            </div>
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#ffaa00] block mb-1">
              Phase 03 • Induction Casting at 1,064°C
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
              100% Certified 22K/18K Pour
            </h3>
            <p className="text-xs sm:text-sm text-[#a8b6af] max-w-md mt-2 leading-relaxed">
              Pure gold grains melted in oxygen-shielded induction crucibles. Zero scrap mix, zero porosity, guaranteeing supreme structural integrity.
            </p>
          </div>
        )}

        {/* Phase 4: Nakshi Hand-Setting */}
        {activeStep === 4 && (
          <div className="relative z-10 flex flex-col items-center" style={{ transform: "translateZ(35px)" }}>
            <div className="w-24 h-24 rounded-2xl bg-[#04170f] border-2 border-[#d4af37] flex items-center justify-center mb-5 shadow-[0_0_35px_rgba(212,175,55,0.4)]">
              <Gem className="w-12 h-12 text-[#f6e7b4] animate-pulse" />
            </div>
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#d4af37] block mb-1">
              Phase 04 • Hereditary Varanasi Artistry
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
              Nakshi Chasing &amp; Pratikool-Free Setting
            </h3>
            <p className="text-xs sm:text-sm text-[#a8b6af] max-w-md mt-2 leading-relaxed">
              Chiseled with fine punches under magnification. Natural unheated Ceylon Sapphires and Zambian Emeralds set with open culets.
            </p>
          </div>
        )}

        {/* Phase 5: BIS Laser Hallmarking */}
        {activeStep === 5 && (
          <div className="relative z-10 flex flex-col items-center" style={{ transform: "translateZ(35px)" }}>
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#d4af37] via-[#f1d98a] to-[#a8821f] p-1 flex items-center justify-center mb-5 shadow-[0_0_40px_rgba(212,175,55,0.45)]">
              <div className="w-full h-full rounded-full bg-[#04170f] flex items-center justify-center">
                <ShieldCheck className="w-12 h-12 text-[#d4af37]" />
              </div>
            </div>
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#10b981] block mb-1">
              Phase 05 • Govt. Verification
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
              6-Digit Laser HUID &amp; Digital Scale
            </h3>
            <p className="text-xs sm:text-sm text-[#a8b6af] max-w-md mt-2 leading-relaxed">
              Laser-inscribed with government hallmark. Weighed in your presence with net gold separated from gemstone weight.
            </p>
          </div>
        )}

        {/* Corner Holographic Pill */}
        <div className="absolute top-4 left-4 z-20 pointer-events-none">
          <span className="text-[10px] font-mono uppercase tracking-widest bg-[#04170f]/90 text-[#f1d98a] border border-[#d4af37]/40 px-3 py-1 rounded-full backdrop-blur-md shadow-lg">
            Stage 0{activeStep} of 05
          </span>
        </div>

        {/* Ambient Shimmer Light-Sweep Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer pointer-events-none" />
      </div>
    </div>
  );
}
