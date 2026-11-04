"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { use3DCapability } from "../3d/context/CapabilityContext";

interface CinemagraphVideoProps {
  poster: string;
  videoWebm?: string;
  videoMp4?: string;
  alt: string;
  className?: string;
}

export function CinemagraphVideo({
  poster,
  videoWebm,
  videoMp4,
  alt,
  className = "",
}: CinemagraphVideoProps) {
  const { liteMode } = use3DCapability();
  const [canPlayVideo, setCanPlayVideo] = useState(false);

  useEffect(() => {
    // Only attempt video playback if not lite mode and prefers-reduced-motion is false
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!liteMode && !media.matches && (videoWebm || videoMp4)) {
      queueMicrotask(() => setCanPlayVideo(true));
    } else {
      queueMicrotask(() => setCanPlayVideo(false));
    }
  }, [liteMode, videoWebm, videoMp4]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* 2D Poster Image always present as backdrop */}
      <Image
        src={poster}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      {/* Looping muted cinemagraph */}
      {canPlayVideo && (
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={poster}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 opacity-90"
        >
          {videoWebm && <source src={videoWebm} type="video/webm" />}
          {videoMp4 && <source src={videoMp4} type="video/mp4" />}
        </video>
      )}

      {/* Subtle overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
    </div>
  );
}

