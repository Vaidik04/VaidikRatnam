"use client";

import React from "react";
import * as THREE from "three";

interface VelvetPlinthProps {
  radius?: number;
  height?: number;
  color?: string;
  metalRing?: boolean;
}

export function VelvetPlinth({
  radius = 1.4,
  height = 0.25,
  color = "#04170f",
  metalRing = true,
}: VelvetPlinthProps) {
  return (
    <group position={[0, -height / 2, 0]}>
      {/* Main Velvet Base Cylinder */}
      <mesh receiveShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[radius, radius * 1.05, height, 48]} />
        <meshPhysicalMaterial
          color={new THREE.Color(color)}
          roughness={0.9}
          metalness={0.05}
          sheen={1.0}
          sheenRoughness={0.5}
          sheenColor={new THREE.Color("#0a3825")}
        />
      </mesh>

      {/* Antique Gold Beveled Rim */}
      {metalRing && (
        <mesh position={[0, height / 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius, 0.02, 16, 64]} />
          <meshPhysicalMaterial
            color={new THREE.Color("#d4af37")}
            metalness={1.0}
            roughness={0.2}
            clearcoat={0.3}
          />
        </mesh>
      )}
    </group>
  );
}
