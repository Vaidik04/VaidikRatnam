"use client";

import React, { useId } from "react";

interface SparkleOverlayProps {
  count?: number;
  className?: string;
}

export function SparkleOverlay({
  count = 6,
  className = "",
}: SparkleOverlayProps) {
  const baseId = useId();
  // Fixed deterministic positions
  const sparkles = Array.from({ length: count }, (_, i) => ({
    top: `${(i * 19 + 13) % 85}%`,
    left: `${(i * 29 + 17) % 85}%`,
    size: (i % 3) * 4 + 8,
    delay: `${(i * 0.7) % 3.5}s`,
    duration: `${2.4 + (i % 2) * 0.8}s`,
  }));

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden mix-blend-screen ${className}`}
      aria-hidden="true"
    >
      {sparkles.map((sp, idx) => (
        <svg
          key={`${baseId}-sp-${idx}`}
          viewBox="0 0 24 24"
          fill="#f6e7b4"
          className="absolute animate-pulse opacity-75"
          style={{
            top: sp.top,
            left: sp.left,
            width: `${sp.size}px`,
            height: `${sp.size}px`,
            animationDelay: sp.delay,
            animationDuration: sp.duration,
            filter: "drop-shadow(0 0 6px rgba(246,231,180,0.8))",
          }}
        >
          {/* 4-point star path */}
          <path d="M12 0 L14 9 L24 12 L14 15 L12 24 L10 15 L0 12 L10 9 Z" />
        </svg>
      ))}
    </div>
  );
}
