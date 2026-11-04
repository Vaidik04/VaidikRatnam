"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Hammer, Flame, Gem, FileEdit, ArrowRight, Sparkles } from "lucide-react";
import { ProcessMotionStage } from "./ProcessMotionStage";
import { MagneticButton } from "@/components/ui/MagneticButton";

const PROCESS_STEPS = [
  {
    step: 1,
    title: "1. The Sacred Concept",
    desc: "A hand-drawn sketch or family heirloom photograph brought to our Varanasi studio.",
    icon: FileEdit,
  },
  {
    step: 2,
    title: "2. Master CAD & Wax Carving",
    desc: "Sculpting the precise lattice, prongs, and open-back light apertures in jewel wax.",
    icon: Hammer,
  },
  {
    step: 3,
    title: "3. Molten Gold Pour",
    desc: "Induction casting with 100% certified 22K/18K gold grains at 1064°C in a sealed crucible.",
    icon: Flame,
  },
  {
    step: 4,
    title: "4. Nakshi & Hand-Setting",
    desc: "Third-generation karigars chase motifs by hand and set natural unheated gemstones.",
    icon: Gem,
  },
  {
    step: 5,
    title: "5. BIS Hallmarking & Laser HUID",
    desc: "6-digit government laser authentication and digital scale weighing in front of you.",
    icon: Sparkles,
  },
];

export function ProcessTimeline() {
  const [activeStep, setActiveStep] = useState<number>(3); // Defaults to molten gold

  return (
    <section className="relative py-28 bg-[#04170f] text-white overflow-hidden border-t border-[#d4af37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#d4af37] mb-3">
            <Hammer className="w-3.5 h-3.5" />
            <span>The Karigar&apos;s Path</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal">
            From Sacred Sketch to Solid Gold
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#a8b6af]">
            No middle agents. No factory mass-production. Every piece is sculpted by
            hereditary artisans and weighed before your eyes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Interactive Step Selector */}
          <div className="lg:col-span-5 space-y-4">
            {PROCESS_STEPS.map((s) => {
              const Icon = s.icon;
              const isActive = activeStep === s.step;
              return (
                <button
                  key={s.step}
                  type="button"
                  onClick={() => setActiveStep(s.step)}
                  className={`w-full text-left p-5 rounded-xl border transition-all duration-400 flex items-start gap-4 cursor-pointer ${
                    isActive
                      ? "bg-[#0a2a1d] border-[#d4af37] shadow-xl shadow-[#d4af37]/10"
                      : "bg-[#04170f]/60 border-[#d4af37]/20 hover:border-[#d4af37]/50"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${
                      isActive
                        ? "bg-[#d4af37] text-[#04170f] border-[#f1d98a]"
                        : "bg-[#0a2a1d] text-[#d4af37] border-[#d4af37]/30"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3
                      className={`font-serif text-lg font-medium ${
                        isActive ? "text-[#f1d98a]" : "text-white"
                      }`}
                    >
                      {s.title}
                    </h3>
                    <p className="text-xs text-[#a8b6af] mt-1 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: 3D Motion Graphics Transformation Stage */}
          <div className="lg:col-span-7 relative">
            <ProcessMotionStage activeStep={activeStep} />
          </div>
        </div>

        {/* Commission CTA button */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl border border-[#d4af37]/25 bg-[#0a2a1d]/60">
          <div>
            <h4 className="font-serif text-lg text-white">
              Have an heirloom idea or custom design?
            </h4>
            <p className="text-xs text-[#a8b6af]">
              Share your sketch or photo with our master karigars for an honest estimate.
            </p>
          </div>
          <Link href="/custom-design">
            <MagneticButton variant="gold" className="px-6 py-2.5 text-xs font-mono uppercase tracking-wider flex items-center gap-2">
              <span>Commission a Piece</span>
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
