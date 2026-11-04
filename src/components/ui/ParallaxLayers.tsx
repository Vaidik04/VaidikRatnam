"use client";

import React, { useRef, useState, useCallback } from "react";

interface ParallaxLayersProps {
  children: React.ReactNode;
  className?: string;
  depth?: number;
}

export function ParallaxLayers({
  children,
  className = "",
  depth = 20,
}: ParallaxLayersProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setOffset({ x: x * depth, y: y * depth });
    },
    [depth]
  );

  const handleMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden transition-transform duration-300 ease-out ${className}`}
      style={{
        transform: `perspective(1000px) rotateY(${offset.x * 0.4}deg) rotateX(${-offset.y * 0.4}deg)`,
      }}
    >
      {/* Dynamic ambient gold spotlight that follows mouse */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-60"
        style={{
          background: `radial-gradient(circle 350px at ${50 + offset.x * 2}% ${
            50 + offset.y * 2
          }%, rgba(212,175,55,0.18), transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
}
