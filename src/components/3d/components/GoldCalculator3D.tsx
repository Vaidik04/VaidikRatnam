"use client";

import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Float, ContactShadows } from "@react-three/drei";
import { createGoldBarGeometry, createGoldCoinGeometry } from "../geometries/GemGeometries";
import { createPolishedGoldMaterial } from "../materials/materials";
import { StudioEnvironment } from "./StudioEnvironment";

interface GoldCalculator3DProps {
  weightGrams?: number;
  purity?: "24k" | "22k" | "18k" | "14k";
}

export function GoldCalculator3D({
  weightGrams = 24,
  purity = "22k",
}: GoldCalculator3DProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Number of stacked bars based on weight (1 bar per 15-20g, min 1, max 6)
  const barCount = useMemo(() => {
    return Math.min(Math.max(Math.round(weightGrams / 20), 1), 6);
  }, [weightGrams]);

  const barGeometry = useMemo(() => createGoldBarGeometry(1.6, 2.8, 0.45), []);
  const coinGeometry = useMemo(() => createGoldCoinGeometry(0.65, 0.12), []);
  const goldMaterial = useMemo(() => createPolishedGoldMaterial(purity), [purity]);

  useFrame((state) => {
    if (!groupRef.current) return;
    // Gentle mouse parallax tilt
    const targetRotY = (state.pointer.x * Math.PI) / 8 + 0.4;
    const targetRotX = (-state.pointer.y * Math.PI) / 12 + 0.3;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotY,
      0.05
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotX,
      0.05
    );
  });

  return (
    <group>
      <StudioEnvironment />
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 4]} intensity={1.8} color="#fff6e0" castShadow />
      <directionalLight position={[-3, -2, -2]} intensity={0.6} color="#8ecae6" />
      <pointLight position={[0, 2, 2]} intensity={1.5} color="#ffd700" distance={6} />

      <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.25}>
        <group ref={groupRef} position={[0, -0.6, 0]}>
          {/* Stack of Gold Ingots */}
          {Array.from({ length: barCount }).map((_, i) => {
            const posY = i * 0.48;
            const rotZ = (i % 2 === 0 ? 0 : 0.08) * (i > 0 ? 1 : 0);
            return (
              <group key={i} position={[0, posY, 0]} rotation={[0, 0, rotZ]}>
                <mesh geometry={barGeometry} material={goldMaterial} castShadow receiveShadow />
                {/* Top Stamp Inscription */}
                <mesh position={[0, 0, 0.24]} material={goldMaterial}>
                  <boxGeometry args={[1.1, 1.8, 0.02]} />
                </mesh>
              </group>
            );
          })}

          {/* Adjacent celebratory gold coins */}
          <group position={[1.4, 0, 0.6]} rotation={[Math.PI / 2, 0, 0.3]}>
            <mesh geometry={coinGeometry} material={goldMaterial} castShadow />
          </group>
          <group position={[1.7, 0, 0.1]} rotation={[Math.PI / 2, 0, -0.4]}>
            <mesh geometry={coinGeometry} material={goldMaterial} castShadow />
          </group>
        </group>
      </Float>

      <ContactShadows
        position={[0, -1.8, 0]}
        opacity={0.6}
        scale={5}
        blur={2}
        far={3}
        color="#081e16"
      />
    </group>
  );
}

