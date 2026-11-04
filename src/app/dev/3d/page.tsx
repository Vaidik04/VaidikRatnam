"use client";

import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Hero3DScene } from "@/components/3d/components/Hero3DScene";
import { Preloader3D } from "@/components/3d/components/Preloader3D";
import { TrustCoins3D } from "@/components/3d/components/TrustCoins3D";
import { PillarItem3D, PillarItemType } from "@/components/3d/components/Pillars3D";
import { ProductViewer3D, Product3DType } from "@/components/3d/components/ProductViewer3D";
import { SketchToGold3D } from "@/components/3d/components/SketchToGold3D";
import { GoldCalculator3D } from "@/components/3d/components/GoldCalculator3D";
import { JyotishZodiac3D } from "@/components/3d/components/JyotishZodiac3D";
import { ShopBackground3D } from "@/components/3d/components/ShopBackground3D";
import { Footer3D } from "@/components/3d/components/Footer3D";
import { CapabilityProvider, use3DCapability } from "@/components/3d/context/CapabilityContext";
import {
  Rotate3D,
  Sparkles,
  Sliders,
  Scale,
  Compass,
  Layers,
  ShieldCheck,
  Eye,
} from "lucide-react";

type SceneKey =
  | "hero"
  | "preloader"
  | "trust"
  | "pillars"
  | "product"
  | "sketchToGold"
  | "goldCalc"
  | "zodiac"
  | "mandala"
  | "footer";

function Dev3DStudio() {
  const [activeScene, setActiveScene] = useState<SceneKey>("hero");
  const [pillarType, setPillarType] = useState<PillarItemType>("kalash");
  const [productType, setProductType] = useState<Product3DType>("emerald-pendant");
  const [sketchStep, setSketchStep] = useState(4);
  const [calcWeight, setCalcWeight] = useState(48);
  const [calcPurity, setCalcPurity] = useState<"24k" | "22k" | "18k" | "14k">("22k");
  const [zodiacIndex, setZodiacIndex] = useState(2); // Mithuna / Emerald

  const { tier, liteMode, setLiteMode, dpr } = use3DCapability();

  return (
    <div className="min-h-screen bg-[#061410] text-[#dde5dc] flex flex-col font-sans">
      {/* Top Tuning Bar */}
      <header className="h-16 border-b border-[#d4af37]/30 bg-[#0a231b] px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/50 flex items-center justify-center">
            <Rotate3D className="w-4 h-4 text-[#d4af37]" />
          </div>
          <div>
            <h1 className="font-serif text-base text-[#f3e5ab] font-medium tracking-wide">
              Vaidik Ratnam &bull; 3D Real-Time Engineering Studio
            </h1>
            <span className="text-[10px] text-[#a8b6af] font-mono uppercase tracking-wider block">
              WebGL2 Shader Tuning &bull; Active Tier: {tier} &bull; DPR: {dpr}
            </span>
          </div>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setLiteMode(!liteMode)}
            className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider border cursor-pointer transition-all ${
              liteMode
                ? "bg-[#d4af37]/20 text-[#f3e5ab] border-[#d4af37]"
                : "bg-white/5 text-[#a8b6af] border-white/10 hover:text-white"
            }`}
          >
            {liteMode ? "Lite Mode Active" : "3D Active"}
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Scene Switcher */}
        <aside className="w-full md:w-64 border-r border-[#d4af37]/20 bg-[#071913] p-4 flex flex-col gap-1.5 overflow-y-auto">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#d4af37] px-2 py-1 block">
            3D Scenes by Section
          </span>

          {[
            { key: "hero", label: "1. Hero Centerpiece", icon: Sparkles },
            { key: "preloader", label: "2. Preloader Monogram", icon: Rotate3D },
            { key: "trust", label: "3. Trust Gold Coins", icon: ShieldCheck },
            { key: "pillars", label: "4. Four Pillars Emblems", icon: Layers },
            { key: "product", label: "5. 360° Product Viewer", icon: Eye },
            { key: "sketchToGold", label: "6. Sketch to Solid Gold", icon: Sliders },
            { key: "goldCalc", label: "7. 3D Gold Calculator", icon: Scale },
            { key: "zodiac", label: "8. Jyotish Zodiac Sphere", icon: Compass },
            { key: "mandala", label: "9. Behind Shop Mandala", icon: Layers },
            { key: "footer", label: "10. Footer Architectural", icon: Sparkles },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeScene === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setActiveScene(item.key as SceneKey)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xs text-xs font-medium transition-all text-left cursor-pointer ${
                  isActive
                    ? "bg-[#0f3d2e] text-[#f3e5ab] border border-[#d4af37]/50 shadow-md"
                    : "text-[#a8b6af] hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-[#d4af37]" : "text-[#7a8c84]"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Center 3D Canvas Viewport */}
        <main className="flex-1 relative bg-[#04120d] flex items-center justify-center">
          <Canvas
            dpr={dpr}
            camera={{ position: [0, 0, 5], fov: 45 }}
            gl={{ antialias: true, alpha: true }}
          >
            <OrbitControls makeDefault enableDamping dampingFactor={0.05} />

            {/* Scene rendering based on active selection */}
            {activeScene === "hero" && <Hero3DScene />}
            {activeScene === "preloader" && <Preloader3D />}
            {activeScene === "trust" && <TrustCoins3D activeIndex={1} />}
            {activeScene === "pillars" && <PillarItem3D type={pillarType} isHovered={true} />}
            {activeScene === "product" && (
              <ProductViewer3D productType={productType} autoRotate={false} showAnnotations={true} />
            )}
            {activeScene === "sketchToGold" && <SketchToGold3D step={sketchStep} />}
            {activeScene === "goldCalc" && (
              <GoldCalculator3D weightGrams={calcWeight} purity={calcPurity} />
            )}
            {activeScene === "zodiac" && <JyotishZodiac3D selectedSignIndex={zodiacIndex} />}
            {activeScene === "mandala" && <ShopBackground3D />}
            {activeScene === "footer" && <Footer3D />}
          </Canvas>

          {/* Interactive parameter inspector overlay */}
          <div className="absolute bottom-4 left-4 bg-[#0a231b]/90 border border-[#d4af37]/40 p-4 rounded-xs text-xs backdrop-blur-md max-w-sm w-full">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#d4af37] block mb-2">
              Scene Specific Parameters
            </span>

            {activeScene === "pillars" && (
              <div className="flex gap-2">
                {(["kalash", "medallion", "gemstone", "hallmark"] as PillarItemType[]).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setPillarType(t)}
                    className={`px-2 py-1 text-[11px] rounded-xs border capitalize cursor-pointer ${
                      pillarType === t ? "bg-[#d4af37] text-black font-semibold" : "border-white/20 text-white"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}

            {activeScene === "product" && (
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "emerald-pendant", label: "Emerald Pendant" },
                  { id: "kada", label: "22K Fluted Kada" },
                  { id: "sapphire-ring", label: "Sapphire Ring" },
                  { id: "nakshi-choker", label: "Nakshi Choker" },
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setProductType(p.id as Product3DType)}
                    className={`px-2 py-1 text-[10px] rounded-xs border text-left truncate cursor-pointer ${
                      productType === p.id
                        ? "bg-[#d4af37] text-black font-semibold"
                        : "border-white/20 text-white"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            )}

            {activeScene === "sketchToGold" && (
              <div className="space-y-2">
                <span className="text-[11px] text-[#a8b6af] block">
                  Step: {["Wireframe", "Wax Model", "Molten Gold", "Solid 22K", "Gemstone Set"][sketchStep]}
                </span>
                <input
                  type="range"
                  min="0"
                  max="4"
                  value={sketchStep}
                  onChange={(e) => setSketchStep(Number(e.target.value))}
                  className="w-full accent-[#d4af37] cursor-pointer"
                />
              </div>
            )}

            {activeScene === "goldCalc" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px]">
                  <span>Gold Weight: {calcWeight}g</span>
                  <div className="flex gap-1">
                    {(["24k", "22k", "18k", "14k"] as const).map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setCalcPurity(p)}
                        className={`px-1.5 py-0.5 text-[9px] uppercase rounded-xs border cursor-pointer ${
                          calcPurity === p
                            ? "bg-[#d4af37] text-black font-bold"
                            : "border-white/20 text-white"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
                <input
                  type="range"
                  min="5"
                  max="120"
                  value={calcWeight}
                  onChange={(e) => setCalcWeight(Number(e.target.value))}
                  className="w-full accent-[#d4af37] cursor-pointer"
                />
              </div>
            )}

            {activeScene === "zodiac" && (
              <div className="space-y-2">
                <span className="text-[11px] text-[#a8b6af] block">
                  Sign: {["Mesha", "Vrishabha", "Mithuna", "Karka", "Simha", "Kanya", "Tula", "Vrischika", "Dhanu", "Makara", "Kumbha", "Meena"][zodiacIndex]}
                </span>
                <input
                  type="range"
                  min="0"
                  max="11"
                  value={zodiacIndex}
                  onChange={(e) => setZodiacIndex(Number(e.target.value))}
                  className="w-full accent-[#d4af37] cursor-pointer"
                />
              </div>
            )}

            {["hero", "preloader", "trust", "mandala", "footer"].includes(activeScene) && (
              <p className="text-[11px] text-[#a8b6af] leading-relaxed">
                Left click &amp; drag to orbit camera &bull; Right click to pan &bull; Scroll to zoom.
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function Dev3DPage() {
  return (
    <CapabilityProvider>
      <Dev3DStudio />
    </CapabilityProvider>
  );
}

