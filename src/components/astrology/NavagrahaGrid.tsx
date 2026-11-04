"use client";

import React, { useState } from "react";
import { NAVAGRAHA_DATA, PlanetaryGemstone } from "@/lib/astrology/data";
import { Card } from "@/components/ui/Card";
import { Sparkles, Sun, Moon, Flame, Zap, Shield, Crown } from "lucide-react";

export function NavagrahaGrid() {
  const [selectedKey, setSelectedKey] = useState<string>("surya");
  const planet: PlanetaryGemstone = NAVAGRAHA_DATA[selectedKey] || NAVAGRAHA_DATA.surya;

  const getPlanetIcon = (key: string) => {
    switch (key) {
      case "surya":
        return <Sun className="w-4 h-4 text-[#B08D57]" />;
      case "chandra":
        return <Moon className="w-4 h-4 text-[#626A65]" />;
      case "mangala":
        return <Flame className="w-4 h-4 text-[#A61C1C]" />;
      case "budha":
        return <Sparkles className="w-4 h-4 text-[#173B32]" />;
      case "guru":
        return <Crown className="w-4 h-4 text-[#B08D57]" />;
      case "shukra":
        return <Sparkles className="w-4 h-4 text-[#B08D57]" />;
      case "shani":
        return <Shield className="w-4 h-4 text-[#182522]" />;
      default:
        return <Zap className="w-4 h-4 text-[#B08D57]" />;
    }
  };

  return (
    <div className="bg-[#0a2a1d]/85 border border-[#d4af37]/35 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-md text-white">
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#d4af37] mb-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Navagraha Ratna Matrix</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal">
          The Nine Sacred Planetary Gemstones
        </h2>
        <p className="text-xs text-[#a8b6af] mt-1 font-light">
          Every natural gemstone is a crystalline prism that captures and transmits specific solar-cosmic rays into the human bio-energetic sheath (Pranamaya Kosha).
        </p>
      </div>

      {/* Graha Horizontal Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {Object.entries(NAVAGRAHA_DATA).map(([key, data]) => {
          const isSelected = key === selectedKey;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setSelectedKey(key)}
              className={`px-3.5 py-2.5 rounded-xl text-left transition-all border whitespace-nowrap cursor-pointer flex items-center gap-2.5 font-mono ${
                isSelected
                  ? "bg-gold-gradient text-[#04170f] border-[#d4af37] shadow-lg font-bold"
                  : "bg-[#04170f]/90 text-[#f1d98a] border-[#d4af37]/25 hover:border-[#d4af37]/60 hover:bg-[#0a2a1d]"
              }`}
            >
              {getPlanetIcon(key)}
              <div>
                <span className="block text-xs font-serif font-medium leading-tight">
                  {data.sanskritPlanet}
                </span>
                <span className={`block text-[10px] ${isSelected ? "text-[#04170f]" : "text-[#a8b6af]"}`}>
                  {data.primaryRatna}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Graha Profile Detail Card */}
      <div className="bg-[#04170f]/90 border border-[#d4af37]/35 rounded-2xl p-6 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-8 shadow-inner">
        <div className="lg:col-span-4 space-y-4">
          <div>
            <span className="text-[11px] font-mono text-[#d4af37] uppercase tracking-wider block">
              Planetary Deity: {planet.deity}
            </span>
            <h3 className="font-serif text-3xl font-normal text-white mt-1">
              {planet.sanskritPlanet} ({planet.planet})
            </h3>
            <span className="text-sm font-serif text-[#f1d98a] block mt-1">
              Primary Gemstone: {planet.sanskritRatna} ({planet.primaryRatna})
            </span>
          </div>

          <div className="p-4 bg-[#0a2a1d] border border-[#d4af37]/30 rounded-xl text-xs space-y-2">
            <div>
              <span className="text-[#a8b6af] block font-mono text-[10px] uppercase">
                Mineral Species:
              </span>
              <strong className="text-white text-xs">{planet.mineralFamily}</strong>
            </div>
            <div>
              <span className="text-[#a8b6af] block font-mono text-[10px] uppercase pt-1">
                Transmitted Cosmic Ray:
              </span>
              <strong className="text-[#10b981] text-xs">{planet.cosmicRay}</strong>
            </div>
          </div>

          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#d4af37] block mb-2">
              Affordable Upa-Ratnas (Natural Substitutes):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {planet.upaRatnas.map((upa, idx) => (
                <span
                  key={idx}
                  className="text-[11px] px-2.5 py-1 bg-[#0a2a1d] border border-[#d4af37]/30 rounded-lg text-[#f1d98a] font-mono"
                >
                  {upa}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-5 border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-8">
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#d4af37] mb-2">
              Primary Life Significations (Karakatvas):
            </h4>
            <div className="flex flex-wrap gap-2">
              {planet.lifeSignifications.map((sig, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1 bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/40 rounded-full font-mono font-medium"
                >
                  {sig}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <Card className="p-3.5 bg-[#0a2a1d] border border-[#d4af37]/30 rounded-xl">
              <span className="text-[#a8b6af] block text-[10px] uppercase">
                Auspicious Metal
              </span>
              <strong className="text-[#f1d98a] mt-1 block font-serif text-sm">
                {planet.auspiciousMetal}
              </strong>
            </Card>

            <Card className="p-3.5 bg-[#0a2a1d] border border-[#d4af37]/30 rounded-xl">
              <span className="text-[#a8b6af] block text-[10px] uppercase">
                Prescribed Finger
              </span>
              <strong className="text-[#f1d98a] mt-1 block font-serif text-sm">
                {planet.wearingFinger}
              </strong>
            </Card>

            <Card className="p-3.5 bg-[#0a2a1d] border border-[#d4af37]/30 rounded-xl">
              <span className="text-[#a8b6af] block text-[10px] uppercase">
                Auspicious Day &amp; Time
              </span>
              <strong className="text-[#f1d98a] mt-1 block font-serif text-sm">
                {planet.wearingDay}
              </strong>
            </Card>
          </div>

          <div className="p-4 bg-[#0a2a1d] border border-[#d4af37]/40 rounded-xl space-y-1.5 shadow-md">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#d4af37] font-semibold block">
              Sacred Beej Mantra (108 Japa Count)
            </span>
            <p className="font-serif text-base text-[#f6e7b4] font-medium leading-relaxed">
              {planet.beejMantra}
            </p>
            <span className="text-[11px] text-[#a8b6af] block pt-1 font-sans font-light">
              Chanted facing East during the designated Muhurta after cleansing the ring in Ganga Jal and raw unboiled milk.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

