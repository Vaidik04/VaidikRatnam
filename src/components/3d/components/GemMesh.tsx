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
      // Gentle cursor parallax response
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
          transmission={gemProps.transmission}
          roughness={"roughness" in gemProps ? (gemProps.roughness as number) : 0.05}
          thickness={"thickness" in gemProps ? (gemProps.thickness as number) : 1.2}
          ior={gemProps.ior}
          chromaticAberration={"chromaticAberration" in gemProps ? (gemProps.chromaticAberration as number) : 0.04}
          anisotropy={"anisotropy" in gemProps ? (gemProps.anisotropy as number) : 0.1}
          distortion={"distortion" in gemProps ? (gemProps.distortion as number) : 0.1}
          distortionScale={0.3}
          temporalDistortion={0.1}
          color={gemProps.color}
        />
      ) : (
        <meshPhysicalMaterial
          color={gemProps.color}
          metalness={"metalness" in gemProps ? (gemProps.metalness as number) : 0.1}
          roughness={"roughness" in gemProps ? (gemProps.roughness as number) : 0.1}
          clearcoat={"clearcoat" in gemProps ? (gemProps.clearcoat as number) : 0.8}
          clearcoatRoughness={0.1}
          reflectivity={1}
          transmission={"transmission" in gemProps ? 0.7 : 0}
        />
      )}
    </mesh>
  );
}
