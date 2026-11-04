"use client";

import React from "react";
import * as THREE from "three";

interface GoldMaterialProps {
  variant?: "antique" | "polished" | "rose" | "white";
  roughness?: number;
}

export function GoldMaterial({
  variant = "antique",
  roughness: customRoughness,
}: GoldMaterialProps) {
  const config = React.useMemo(() => {
    switch (variant) {
      case "polished":
        return {
          color: new THREE.Color("#f1d98a"),
          metalness: 1.0,
          roughness: customRoughness ?? 0.08,
          clearcoat: 0.6,
          clearcoatRoughness: 0.1,
          envMapIntensity: 1.8,
        };
      case "rose":
        return {
          color: new THREE.Color("#e6a392"),
          metalness: 0.95,
          roughness: customRoughness ?? 0.22,
          clearcoat: 0.3,
          clearcoatRoughness: 0.15,
          envMapIntensity: 1.4,
        };
      case "white":
        return {
          color: new THREE.Color("#e8e8e8"),
          metalness: 0.98,
          roughness: customRoughness ?? 0.15,
          clearcoat: 0.5,
          clearcoatRoughness: 0.1,
          envMapIntensity: 1.6,
        };
      case "antique":
      default:
        return {
          color: new THREE.Color("#d4af37"),
          metalness: 1.0,
          roughness: customRoughness ?? 0.22,
          clearcoat: 0.3,
          clearcoatRoughness: 0.2,
          envMapIntensity: 1.4,
        };
    }
  }, [variant, customRoughness]);

  return (
    <meshPhysicalMaterial
      color={config.color}
      metalness={config.metalness}
      roughness={config.roughness}
      clearcoat={config.clearcoat}
      clearcoatRoughness={config.clearcoatRoughness}
      envMapIntensity={config.envMapIntensity}
    />
  );
}
