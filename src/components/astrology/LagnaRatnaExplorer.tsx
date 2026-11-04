"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { LAGNA_PROFILES, LagnaProfile } from "@/lib/astrology/data";
import {
  Compass,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  Calendar,
  CheckCircle2,
  Info,
  Sun,
} from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function LagnaRatnaExplorer() {
  const [selectedSlug, setSelectedSlug] = useState<string>("mesha");
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const motionCardRef = useRef<HTMLDivElement>(null);

  const profile: LagnaProfile =
    LAGNA_PROFILES.find((p) => p.slug === selectedSlug) || LAGNA_PROFILES[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!motionCardRef.current) return;
    const rect = motionCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotX(((y - centerY) / centerY) * -8);
    setRotY(((x - centerX) / centerX) * 8);
  };

  const handleMouseLeave = () => {
    setRotX(0);
    setRotY(0);
  };

  return (
    <div className="bg-[#0a2a1d]/90 border border-[#d4af37]/35 rounded-3xl p-6 sm:p-10 space-y-10 shadow-2xl backdrop-blur-md text-[#faf7f0]">
      {/* Header */}
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#d4af37] mb-2.5">
          <Compass className="w-4 h-4" />
          <span>Interactive Vedic Jyotish Sanctuary</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal leading-tight">
          Explore Sacred Ratnas for Your Vedic Lagna
        </h2>
        <p className="text-xs sm:text-sm text-[#a8b6af] mt-2 leading-relaxed">
          Select your <strong>Janma Lagna (Ascendant)</strong> or <strong>Moon Sign (Chandra Rashi)</strong>. In classical Parashari Jyotish, gemstones are prescribed strictly to empower the <strong>Dharma Trikona</strong> (1st, 5th, and 9th houses) while strictly avoiding adversarial planetary frequencies.
        </p>
      </div>

      {/* Lagna Horizontal Selector Grid */}
      <div className="space-y-3">
        <label className="text-xs font-mono text-[#d4af37] uppercase tracking-wider block font-semibold">
          Select Your Vedic Rashi / Ascendant:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
          {LAGNA_PROFILES.map((p) => {
            const isSelected = p.slug === selectedSlug;
            return (
              <button
                key={p.slug}
                type="button"
                onClick={() => setSelectedSlug(p.slug)}
                className={`p-3 rounded-xl text-left transition-all border cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? "bg-[#14502f] text-white border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.25)] scale-[1.02]"
                    : "bg-[#04170f]/80 text-[#a8b6af] border-white/10 hover:border-[#d4af37]/50 hover:text-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="block font-serif text-sm font-medium leading-tight">
                    {p.sanskritName}
                  </span>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-ping" />
                  )}
                </div>
                <span
                  className={`block text-[11px] mt-1 font-mono ${
                    isSelected ? "text-[#f1d98a]" : "text-[#7a8a83]"
                  }`}
                >
                  {p.englishName}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sign Summary Banner with 3D Motion Graphics Wheel */}
      <div className="bg-[#04170f]/90 border border-[#d4af37]/30 rounded-2xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl">
        <div className="lg:col-span-7 space-y-5">
          <div>
            <span className="text-[11px] font-mono text-[#d4af37] uppercase tracking-widest block">
              Ascendant Sign Profile
            </span>
            <h3 className="font-serif text-3xl font-normal text-white mt-1">
              {profile.sanskritName} — <span className="text-gold-gradient italic">{profile.englishName}</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#c8d4cf] mt-2 max-w-xl leading-relaxed">
              {profile.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="bg-[#0a2a1d] px-3.5 py-2 rounded-xl border border-[#d4af37]/25">
              <span className="text-[#a8b6af] block text-[10px] uppercase font-mono tracking-wider">Ruling Lord:</span>
              <strong className="text-[#f1d98a] font-serif text-sm">{profile.rulingPlanet}</strong>
            </div>
            <div className="bg-[#0a2a1d] px-3.5 py-2 rounded-xl border border-[#d4af37]/25">
              <span className="text-[#a8b6af] block text-[10px] uppercase font-mono tracking-wider">Tattva (Element):</span>
              <strong className="text-[#faf7f0] font-serif text-sm">{profile.element}</strong>
            </div>
            <div className="bg-[#0a2a1d] px-3.5 py-2 rounded-xl border border-[#d4af37]/25">
              <span className="text-[#a8b6af] block text-[10px] uppercase font-mono tracking-wider">Nature (Guna):</span>
              <strong className="text-[#faf7f0] font-serif text-sm">{profile.nature}</strong>
            </div>
          </div>
        </div>

        {/* 3D Motion Graphics Astrological Wheel Stage */}
        <div
          ref={motionCardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="lg:col-span-5 h-56 sm:h-64 w-full rounded-2xl overflow-hidden [perspective:1000px] select-none"
        >
          <div
            className="relative w-full h-full rounded-2xl overflow-hidden border border-[#d4af37]/40 bg-radial from-[#0f3a28] via-[#04170f] to-[#020b07] flex items-center justify-center transition-transform duration-200 ease-out shadow-2xl"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
            }}
          >
            {/* Rotating Background Cosmic Wheel */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
              <div className="w-72 h-72 animate-spin-slow">
                <Image
                  src="/images/brand/element-astrology-circle-transparent.png"
                  alt="Sacred Astrology Wheel"
                  width={300}
                  height={300}
                  className="w-full h-full object-contain filter invert opacity-90"
                />
              </div>
            </div>

            {/* Glowing Center Core */}
            <div className="relative z-10 flex flex-col items-center text-center p-4" style={{ transform: "translateZ(35px)" }}>
              <div className="relative w-20 h-20 mb-2 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-[#d4af37]/40 animate-ping-slow" />
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#d4af37] via-[#f1d98a] to-[#a8821f] p-0.5 shadow-[0_0_35px_rgba(212,175,55,0.4)]">
                  <div className="w-full h-full rounded-full bg-[#04170f] flex items-center justify-center">
                    <Sun className="w-8 h-8 text-[#f6e7b4] animate-spin-slow" />
                  </div>
                </div>
              </div>
              <span className="text-sm font-serif text-[#f6e7b4] tracking-wider uppercase font-semibold">
                {profile.sanskritName} Chakra
              </span>
              <span className="text-[10px] font-mono text-[#a8b6af] mt-0.5">
                Lord: {profile.rulingPlanet.split(" ")[0]}
              </span>
            </div>

            {/* Light Shimmer Sweep */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Recommended Benefic Gemstones (Dharma Trikona) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-[#d4af37]/20 pb-3">
          <ShieldCheck className="w-5 h-5 text-[#d4af37]" />
          <div>
            <h4 className="font-serif text-xl font-normal text-white">
              Prescribed Trikona Benefic Gemstones (Anukool Ratna)
            </h4>
            <span className="text-xs text-[#a8b6af]">
              These natural stones strengthen your life force, intellect, and fortune. Recommended for daily or prolonged wear.
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Lagnesh Ratna */}
          <div className="p-6 bg-[#04170f]/90 border border-[#d4af37]/30 rounded-2xl relative overflow-hidden flex flex-col justify-between hover:border-[#d4af37] transition-all shadow-xl group">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d4af37] via-[#f1d98a] to-[#a8821f]" />
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider bg-[#d4af37]/15 text-[#f1d98a] px-2.5 py-1 rounded-full border border-[#d4af37]/30 inline-block mb-3">
                1st House — Life Stone (Lagnesh)
              </span>
              <h5 className="font-serif text-xl font-normal text-white group-hover:text-[#f1d98a] transition-colors mb-1">
                {profile.lagneshRatna.stone}
              </h5>
              <span className="text-xs text-[#d4af37] font-serif block mb-2.5">
                Sanskrit: {profile.lagneshRatna.sanskritName}
              </span>
              <p className="text-xs text-[#c8d4cf] leading-relaxed">
                {profile.lagneshRatna.significance}
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/10 text-[11px] text-[#f1d98a] font-mono flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
              <span>Primary Protective Gemstone</span>
            </div>
          </div>

          {/* Panchamesh Ratna */}
          <div className="p-6 bg-[#04170f]/90 border border-[#d4af37]/30 rounded-2xl relative overflow-hidden flex flex-col justify-between hover:border-[#d4af37] transition-all shadow-xl group">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d4af37] via-[#f1d98a] to-[#a8821f]" />
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider bg-[#d4af37]/15 text-[#f1d98a] px-2.5 py-1 rounded-full border border-[#d4af37]/30 inline-block mb-3">
                5th House — Intellect &amp; Merit (Panchamesh)
              </span>
              <h5 className="font-serif text-xl font-normal text-white group-hover:text-[#f1d98a] transition-colors mb-1">
                {profile.panchameshRatna.stone}
              </h5>
              <span className="text-xs text-[#d4af37] font-serif block mb-2.5">
                Sanskrit: {profile.panchameshRatna.sanskritName}
              </span>
              <p className="text-xs text-[#c8d4cf] leading-relaxed">
                {profile.panchameshRatna.significance}
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/10 text-[11px] text-[#f1d98a] font-mono flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
              <span>Awakens Memory &amp; Purva Punya</span>
            </div>
          </div>

          {/* Bhagyesh Ratna */}
          <div className="p-6 bg-[#04170f]/90 border border-[#d4af37]/30 rounded-2xl relative overflow-hidden flex flex-col justify-between hover:border-[#d4af37] transition-all shadow-xl group">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d4af37] via-[#f1d98a] to-[#a8821f]" />
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider bg-[#d4af37]/15 text-[#f1d98a] px-2.5 py-1 rounded-full border border-[#d4af37]/30 inline-block mb-3">
                9th House — Fortune &amp; Destiny (Bhagyesh)
              </span>
              <h5 className="font-serif text-xl font-normal text-white group-hover:text-[#f1d98a] transition-colors mb-1">
                {profile.bhagyeshRatna.stone}
              </h5>
              <span className="text-xs text-[#d4af37] font-serif block mb-2.5">
                Sanskrit: {profile.bhagyeshRatna.sanskritName}
              </span>
              <p className="text-xs text-[#c8d4cf] leading-relaxed">
                {profile.bhagyeshRatna.significance}
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/10 text-[11px] text-[#f1d98a] font-mono flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" />
              <span>Bestows Higher Fortune &amp; Grace</span>
            </div>
          </div>
        </div>
      </div>

      {/* Caution: Deep Ruby Glass with Gold Hairline (Replaces Red Alarm Boxes) */}
      <div className="caution-ruby-glass rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="w-5 h-5 text-[#f1d98a]" />
          <h4 className="font-serif text-xl font-normal text-white">
            Gemstones to Strictly Avoid for {profile.sanskritName} (Pratikool Ratna)
          </h4>
        </div>
        <p className="text-xs sm:text-sm text-[#f6e7b4]/90 leading-relaxed font-light">
          Gemstones do not absorb or block negative rays—they <strong>transmit and intensify</strong> planetary frequencies. Wearing the gemstone of an adversarial or Dusthana lord for your Lagna magnifies obstacles, health conflicts, or legal entanglements:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
          {profile.prohibitedGemstones.map((pro, i) => (
            <div key={i} className="bg-[#04170f]/80 border border-[#8e1b2e]/60 p-4 rounded-xl text-xs shadow-md">
              <strong className="text-[#f6e7b4] block text-sm font-serif mb-0.5">
                Do Not Wear: {pro.stone}
              </strong>
              <span className="text-[#d4af37] font-mono text-[10px] block mb-1.5 tracking-wider uppercase">
                Governed by {pro.planet}
              </span>
              <p className="text-[11px] text-[#c8d4cf] leading-relaxed font-light">
                {pro.reason}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Wearing Vidhi & Non-Gemstone Remedies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-[#04170f]/80 border border-[#d4af37]/25 rounded-2xl">
          <h5 className="font-serif text-lg font-normal text-[#f6e7b4] mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#d4af37]" />
            <span>Auspicious Setting &amp; Sanctification</span>
          </h5>
          <ul className="space-y-2.5 text-xs text-[#a8b6af] leading-relaxed">
            <li>
              <strong className="text-white">Recommended Metal:</strong>{" "}
              {profile.primaryMetal}
            </li>
            <li>
              <strong className="text-white">Key Vedic Chant:</strong>{" "}
              <span className="font-mono text-[#f1d98a]">{profile.keyMantra}</span> (108 times during wearing muhurta).
            </li>
            <li>
              <strong className="text-white">Setting Rule:</strong> Must be set with an open back (Chhidra) allowing unobstructed cosmic light to contact the skin.
            </li>
          </ul>
        </div>

        <div className="p-6 bg-[#04170f]/80 border border-[#d4af37]/25 rounded-2xl">
          <h5 className="font-serif text-lg font-normal text-[#f6e7b4] mb-3 flex items-center gap-2">
            <Info className="w-4 h-4 text-[#d4af37]" />
            <span>Traditional Non-Gemstone Remedies (Satvik Upayas)</span>
          </h5>
          <p className="text-xs text-[#a8b6af] mb-3">
            In our family shop&apos;s classical tradition, gemstones are not the only remedy. Simple daily karma-correcting acts often produce profound spiritual equilibrium:
          </p>
          <ul className="space-y-2 text-xs text-[#c8d4cf]">
            {profile.traditionalNonStoneRemedies.map((rem, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[#d4af37] font-bold">&bull;</span>
                <span>{rem}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Next Step CTA */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-[#0a2a1d] via-[#14502f] to-[#0a2a1d] border border-[#d4af37]/50 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h4 className="font-serif text-2xl font-normal text-white mb-1.5">
            Need Your Exact Degrees &amp; Dasha Verified?
          </h4>
          <p className="text-xs sm:text-sm text-[#c8d4cf] max-w-xl leading-relaxed">
            A sign recommendation is only preliminary. Before commissioning a high-value gemstone, our family astrologer verifies your exact birth degrees, combustions, and Vimshottari Dasha periods.
          </p>
        </div>

        <Link
          href={`/consultation/request?sign=${encodeURIComponent(
            profile.sanskritName
          )}&service=Vedic Gemstone (Ratna) Suitability Analysis`}
          className="shrink-0"
        >
          <MagneticButton
            variant="gold"
            className="px-7 py-3.5 text-xs uppercase tracking-widest font-mono font-bold"
          >
            <Calendar className="w-4 h-4 mr-2" />
            <span>Book Kundali Verification &rarr;</span>
          </MagneticButton>
        </Link>
      </div>
    </div>
  );
}
