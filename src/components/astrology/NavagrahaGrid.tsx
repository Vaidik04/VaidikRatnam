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
    <div className="bg-white border border-[#E5DFD5] rounded-sm p-6 sm:p-8 space-y-6">
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#B08D57] mb-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Navagraha Ratna Matrix</span>
        </div>
        <h2 className="font-serif text-2xl text-[#182522] font-normal">
          The Nine Sacred Planetary Gemstones
        </h2>
        <p className="text-xs text-[#626A65] mt-1">
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
              className={`px-3.5 py-2 rounded-xs text-left transition-all border whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                isSelected
                  ? "bg-[#173B32] text-white border-[#173B32] shadow-xs"
                  : "bg-[#FAF8F5] text-[#182522] border-[#E5DFD5] hover:border-[#B08D57] hover:bg-[#F7F4ED]"
              }`}
            >
              {getPlanetIcon(key)}
              <div>
                <span className="block text-xs font-serif font-medium leading-tight">
                  {data.sanskritPlanet}
                </span>
                <span className={`block text-[10px] ${isSelected ? "text-[#DDE5DC]" : "text-[#626A65]"}`}>
                  {data.primaryRatna}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Graha Profile Detail Card */}
      <div className="bg-[#FAF8F5] border border-[#E5DFD5] rounded-xs p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-4">
          <div>
            <span className="text-[11px] font-mono text-[#B08D57] uppercase tracking-wider block">
              Planetary Deity: {planet.deity}
            </span>
            <h3 className="font-serif text-3xl font-medium text-[#182522]">
              {planet.sanskritPlanet} ({planet.planet})
            </h3>
            <span className="text-sm font-serif text-[#173B32] block mt-1">
              Primary Gemstone: {planet.sanskritRatna} ({planet.primaryRatna})
            </span>
          </div>

          <div className="p-3 bg-white border border-[#E5DFD5] rounded-xs text-xs space-y-1">
            <span className="text-[#626A65] block font-mono text-[10px] uppercase">
              Mineral Species:
            </span>
            <strong className="text-[#182522]">{planet.mineralFamily}</strong>
            <span className="text-[#626A65] block font-mono text-[10px] uppercase pt-2">
              Transmitted Cosmic Ray:
            </span>
            <strong className="text-[#173B32]">{planet.cosmicRay}</strong>
          </div>

          <div>
            <span className="text-xs font-semibold text-[#182522] block mb-1">
              Affordable Upa-Ratnas (Natural Substitutes):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {planet.upaRatnas.map((upa, idx) => (
                <span
                  key={idx}
                  className="text-[11px] px-2.5 py-1 bg-white border border-[#E5DFD5] rounded-xs text-[#626A65]"
                >
                  {upa}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-5 border-t lg:border-t-0 lg:border-l border-[#E5DFD5] pt-6 lg:pt-0 lg:pl-8">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#182522] mb-2">
              Primary Life Significations (Karakatvas):
            </h4>
            <div className="flex flex-wrap gap-2">
              {planet.lifeSignifications.map((sig, i) => (
                <span
                  key={i}
                  className="text-xs px-2.5 py-1 bg-[#EEF3EE] text-[#173B32] border border-[#C5D5C4] rounded-xs font-medium"
                >
                  {sig}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <Card className="p-3.5 bg-white border border-[#E5DFD5]">
              <span className="text-[#626A65] block font-mono text-[10px] uppercase">
                Auspicious Metal
              </span>
              <strong className="text-[#182522] mt-0.5 block">
                {planet.auspiciousMetal}
              </strong>
            </Card>

            <Card className="p-3.5 bg-white border border-[#E5DFD5]">
              <span className="text-[#626A65] block font-mono text-[10px] uppercase">
                Prescribed Finger
              </span>
              <strong className="text-[#182522] mt-0.5 block">
                {planet.wearingFinger}
              </strong>
            </Card>

            <Card className="p-3.5 bg-white border border-[#E5DFD5]">
              <span className="text-[#626A65] block font-mono text-[10px] uppercase">
                Auspicious Day &amp; Time
              </span>
              <strong className="text-[#182522] mt-0.5 block">
                {planet.wearingDay}
              </strong>
            </Card>
          </div>

          <div className="p-4 bg-white border border-[#B08D57]/40 rounded-xs space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#B08D57] font-semibold block">
              Sacred Beej Mantra (108 Japa Count)
            </span>
            <p className="font-serif text-sm text-[#182522] font-medium leading-relaxed">
              {planet.beejMantra}
            </p>
            <span className="text-[11px] text-[#626A65] block pt-1">
              Chanted facing East during the designated Muhurta after cleansing the ring in Ganga Jal and raw unboiled milk.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

