"use client";

import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { createAntiqueGoldMaterial } from "../materials/materials";
import { GemMesh } from "./GemMesh";

interface SketchToGold3DProps {
  step?: number; // 0: Sketch Wireframe, 1: Wax Model, 2: Molten Gold, 3: Solid Gold, 4: Set with Gems
}

export function SketchToGold3D({ step = 0 }: SketchToGold3DProps) {
  const meshRef = useRef<THREE.Group>(null);
  const ringGeometry = useMemo(() => new THREE.TorusGeometry(1.2, 0.22, 24, 48), []);
  const bezelGeometry = useMemo(() => new THREE.CylinderGeometry(0.8, 0.65, 0.45, 24), []);

  // 1. Wireframe sketch material
  const wireframeMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#d4af37",
        wireframe: true,
      }),
    []
  );

  // 2. Carving wax model material (classic matt blue/grey jeweler's wax)
  const waxMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#2a5a75",
        roughness: 0.65,
        metalness: 0.05,
      }),
    []
  );

  // 3. Molten casting gold material (pulsating hot orange-gold glow)
  const moltenMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#ff7700",
        emissive: "#ff4400",
        emissiveIntensity: 1.8,
        roughness: 0.3,
        metalness: 0.8,
      }),
    []
  );

  // 4 & 5. Polished solid 22K gold material
  const solidGoldMaterial = useMemo(() => createAntiqueGoldMaterial(), []);

  // Select material based on step
  const currentRingMaterial = useMemo(() => {
    switch (step) {
      case 0:
        return wireframeMaterial;
      case 1:
        return waxMaterial;
      case 2:
        return moltenMaterial;
      default:
        return solidGoldMaterial;
    }
  }, [step, wireframeMaterial, waxMaterial, moltenMaterial, solidGoldMaterial]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.5;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
  });

  return (
    <group>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 4]} intensity={1.5} color="#fff6e0" />
      <directionalLight position={[-3, -2, -2]} intensity={0.6} color="#8ecae6" />
      {step === 2 && (
        <pointLight position={[0, 0, 0]} intensity={3} color="#ff6600" distance={5} />
      )}

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
        <group ref={meshRef}>
          {/* Ring Shank */}
          <mesh
            geometry={ringGeometry}
            material={currentRingMaterial}
            rotation={[Math.PI / 2, 0, 0]}
            castShadow
          />

          {/* Setting Bezel */}
          <mesh
            position={[0, 1.25, 0]}
            geometry={bezelGeometry}
            material={currentRingMaterial}
            castShadow
          />

          {/* Step 4: Finished Royal Emerald Set into Crown */}
          {step === 4 && (
            <group position={[0, 1.45, 0]}>
              <GemMesh type="emerald" cut="emeraldCut" scale={0.85} rotationSpeed={0} />
              <Sparkles count={40} scale={2} size={3} speed={0.6} color="#48bb78" />
            </group>
          )}

          {/* Step 2: Rising Molten Heat Embers */}
          {step === 2 && (
            <Sparkles count={50} scale={2.5} size={3} speed={1.2} color="#ff6600" />
          )}
        </group>
      </Float>
    </group>
  );
}

