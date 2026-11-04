"use client";

import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Float, ContactShadows } from "@react-three/drei";
import { GemMesh } from "./GemMesh";
import { GoldDust } from "./GoldDust";
import { StudioEnvironment } from "./StudioEnvironment";

/**
 * Creates an elegant Indian Temple Arched Frame curve.
 */
function createTempleArchCurve(): THREE.CurvePath<THREE.Vector3> {
  const path = new THREE.CurvePath<THREE.Vector3>();

  // Left column
  path.add(
    new THREE.LineCurve3(new THREE.Vector3(-1.8, -2.4, 0), new THREE.Vector3(-1.8, 1.0, 0))
  );

  // Left arc
  path.add(
    new THREE.CubicBezierCurve3(
      new THREE.Vector3(-1.8, 1.0, 0),
      new THREE.Vector3(-1.8, 2.2, 0),
      new THREE.Vector3(-0.6, 2.8, 0),
      new THREE.Vector3(0, 3.2, 0) // apex point
    )
  );

  // Right arc
  path.add(
    new THREE.CubicBezierCurve3(
      new THREE.Vector3(0, 3.2, 0),
      new THREE.Vector3(0.6, 2.8, 0),
      new THREE.Vector3(1.8, 2.2, 0),
      new THREE.Vector3(1.8, 1.0, 0)
    )
  );

  // Right column
  path.add(
    new THREE.LineCurve3(new THREE.Vector3(1.8, 1.0, 0), new THREE.Vector3(1.8, -2.4, 0))
  );

  return path;
}

export function Hero3DScene() {
  const groupRef = useRef<THREE.Group>(null);
  const satellitesRef = useRef<THREE.Group>(null);

  const archGeometry = useMemo(() => {
    const curve = createTempleArchCurve();
    return new THREE.TubeGeometry(curve, 64, 0.09, 16, false);
  }, []);

  // Gleaming 22K Temple Gold material with warm intrinsic radiance
  const goldMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#f1d98a"),
      emissive: new THREE.Color("#524112"),
      emissiveIntensity: 0.35,
      metalness: 0.85,
      roughness: 0.2,
      clearcoat: 0.7,
      clearcoatRoughness: 0.1,
      reflectivity: 0.95,
    });
  }, []);

  useFrame((state, delta) => {
    if (satellitesRef.current) {
      satellitesRef.current.rotation.y += delta * 0.35;
      satellitesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }

    if (groupRef.current) {
      // Smooth cursor parallax tilt
      const targetRotY = (state.pointer.x * Math.PI) / 8;
      const targetRotX = (-state.pointer.y * Math.PI) / 10;
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
    }
  });

  return (
    <group ref={groupRef}>
      {/* Zero-Asset Procedural Studio Environment for True Cartier-Grade Reflections */}
      <StudioEnvironment />

      {/* High-Jewellery Studio Softbox & Gemstone Illumination Rig */}
      <ambientLight intensity={1.4} color="#fffaf0" />
      <directionalLight position={[4, 6, 5]} intensity={2.4} color="#fff6e0" castShadow />
      <directionalLight position={[-4, 2, -2]} intensity={1.5} color="#8ecae6" />

      {/* Emerald Backlight: Passes through the crystal facets to create emerald fire */}
      <pointLight position={[0, 0.3, -0.6]} intensity={3.5} color="#10b981" distance={5} />
      <pointLight position={[0, -1.8, 2]} intensity={1.8} color="#ffd700" distance={6} />

      {/* Floating Centerpiece Arch & Emerald */}
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.35}>
        {/* Arched Temple Frame */}
        <mesh geometry={archGeometry} material={goldMaterial} castShadow receiveShadow />

        {/* Gold bead detailing on arch crown and pillar plinths */}
        <mesh position={[0, 3.32, 0]} material={goldMaterial}>
          <sphereGeometry args={[0.16, 24, 24]} />
        </mesh>
        <mesh position={[-1.8, -2.4, 0]} material={goldMaterial}>
          <cylinderGeometry args={[0.2, 0.22, 0.24, 24]} />
        </mesh>
        <mesh position={[1.8, -2.4, 0]} material={goldMaterial}>
          <cylinderGeometry args={[0.2, 0.22, 0.24, 24]} />
        </mesh>

        {/* Centerpiece Cut Zambian Emerald */}
        <group position={[0, 0.35, 0]}>
          <GemMesh
            type="emerald"
            cut="emeraldCut"
            scale={1.5}
            rotationSpeed={0.4}
            interactive={true}
          />
        </group>
      </Float>

      {/* Orbiting Planetary Gemstones (Navagraha Satellites) */}
      <group ref={satellitesRef} position={[0, 0.35, 0]}>
        {/* Ruby Satellite (Sun/Surya) */}
        <group position={[2.6, 0.4, 0]}>
          <GemMesh type="ruby" cut="brilliant" scale={0.46} rotationSpeed={1.0} />
        </group>

        {/* Blue Sapphire Satellite (Saturn/Shani) */}
        <group position={[-2.4, -0.6, 0.5]}>
          <GemMesh type="blueSapphire" cut="brilliant" scale={0.44} rotationSpeed={0.8} />
        </group>

        {/* Pearl Satellite (Moon/Chandra) */}
        <group position={[0.2, 2.2, -1.8]}>
          <GemMesh type="pearl" cut="cabochon" scale={0.4} rotationSpeed={0.6} />
        </group>
      </group>

      {/* Instanced Twinkling Gold Dust */}
      <GoldDust count={900} radius={4.5} interactive={true} />

      {/* Soft Contact Shadow beneath the assembly */}
      <ContactShadows
        position={[0, -2.6, 0]}
        opacity={0.5}
        scale={6}
        blur={2.5}
        far={4}
        color="#04120d"
      />
    </group>
  );
}
