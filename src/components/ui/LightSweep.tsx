"use client";

import React from "react";

interface LightSweepProps {
  className?: string;
  repeatSec?: number;
}

export function LightSweep({ className = "", repeatSec = 8 }: LightSweepProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div
        className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12 animate-[sweep_8s_ease-in-out_infinite]"
        style={{
          animationDuration: `${repeatSec}s`,
        }}
      />
    </div>
  );
}
