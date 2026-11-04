"use client";

import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { createAntiqueGoldMaterial } from "../materials/materials";
import { GoldDust } from "./GoldDust";

export function ShopBackground3D() {
  const mandalaRef = useRef<THREE.Group>(null);
  const goldMaterial = useMemo(() => createAntiqueGoldMaterial(), []);

  useFrame((_, delta) => {
    if (!mandalaRef.current) return;
    mandalaRef.current.rotation.z += delta * 0.15;
    mandalaRef.current.rotation.y += delta * 0.08;
  });

  return (
    <group position={[0, 0, -2]}>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 3]} intensity={1.2} color="#ffd700" distance={8} />

      {/* Floating 3D Concentric Mandala Rings */}
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
        <group ref={mandalaRef}>
          {/* Ring 1 */}
          <mesh material={goldMaterial}>
            <torusGeometry args={[2.8, 0.03, 16, 64]} />
          </mesh>
          {/* Ring 2 (Outer) */}
          <mesh material={goldMaterial}>
            <torusGeometry args={[3.6, 0.02, 16, 64]} />
          </mesh>
          {/* 8 Geometric Petal Rays */}
          {Array.from({ length: 8 }).map((_, i) => {
            const rotZ = (i * Math.PI) / 4;
            return (
              <mesh key={i} rotation={[0, 0, rotZ]} material={goldMaterial}>
                <boxGeometry args={[0.04, 7.2, 0.04]} />
              </mesh>
            );
          })}
        </group>
      </Float>

      {/* Ambient Floating Gold Dust */}
      <GoldDust count={400} radius={6} interactive={false} />
    </group>
  );
}

