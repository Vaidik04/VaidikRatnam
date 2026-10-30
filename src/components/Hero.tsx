import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animation
      gsap.fromTo(headlineRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", stagger: 0.1 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="h-screen w-full flex items-center px-12 relative overflow-hidden bg-emerald-950">
      <div className="z-10 max-w-4xl">
        <h1 ref={headlineRef} className="font-display text-8xl leading-tight font-light">
          <span className="block text-gold-gradient">Where Sacred Indian Craft Meets</span>
          <span className="block italic text-gold-gradient">Pure Goldsmithing</span>
        </h1>
        <div className="mt-8 flex gap-6">
          <button className="px-8 py-4 bg-gold-500 text-emerald-950 font-bold hover:bg-gold-300 transition-colors">
            Explore Gold Jewellery
          </button>
          <button className="px-8 py-4 border border-gold-500 text-gold-500 font-bold hover:bg-gold-500 hover:text-emerald-950 transition-all">
            Order Custom Jewellery
          </button>
        </div>
      </div>

      {/* Background Particle/Gradient Placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 to-black opacity-50" />

      {/* 3D Gem Placeholder (to be implemented with R3F) */}
      <div className="absolute right-20 top-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-700/30 backdrop-blur-3xl rounded-full animate-pulse" />
    </section>
  );
};
