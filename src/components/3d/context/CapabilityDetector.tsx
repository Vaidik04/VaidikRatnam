"use client";

import React from "react";
import { use3DCapability } from "./CapabilityContext";

interface CapabilityDetectorProps {
  children?: React.ReactNode;
}

export function CapabilityDetector({ children }: CapabilityDetectorProps) {
  const { tier, is3DSupported, liteMode } = use3DCapability();

  return (
    <div
      data-3d-supported={is3DSupported}
      data-lite-mode={liteMode}
      data-gpu-tier={tier}
      className="contents"
    >
      {children}
    </div>
  );
}

