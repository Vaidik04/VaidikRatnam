"use client";

import React, { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { use3DCapability } from "../context/CapabilityContext";

interface GoldDustProps {
  count?: number;
  radius?: number;
  interactive?: boolean;
}

// Deterministic PRNG to guarantee pure, reproducible render without calling Math.random during render
function seededRandom(seed: number) {
  let t = (seed += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

export function GoldDust({ count: customCount, radius = 5, interactive = true }: GoldDustProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { particlesCount } = use3DCapability();
  const count = customCount || particlesCount;

  // Particle state data deterministically initialized
  const particles = useMemo(() => {
    const temp = [];
    let seed = 42;
    for (let i = 0; i < count; i++) {
      const u = seededRandom(seed++);
      const v = seededRandom(seed++);
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(seededRandom(seed++)) * radius;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = (seededRandom(seed++) - 0.5) * radius * 1.5;
      const z = r * Math.sin(phi) * Math.sin(theta);

      temp.push({
        origin: new THREE.Vector3(x, y, z),
        position: new THREE.Vector3(x, y, z),
        scale: 0.015 + seededRandom(seed++) * 0.03,
        speed: 0.2 + seededRandom(seed++) * 0.5,
        phase: seededRandom(seed++) * Math.PI * 2,
      });
    }
    return temp;
  }, [count, radius]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    if (!meshRef.current) return;
    const goldColor = new THREE.Color("#d4af37");
    const paleGold = new THREE.Color("#fff2b2");

    for (let i = 0; i < count; i++) {
      const mixedColor = goldColor.clone().lerp(paleGold, Math.random() * 0.6);
      meshRef.current.setColorAt(i, mixedColor);
    }
    meshRef.current.instanceColor!.needsUpdate = true;
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const pointerX = state.pointer.x * (radius * 0.5);
    const pointerY = state.pointer.y * (radius * 0.5);

    particles.forEach((p, i) => {
      // Floating harmonic drift
      const dy = Math.sin(time * p.speed + p.phase) * 0.15;
      const dx = Math.cos(time * p.speed * 0.8 + p.phase) * 0.1;
      p.position.set(p.origin.x + dx, p.origin.y + dy, p.origin.z);

      // Mouse repulsion in 3D
      if (interactive) {
        const dist = Math.hypot(p.position.x - pointerX, p.position.y - pointerY);
        if (dist < 1.8) {
          const force = (1.8 - dist) * 0.3;
          p.position.x += (p.position.x - pointerX) * force;
          p.position.y += (p.position.y - pointerY) * force;
        }
      }

      dummy.position.copy(p.position);
      // Twinkle scale
      const twinkle = p.scale * (0.7 + 0.6 * Math.sin(time * 3 + p.phase));
      dummy.scale.set(twinkle, twinkle, twinkle);
      dummy.updateMatrix();

      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, count]}
      frustumCulled={false}
    >
      <sphereGeometry args={[1, 6, 6]} />
      <meshPhysicalMaterial
        color="#ffd700"
        emissive="#d4af37"
        emissiveIntensity={0.6}
        roughness={0.2}
        metalness={0.9}
        toneMapped={false}
      />
    </instancedMesh>
  );
}
