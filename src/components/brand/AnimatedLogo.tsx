"use client";

import React, { useId } from "react";

interface AnimatedLogoProps {
  variant?: "gold-on-dark" | "emerald-on-ivory";
  size?: "sm" | "md" | "lg" | "xl";
  showLockup?: boolean;
  className?: string;
  animate?: boolean;
}

export function AnimatedLogo({
  variant = "gold-on-dark",
  size = "md",
  showLockup = true,
  className = "",
  animate = true,
}: AnimatedLogoProps) {
  const uniqueId = useId().replace(/:/g, "");

  // Size dimensions for the VR Monogram
  const monogramDimensions = {
    sm: { w: 36, h: 36 },
    md: { w: 48, h: 48 },
    lg: { w: 64, h: 64 },
    xl: { w: 84, h: 84 },
  }[size];

  const isDark = variant === "gold-on-dark";

  const goldGradientId = `vr-gold-grad-${uniqueId}`;
  const emeraldGradientId = `vr-emerald-grad-${uniqueId}`;
  const shimmerMaskId = `vr-shimmer-mask-${uniqueId}`;

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* 1. VR Monogram Emblem */}
      <div className="relative shrink-0 flex items-center justify-center">
        <svg
          width={monogramDimensions.w}
          height={monogramDimensions.h}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
          aria-label="Vaidik Ratnam Monogram"
        >
          <defs>
            {/* Metallic Gold Gradient */}
            <linearGradient id={goldGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F6E7B4" />
              <stop offset="35%" stopColor="#D4AF37" />
              <stop offset="70%" stopColor="#A8821F" />
              <stop offset="100%" stopColor="#F1D98A" />
            </linearGradient>

            {/* Sacred Emerald Gradient */}
            <linearGradient id={emeraldGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#14502F" />
              <stop offset="50%" stopColor="#0A2A1D" />
              <stop offset="100%" stopColor="#04170F" />
            </linearGradient>

            {/* 8s Periodic Light Sweep Linear Gradient */}
            <linearGradient id={shimmerMaskId} x1="-100%" y1="0%" x2="200%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.85" />
              <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
              {animate && (
                <animate
                  attributeName="x1"
                  from="-100%"
                  to="200%"
                  dur="8s"
                  repeatCount="indefinite"
                />
              )}
              {animate && (
                <animate
                  attributeName="x2"
                  from="0%"
                  to="300%"
                  dur="8s"
                  repeatCount="indefinite"
                />
              )}
            </linearGradient>
          </defs>

          {/* Outer Royal Circular Filigree Ring */}
          <circle
            cx="50"
            cy="50"
            r="46"
            stroke={isDark ? `url(#${goldGradientId})` : "#A8821F"}
            strokeWidth="1.2"
            strokeDasharray="3 2"
            strokeOpacity="0.65"
            className={animate ? "animate-spin-slow origin-center" : ""}
          />
          <circle
            cx="50"
            cy="50"
            r="48"
            stroke={isDark ? "#D4AF37" : "#0A2A1D"}
            strokeWidth="0.75"
            strokeOpacity="0.4"
          />

          {/* Crown Ratna (Sacred Octagonal Gemstone at Top) */}
          <path
            d="M50 8 L54 13 L50 18 L46 13 Z"
            fill={isDark ? "#F6E7B4" : "#D4AF37"}
            stroke={isDark ? "#A8821F" : "#0A2A1D"}
            strokeWidth="0.8"
          />
          <circle cx="50" cy="13" r="1.2" fill="#FFFFFF" />

          {/* Sacred Intertwined VR Monogram Path */}
          {/* 'V' (Left wing to center apex, traditional luxury serif) */}
          <path
            d="M24 28 C26 28 29 29 31 33 L45 68 C46 71 47 73 49 75 C51 73 52 71 53 68 L60 50 C58 48 55 45 52 45"
            stroke={isDark ? `url(#${goldGradientId})` : `url(#${emeraldGradientId})`}
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={animate ? "vr-stroke-draw" : ""}
          />

          {/* 'V' Left Serif Finial */}
          <path
            d="M20 28 L30 28"
            stroke={isDark ? "#F1D98A" : "#D4AF37"}
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* 'R' (Stem and Regal Upper Loop & Sweeping Tail) */}
          <path
            d="M48 30 L48 72 M48 31 C56 31 66 31 66 43 C66 53 56 54 48 54 M58 54 L72 73 C75 76 77 76 80 76"
            stroke={isDark ? `url(#${goldGradientId})` : `url(#${emeraldGradientId})`}
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={animate ? "vr-stroke-draw" : ""}
          />

          {/* 'R' Top & Base Serif Finials */}
          <path
            d="M44 31 L52 31 M44 72 L52 72"
            stroke={isDark ? "#F1D98A" : "#D4AF37"}
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Central Connecting Diamond Bindu */}
          <circle
            cx="50"
            cy="52"
            r="1.8"
            fill={isDark ? "#F6E7B4" : "#D4AF37"}
          />

          {/* Shimmer Light-Sweep Overlay */}
          <rect
            x="0"
            y="0"
            width="100"
            height="100"
            fill={`url(#${shimmerMaskId})`}
            pointerEvents="none"
          />
        </svg>
      </div>

      {/* 2. Wordmark Lockup */}
      {showLockup && (
        <div className="flex flex-col justify-center">
          <div className="flex items-baseline gap-1.5">
            <span
              className={`font-serif tracking-[0.14em] uppercase font-normal leading-none ${
                size === "sm"
                  ? "text-lg"
                  : size === "md"
                  ? "text-xl sm:text-2xl"
                  : size === "lg"
                  ? "text-2xl sm:text-3xl"
                  : "text-3xl sm:text-4xl"
              } ${isDark ? "text-gold-gradient" : "text-[#0A2A1D]"}`}
            >
              Vaidik
            </span>
            <span
              className={`font-serif tracking-[0.14em] uppercase font-semibold leading-none ${
                size === "sm"
                  ? "text-lg"
                  : size === "md"
                  ? "text-xl sm:text-2xl"
                  : size === "lg"
                  ? "text-2xl sm:text-3xl"
                  : "text-3xl sm:text-4xl"
              } ${isDark ? "text-[#FAF7F0]" : "text-[#D4AF37]"}`}
            >
              Ratnam
            </span>
          </div>

          {/* Subtitle Tagline */}
          <span
            className={`font-mono uppercase tracking-[0.24em] mt-1 ${
              size === "sm"
                ? "text-[8px]"
                : size === "md"
                ? "text-[9px]"
                : "text-[10px]"
            } ${isDark ? "text-[#F1D98A]/75" : "text-[#0A2A1D]/75"}`}
          >
            Jewellery &bull; Gemstones &bull; Astrology
          </span>
        </div>
      )}
    </div>
  );
}
