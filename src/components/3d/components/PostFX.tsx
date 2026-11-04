"use client";

import React from "react";
import { use3DCapability } from "../context/CapabilityContext";

/**
 * Post-FX layer for high-capability GPU tiers.
 * Adds subtle ambient luxury atmosphere and depth warmth.
 */
export function PostFX() {
  const { canUsePostFX } = use3DCapability();

  if (!canUsePostFX) return null;

  return (
    <mesh position={[0, 0, -1]}>
      <planeGeometry args={[100, 100]} />
      <meshBasicMaterial
        transparent
        opacity={0.03}
        color="#d4af37"
        depthWrite={false}
      />
    </mesh>
  );
}
