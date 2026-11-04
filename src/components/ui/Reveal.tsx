"use client";

import React, { useEffect, useRef, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  direction?: "up" | "down" | "fade" | "clip-arch";
}

export function Reveal({
  children,
  className = "",
  delayMs = 0,
  direction = "up",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          queueMicrotask(() => setIsVisible(true));
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const getTransitionStyle = () => {
    switch (direction) {
      case "up":
        return isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8";
      case "down":
        return isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-8";
      case "clip-arch":
        return isVisible
          ? "opacity-100 scale-100 [clip-path:inset(0%_0%_0%_0%_round_120px_120px_0_0)]"
          : "opacity-0 scale-95 [clip-path:inset(100%_0%_0%_0%_round_120px_120px_0_0)]";
      case "fade":
      default:
        return isVisible ? "opacity-100" : "opacity-0";
    }
  };

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={`transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${getTransitionStyle()} ${className}`}
    >
      {children}
    </div>
  );
}

