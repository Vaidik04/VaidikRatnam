"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitingPlanets } from "./OrbitingPlanets";

interface ZodiacSphereProps {
  selectedSignIndex?: number;
  radius?: number;
}

export function ZodiacSphere({
  selectedSignIndex = 0,
  radius = 2.4,
}: ZodiacSphereProps) {
  const armillaryRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (armillaryRef.current) {
      // Slow stately cosmic rotation
      armillaryRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group ref={armillaryRef}>
      {/* Outer Ecliptic Celestial Ring */}
      <mesh rotation={[Math.PI / 6, 0, 0]}>
        <torusGeometry args={[radius, 0.02, 16, 100]} />
        <meshPhysicalMaterial
          color="#d4af37"
          metalness={1.0}
          roughness={0.2}
          clearcoat={0.4}
        />
      </mesh>

      {/* Polar Meridian Ring */}
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[radius * 0.98, 0.015, 16, 100]} />
        <meshPhysicalMaterial
          color="#f1d98a"
          metalness={1.0}
          roughness={0.25}
        />
      </mesh>

      {/* Equator Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius * 0.96, 0.015, 16, 100]} />
        <meshPhysicalMaterial
          color="#d4af37"
          metalness={1.0}
          roughness={0.2}
        />
      </mesh>

      {/* Central Radiance Sphere */}
      <mesh>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshPhysicalMaterial
          color="#d4af37"
          emissive="#d4af37"
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* 12 Rashi Zodiac Markers */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * Math.PI * 2) / 12;
        const x = Math.cos(angle) * (radius * 0.98);
        const z = Math.sin(angle) * (radius * 0.98);
        const isSelected = i === selectedSignIndex;

        return (
          <mesh
            key={`rashi-${i}`}
            position={[x, 0, z]}
            scale={isSelected ? 1.4 : 1.0}
          >
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshPhysicalMaterial
              color={isSelected ? "#f6e7b4" : "#a8821f"}
              emissive={isSelected ? "#f6e7b4" : "#000000"}
              emissiveIntensity={isSelected ? 0.8 : 0}
              metalness={0.9}
              roughness={0.2}
            />
          </mesh>
        );
      })}

      {/* Orbiting Navagraha Planets */}
      <OrbitingPlanets />
    </group>
  );
}
