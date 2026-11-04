"use client";

import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { createGoldCoinGeometry } from "../geometries/GemGeometries";
import { createPolishedGoldMaterial } from "../materials/materials";

interface TrustCoins3DProps {
  activeIndex?: number;
}

export function TrustCoins3D({ activeIndex = 0 }: TrustCoins3DProps) {
  const coinsRef = useRef<THREE.Group>(null);
  const coinGeometry = useMemo(() => createGoldCoinGeometry(0.7, 0.12), []);
  const goldMaterial = useMemo(() => createPolishedGoldMaterial("22k"), []);

  useFrame((state, delta) => {
    if (!coinsRef.current) return;
    coinsRef.current.children.forEach((child, idx) => {
      // Rotate each coin, spinning faster if active
      const speed = idx === activeIndex ? 2.5 : 0.8;
      child.rotation.y += delta * speed;
      child.rotation.z = Math.sin(state.clock.elapsedTime * 1.2 + idx) * 0.1;
    });
  });

  return (
    <group ref={coinsRef}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[2, 3, 4]} intensity={1.5} color="#fff6e0" />
      <pointLight position={[0, 0, 2]} intensity={1.2} color="#ffd700" />

      {/* 4 sequential 3D gold coins matching the 4 trust pillars */}
      {[-2.4, -0.8, 0.8, 2.4].map((posX, i) => (
        <group key={i} position={[posX, 0, 0]}>
          <mesh geometry={coinGeometry} material={goldMaterial} castShadow />
          {/* Inner embossed rim */}
          <mesh position={[0, 0, 0.07]} material={goldMaterial}>
            <ringGeometry args={[0.45, 0.55, 32]} />
          </mesh>
          <mesh position={[0, 0, -0.07]} rotation={[0, Math.PI, 0]} material={goldMaterial}>
            <ringGeometry args={[0.45, 0.55, 32]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
