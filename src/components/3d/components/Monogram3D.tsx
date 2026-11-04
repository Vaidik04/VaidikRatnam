"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float } from "@react-three/drei";

export function Monogram3D() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.8) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.4}>
      <group ref={meshRef}>
        {/* Sacred Outer Medallion Frame */}
        <mesh>
          <torusGeometry args={[1.2, 0.04, 16, 64]} />
          <meshPhysicalMaterial
            color="#d4af37"
            metalness={1.0}
            roughness={0.15}
            clearcoat={0.5}
          />
        </mesh>

        {/* Central Monogram Ring and Diamond */}
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.9, 0.9, 0.08]} />
          <meshPhysicalMaterial
            color="#f1d98a"
            metalness={0.98}
            roughness={0.2}
            clearcoat={0.4}
          />
        </mesh>

        {/* Center Brilliant Core */}
        <mesh>
          <octahedronGeometry args={[0.35]} />
          <meshPhysicalMaterial
            color="#f6e7b4"
            emissive="#d4af37"
            emissiveIntensity={0.3}
            metalness={0.8}
            roughness={0.1}
          />
        </mesh>
      </group>
    </Float>
  );
}
