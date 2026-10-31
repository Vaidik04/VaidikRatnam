"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";
import { GemstoneSourcingDialog } from "@/components/gemstones/GemstoneSourcingDialog";
import {
  Sparkles,
  ShieldCheck,
  Award,
} from "lucide-react";

interface NavratnaStone {
  name: string;
  hindi: string;
  planet: string;
  mineral: string;
  hardness: string;
  colorTone: string;
  borderAccent: string;
  bgGlow: string;
  tradition: string;
  scientificFacts: string;
}

const NAVRATNA_LIST: NavratnaStone[] = [
  {
    name: "Blue Sapphire",
    hindi: "Neelam (नीलम)",
    planet: "Saturn (Shani)",
    mineral: "Natural Corundum",
    hardness: "9.0 Mohs",
    colorTone: "Deep Royal Cornflower Blue",
    borderAccent: "border-[#204374]",
    bgGlow: "bg-radial from-[#1E3A8A]/15 to-transparent",
    tradition: "Associated with intense focus, discipline, and endurance. In classical Parashari Jyotish, recommended strictly for Taurus, Libra, Capricorn, and Aquarius Lagnas after careful chart review.",
    scientificFacts: "Colored by trace amounts of iron and titanium within aluminum oxide crystal matrix. Highly durable and second only to diamond in mineral hardness.",
  },
  {
    name: "Yellow Sapphire",
    hindi: "Pukhraj (पुखराज)",
    planet: "Jupiter (Brihaspati)",
    mineral: "Natural Corundum",
    hardness: "9.0 Mohs",
    colorTone: "Bright Canary to Golden Honey",
    borderAccent: "border-[#C59B27]",
    bgGlow: "bg-radial from-[#D97706]/15 to-transparent",
    tradition: "Associated with higher wisdom, righteous fortune, family welfare, and progeny. Prescribed for Sagittarius, Pisces, Aries, and Leo Lagnas.",
    scientificFacts: "Trace natural minerals give natural yellow sapphire its warm golden hue. Unheated natural stones exhibit delicate silk lines under magnifying loupes.",
  },
  {
    name: "Emerald",
    hindi: "Panna (पन्ना)",
    planet: "Mercury (Budha)",
    mineral: "Natural Beryl",
    hardness: "7.5 – 8.0 Mohs",
    colorTone: "Vivid Spring Grass Green",
    borderAccent: "border-[#1E6B4A]",
    bgGlow: "bg-radial from-[#059669]/15 to-transparent",
    tradition: "Associated with analytical commerce, eloquence, sharp memory, and vocal communication. Prescribed for Gemini, Virgo, Taurus, and Libra Lagnas.",
    scientificFacts: "Colored by chromium and vanadium. Natural emeralds inherently contain three-phase fluid inclusions (jardin); completely inclusion-free emeralds are usually synthetic.",
  },
  {
    name: "Natural Ruby",
    hindi: "Manikya (माणिक्य)",
    planet: "Sun (Surya)",
    mineral: "Natural Corundum",
    hardness: "9.0 Mohs",
    colorTone: "Pigeon Blood Deep Crimson Red",
    borderAccent: "border-[#881337]",
    bgGlow: "bg-radial from-[#BE123C]/15 to-transparent",
    tradition: "Associated with physical vitality, sovereignty, leadership presence, and paternal harmony. Prescribed for Leo, Aries, and Sagittarius Lagnas.",
    scientificFacts: "Colored by chromium. Natural rubies exhibit natural red fluorescence under ultraviolet light and possess distinctive hexagonal growth zoning.",
  },
  {
    name: "Natural Pearl",
    hindi: "Mukta / Moti (मोती)",
    planet: "Moon (Chandra)",
    mineral: "Organic Aragonite / Nacre",
    hardness: "2.5 – 4.5 Mohs",
    colorTone: "Lustrous Warm Ivory / Silvery White",
    borderAccent: "border-[#9CA3AF]",
    bgGlow: "bg-radial from-[#94A3B8]/15 to-transparent",
    tradition: "Associated with emotional tranquility, maternal grace, mental equilibrium, and intuitive peace. Prescribed for Cancer, Scorpio, and Pisces Lagnas.",
    scientificFacts: "Formed organically within mollusks layer by microscopic layer of calcium carbonate (aragonite). Natural Basra and South Sea pearls require gentle handling.",
  },
  {
    name: "Red Coral",
    hindi: "Moonga (मूँगा)",
    planet: "Mars (Mangala)",
    mineral: "Organic Precious Coral (Corallium Rubrum)",
    hardness: "3.5 Mohs",
    colorTone: "Vivid Oxblood Carnelian Red",
    borderAccent: "border-[#991B1B]",
    bgGlow: "bg-radial from-[#DC2626]/15 to-transparent",
    tradition: "Associated with courage, physical stamina, land and property holdings, and protective vitality. Prescribed for Aries, Scorpio, and Cancer Lagnas.",
    scientificFacts: "Composed of calcareous skeletons of marine polyp colonies. Authentic natural Mediterranean and Japanese coral displays natural longitudinal striations.",
  },
  {
    name: "Hessonite Garnet",
    hindi: "Gomed (गोमेद)",
    planet: "North Node (Rahu)",
    mineral: "Grossular Garnet",
    hardness: "7.0 – 7.5 Mohs",
    colorTone: "Cinnamon Honey / Whiskey Brown",
    borderAccent: "border-[#854D0E]",
    bgGlow: "bg-radial from-[#B45309]/15 to-transparent",
    tradition: "Associated with clarity amidst confusion, breakthrough unconventional success, and protection during Rahu dasha cycles.",
    scientificFacts: "Calcium aluminum silicate garnet displaying the classic 'treacle' or heat-wave effect under magnification. Must be transparent and untreated.",
  },
  {
    name: "Cat's Eye Chrysoberyl",
    hindi: "Vaidurya / Lehsunia (लहसुनिया)",
    planet: "South Node (Ketu)",
    mineral: "Natural Cymophane Chrysoberyl",
    hardness: "8.5 Mohs",
    colorTone: "Yellowish Green to Honey (with chatoyancy)",
    borderAccent: "border-[#713F12]",
    bgGlow: "bg-radial from-[#CA8A04]/15 to-transparent",
    tradition: "Associated with spiritual discrimination, intuitive insight, and protection from unseen perils during Ketu dasha.",
    scientificFacts: "Exceptional hardness (8.5). Displays chatoyancy ('cat's eye' milk-and-honey effect) caused by microscopic parallel rutile needle inclusions when cut en cabochon.",
  },
];

export default function GemstonesCentrePage() {
  const [sourcingOpen, setSourcingOpen] = useState(false);
  const [selectedGemForSourcing, setSelectedGemForSourcing] = useState("Blue Sapphire (Neelam)");

  const handleOpenSourcing = (gemName: string) => {
    setSelectedGemForSourcing(gemName);
    setSourcingOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Header />

      <main className="flex-1 py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-16">
        {/* Editorial Haute Joaillerie Gemstone Banner */}
        <div className="relative rounded-xs overflow-hidden bg-[#061410] text-white border border-[#B08D57]/40 shadow-xl">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/salon-gemstones.jpg"
              alt="Sacred Untreated Gemstones & Ratna"
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#061410] via-[#061410]/85 to-transparent" />
          </div>

          <div className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0F3D2E]/90 border border-[#D4AF37]/60 text-[#F3E5AB] text-xs uppercase tracking-[0.22em] font-medium shadow-md">
              <Image
                src="/images/brand/element-gemstone-transparent.png"
                alt="Gemstone"
                width={20}
                height={20}
                className="w-4 h-4 object-contain"
              />
              <span>Real Gemstones (Ratna) &bull; 100% Certified</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight leading-tight">
              Natural Astrological <span className="text-gold-gradient italic">Gemstones</span>
            </h1>

            <p className="text-xs sm:text-sm text-[#DDE5DC] leading-relaxed max-w-xl font-light">
              Mined from the earth, verified natural and untreated by recognized gemological laboratories, and set in skin-touching open settings. Clear science, honest advice, zero fear tactics.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => handleOpenSourcing("Certified Vedic Gemstone")}
                className="btn-gold-pure px-6 py-3 text-xs uppercase tracking-wider font-semibold rounded-xs shadow-sm cursor-pointer"
              >
                Find a Certified Gemstone &rarr;
              </button>
              <Link href="/astrology#lagna-explorer">
                <button
                  type="button"
                  className="px-6 py-3 text-xs uppercase tracking-wider font-semibold text-[#F3E5AB] bg-white/5 hover:bg-white/10 border border-[#B08D57]/60 rounded-xs transition-colors cursor-pointer backdrop-blur-xs"
                >
                  Find Your Rashi Gemstones
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Ethical Transparency Banner */}
        <div className="bg-[#173B32] text-white rounded-xs p-8 sm:p-10 border border-[#B08D57]/40 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-radial from-[#B08D57]/20 to-transparent pointer-events-none -z-0" />

          <div className="max-w-4xl relative z-10 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#F3E5AB]">
              <ShieldCheck className="w-4 h-4" />
              <span>Our Code of Gemological Transparency</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-medium">
              What Independent Laboratory Reports Actually Prove
            </h2>

            <p className="text-xs sm:text-sm text-[#DDE5DC] leading-relaxed">
              In the modern gemstone market, certification must be understood with complete honesty. A laboratory certificate from an accredited institute (such as GII, IGI, or GIA) confirms <strong>mineral species</strong>, <strong>carat weight</strong>, and whether the gem has undergone <strong>thermal heat treatments, glass filling, or irradiation</strong>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-[#2A5248] text-xs text-[#DDE5DC]">
              <div className="p-3 bg-white/5 rounded-xs border border-white/10">
                <strong className="text-[#F3E5AB] block mb-1">Untreated vs. Heated</strong>
                <p>We source unheated, natural earth-mined gems. Many commercial stores sell heated stones; we disclose every treatment honestly.</p>
              </div>

              <div className="p-3 bg-white/5 rounded-xs border border-white/10">
                <strong className="text-[#F3E5AB] block mb-1">No Valuation Fiction</strong>
                <p>Scientific lab reports do not assign monetary valuations or planetary astrological powers; they certify mineral truth.</p>
              </div>

              <div className="p-3 bg-white/5 rounded-xs border border-white/10">
                <strong className="text-[#F3E5AB] block mb-1">Zero Purchase Obligation</strong>
                <p>An astrological consultation never obligates you to source your stone from our studio. You may verify and source from any lab worldwide.</p>
              </div>
            </div>
          </div>
        </div>

        {/* The Navratna Spectrum */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B08D57] font-semibold block mb-1">
              Natural Gemstones &bull; Navratna
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#182522] font-normal">
              The Navratna Spectrum
            </h2>
            <p className="text-xs sm:text-sm text-[#626A65] mt-1.5">
              The nine traditional planetary gemstones of Indian tradition with their mineral family, Mohs hardness, and classical astrological affiliations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {NAVRATNA_LIST.map((gem) => (
              <Card
                key={gem.name}
                className={`p-6 bg-white border ${gem.borderAccent}/40 rounded-xs flex flex-col justify-between luxury-card-hover relative overflow-hidden group shadow-xs`}
              >
                <div className={`absolute top-0 right-0 w-32 h-32 ${gem.bgGlow} pointer-events-none -z-0`} />

                <div className="relative z-10 space-y-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#B08D57] block mb-1">
                      {gem.planet}
                    </span>
                    <h3 className="font-serif text-xl font-medium text-[#182522] leading-snug">
                      {gem.name}
                    </h3>
                    <span className="text-xs text-[#173B32] font-serif block">
                      {gem.hindi}
                    </span>
                  </div>

                  <div className="p-2.5 bg-[#FAF8F5] rounded-xs border border-[#E5DFD5] text-[11px] space-y-1 text-[#626A65]">
                    <div className="flex justify-between">
                      <span>Mineral:</span>
                      <strong className="text-[#182522]">{gem.mineral}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Hardness:</span>
                      <strong className="text-[#173B32]">{gem.hardness}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Color:</span>
                      <span className="text-[#182522]">{gem.colorTone}</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#626A65] leading-relaxed">
                    {gem.tradition}
                  </p>

                  <div className="pt-2 border-t border-[#F0ECE2]">
                    <span className="text-[10px] font-mono text-[#82928A] block mb-0.5">
                      Mineralogical Note:
                    </span>
                    <p className="text-[11px] text-[#626A65] leading-relaxed">
                      {gem.scientificFacts}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E5DFD5] mt-4 relative z-10">
                  <button
                    type="button"
                    onClick={() => handleOpenSourcing(`${gem.name} (${gem.hindi})`)}
                    className="w-full py-2 px-3 text-[11px] uppercase tracking-wider font-semibold text-[#173B32] bg-[#FAF8F5] hover:bg-[#173B32] hover:text-white border border-[#E5DFD5] rounded-xs transition-colors cursor-pointer"
                  >
                    Source Certified Stone &rarr;
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Setting Vidhi & Open-Back Chhidra Notice */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-6 sm:p-8 bg-white border border-[#E2D7C5]">
            <h3 className="font-serif text-xl font-medium text-[#182522] mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#B08D57]" />
              Traditional Open-Back Ring Setting (Chhidra)
            </h3>
            <p className="text-xs text-[#626A65] leading-relaxed mb-4">
              According to traditional Vedic Shastra, astrological gemstones should have an open setting at the back so the stone can touch or direct light toward the skin.
            </p>
            <div className="p-3 bg-[#EEF3EE] rounded-xs border border-[#C5D5C4] text-xs text-[#173B32]">
              <strong>Our Shop Guarantee:</strong> All astrological rings and pendants made by our karigars are crafted with proper open-back settings.
            </div>
          </Card>

          <Card className="p-6 sm:p-8 bg-white border border-[#E2D7C5]">
            <h3 className="font-serif text-xl font-medium text-[#182522] mb-3 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#173B32]" />
              Government &amp; International Lab Standards
            </h3>
            <p className="text-xs text-[#626A65] leading-relaxed mb-4">
              Every natural gemstone at Vaidik Ratnam comes with an accredited laboratory certificate. You are warmly welcome to inspect clarity and natural features under magnifying loupes in our shop.
            </p>
            <div className="p-3 bg-[#FAF8F5] rounded-xs border border-[#E2D7C5] text-xs text-[#626A65]">
              Accredited Testing: <strong>Gemological Institute of India (GII)</strong> &bull; <strong>International Gemological Institute (IGI)</strong> &bull; <strong>GIA</strong> upon request.
            </div>
          </Card>
        </div>

        {/* Final CTA */}
        <div className="bg-[#173B32] text-white p-8 rounded-xs flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-serif text-2xl font-medium">
              Need Personal Guidance on Gemstone Suitability?
            </h3>
            <p className="text-xs text-[#DDE5DC]">
              Schedule a quiet, unhurried horoscope evaluation with our family elder before acquiring any stone.
            </p>
          </div>

          <Link href="/consultation/request" className="shrink-0">
            <button
              type="button"
              className="btn-gold-pure px-6 py-3 text-xs uppercase tracking-widest font-semibold rounded-xs shadow-md"
            >
              Talk to Our Astrologer &rarr;
            </button>
          </Link>
        </div>
      </main>

      <Footer />

      {/* Gem Sourcing Dialog */}
      <GemstoneSourcingDialog
        isOpen={sourcingOpen}
        onClose={() => setSourcingOpen(false)}
        initialGemstone={selectedGemForSourcing}
      />
    </div>
  );
}
