"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

export function PageTransition() {
  const pathname = usePathname();
  const [animating, setAnimating] = useState(false);
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname;
      queueMicrotask(() => setAnimating(true));
      const timer = setTimeout(() => {
        setAnimating(false);
      }, 450);

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  if (!animating) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Liquid Gold Curtain Wipe Layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#04170F] via-[#0A2A1D] to-[#04170F] border-b-2 border-[#D4AF37] animate-curtain-wipe opacity-90 backdrop-blur-xs" />
    </div>
  );
}
