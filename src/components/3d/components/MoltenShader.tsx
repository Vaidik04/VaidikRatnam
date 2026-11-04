"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface MoltenShaderMaterialProps {
  glowIntensity?: number;
}

export function MoltenShaderMaterial({
  glowIntensity = 2.5,
}: MoltenShaderMaterialProps) {
  const matRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (matRef.current) {
      const time = state.clock.getElapsedTime();
      // Flowing thermal glow pulse
      const pulse = Math.sin(time * 3) * 0.3 + 0.7;
      matRef.current.emissiveIntensity = glowIntensity * pulse;
    }
  });

  return (
    <meshStandardMaterial
      ref={matRef}
      color={new THREE.Color("#ff5500")}
      emissive={new THREE.Color("#ffaa00")}
      emissiveIntensity={glowIntensity}
      roughness={0.4}
      metalness={0.8}
    />
  );
}
