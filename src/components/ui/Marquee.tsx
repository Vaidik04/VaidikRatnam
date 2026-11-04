"use client";

import React from "react";

interface MarqueeProps {
  children: React.ReactNode;
  speedSec?: number;
  pauseOnHover?: boolean;
  className?: string;
  reverse?: boolean;
}

export function Marquee({
  children,
  speedSec = 30,
  pauseOnHover = true,
  className = "",
  reverse = false,
}: MarqueeProps) {
  return (
    <div
      className={`group flex overflow-hidden select-none [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] ${className}`}
    >
      <div
        className={`flex min-w-full shrink-0 items-center justify-around gap-8 animate-marquee ${
          pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""
        } ${reverse ? "[animation-direction:reverse]" : ""}`}
        style={{ animationDuration: `${speedSec}s` }}
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        className={`flex min-w-full shrink-0 items-center justify-around gap-8 animate-marquee ${
          pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""
        } ${reverse ? "[animation-direction:reverse]" : ""}`}
        style={{ animationDuration: `${speedSec}s` }}
      >
        {children}
      </div>
    </div>
  );
}
