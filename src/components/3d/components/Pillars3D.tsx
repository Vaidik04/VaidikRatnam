"use client";

import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { GemMesh } from "./GemMesh";
import { StudioEnvironment } from "./StudioEnvironment";

export type PillarItemType = "kalash" | "medallion" | "gemstone" | "hallmark";

interface PillarItem3DProps {
  type: PillarItemType;
  isHovered?: boolean;
}

export function PillarItem3D({ type, isHovered = false }: PillarItem3DProps) {
  const meshRef = useRef<THREE.Group>(null);

  // Radiant 22K Antique Temple Gold Material with intrinsic diffuse luster & softbox reflection
  const goldMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#ffd966"),
      emissive: new THREE.Color("#6b5010"),
      emissiveIntensity: 0.25,
      metalness: 0.72,
      roughness: 0.18,
      clearcoat: 0.7,
      clearcoatRoughness: 0.1,
      reflectivity: 0.95,
    });
  }, []);

  const copperLeafMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#b87333"),
      emissive: new THREE.Color("#3d1e08"),
      emissiveIntensity: 0.2,
      metalness: 0.6,
      roughness: 0.35,
    });
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const speed = isHovered ? 1.4 : 0.6;
    meshRef.current.rotation.y += delta * speed;
    if (isHovered) {
      meshRef.current.scale.lerp(new THREE.Vector3(1.12, 1.12, 1.12), 0.1);
    } else {
      meshRef.current.scale.lerp(new THREE.Vector3(1.0, 1.0, 1.0), 0.1);
    }
  });

  return (
    <group>
      {/* Zero-Asset Studio Environment for Warm Temple Reflections */}
      <StudioEnvironment />

      {/* Balanced 4-Point High-Jewellery Studio Lighting */}
      <ambientLight intensity={1.2} color="#fff8e7" />
      <directionalLight position={[3, 5, 4]} intensity={2.2} color="#fff6e0" />
      <directionalLight position={[-4, -2, -3]} intensity={1.2} color="#d4af37" />
      <pointLight position={[0, 1, 2.5]} intensity={1.5} color="#ffd700" distance={6} />
      <pointLight position={[0, -2, -1]} intensity={0.8} color="#e5c158" distance={5} />

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <group ref={meshRef}>
          {type === "kalash" && (
            // Sacred 22K Temple Gold Kalash with Flared Rim & Coconut
            <group position={[0, -0.3, 0]}>
              {/* Fluted Gold Base Pot */}
              <mesh material={goldMaterial}>
                <sphereGeometry args={[0.75, 32, 24]} />
              </mesh>

              {/* Pedestal Stand Ring */}
              <mesh position={[0, -0.68, 0]} material={goldMaterial}>
                <cylinderGeometry args={[0.42, 0.48, 0.12, 32]} />
              </mesh>

              {/* Waist Band Ornament */}
              <mesh position={[0, 0, 0]} material={goldMaterial}>
                <torusGeometry args={[0.76, 0.03, 16, 48]} />
              </mesh>

              {/* Tapered Neck */}
              <mesh position={[0, 0.55, 0]} material={goldMaterial}>
                <cylinderGeometry args={[0.38, 0.46, 0.35, 32]} />
              </mesh>

              {/* Flared Gold Lip */}
              <mesh position={[0, 0.75, 0]} material={goldMaterial}>
                <torusGeometry args={[0.45, 0.08, 16, 40]} />
              </mesh>

              {/* Mango Leaves Ring around rim */}
              {Array.from({ length: 5 }).map((_, i) => {
                const angle = (i * Math.PI * 2) / 5;
                const lx = Math.cos(angle) * 0.42;
                const lz = Math.sin(angle) * 0.42;
                return (
                  <mesh
                    key={`leaf-${i}`}
                    position={[lx, 0.88, lz]}
                    rotation={[0.35, -angle, 0]}
                    material={copperLeafMaterial}
                  >
                    <coneGeometry args={[0.12, 0.35, 4]} />
                  </mesh>
                );
              })}

              {/* Sacred Coconut Top */}
              <mesh position={[0, 1.05, 0]}>
                <sphereGeometry args={[0.34, 24, 20]} />
                <meshStandardMaterial
                  color="#633918"
                  roughness={0.8}
                  metalness={0.1}
                />
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
            <group scale={1.2}>
              <GemMesh type="emerald" cut="emeraldCut" scale={0.95} rotationSpeed={0} />
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
