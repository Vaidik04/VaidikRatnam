"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";

export type CapabilityTier = "HIGH" | "MEDIUM" | "LOW";

interface CapabilityContextType {
  tier: CapabilityTier;
  is3DSupported: boolean;
  liteMode: boolean;
  setLiteMode: (enabled: boolean) => void;
  canUseTransmission: boolean;
  canUsePostFX: boolean;
  dpr: number;
  particlesCount: number;
}

const CapabilityContext = createContext<CapabilityContextType>({
  tier: "MEDIUM",
  is3DSupported: true,
  liteMode: false,
  setLiteMode: () => {},
  canUseTransmission: true,
  canUsePostFX: false,
  dpr: 1.5,
  particlesCount: 1000,
});

export function CapabilityProvider({ children }: { children: React.ReactNode }) {
  const [liteMode, setLiteModeState] = useState<boolean>(false);
  const [is3DSupported, setIs3DSupported] = useState<boolean>(true);
  const [tier, setTier] = useState<CapabilityTier>("MEDIUM");

  useEffect(() => {
    // 1. Sync persistent user preference from localStorage after hydration
    try {
      const stored = localStorage.getItem("vaidik_3d_lite_mode");
      if (stored !== null) {
        const val = stored === "true";
        queueMicrotask(() => setLiteModeState(val));
      } else if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        queueMicrotask(() => setLiteModeState(true));
      }
    } catch {
      // ignore
    }

    // 2. WebGL2 / WebGL Support detection and GPU tiering
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      if (!gl) {
        queueMicrotask(() => {
          setIs3DSupported(false);
          setTier("LOW");
        });
        return;
      }

      // Check GPU capability
      const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
      const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : "";
      const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
      const isApple = /Apple|Macintosh/i.test(navigator.userAgent);
      const isLowTierGPU = /(intel|mali|adreno\s*(3|4|5)|powervr)/i.test(renderer);

      let detectedTier: CapabilityTier = "MEDIUM";
      if (isMobile || isLowTierGPU) {
        detectedTier = "MEDIUM";
      } else if (isApple || /(nvidia|geforce|radeon|rtx|gtx)/i.test(renderer)) {
        detectedTier = "HIGH";
      }

      queueMicrotask(() => {
        setTier(detectedTier);
      });
    } catch {
      queueMicrotask(() => {
        setIs3DSupported(false);
        setTier("LOW");
      });
    }
  }, []);

  const setLiteMode = (enabled: boolean) => {
    setLiteModeState(enabled);
    try {
      localStorage.setItem("vaidik_3d_lite_mode", String(enabled));
    } catch {
      // ignore
    }
  };

  const effectiveTier = useMemo<CapabilityTier>(() => {
    if (!is3DSupported || liteMode) return "LOW";
    return tier;
  }, [is3DSupported, liteMode, tier]);

  const value = useMemo<CapabilityContextType>(() => {
    return {
      tier: effectiveTier,
      is3DSupported: is3DSupported && !liteMode,
      liteMode,
      setLiteMode,
      canUseTransmission: effectiveTier !== "LOW",
      canUsePostFX: effectiveTier === "HIGH",
      dpr: effectiveTier === "HIGH" ? 2 : effectiveTier === "MEDIUM" ? 1.5 : 1,
      particlesCount: effectiveTier === "HIGH" ? 2000 : effectiveTier === "MEDIUM" ? 800 : 200,
    };
  }, [effectiveTier, is3DSupported, liteMode]);

  return (
    <CapabilityContext.Provider value={value}>
      {children}
    </CapabilityContext.Provider>
  );
}

export function use3DCapability() {
  return useContext(CapabilityContext);
}
