"use client";

import React, { useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import {
  PresentationControls,
  ContactShadows,
  Html,
} from "@react-three/drei";
import { createAntiqueGoldMaterial, createVelvetMaterial } from "../materials/materials";
import { GemMesh } from "./GemMesh";
import { Sparkles, ShieldCheck, Scale, Gem, X } from "lucide-react";

export type Product3DType = "kada" | "emerald-pendant" | "sapphire-ring" | "nakshi-choker";

interface Annotation {
  id: string;
  position: [number, number, number];
  title: string;
  description: string;
  icon: typeof ShieldCheck;
}

interface ProductViewer3DProps {
  productType?: Product3DType;
  autoRotate?: boolean;
  interactive?: boolean;
  showAnnotations?: boolean;
}

export function ProductViewer3D({
  productType = "emerald-pendant",
  autoRotate = true,
  showAnnotations = true,
}: ProductViewer3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [activeAnnotation, setActiveAnnotation] = useState<string | null>(null);

  const goldMaterial = useMemo(() => createAntiqueGoldMaterial(), []);
  const velvetMaterial = useMemo(() => createVelvetMaterial("#071a14"), []);

  // Hotspot annotations by product
  const annotations: Annotation[] = useMemo(() => {
    switch (productType) {
      case "emerald-pendant":
        return [
          {
            id: "huid",
            position: [0, 1.2, 0.4],
            title: "Govt. BIS HUID Laser Inscribed",
            description: "6-digit unique alphanumeric hallmark on the bail.",
            icon: ShieldCheck,
          },
          {
            id: "gem",
            position: [0, 0, 0.6],
            title: "Natural Untreated Panna",
            description: "Certified Zambian emerald with open-back setting.",
            icon: Gem,
          },
          {
            id: "weight",
            position: [0, -1.2, 0.4],
            title: "Gross Weight: 8.42g",
            description: "Net 18K Gold: 6.80g verified on digital scale.",
            icon: Scale,
          },
        ];
      case "kada":
        return [
          {
            id: "purity",
            position: [1.3, 0, 0.4],
            title: "22K 916 Solid Gold",
            description: "Hand-forged fluted grooves by in-house karigars.",
            icon: Sparkles,
          },
          {
            id: "weight",
            position: [-1.3, 0, 0.4],
            title: "Weight: 38.50g",
            description: "Solid heavy-gauge heirloom construction.",
            icon: Scale,
          },
        ];
      case "sapphire-ring":
        return [
          {
            id: "gem",
            position: [0, 0.9, 0.4],
            title: "Natural Ceylon Blue Sapphire",
            description: "3.25 carats, unheated, certified royal blue hue.",
            icon: Gem,
          },
          {
            id: "hallmark",
            position: [0, -0.8, 0.4],
            title: "BIS 22K Hallmarked Shank",
            description: "Comfort-fit band with traditional astrological open culet.",
            icon: ShieldCheck,
          },
        ];
      default:
        return [];
    }
  }, [productType]);

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current && !activeAnnotation) {
      groupRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <group>
      {/* Studio Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 5, 5]} intensity={1.8} color="#fff6e0" castShadow />
      <directionalLight position={[-4, 2, -3]} intensity={0.8} color="#8ecae6" />
      <pointLight position={[0, 2, 3]} intensity={1.5} color="#ffd700" distance={8} />

      {/* Velvet Plinth Stand */}
      <mesh position={[0, -1.8, 0]} material={velvetMaterial} receiveShadow>
        <cylinderGeometry args={[2.4, 2.6, 0.4, 48]} />
      </mesh>
      {/* Polished Gold Trim around Plinth */}
      <mesh position={[0, -1.6, 0]} material={goldMaterial}>
        <torusGeometry args={[2.4, 0.04, 16, 48]} />
      </mesh>

      {/* Presentation Controls for Interactive 360 Dragging */}
      <PresentationControls
        global={false}
        cursor={true}
        speed={1.5}
        zoom={1.2}
        rotation={[0.1, 0.2, 0]}
        polar={[-Math.PI / 4, Math.PI / 4]}
        azimuth={[-Math.PI, Math.PI]}
      >
        <group ref={groupRef} position={[0, -0.2, 0]}>
          {/* 1. Emerald Pendant Model */}
          {productType === "emerald-pendant" && (
            <group>
              {/* Outer 18K Bezel Frame */}
              <mesh material={goldMaterial} castShadow>
                <boxGeometry args={[1.8, 2.2, 0.35]} />
              </mesh>
              {/* Inner Cut Emerald */}
              <group position={[0, 0, 0.15]}>
                <GemMesh type="emerald" cut="emeraldCut" scale={1.1} rotationSpeed={0} />
              </group>
              {/* Pendant Bail / Loop */}
              <mesh position={[0, 1.4, 0]} rotation={[0, 0, 0]} material={goldMaterial}>
                <torusGeometry args={[0.3, 0.08, 16, 32]} />
              </mesh>
              {/* Tiny diamond accent halo beads */}
              {[-0.7, 0, 0.7].map((x, i) => (
                <mesh key={i} position={[x, -1.25, 0.1]} material={goldMaterial}>
                  <sphereGeometry args={[0.08, 12, 12]} />
                </mesh>
              ))}
            </group>
          )}

          {/* 2. Solid Fluted Kada Model */}
          {productType === "kada" && (
            <group rotation={[Math.PI / 3, 0, 0]}>
              <mesh material={goldMaterial} castShadow>
                <torusGeometry args={[1.5, 0.35, 32, 64]} />
              </mesh>
              {/* Fluted Clasp details */}
              <mesh position={[0, 1.5, 0]} material={goldMaterial}>
                <cylinderGeometry args={[0.42, 0.42, 0.5, 24]} />
              </mesh>
            </group>
          )}

          {/* 3. Imperial Sapphire Ring Model */}
          {productType === "sapphire-ring" && (
            <group position={[0, -0.3, 0]}>
              {/* Ring Shank */}
              <mesh rotation={[Math.PI / 2, 0, 0]} material={goldMaterial} castShadow>
                <torusGeometry args={[1.0, 0.18, 24, 48]} />
              </mesh>
              {/* Crown Cathedral Bezel */}
              <mesh position={[0, 1.05, 0]} material={goldMaterial}>
                <cylinderGeometry args={[0.75, 0.6, 0.35, 16]} />
              </mesh>
              {/* Center Blue Sapphire */}
              <group position={[0, 1.25, 0]}>
                <GemMesh type="blueSapphire" cut="brilliant" scale={0.8} rotationSpeed={0} />
              </group>
            </group>
          )}

          {/* 4. Nakshi Temple Choker Model */}
          {productType === "nakshi-choker" && (
            <group rotation={[0.2, 0, 0]}>
              {/* Arch collar band */}
              <mesh material={goldMaterial} castShadow>
                <torusGeometry args={[1.8, 0.22, 16, 48, Math.PI * 0.9]} />
              </mesh>
              {/* Center Medallion */}
              <mesh position={[0, -0.8, 0.1]} material={goldMaterial}>
                <cylinderGeometry args={[0.7, 0.7, 0.15, 32]} />
              </mesh>
              <group position={[0, -0.8, 0.2]}>
                <GemMesh type="ruby" cut="brilliant" scale={0.5} rotationSpeed={0} />
              </group>
            </group>
          )}

          {/* Pulsing Hotspot Annotations */}
          {showAnnotations &&
            annotations.map((anno) => {
              const isOpen = activeAnnotation === anno.id;
              const Icon = anno.icon;
              return (
                <Html key={anno.id} position={anno.position} center>
                  <div className="relative group">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveAnnotation(isOpen ? null : anno.id);
                      }}
                      className="w-5 h-5 rounded-full bg-[#d4af37] border-2 border-white shadow-lg flex items-center justify-center cursor-pointer transition-transform hover:scale-125 focus:outline-none"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#08241b] animate-ping" />
                    </button>

                    {/* Popover Mini Card */}
                    {isOpen && (
                      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 w-56 p-3 rounded-xs bg-[#08241b]/95 border border-[#d4af37] text-white shadow-2xl backdrop-blur-md z-50 animate-in fade-in zoom-in-95">
                        <div className="flex items-start justify-between gap-1 mb-1">
                          <div className="flex items-center gap-1 text-[11px] font-semibold text-[#f3e5ab]">
                            <Icon className="w-3.5 h-3.5 text-[#d4af37]" />
                            <span>{anno.title}</span>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveAnnotation(null);
                            }}
                            className="text-[#a8b6af] hover:text-white"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[10px] text-[#dde5dc] leading-relaxed">
                          {anno.description}
                        </p>
                      </div>
                    )}
                  </div>
                </Html>
              );
            })}
        </group>
      </PresentationControls>

      {/* Soft Contact Shadow beneath the plinth */}
      <ContactShadows
        position={[0, -2.0, 0]}
        opacity={0.65}
        scale={6}
        blur={2}
        far={3}
        color="#04120d"
      />
    </group>
  );
}
