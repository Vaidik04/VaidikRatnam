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
          color: new THREE.Color("#ffd154"),
          emissive: new THREE.Color("#59430c"),
          emissiveIntensity: 0.2,
          metalness: 0.85,
          roughness: customRoughness ?? 0.08,
          clearcoat: 0.7,
          clearcoatRoughness: 0.05,
          envMapIntensity: 1.8,
        };
      case "rose":
        return {
          color: new THREE.Color("#e6a392"),
          emissive: new THREE.Color("#4d1e15"),
          emissiveIntensity: 0.15,
          metalness: 0.85,
          roughness: customRoughness ?? 0.22,
          clearcoat: 0.4,
          clearcoatRoughness: 0.15,
          envMapIntensity: 1.4,
        };
      case "white":
        return {
          color: new THREE.Color("#e8e8e8"),
          emissive: new THREE.Color("#2a2a2a"),
          emissiveIntensity: 0.15,
          metalness: 0.88,
          roughness: customRoughness ?? 0.15,
          clearcoat: 0.6,
          clearcoatRoughness: 0.1,
          envMapIntensity: 1.6,
        };
      case "antique":
      default:
        return {
          color: new THREE.Color("#ffd966"),
          emissive: new THREE.Color("#6b5010"),
          emissiveIntensity: 0.25,
          metalness: 0.8,
          roughness: customRoughness ?? 0.2,
          clearcoat: 0.7,
          clearcoatRoughness: 0.1,
          envMapIntensity: 1.6,
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

