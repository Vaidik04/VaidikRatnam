"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GemstoneSourcingDialog } from "@/components/gemstones/GemstoneSourcingDialog";
import {
  Sparkles,
  ShieldCheck,
  Award,
  CheckCircle2,
  AlertTriangle,
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
    borderAccent: "border-[#1d3b8b]",
    bgGlow: "bg-radial from-[#1d3b8b]/20 to-transparent",
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
    borderAccent: "border-[#f1d98a]",
    bgGlow: "bg-radial from-[#f1d98a]/20 to-transparent",
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
    borderAccent: "border-[#0f7a4a]",
    bgGlow: "bg-radial from-[#0f7a4a]/25 to-transparent",
    tradition: "Prescribed for Mercury enhancement: intellect, commerce, speech, and communication. Classical favorite for Gemini and Virgo ascendants.",
    scientificFacts: "Colored by chromium and vanadium. Natural untreated emeralds invariably feature characteristic 'jardin' internal crystal inclusions proving authentic earth birth.",
  },
  {
    name: "Ruby",
    hindi: "Manik (माणिक्य)",
    planet: "Sun (Surya)",
    mineral: "Natural Corundum",
    hardness: "9.0 Mohs",
    colorTone: "Pigeon Blood Red",
    borderAccent: "border-[#9b111e]",
    bgGlow: "bg-radial from-[#9b111e]/25 to-transparent",
    tradition: "Sacred stone of the Sun. Represents vital soul energy, leadership, and nobility. Recommended for Aries, Leo, and Sagittarius ascendants.",
    scientificFacts: "Natural chromium traces create intense crimson luminescence. High refractory index gives natural ruby extraordinary fiery brilliance in sunlight.",
  },
  {
    name: "Red Coral",
    hindi: "Moonga (मूँगा)",
    planet: "Mars (Mangal)",
    mineral: "Organic Marine Aragonite",
    hardness: "3.5 Mohs",
    colorTone: "Deep Oxblood / Vermillion Red",
    borderAccent: "border-[#e63946]",
    bgGlow: "bg-radial from-[#e63946]/20 to-transparent",
    tradition: "Associated with courage, vitality, land ownership, and defense. Prescribed for Aries and Scorpio Lagnas after checking Manglik status.",
    scientificFacts: "Biogenic organic gemstone formed by marine polyps in warm seas. Natural untreated Mediterranean and Japanese coral feature natural wood-grain graining.",
  },
  {
    name: "Natural Pearl",
    hindi: "Moti (मोती)",
    planet: "Moon (Chandra)",
    mineral: "Organic Marine Nacre",
    hardness: "2.5 – 4.5 Mohs",
    colorTone: "Lustrous Silvery White",
    borderAccent: "border-[#f8f9fa]",
    bgGlow: "bg-radial from-[#ffffff]/15 to-transparent",
    tradition: "Governs mind, emotional equanimity, maternal happiness, and peace. Standard recommendation for Cancer (Karka) ascendant seekers.",
    scientificFacts: "Concentric layers of calcium carbonate (aragonite) bonded with conchiolin. True natural Basra and South Sea pearls command exceptional rarity.",
  },
  {
    name: "Hessonite Garnet",
    hindi: "Gomed (गोमेद)",
    planet: "Rahu (North Lunar Node)",
    mineral: "Grossularite Garnet",
    hardness: "7.0 – 7.5 Mohs",
    colorTone: "Warm Honey Cinnamon / Cow-Urine Amber",
    borderAccent: "border-[#b45309]",
    bgGlow: "bg-radial from-[#b45309]/20 to-transparent",
    tradition: "Mitigates sudden confusion, illusion, and Rahu dasha turbulence. Prescribed only when Rahu occupies favorable positions in Taurus or Gemini.",
    scientificFacts: "Calcium aluminum silicate. Characteristic 'treacle' heat-wave swirls inside crystal structure confirm unheated natural Sri Lankan provenance.",
  },
  {
    name: "Cat's Eye",
    hindi: "Lehsunia (लहसुनिया)",
    planet: "Ketu (South Lunar Node)",
    mineral: "Chrysoberyl",
    hardness: "8.5 Mohs",
    colorTone: "Greenish Yellow with Sharp Chatoyant Silk",
    borderAccent: "border-[#84cc16]",
    bgGlow: "bg-radial from-[#84cc16]/20 to-transparent",
    tradition: "Spiritual liberation, protection from concealed enemies, and intuitive awakening. Associated with Ketu transits.",
    scientificFacts: "True chrysoberyl cat's eye exhibits a sharp, luminous milk-and-honey chatoyancy line caused by parallel rutile needle inclusions when cut en cabochon.",
  },
];

export default function GemstonesPage() {
  const [sourcingOpen, setSourcingOpen] = useState(false);
  const [selectedGemForSourcing, setSelectedGemForSourcing] = useState("");

  const handleOpenSourcing = (gemName: string) => {
    setSelectedGemForSourcing(gemName);
    setSourcingOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#04170f] text-[#faf7f0] selection:bg-[#d4af37]/30 selection:text-[#f6e7b4]">
      <Header />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-12">
        {/* Editorial Header Banner */}
        <div className="relative rounded-2xl overflow-hidden bg-[#0a2a1d] text-white border border-[#d4af37]/40 shadow-2xl">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/salon-gemstones.jpg"
              alt="Natural Gemstones Sanctuary"
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-35"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#04170f] via-[#04170f]/85 to-transparent" />
          </div>

          <div className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0a2a1d]/90 border border-[#d4af37]/60 text-[#f1d98a] text-xs uppercase tracking-[0.22em] font-mono shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Certified Earth-Mined Ratnas &bull; 100% Untreated</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight leading-tight">
              Natural Astrological <span className="text-gold-gradient italic">Gemstones</span>
            </h1>

            <p className="text-xs sm:text-sm text-[#a8b6af] leading-relaxed max-w-xl font-light">
              Mined from the earth, verified natural and unheated by recognized gemological laboratories, and set in skin-touching open settings. Clear science, honest advice, zero fear tactics.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => handleOpenSourcing("Certified Vedic Gemstone")}
                className="bg-gold-gradient text-[#04170f] px-6 py-3 text-xs uppercase tracking-wider font-bold rounded-full shadow-lg hover:brightness-105 font-mono cursor-pointer"
              >
                Find a Certified Gemstone &rarr;
              </button>
              <Link href="/astrology">
                <button
                  type="button"
                  className="px-6 py-3 text-xs uppercase tracking-wider font-mono text-[#f1d98a] bg-white/5 hover:bg-white/10 border border-[#d4af37]/40 rounded-full transition-colors cursor-pointer backdrop-blur-md"
                >
                  Find Your Lagna Gemstones
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Ethical Transparency Banner */}
        <div className="bg-gradient-to-r from-[#0a2a1d] via-[#0f3a28] to-[#0a2a1d] text-white rounded-2xl p-8 sm:p-10 border border-[#d4af37]/40 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-radial from-[#d4af37]/20 to-transparent pointer-events-none -z-0" />

          <div className="max-w-4xl relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#d4af37]">
              <ShieldCheck className="w-4 h-4" />
              <span>The Vaidik Ratnam Truth Standard</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium">
              What We Strictly Stand For &mdash; And What We Will Never Do
            </h2>
            <p className="text-xs sm:text-sm text-[#a8b6af] leading-relaxed">
              The Indian gemstone market is flooded with lead-glass filled rubies, beryllium-diffused sapphires, and dyed emeralds sold under sacred pretenses. We operate on three strict rules:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#04170f]/70 border border-white/10 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#25D366]">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>100% Unheated Earth Gems</span>
                </div>
                <p className="text-[11px] text-[#a8b6af]">
                  We test and source only natural, untreated stones. If a stone has undergone heat treatment, it is clearly stated.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#04170f]/70 border border-white/10 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#d4af37]">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Accredited Lab Reports</span>
                </div>
                <p className="text-[11px] text-[#a8b6af]">
                  Every stone is accompanied by an independent certificate from GII, IGI, or govt-recognized gem laboratories.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#04170f]/70 border border-white/10 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-mono text-rose-400">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>Zero Fear Selling</span>
                </div>
                <p className="text-[11px] text-[#a8b6af]">
                  We never scare seekers with curses or planetary fear. If your horoscope does not indicate a gemstone, we tell you plainly.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* The Navratna Spectrum */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-mono block mb-1">
              Natural Gemstones &bull; Navratna
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal">
              The Navratna Spectrum
            </h2>
            <p className="text-xs sm:text-sm text-[#a8b6af] mt-1.5">
              The nine traditional planetary gemstones of Indian tradition with their mineral family, Mohs hardness, and classical astrological affiliations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {NAVRATNA_LIST.map((gem) => (
              <div
                key={gem.name}
                className={`p-6 bg-[#0a2a1d]/70 border ${gem.borderAccent}/50 rounded-2xl flex flex-col justify-between group hover:border-[#d4af37] transition-all duration-300 relative overflow-hidden shadow-xl backdrop-blur-md`}
              >
                <div className={`absolute top-0 right-0 w-32 h-32 ${gem.bgGlow} pointer-events-none -z-0`} />

                <div className="relative z-10 space-y-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#d4af37] block mb-1">
                      {gem.planet}
                    </span>
                    <h3 className="font-serif text-xl font-medium text-white group-hover:text-[#f1d98a] transition-colors leading-snug">
                      {gem.name}
                    </h3>
                    <span className="text-xs text-[#d4af37] font-serif block">
                      {gem.hindi}
                    </span>
                  </div>

                  <div className="p-3 bg-[#04170f]/80 rounded-xl border border-white/10 text-[11px] font-mono space-y-1 text-[#a8b6af]">
                    <div className="flex justify-between">
                      <span>Mineral:</span>
                      <strong className="text-white">{gem.mineral}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Hardness:</span>
                      <strong className="text-[#f1d98a]">{gem.hardness}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Color:</span>
                      <span className="text-white truncate max-w-[140px]">{gem.colorTone}</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#a8b6af] leading-relaxed">
                    {gem.tradition}
                  </p>

                  <div className="pt-2 border-t border-white/10">
                    <span className="text-[10px] font-mono text-[#d4af37] block mb-0.5 uppercase tracking-wider">
                      Mineralogical Note:
                    </span>
                    <p className="text-[11px] text-[#e2ece7] leading-relaxed">
                      {gem.scientificFacts}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 mt-4 relative z-10">
                  <button
                    type="button"
                    onClick={() => handleOpenSourcing(`${gem.name} (${gem.hindi})`)}
                    className="w-full py-2.5 px-3 text-[11px] font-mono uppercase tracking-wider font-semibold text-[#04170f] bg-gold-gradient rounded-full hover:brightness-105 transition-all cursor-pointer shadow-md"
                  >
                    Source Certified Stone &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Setting Vidhi & Open-Back Chhidra Notice */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 sm:p-8 bg-[#0a2a1d]/70 rounded-2xl border border-[#d4af37]/30 shadow-xl backdrop-blur-md">
            <h3 className="font-serif text-xl font-medium text-white mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#d4af37]" />
              Traditional Open-Back Ring Setting (Chhidra)
            </h3>
            <p className="text-xs text-[#a8b6af] leading-relaxed mb-4">
              According to traditional Vedic Shastra, astrological gemstones should have an open setting at the back so the stone can touch or direct light toward the skin.
            </p>
            <div className="p-3 bg-[#04170f]/90 rounded-xl border border-[#d4af37]/30 text-xs font-mono text-[#f1d98a]">
              <strong>Our Shop Guarantee:</strong> All astrological rings and pendants made by our karigars are crafted with proper open-back settings.
            </div>
          </div>

          <div className="p-6 sm:p-8 bg-[#0a2a1d]/70 rounded-2xl border border-[#d4af37]/30 shadow-xl backdrop-blur-md">
            <h3 className="font-serif text-xl font-medium text-white mb-3 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#d4af37]" />
              Government &amp; International Lab Standards
            </h3>
            <p className="text-xs text-[#a8b6af] leading-relaxed mb-4">
              Every natural gemstone at Vaidik Ratnam comes with an accredited laboratory certificate. You are warmly welcome to inspect clarity and natural features under magnifying loupes in our shop.
            </p>
            <div className="p-3 bg-[#04170f]/90 rounded-xl border border-white/10 text-xs font-mono text-[#a8b6af]">
              Accredited Testing: <strong className="text-white">Gemological Institute of India (GII)</strong> &bull; <strong className="text-white">International Gemological Institute (IGI)</strong> &bull; <strong className="text-white">GIA</strong> upon request.
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-gradient-to-r from-[#0a2a1d] via-[#0f3a28] to-[#0a2a1d] text-white p-8 sm:p-10 rounded-2xl border border-[#d4af37]/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-serif text-2xl font-medium">
              Need Personal Guidance on Gemstone Suitability?
            </h3>
            <p className="text-xs text-[#a8b6af]">
              Schedule a quiet, unhurried horoscope evaluation with our family elder before acquiring any stone.
            </p>
          </div>

          <Link href="/consultation/request" className="shrink-0">
            <button
              type="button"
              className="bg-gold-gradient text-[#04170f] px-6 py-3 text-xs font-mono uppercase tracking-widest font-bold rounded-full shadow-lg hover:brightness-105 cursor-pointer"
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
