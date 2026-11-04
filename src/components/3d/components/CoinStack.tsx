"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float } from "@react-three/drei";
import { StudioEnvironment } from "./StudioEnvironment";

interface CoinStackProps {
  weightGrams?: number;
  purityKarat?: number;
}

export function CoinStack({
  weightGrams = 25,
  purityKarat = 22,
}: CoinStackProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  // Material tone adjusted per karat
  const goldColor = React.useMemo(() => {
    switch (purityKarat) {
      case 24:
        return "#f5c518"; // Pure rich sun gold
      case 22:
        return "#d4af37"; // Deep traditional Indian 916 gold
      case 18:
        return "#e5c158"; // Paler European gold
      case 14:
        return "#dca484"; // Warm roseate alloy
      default:
        return "#d4af37";
    }
  }, [purityKarat]);

  // Number of stacked coins proportional to weight
  const count = Math.min(Math.max(Math.round(weightGrams / 5), 1), 12);

  return (
    <group>
      <StudioEnvironment />
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <group ref={groupRef} position={[0, -0.4, 0]}>
          {Array.from({ length: count }).map((_, idx) => (
            <mesh
              key={`coin-${idx}`}
              position={[0, idx * 0.08, 0]}
              rotation={[0, idx * 0.25, 0]}
              castShadow
              receiveShadow
            >
              <cylinderGeometry args={[0.7, 0.7, 0.06, 48]} />
              <meshPhysicalMaterial
                color={goldColor}
                emissive="#59430c"
                emissiveIntensity={0.22}
                metalness={0.82}
                roughness={0.08}
                clearcoat={0.7}
                clearcoatRoughness={0.05}
                envMapIntensity={1.8}
              />
            </mesh>
          ))}
        </group>
      </Float>
    </group>
  );
}

