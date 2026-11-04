"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface PlanetDef {
  name: string;
  color: string;
  size: number;
  radius: number;
  speed: number;
  tilt: number;
}

const NAVAGRAHA_SATELLITES: PlanetDef[] = [
  { name: "Ruby (Sun)", color: "#9b111e", size: 0.12, radius: 1.8, speed: 0.4, tilt: 0.2 },
  { name: "Pearl (Moon)", color: "#f8f9fa", size: 0.1, radius: 2.3, speed: -0.3, tilt: -0.3 },
  { name: "Coral (Mars)", color: "#e63946", size: 0.09, radius: 2.8, speed: 0.25, tilt: 0.4 },
  { name: "Emerald (Mercury)", color: "#0f7a4a", size: 0.11, radius: 3.2, speed: -0.5, tilt: 0.1 },
  { name: "Yellow Sapphire (Jupiter)", color: "#f3c053", size: 0.15, radius: 3.7, speed: 0.18, tilt: -0.2 },
  { name: "Diamond (Venus)", color: "#e0f2fe", size: 0.13, radius: 4.1, speed: -0.35, tilt: 0.3 },
  { name: "Blue Sapphire (Saturn)", color: "#1d3b8b", size: 0.14, radius: 4.6, speed: 0.15, tilt: -0.4 },
];

export function OrbitingPlanets() {
  const groupRef = useRef<THREE.Group>(null);
  const planetMeshes = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    NAVAGRAHA_SATELLITES.forEach((p, idx) => {
      const mesh = planetMeshes.current[idx];
      if (mesh) {
        const angle = t * p.speed + idx * 0.9;
        const x = Math.cos(angle) * p.radius;
        const z = Math.sin(angle) * p.radius;
        const y = Math.sin(angle * 1.5) * p.tilt * p.radius;
        mesh.position.set(x, y, z);
        mesh.rotation.y += 0.02;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {NAVAGRAHA_SATELLITES.map((p, idx) => (
        <group key={p.name}>
          {/* Faint gold orbit path ring */}
          <mesh rotation={[Math.PI / 2 + p.tilt, 0, 0]}>
            <ringGeometry args={[p.radius - 0.005, p.radius + 0.005, 64]} />
            <meshBasicMaterial
              color="#d4af37"
              transparent
              opacity={0.12}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Orbiting Planet Sphere */}
          <mesh
            ref={(el) => {
              planetMeshes.current[idx] = el;
            }}
          >
            <sphereGeometry args={[p.size, 24, 24]} />
            <meshPhysicalMaterial
              color={p.color}
              metalness={0.2}
              roughness={0.15}
              clearcoat={0.6}
              clearcoatRoughness={0.1}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

