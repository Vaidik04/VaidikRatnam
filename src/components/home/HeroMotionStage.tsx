"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { ShieldCheck, Sparkles, Award, CheckCircle2 } from "lucide-react";

export function HeroMotionStage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  // Smooth mouse tilt calculation with 3D perspective
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle, weighty luxury tilt (-8deg to +8deg)
    const targetRotX = ((y - centerY) / centerY) * -9;
    const targetRotY = ((x - centerX) / centerX) * 9;

    setRotX(targetRotX);
    setRotY(targetRotY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotX(0);
    setRotY(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      className="relative w-full max-w-lg aspect-[4/5] [perspective:1400px] select-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={containerRef}
    >
      {/* 3D Transform Root Assembly */}
      <div
        className="relative w-full h-full rounded-3xl overflow-hidden border border-[#d4af37]/40 bg-[#04170f] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8),0_0_50px_rgba(212,175,55,0.15)] transition-transform duration-300 ease-out"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
        }}
      >
        {/* Layer 0: Ambient Cosmic Radial Glows */}
        <div className="absolute inset-0 bg-radial from-[#0a2a1d] via-[#04170f] to-[#020b07] z-0" />
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#d4af37]/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[#10b981]/20 blur-3xl pointer-events-none" />

        {/* Layer 1: Rotating Sacred Mandala Background (translateZ -20px) */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-25 pointer-events-none transition-transform duration-700 ease-out"
          style={{ transform: "translateZ(-20px)" }}
        >
          <div className="w-[120%] h-[120%] animate-spin-slow">
            <Image
              src="/images/brand/element-astrology-circle-transparent.png"
              alt="Sacred Astrology Wheel"
              width={600}
              height={600}
              className="w-full h-full object-contain filter invert opacity-60"
            />
          </div>
        </div>

        {/* Layer 2: Ornate Indian Temple Arch Frame Overlay */}
        <div
          className="absolute inset-3 rounded-2xl border border-[#d4af37]/30 pointer-events-none z-10"
          style={{ transform: "translateZ(15px)" }}
        >
          {/* Corner Filigree Brackets */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#d4af37]" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#d4af37]" />
          <div className="absolute bottom-2 left-2 w-4 h-2 border-b-2 border-l-2 border-[#d4af37]" />
          <div className="absolute bottom-2 right-2 w-4 h-2 border-b-2 border-r-2 border-[#d4af37]" />
        </div>

        {/* Layer 3: High-Jewellery Centerpiece with Ken Burns Breathing Motion */}
        <div
          className="absolute inset-0 z-0 transition-transform duration-500 ease-out"
          style={{ transform: "translateZ(25px)" }}
        >
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src="/images/hero-jewellery.jpg"
              alt="Vaidik Ratnam Masterpiece 22K Temple Jewellery"
              fill
              priority
              className="object-cover object-center scale-105 transition-transform duration-1000 ease-out hover:scale-110"
              sizes="(max-width: 768px) 100vw, 550px"
            />
            {/* Emerald Velvet Dark Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#04170f] via-transparent to-[#04170f]/40" />
            <div className="absolute inset-0 bg-radial from-transparent via-[#04170f]/30 to-[#04170f]/80" />
          </div>
        </div>

        {/* Layer 4: Real-time Cursor Spotlight Glare Sheen */}
        <div
          className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 0.8 : 0.35,
            background: `radial-gradient(circle 320px at ${glarePos.x}% ${glarePos.y}%, rgba(246, 231, 180, 0.35), rgba(212, 175, 55, 0.08) 50%, transparent 80%)`,
            mixBlendMode: "screen",
          }}
        />

        {/* Layer 5: Floating Twinkling Sparkle Glints (translateZ 45px) */}
        <div
          className="absolute inset-0 pointer-events-none z-25 overflow-hidden"
          style={{ transform: "translateZ(45px)" }}
        >
          {/* Top-Right Star Glint */}
          <div className="absolute top-1/4 right-1/4 animate-pulse">
            <Sparkles className="w-5 h-5 text-[#f6e7b4] drop-shadow-[0_0_8px_#ffd700]" />
          </div>
          {/* Center-Left Gem Light Glint */}
          <div className="absolute top-1/2 left-1/5 animate-pulse delay-500">
            <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_12px_#ffffff,0_0_24px_#10b981]" />
          </div>
          {/* Lower Amber Glint */}
          <div className="absolute bottom-1/3 right-1/3 animate-pulse delay-1000">
            <Sparkles className="w-4 h-4 text-[#ffd700] drop-shadow-[0_0_8px_#d4af37]" />
          </div>
        </div>

        {/* Layer 6: Floating 3D Holographic Badges (translateZ 70px) */}
        {/* Top Floating Pill: 3D Motion Graphics Signature */}
        <div
          className="absolute top-5 right-5 z-30 transition-transform duration-300"
          style={{ transform: "translateZ(65px)" }}
        >
          <div className="bg-[#04170f]/85 border border-[#d4af37]/60 px-3.5 py-1.5 rounded-full backdrop-blur-md flex items-center gap-2 text-[10px] text-[#f6e7b4] font-mono shadow-xl">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
            <span className="uppercase tracking-widest font-semibold">Haute Joaillerie 3D</span>
          </div>
        </div>

        {/* Top Left Floating Pill: Karigari Discipline */}
        <div
          className="absolute top-5 left-5 z-30 transition-transform duration-300"
          style={{ transform: "translateZ(55px)" }}
        >
          <div className="bg-[#04170f]/85 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-md flex items-center gap-1.5 text-[10px] text-[#a8b6af] font-mono shadow-lg">
            <Award className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Temple Karigari</span>
          </div>
        </div>

        {/* Bottom Floating Glass Card: Metrology Guarantee (translateZ 80px) */}
        <div
          className="absolute bottom-5 left-5 right-5 z-30 p-4 rounded-2xl bg-[#04170f]/90 border border-[#d4af37]/50 shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-md transition-transform duration-300"
          style={{ transform: "translateZ(80px)" }}
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/50 flex items-center justify-center shrink-0 shadow-inner">
              <ShieldCheck className="w-5 h-5 text-[#d4af37]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <strong className="text-xs sm:text-sm font-serif text-[#f6e7b4] tracking-wide">
                  Govt. 6-Digit Laser HUID
                </strong>
                <span className="inline-flex items-center gap-1 text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/40">
                  <CheckCircle2 className="w-2.5 h-2.5" />
                  <span>BIS Care Verified</span>
                </span>
              </div>
              <span className="text-[11px] text-[#a8b6af] block font-mono mt-0.5">
                100% 22K/916 Pure Gold • Weighed live on digital scales
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
