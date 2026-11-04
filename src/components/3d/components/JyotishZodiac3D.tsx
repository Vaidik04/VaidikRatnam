"use client";

import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { createAntiqueGoldMaterial } from "../materials/materials";
import { GemMesh } from "./GemMesh";

interface JyotishZodiac3DProps {
  selectedSignIndex?: number;
}

const RASHI_DATA = [
  { name: "Mesha", gem: "redCoral" as const, cut: "cabochon" as const },
  { name: "Vrishabha", gem: "diamond" as const, cut: "brilliant" as const },
  { name: "Mithuna", gem: "emerald" as const, cut: "emeraldCut" as const },
  { name: "Karka", gem: "pearl" as const, cut: "cabochon" as const },
  { name: "Simha", gem: "ruby" as const, cut: "brilliant" as const },
  { name: "Kanya", gem: "emerald" as const, cut: "emeraldCut" as const },
  { name: "Tula", gem: "diamond" as const, cut: "brilliant" as const },
  { name: "Vrischika", gem: "redCoral" as const, cut: "cabochon" as const },
  { name: "Dhanu", gem: "yellowSapphire" as const, cut: "emeraldCut" as const },
  { name: "Makara", gem: "blueSapphire" as const, cut: "brilliant" as const },
  { name: "Kumbha", gem: "blueSapphire" as const, cut: "brilliant" as const },
  { name: "Meena", gem: "yellowSapphire" as const, cut: "emeraldCut" as const },
];

export function JyotishZodiac3D({ selectedSignIndex = 0 }: JyotishZodiac3DProps) {
  const wheelRef = useRef<THREE.Group>(null);
  const planetsRef = useRef<THREE.Group>(null);

  const goldMaterial = useMemo(() => createAntiqueGoldMaterial(), []);

  // 12 Outer armillary segment markers
  const segmentAngles = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => (i * Math.PI * 2) / 12);
  }, []);

  const activeRashi = RASHI_DATA[selectedSignIndex % 12];
  const targetRotation = useMemo(() => {
    return -(selectedSignIndex * (Math.PI * 2)) / 12;
  }, [selectedSignIndex]);

  useFrame((state, delta) => {
    if (wheelRef.current) {
      // Smoothly rotate wheel to the selected sign
      wheelRef.current.rotation.z = THREE.MathUtils.lerp(
        wheelRef.current.rotation.z,
        targetRotation,
        0.05
      );
    }

    if (planetsRef.current) {
      planetsRef.current.rotation.y += delta * 0.4;
      planetsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 4]} intensity={1.5} color="#fff6e0" />
      <pointLight position={[0, 0, 3]} intensity={1.8} color="#ffd700" distance={8} />

      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
        {/* Armillary Astronomical Sphere Rings */}
        <group rotation={[Math.PI / 6, 0, 0]}>
          {/* Main Equator Ring with 12 Rashi Segments */}
          <group ref={wheelRef}>
            <mesh material={goldMaterial}>
              <torusGeometry args={[2.5, 0.08, 16, 64]} />
            </mesh>
            <mesh material={goldMaterial}>
              <torusGeometry args={[2.7, 0.04, 16, 64]} />
            </mesh>

            {/* 12 Segment Radial Spokes & Gems */}
            {segmentAngles.map((angle, i) => {
              const x = Math.cos(angle) * 2.6;
              const y = Math.sin(angle) * 2.6;
              const isSelected = i === selectedSignIndex;
              return (
                <group key={i} position={[x, y, 0]}>
                  <mesh material={goldMaterial}>
                    <sphereGeometry args={[isSelected ? 0.16 : 0.08, 16, 16]} />
                  </mesh>
                </group>
              );
            })}
          </group>

          {/* Meridian Ring */}
          <mesh rotation={[0, Math.PI / 2, 0]} material={goldMaterial}>
            <torusGeometry args={[2.5, 0.06, 16, 64]} />
          </mesh>

          {/* Oblique Celestial Axis */}
          <mesh rotation={[Math.PI / 4, 0, 0]} material={goldMaterial}>
            <cylinderGeometry args={[0.04, 0.04, 5.6, 16]} />
          </mesh>

          {/* Orbiting Navagraha Planetary Spheres */}
          <group ref={planetsRef}>
            {/* Sun / Surya */}
            <mesh position={[1.4, 0, 0]}>
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshStandardMaterial color="#ffaa00" emissive="#ff6600" emissiveIntensity={1} />
            </mesh>
            {/* Moon / Chandra */}
            <mesh position={[-1.7, 0.5, 0.5]}>
              <sphereGeometry args={[0.14, 16, 16]} />
              <meshStandardMaterial color="#f0f8ff" emissive="#d0e0f0" emissiveIntensity={0.6} />
            </mesh>
            {/* Jupiter / Guru */}
            <mesh position={[0.5, -1.8, -0.6]}>
              <sphereGeometry args={[0.22, 16, 16]} />
              <meshStandardMaterial color="#f5bc28" emissive="#d49a15" emissiveIntensity={0.8} />
            </mesh>
          </group>
        </group>

        {/* Center Floating Auspicious Gemstone for the Selected Rashi */}
        <group position={[0, 0, 0.8]}>
          <GemMesh
            type={activeRashi.gem}
            cut={activeRashi.cut}
            scale={1.2}
            rotationSpeed={0.8}
            interactive={true}
          />
        </group>
      </Float>
    </group>
  );
}

