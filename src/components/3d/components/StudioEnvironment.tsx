"use client";

import React from "react";
import { Environment, Lightformer } from "@react-three/drei";

/**
 * Reusable zero-asset studio lighting environment for high-jewellery PBR reflections.
 * Uses procedural Lightformers to generate a real-time HDR cubemap in GPU memory.
 * No external network requests, 0-byte download, works 100% offline.
 */
export function StudioEnvironment() {
  return (
    <Environment resolution={256}>
      {/* Top Warm Softbox (Key light for gold surfaces) */}
      <Lightformer
        form="rect"
        intensity={3.5}
        color="#fff4d4"
        position={[0, 6, 2]}
        scale={[8, 5, 1]}
      />
      {/* Left Antique Gold Rim Accent */}
      <Lightformer
        form="rect"
        intensity={2.8}
        color="#ffd966"
        position={[-6, 2, -1]}
        scale={[5, 7, 1]}
      />
      {/* Right High-Jewellery Specular Ring (Creates sharp facet glints) */}
      <Lightformer
        form="ring"
        intensity={4.0}
        color="#ffffff"
        position={[5, 4, 3]}
        scale={4}
      />
      {/* Bottom Radiant Gold Fill */}
      <Lightformer
        form="rect"
        intensity={1.2}
        color="#f1d98a"
        position={[0, -5, 0]}
        scale={[10, 4, 1]}
      />
    </Environment>
  );
}
