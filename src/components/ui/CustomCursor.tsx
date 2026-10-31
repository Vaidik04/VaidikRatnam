"use client";

import { useEffect, useState } from "react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if touch device or prefers-reduced-motion
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    if (isTouch || prefersReducedMotion) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const onMouseEnter = () => setVisible(true);
    const onMouseLeave = () => setVisible(false);

    const checkInteractiveHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest("a, button, [role='button'], input, select, textarea");
      setIsHovering(Boolean(interactive));
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", checkInteractiveHover);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", checkInteractiveHover);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Precision cursor dot */}
      <div
        className="pointer-events-none fixed z-[9999] rounded-full bg-[#D4AF37] transition-transform duration-75"
        style={{
          width: isHovering ? "12px" : "8px",
          height: isHovering ? "12px" : "8px",
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      />
      {/* Smooth lagging ring */}
      <div
        className="pointer-events-none fixed z-[9998] rounded-full border border-[#D4AF37]/50 transition-all duration-200"
        style={{
          width: isHovering ? "48px" : "32px",
          height: isHovering ? "48px" : "32px",
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
          backgroundColor: isHovering ? "rgba(212, 175, 55, 0.08)" : "transparent",
        }}
      />
    </>
  );
}
