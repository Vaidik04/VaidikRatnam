"use client";

import React, { useEffect, useState, useRef } from "react";
import { use3DCapability } from "@/components/3d/context/CapabilityContext";

interface TrailDot {
  id: number;
  x: number;
  y: number;
  opacity: number;
  scale: number;
}

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [trail, setTrail] = useState<TrailDot[]>([]);
  const { liteMode } = use3DCapability();

  const posRef = useRef({ x: -100, y: -100 });
  const ringRef = useRef({ x: -100, y: -100 });
  const animFrameRef = useRef<number | null>(null);
  const lastTrailTime = useRef(0);

  useEffect(() => {
    // Hide cursor on touch devices or if liteMode/reduced motion is active
    if (liteMode) return;
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (isTouch || prefersReducedMotion) return;

    const onMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);

      // Spawn gold sparkle trail every 45ms
      const now = performance.now();
      if (now - lastTrailTime.current > 45) {
        lastTrailTime.current = now;
        setTrail((prev) => [
          ...prev.slice(-18),
          {
            id: now,
            x: e.clientX,
            y: e.clientY,
            opacity: 0.65,
            scale: 0.8 + Math.random() * 0.4,
          },
        ]);
      }
    };

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorTarget) {
        setCursorText(cursorTarget.getAttribute("data-cursor"));
        setIsHovering(true);
        return;
      }

      const interactive = target.closest("a, button, [role='button'], input, select, textarea");
      setCursorText(null);
      setIsHovering(Boolean(interactive));
    };

    const onMouseEnter = () => setVisible(true);
    const onMouseLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", checkHover, { passive: true });
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);

    // Smooth lagging ring loop
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;
    const loop = () => {
      ringRef.current.x = lerp(ringRef.current.x, posRef.current.x, 0.18);
      ringRef.current.y = lerp(ringRef.current.y, posRef.current.y, 0.18);
      setRingPos({ x: ringRef.current.x, y: ringRef.current.y });
      animFrameRef.current = requestAnimationFrame(loop);
    };
    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", checkHover);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [liteMode]);

  if (!visible || liteMode) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* 1. Sparkle Cursor Trail */}
      {trail.map((dot) => (
        <span
          key={dot.id}
          className="absolute rounded-full bg-[#F6E7B4] pointer-events-none transition-opacity duration-500 ease-out"
          style={{
            left: `${dot.x}px`,
            top: `${dot.y}px`,
            width: "3px",
            height: "3px",
            transform: `translate(-50%, -50%) scale(${dot.scale})`,
            boxShadow: "0 0 6px rgba(212, 175, 55, 0.8)",
            opacity: dot.opacity,
          }}
        />
      ))}

      {/* 2. Precision Center Dot */}
      <div
        className="fixed rounded-full bg-[#D4AF37] transition-transform duration-75"
        style={{
          width: cursorText ? "6px" : isHovering ? "10px" : "6px",
          height: cursorText ? "6px" : isHovering ? "10px" : "6px",
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* 3. Smooth Lagging Ring / Dynamic Label Capsule */}
      <div
        className="fixed rounded-full flex items-center justify-center transition-[width,height,background-color,border-color] duration-200 ease-out"
        style={{
          width: cursorText ? "76px" : isHovering ? "52px" : "32px",
          height: cursorText ? "76px" : isHovering ? "52px" : "32px",
          left: `${ringPos.x}px`,
          top: `${ringPos.y}px`,
          transform: "translate(-50%, -50%)",
          border: cursorText
            ? "1px solid rgba(212, 175, 55, 0.8)"
            : isHovering
            ? "1.5px solid rgba(212, 175, 55, 0.6)"
            : "1px solid rgba(212, 175, 55, 0.35)",
          backgroundColor: cursorText
            ? "rgba(4, 23, 15, 0.85)"
            : isHovering
            ? "rgba(212, 175, 55, 0.08)"
            : "transparent",
          backdropFilter: cursorText ? "blur(6px)" : "none",
        }}
      >
        {cursorText && (
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#F6E7B4] font-semibold text-center leading-none">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}
