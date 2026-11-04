"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { use3DCapability } from "@/components/3d/context/CapabilityContext";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const { liteMode } = use3DCapability();
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If user prefers reduced motion or Lite mode, use native scroll
    if (liteMode || typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    lenis.on("scroll", (e: { progress?: number; scroll: number; limit: number }) => {
      ScrollTrigger.update();
      if (progressBarRef.current) {
        const progress = e.progress !== undefined ? e.progress : e.scroll / (e.limit || 1);
        progressBarRef.current.style.transform = `scaleX(${progress})`;
      }
    });

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, [liteMode]);

  return (
    <>
      {/* Thin Gold Progress Bar at the Top of Viewport */}
      <div
        ref={progressBarRef}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#F1D98A] via-[#D4AF37] to-[#A8821F] origin-left z-50 pointer-events-none transform scale-x-0 transition-transform duration-75 shadow-xs"
        aria-hidden="true"
      />
      {children}
    </>
  );
}

