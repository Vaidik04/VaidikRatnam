"use client";

import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { createAntiqueGoldMaterial } from "../materials/materials";

/**
 * Procedural 3D VR Monogram geometry (intertwined V & R crest)
 */
function createVRMonogramGeometry(): THREE.BufferGeometry {
  const shape = new THREE.Shape();

  // Outer stylized V & R contour
  // Left arm of V
  shape.moveTo(-1.6, 1.8);
  shape.lineTo(-0.9, 1.8);
  shape.lineTo(-0.1, -1.2);
  shape.lineTo(0.7, 1.8);
  shape.lineTo(1.4, 1.8);
  shape.lineTo(0.3, -1.8);
  shape.lineTo(-0.5, -1.8);
  shape.closePath();

  // Right upper loop of R
  const rLoop = new THREE.Path();
  rLoop.moveTo(0.1, 0.4);
  rLoop.lineTo(0.9, 0.4);
  rLoop.quadraticCurveTo(1.6, 0.4, 1.6, 1.1);
  rLoop.quadraticCurveTo(1.6, 1.8, 0.9, 1.8);
  rLoop.lineTo(0.1, 1.8);
  rLoop.closePath();
  shape.holes.push(rLoop);

  const extrudeSettings: THREE.ExtrudeGeometryOptions = {
    steps: 2,
    depth: 0.35,
    bevelEnabled: true,
    bevelThickness: 0.15,
    bevelSize: 0.1,
    bevelOffset: 0,
    bevelSegments: 4,
  };

  const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geom.center();
  geom.computeVertexNormals();
  return geom;
}

export function Preloader3D() {
  const meshRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  const monogramGeometry = useMemo(() => createVRMonogramGeometry(), []);
  const goldMaterial = useMemo(() => createAntiqueGoldMaterial(), []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Slow majestic rotation
      meshRef.current.rotation.y += delta * 0.75;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
    }

    if (lightRef.current) {
      // Rotating highlight light catching gold bevels
      const angle = state.clock.elapsedTime * 1.5;
      lightRef.current.position.x = Math.cos(angle) * 3;
      lightRef.current.position.z = Math.sin(angle) * 3 + 2;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 4]} intensity={1.8} color="#fff6e0" />
      <directionalLight position={[-3, -2, -2]} intensity={0.6} color="#8ecae6" />
      <pointLight ref={lightRef} intensity={2.5} color="#ffd700" distance={10} />

      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh
          ref={meshRef}
          geometry={monogramGeometry}
          material={goldMaterial}
          scale={1.2}
          castShadow
        />
      </Float>

      <Sparkles count={80} scale={4} size={2.5} speed={0.4} color="#ffd700" />
    </group>
  );
}

