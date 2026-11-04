"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { use3DCapability } from "../context/CapabilityContext";

interface ViewPortalProps {
  children: React.ReactNode;
  className?: string;
  fallback?: React.ReactNode;
  cameraPosition?: [number, number, number];
  fov?: number;
}

export function ViewPortal({
  children,
  className = "w-full h-full relative",
  fallback,
  cameraPosition = [0, 0, 5],
  fov = 45,
}: ViewPortalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const { is3DSupported, liteMode, dpr } = use3DCapability();

  useEffect(() => {
    if (!containerRef.current || liteMode || !is3DSupported) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: "100px" }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [liteMode, is3DSupported]);

  // When loaded, trigger crossfade
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (isInView) {
      timer = setTimeout(() => setIsReady(true), 150);
    } else {
      timer = setTimeout(() => setIsReady(false), 0);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isInView]);

  if (liteMode || !is3DSupported) {
    return <div className={className}>{fallback}</div>;
  }

  return (
    <div ref={containerRef} className={className}>
      {/* 2D Instant Poster Fallback (fades out once 3D is ready) */}
      {fallback && (
        <div
          className={`absolute inset-0 transition-opacity duration-700 pointer-events-none z-0 ${
            isReady ? "opacity-0" : "opacity-100"
          }`}
        >
          {fallback}
        </div>
      )}

      {/* Standalone isolated Canvas rendering only while in viewport */}
      {isInView && (
        <div
          className={`w-full h-full transition-opacity duration-700 relative z-10 ${
            isReady ? "opacity-100" : "opacity-0"
          }`}
        >
          <Canvas
            dpr={dpr}
            camera={{ position: cameraPosition, fov }}
            gl={{
              antialias: true,
              powerPreference: "high-performance",
              alpha: true,
            }}
            frameloop="always"
          >
            {children}
          </Canvas>
        </div>
      )}
    </div>
  );
}
