"use client";

import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { createAntiqueGoldMaterial } from "../materials/materials";
import { GemMesh } from "./GemMesh";

export type PillarItemType = "kalash" | "medallion" | "gemstone" | "hallmark";

interface PillarItem3DProps {
  type: PillarItemType;
  isHovered?: boolean;
}

export function PillarItem3D({ type, isHovered = false }: PillarItem3DProps) {
  const meshRef = useRef<THREE.Group>(null);
  const goldMaterial = useMemo(() => createAntiqueGoldMaterial(), []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const speed = isHovered ? 1.6 : 0.6;
    meshRef.current.rotation.y += delta * speed;
    if (isHovered) {
      meshRef.current.scale.lerp(new THREE.Vector3(1.15, 1.15, 1.15), 0.1);
    } else {
      meshRef.current.scale.lerp(new THREE.Vector3(1.0, 1.0, 1.0), 0.1);
    }
  });

  return (
    <group>
      <ambientLight intensity={0.7} />
      <directionalLight position={[2, 3, 3]} intensity={1.5} color="#fff6e0" />
      <pointLight position={[0, 0, 2]} intensity={1.2} color="#ffd700" />

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <group ref={meshRef}>
          {type === "kalash" && (
            // Sacred Kalash & Coconut
            <group position={[0, -0.2, 0]}>
              {/* Base Pot */}
              <mesh material={goldMaterial}>
                <sphereGeometry args={[0.7, 32, 24]} />
              </mesh>
              {/* Rim */}
              <mesh position={[0, 0.6, 0]} material={goldMaterial}>
                <torusGeometry args={[0.4, 0.08, 16, 32]} />
              </mesh>
              {/* Sacred Coconut Top */}
              <mesh position={[0, 0.85, 0]}>
                <coneGeometry args={[0.35, 0.6, 16]} />
                <meshStandardMaterial color="#6a3818" roughness={0.7} />
              </mesh>
            </group>
          )}

          {type === "medallion" && (
            // Jyotish Kundali Chakra Medallion
            <group>
              <mesh material={goldMaterial}>
                <cylinderGeometry args={[0.9, 0.9, 0.1, 32]} />
              </mesh>
              {/* Raised Kundali Rhombus & Cross */}
              <mesh position={[0, 0, 0.06]} rotation={[0, 0, Math.PI / 4]} material={goldMaterial}>
                <boxGeometry args={[0.7, 0.7, 0.05]} />
              </mesh>
              <mesh position={[0, 0, 0.07]} material={goldMaterial}>
                <ringGeometry args={[0.75, 0.85, 32]} />
              </mesh>
            </group>
          )}

          {type === "gemstone" && (
            // Faceted Natural Emerald Crystal
            <group scale={1.1}>
              <GemMesh type="emerald" cut="emeraldCut" scale={0.9} rotationSpeed={0} />
            </group>
          )}

          {type === "hallmark" && (
            // BIS Hallmark Seal Stamp (Triangle Seal)
            <group position={[0, 0, 0]}>
              <mesh material={goldMaterial}>
                <cylinderGeometry args={[0.85, 0.85, 0.15, 3]} />
              </mesh>
              <mesh position={[0, 0, 0.09]} rotation={[0, 0, 0]} material={goldMaterial}>
                <torusGeometry args={[0.5, 0.05, 12, 3]} />
              </mesh>
            </group>
          )}
        </group>
      </Float>
    </group>
  );
}

