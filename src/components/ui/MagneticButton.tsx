"use client";

import React, { useRef, useState } from "react";
import { use3DCapability } from "@/components/3d/context/CapabilityContext";

interface SparkleParticle {
  id: number;
  x: number;
  y: number;
  angle: number;
  distance: number;
  size: number;
}

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  strength?: number;
  variant?: "gold" | "emerald" | "outline" | "glass";
  className?: string;
  sparkleOnClick?: boolean;
}

export function MagneticButton({
  children,
  strength = 28,
  variant = "gold",
  className = "",
  sparkleOnClick = true,
  onClick,
  ...props
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [sparkles, setSparkles] = useState<SparkleParticle[]>([]);
  const { liteMode } = use3DCapability();

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (liteMode || !btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) / (rect.width / 2);
    const distanceY = (e.clientY - centerY) / (rect.height / 2);

    setPosition({
      x: distanceX * strength,
      y: distanceY * strength,
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (sparkleOnClick && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      const newSparkles: SparkleParticle[] = Array.from({ length: 12 }, (_, i) => ({
        id: Date.now() + i,
        x: clickX,
        y: clickY,
        angle: (i * Math.PI * 2) / 12,
        distance: 24 + Math.random() * 28,
        size: 3 + Math.random() * 3,
      }));

      setSparkles(newSparkles);
      setTimeout(() => setSparkles([]), 650);
    }

    onClick?.(e);
  };

  const variantStyles = {
    gold: "bg-gold-gradient text-[#04170F] font-semibold border border-[#D4AF37] shadow-sm hover:brightness-105 active:scale-[0.98]",
    emerald: "bg-[#0A2A1D] text-[#FAF7F0] font-medium border border-[#D4AF37]/40 hover:bg-[#14502F] active:scale-[0.98]",
    outline: "bg-transparent text-[#FAF7F0] font-medium border border-[#D4AF37] hover:bg-[#D4AF37]/15 active:scale-[0.98]",
    glass: "bg-white/5 backdrop-blur-md text-[#FAF7F0] border border-white/10 hover:border-[#D4AF37]/40 hover:bg-white/10 active:scale-[0.98]",
  }[variant];

  return (
    <button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: position.x === 0 ? "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)" : "transform 0.1s ease-out",
      }}
      className={`relative inline-flex items-center justify-center cursor-pointer select-none overflow-hidden gold-shimmer-sweep rounded-xs px-5 py-2.5 text-xs uppercase tracking-[0.16em] ${variantStyles} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>

      {/* Sparkle Burst Particles */}
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="pointer-events-none absolute rounded-full bg-[#F6E7B4] shadow-[0_0_6px_#D4AF37]"
          style={{
            left: `${s.x}px`,
            top: `${s.y}px`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            transform: `translate(${Math.cos(s.angle) * s.distance}px, ${Math.sin(s.angle) * s.distance}px) scale(0)`,
            transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease-out",
            opacity: 0.8,
          }}
        />
      ))}
    </button>
  );
}

