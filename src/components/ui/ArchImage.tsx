"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ArchImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  aspect?: string;
  kenBurns?: boolean;
  withOrnaments?: boolean;
}

export function ArchImage({
  src,
  alt,
  width = 800,
  height = 1000,
  priority = false,
  className = "",
  aspect = "aspect-[4/5]",
  kenBurns = true,
  withOrnaments = true,
}: ArchImageProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative group overflow-hidden rounded-t-[100px] sm:rounded-t-[140px] border border-[#d4af37]/30 bg-[#04170f] shadow-2xl ${aspect} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Corner Ornaments */}
      {withOrnaments && (
        <>
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#d4af37]/60 z-20 pointer-events-none" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#d4af37]/60 z-20 pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#d4af37]/60 z-20 pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#d4af37]/60 z-20 pointer-events-none" />
        </>
      )}

      {/* Outer Jharokha hairline ring */}
      <div className="absolute inset-1 rounded-t-[96px] sm:rounded-t-[136px] border border-[#d4af37]/20 pointer-events-none z-10" />

      {/* Image with Ken Burns / Hover Scale */}
      <div
        className={`relative w-full h-full transition-transform duration-1200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          kenBurns ? (isHovered ? "scale-108" : "scale-100") : ""
        }`}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Specular Light Sweep overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none transition-transform duration-1000 -translate-x-full ${
          isHovered ? "translate-x-full" : ""
        }`}
      />

      {/* Bottom subtle emerald vignette */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#04170f]/90 via-[#04170f]/30 to-transparent pointer-events-none" />
    </div>
  );
}
