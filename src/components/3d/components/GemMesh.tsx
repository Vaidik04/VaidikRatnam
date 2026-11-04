"use client";

import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial } from "@react-three/drei";
import { use3DCapability } from "../context/CapabilityContext";
import {
  createEmeraldCutGeometry,
  createBrilliantCutGeometry,
  createCabochonGeometry,
} from "../geometries/GemGeometries";
import { GEM_PROPERTIES } from "../materials/materials";

export type GemType = keyof typeof GEM_PROPERTIES;
export type GemCut = "emeraldCut" | "brilliant" | "cabochon";

interface GemMeshProps {
  type?: GemType;
  cut?: GemCut;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
  rotationSpeed?: number;
  interactive?: boolean;
}

export function GemMesh({
  type = "emerald",
  cut = "emeraldCut",
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  rotationSpeed = 0.5,
  interactive = false,
}: GemMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { canUseTransmission } = use3DCapability();
  const gemProps = GEM_PROPERTIES[type];

  const geometry = useMemo(() => {
    switch (cut) {
      case "emeraldCut":
        return createEmeraldCutGeometry();
      case "brilliant":
        return createBrilliantCutGeometry();
      case "cabochon":
        return createCabochonGeometry();
      default:
        return createEmeraldCutGeometry();
    }
  }, [cut]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    if (rotationSpeed > 0) {
      meshRef.current.rotation.y += delta * rotationSpeed;
    }
    if (interactive) {
      // Smooth cursor parallax response
      const targetX = (state.pointer.x * Math.PI) / 6;
      const targetY = (-state.pointer.y * Math.PI) / 8;
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        targetY,
        0.05
      );
      meshRef.current.rotation.z = THREE.MathUtils.lerp(
        meshRef.current.rotation.z,
        targetX,
        0.05
      );
    }
  });

  // Authentic luminous gem colors
  const gemColor = type === "emerald" ? "#10b981" : gemProps.color;
  const gemEmissive = type === "emerald" ? "#044e34" : "#000000";

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      position={position}
      rotation={rotation}
      scale={scale}
      castShadow
      receiveShadow
    >
      {canUseTransmission && "transmission" in gemProps && gemProps.transmission ? (
        <MeshTransmissionMaterial
          backside
          samples={4}
          resolution={512}
          transmission={0.98}
          roughness={0.02}
          thickness={1.4}
          ior={gemProps.ior}
          chromaticAberration={0.06}
          anisotropy={0.2}
          distortion={0.08}
          distortionScale={0.2}
          temporalDistortion={0.05}
          color={gemColor}
        />
      ) : (
        <meshPhysicalMaterial
          color={gemColor}
          emissive={gemEmissive}
          emissiveIntensity={0.25}
          metalness={0.05}
          roughness={0.04}
          clearcoat={1.0}
          clearcoatRoughness={0.04}
          reflectivity={1.0}
          transmission={0.85}
          ior={gemProps.ior}
        />
      )}
    </mesh>
  );
}
