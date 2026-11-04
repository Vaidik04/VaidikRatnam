"use client";

import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { createAntiqueGoldMaterial } from "../materials/materials";
import { StudioEnvironment } from "./StudioEnvironment";

export function Footer3D() {
  const groupRef = useRef<THREE.Group>(null);
  const goldMaterial = useMemo(() => createAntiqueGoldMaterial(), []);

  useFrame((state) => {
    if (!groupRef.current) return;
    // Cursor light tracking and gentle tilt
    const targetRotX = (-state.pointer.y * Math.PI) / 16;
    const targetRotY = (state.pointer.x * Math.PI) / 16;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotX,
      0.05
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotY,
      0.05
    );
  });

  return (
    <group position={[0, 0, 0]}>
      <StudioEnvironment />
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 4, 3]} intensity={1.5} color="#fff6e0" />
      <pointLight position={[0, 0, 2]} intensity={2.0} color="#ffd700" distance={6} />

      <group ref={groupRef}>
        {/* Architectural 3D Crest Arch above Footer */}
        <mesh position={[0, 0.4, 0]} material={goldMaterial}>
          <torusGeometry args={[1.6, 0.05, 16, 64, Math.PI]} />
        </mesh>
        <mesh position={[0, 0.45, 0]} material={goldMaterial}>
          <sphereGeometry args={[0.12, 16, 16]} />
        </mesh>
      </group>

      {/* Upward Drifting Gold Sparkles */}
      <Sparkles
        count={60}
        scale={[6, 3, 2]}
        size={2.5}
        speed={0.8}
        color="#ffd700"
        position={[0, 0, 0]}
      />
    </group>
  );
}

