"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { use3DCapability } from "../context/CapabilityContext";

interface SceneCanvasProps {
  children: React.ReactNode;
  cameraPosition?: [number, number, number];
  fov?: number;
  className?: string;
  fallback?: React.ReactNode;
}

export function SceneCanvas({
  children,
  cameraPosition = [0, 0, 5],
  fov = 45,
  className = "w-full h-full",
  fallback,
}: SceneCanvasProps) {
  const { is3DSupported, liteMode, dpr } = use3DCapability();

  if (liteMode || !is3DSupported) {
    return <div className={className}>{fallback}</div>;
  }

  return (
    <div className={`relative ${className}`}>
      <Canvas
        dpr={dpr}
        camera={{ position: cameraPosition, fov }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: true,
        }}
        frameloop="demand"
      >
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </div>
  );
}

