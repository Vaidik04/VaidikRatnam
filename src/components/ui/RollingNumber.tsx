"use client";

import React, { useEffect, useState, useRef } from "react";

interface RollingNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  durationMs?: number;
}

export function RollingNumber({
  value,
  prefix = "",
  suffix = "",
  className = "",
  durationMs = 600,
}: RollingNumberProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const currentValRef = useRef(value);
  const startTimeRef = useRef<number | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const startVal = currentValRef.current;
    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = Math.min((timestamp - startTimeRef.current) / durationMs, 1);
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startVal + (value - startVal) * easedProgress);

      currentValRef.current = current;
      setDisplayValue(current);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [value, durationMs]);

  return (
    <span className={`inline-block font-mono tabular-nums ${className}`}>
      {prefix}
      {displayValue.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}
