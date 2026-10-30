"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LAGNA_PROFILES, LagnaProfile } from "@/lib/astrology/data";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Compass,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  Calendar,
  CheckCircle2,
  Info,
} from "lucide-react";

export function LagnaRatnaExplorer() {
  const [selectedSlug, setSelectedSlug] = useState<string>("mesha");
  const profile: LagnaProfile =
    LAGNA_PROFILES.find((p) => p.slug === selectedSlug) || LAGNA_PROFILES[0];

  return (
    <div className="bg-[#FAF8F5] border border-[#E5DFD5] rounded-sm p-6 sm:p-8 space-y-8">
      {/* Header */}
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#B08D57] mb-1.5">
          <Compass className="w-4 h-4" />
          <span>Interactive Vedic Ratna Explorer</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl text-[#182522] font-normal leading-tight">
          Explore Sacred Gemstones for Your Vedic Lagna
        </h2>
        <p className="text-xs sm:text-sm text-[#626A65] mt-1.5 leading-relaxed">
          Select your <strong>Janma Lagna (Ascendant)</strong> or <strong>Moon Sign (Chandra Rashi)</strong>. In classical Parashari Jyotish, stones are prescribed strictly to empower the <strong>Dharma Trikona</strong> (1st, 5th, and 9th houses) while avoiding adversarial planets.
        </p>
      </div>

      {/* Lagna Horizontal Selector Grid */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-[#182522] uppercase tracking-wider block">
          Choose Your Vedic Lagna / Sign:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {LAGNA_PROFILES.map((p) => {
            const isSelected = p.slug === selectedSlug;
            return (
              <button
                key={p.slug}
                type="button"
                onClick={() => setSelectedSlug(p.slug)}
                className={`p-3 rounded-xs text-left transition-all border cursor-pointer ${
                  isSelected
                    ? "bg-[#173B32] text-white border-[#173B32] shadow-sm"
                    : "bg-white text-[#182522] border-[#E5DFD5] hover:border-[#B08D57] hover:bg-[#F7F4ED]"
                }`}
              >
                <span className="block font-serif text-sm font-medium leading-tight">
                  {p.sanskritName}
                </span>
                <span
                  className={`block text-[11px] mt-0.5 ${
                    isSelected ? "text-[#DDE5DC]" : "text-[#626A65]"
                  }`}
                >
                  {p.englishName} ({p.rulingPlanet.split(" ")[0]})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sign Summary Banner */}
      <div className="bg-white border border-[#E5DFD5] rounded-xs p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono text-[#B08D57] uppercase tracking-wider block">
            Ascendant Sign Profile
          </span>
          <h3 className="font-serif text-2xl font-medium text-[#182522]">
            {profile.sanskritName} — {profile.englishName}
          </h3>
          <p className="text-xs text-[#626A65] mt-1 max-w-xl">
            {profile.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="bg-[#F7F4ED] px-3 py-1.5 rounded-xs border border-[#E5DFD5]">
            <span className="text-[#626A65] block text-[10px] uppercase font-mono">Ruling Lord:</span>
            <strong className="text-[#182522]">{profile.rulingPlanet}</strong>
          </div>
          <div className="bg-[#F7F4ED] px-3 py-1.5 rounded-xs border border-[#E5DFD5]">
            <span className="text-[#626A65] block text-[10px] uppercase font-mono">Tattva (Element):</span>
            <strong className="text-[#182522]">{profile.element}</strong>
          </div>
          <div className="bg-[#F7F4ED] px-3 py-1.5 rounded-xs border border-[#E5DFD5]">
            <span className="text-[#626A65] block text-[10px] uppercase font-mono">Nature:</span>
            <strong className="text-[#182522]">{profile.nature}</strong>
          </div>
        </div>
      </div>

      {/* Recommended Benefic Gemstones (Dharma Trikona) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-[#E5DFD5] pb-2">
          <ShieldCheck className="w-5 h-5 text-[#173B32]" />
          <div>
            <h4 className="font-serif text-lg font-medium text-[#182522]">
              Prescribed Trikona Benefic Gemstones (Anukool Ratna)
            </h4>
            <span className="text-xs text-[#626A65]">
              These stones strengthen your life force, intellect, and fortune. Recommended for daily or prolonged wear.
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Lagnesh Ratna */}
          <Card className="p-5 bg-white border border-[#C5D5C4] relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#173B32]" />
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider bg-[#EEF3EE] text-[#173B32] px-2 py-0.5 rounded-xs inline-block mb-2">
                1st House — Life Stone (Lagnesh)
              </span>
              <h5 className="font-serif text-lg font-medium text-[#182522] mb-1">
                {profile.lagneshRatna.stone}
              </h5>
              <span className="text-xs text-[#B08D57] font-serif block mb-2">
                Sanskrit: {profile.lagneshRatna.sanskritName}
              </span>
              <p className="text-xs text-[#626A65] leading-relaxed">
                {profile.lagneshRatna.significance}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#F0ECE2] text-[11px] text-[#173B32] font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Primary Protective Gemstone
            </div>
          </Card>

          {/* Panchamesh Ratna */}
          <Card className="p-5 bg-white border border-[#C5D5C4] relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#173B32]" />
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider bg-[#EEF3EE] text-[#173B32] px-2 py-0.5 rounded-xs inline-block mb-2">
                5th House — Intellect &amp; Merit (Panchamesh)
              </span>
              <h5 className="font-serif text-lg font-medium text-[#182522] mb-1">
                {profile.panchameshRatna.stone}
              </h5>
              <span className="text-xs text-[#B08D57] font-serif block mb-2">
                Sanskrit: {profile.panchameshRatna.sanskritName}
              </span>
              <p className="text-xs text-[#626A65] leading-relaxed">
                {profile.panchameshRatna.significance}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#F0ECE2] text-[11px] text-[#173B32] font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Awakens Memory &amp; Purva Punya
            </div>
          </Card>

          {/* Bhagyesh Ratna */}
          <Card className="p-5 bg-white border border-[#C5D5C4] relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#173B32]" />
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider bg-[#EEF3EE] text-[#173B32] px-2 py-0.5 rounded-xs inline-block mb-2">
                9th House — Fortune &amp; Destiny (Bhagyesh)
              </span>
              <h5 className="font-serif text-lg font-medium text-[#182522] mb-1">
                {profile.bhagyeshRatna.stone}
              </h5>
              <span className="text-xs text-[#B08D57] font-serif block mb-2">
                Sanskrit: {profile.bhagyeshRatna.sanskritName}
              </span>
              <p className="text-xs text-[#626A65] leading-relaxed">
                {profile.bhagyeshRatna.significance}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#F0ECE2] text-[11px] text-[#173B32] font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Bestows Fortune &amp; Higher Grace
            </div>
          </Card>
        </div>
      </div>

      {/* Caution / Prohibited Gemstones Banner */}
      <div className="bg-[#FFF0F0] border border-[#FFD0D0] rounded-sm p-6 space-y-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-[#A61C1C]" />
          <h4 className="font-serif text-lg font-medium text-[#A61C1C]">
            Gemstones to Strictly Avoid for {profile.sanskritName} (Pratikool Ratna)
          </h4>
        </div>
        <p className="text-xs text-[#7A1212] leading-relaxed">
          Gemstones do not absorb or block negative rays—they <strong>transmit and intensify</strong> planetary frequencies. Wearing the gemstone of an enemy or Dusthana lord for your Lagna magnifies obstacles, health conflicts, or legal entanglements:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
          {profile.prohibitedGemstones.map((pro, i) => (
            <div key={i} className="bg-white/80 border border-[#FFC2C2] p-3 rounded-xs text-xs">
              <strong className="text-[#A61C1C] block text-sm font-serif mb-0.5">
                Do Not Wear: {pro.stone}
              </strong>
              <span className="text-[#626A65] font-mono text-[10px] block mb-1">
                Governed by {pro.planet}
              </span>
              <p className="text-[11px] text-[#182522] leading-snug">
                {pro.reason}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Wearing Vidhi & Non-Gemstone Remedies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-5 bg-white border border-[#E5DFD5]">
          <h5 className="font-serif text-base font-semibold text-[#182522] mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#B08D57]" />
            Auspicious Setting &amp; Sanctification
          </h5>
          <ul className="space-y-2 text-xs text-[#626A65] leading-relaxed">
            <li>
              <strong className="text-[#182522]">Recommended Metal:</strong>{" "}
              {profile.primaryMetal}
            </li>
            <li>
              <strong className="text-[#182522]">Key Vedic Chant:</strong>{" "}
              <span className="font-mono text-[#173B32]">{profile.keyMantra}</span> (108 times during wearing muhurta).
            </li>
            <li>
              <strong className="text-[#182522]">Setting Rule:</strong> Must be set with an open back (Chhidra) allowing unobstructed cosmic light to contact the skin.
            </li>
          </ul>
        </Card>

        <Card className="p-5 bg-white border border-[#E5DFD5]">
          <h5 className="font-serif text-base font-semibold text-[#182522] mb-3 flex items-center gap-2">
            <Info className="w-4 h-4 text-[#173B32]" />
            Traditional Non-Gemstone Remedies (Satvik Upayas)
          </h5>
          <p className="text-[11px] text-[#626A65] mb-2">
            In our studio&apos;s classical tradition, gemstones are not the only remedy. Simple daily karma-correcting acts often produce profound spiritual equilibrium:
          </p>
          <ul className="space-y-1.5 text-xs text-[#182522]">
            {profile.traditionalNonStoneRemedies.map((rem, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-[#B08D57]">&bull;</span>
                <span>{rem}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Next Step CTA */}
      <div className="bg-[#173B32] text-white p-6 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-serif text-lg font-medium text-white mb-1">
            Need Your Exact Degrees &amp; Dasha Verified?
          </h4>
          <p className="text-xs text-[#DDE5DC] max-w-xl leading-relaxed">
            A sign recommendation is only preliminary. Before commissioning a high-value gemstone, our studio elder verifies your exact birth degrees, combustions, and Vimshottari Dasha periods.
          </p>
        </div>

        <Link
          href={`/consultation/request?sign=${encodeURIComponent(
            profile.sanskritName
          )}&service=Vedic Gemstone (Ratna) Suitability Analysis`}
          className="shrink-0"
        >
          <Button variant="gold" size="md" className="text-xs uppercase tracking-wider font-semibold whitespace-nowrap">
            <Calendar className="w-3.5 h-3.5 mr-1.5" />
            Book Verification with Father &rarr;
          </Button>
        </Link>
      </div>
    </div>
  );
}

