"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";
import { Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  ShieldAlert,
  ArrowRight,
  ShieldCheck,
  Gem,
  Info,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

interface GemstoneData {
  id: string;
  nameHindi: string;
  nameEnglish: string;
  mineralSpecies: string;
  chemicalFormula: string;
  mohsHardness: string;
  mohsNumeric: number;
  refractiveIndex: string;
  specificGravity: string;
  primaryOrigins: string[];
  commonTreatments: string;
  labReportMustState: string;
  traditionalPlanet: string;
  traditionalNotes: string;
  accentColor: string;
  bgGlow: string;
}

const GEMSTONES: GemstoneData[] = [
  {
    id: "blue-sapphire",
    nameEnglish: "Blue Sapphire",
    nameHindi: "Neelam (नीलम)",
    mineralSpecies: "Corundum",
    chemicalFormula: "Al₂O₃ with trace Fe, Ti",
    mohsHardness: "9.0 (Extremely durable)",
    mohsNumeric: 9.0,
    refractiveIndex: "1.762 – 1.770",
    specificGravity: "4.00",
    primaryOrigins: ["Sri Lanka (Ceylon)", "Myanmar (Burma)", "Madagascar", "Kashmir (Historic/Rare)"],
    commonTreatments: "High-heat thermal treatment (routine in market); beryllium diffusion; lead-glass fracture filling (heavily treated imitation).",
    labReportMustState: "'No indications of heating' for untreated status, or explicit disclosure of thermal enhancement.",
    traditionalPlanet: "Saturn (Shani)",
    traditionalNotes: "In Vedic tradition, believed to bring focus and mental discipline. Always recommended to trial for 3 days before permanent setting.",
    accentColor: "#1E3A8A",
    bgGlow: "rgba(30, 58, 138, 0.08)",
  },
  {
    id: "yellow-sapphire",
    nameEnglish: "Yellow Sapphire",
    nameHindi: "Pukhraj (पुखराज)",
    mineralSpecies: "Corundum",
    chemicalFormula: "Al₂O₃ with trace Fe",
    mohsHardness: "9.0 (Extremely durable)",
    mohsNumeric: 9.0,
    refractiveIndex: "1.762 – 1.770",
    specificGravity: "4.00",
    primaryOrigins: ["Sri Lanka (Ceylon)", "Madagascar", "Thailand (Chanthaburi)"],
    commonTreatments: "Thermal heat enhancement to deepen yellow tone; beryllium diffusion to induce artificial color.",
    labReportMustState: "Must confirm natural unheated status without color-diffused additives.",
    traditionalPlanet: "Jupiter (Brihaspati / Guru)",
    traditionalNotes: "Associated traditionally with wisdom, knowledge, legal matters, and spiritual study.",
    accentColor: "#B45309",
    bgGlow: "rgba(180, 83, 9, 0.08)",
  },
  {
    id: "ruby",
    nameEnglish: "Ruby",
    nameHindi: "Manik / Manikya (माणिक्य)",
    mineralSpecies: "Corundum",
    chemicalFormula: "Al₂O₃ with trace Cr",
    mohsHardness: "9.0 (High durability)",
    mohsNumeric: 9.0,
    refractiveIndex: "1.762 – 1.770",
    specificGravity: "4.00",
    primaryOrigins: ["Myanmar (Burma / Mogok)", "Mozambique", "Madagascar"],
    commonTreatments: "Routine heating; flux healing of fractures; lead-glass composite filling (drastically reduces value).",
    labReportMustState: "Origin determination and statement verifying no lead glass or flux residue present.",
    traditionalPlanet: "Sun (Surya)",
    traditionalNotes: "Traditionally associated with leadership, vitality, and authority in ancient Vedic texts.",
    accentColor: "#991B1B",
    bgGlow: "rgba(153, 27, 27, 0.08)",
  },
  {
    id: "emerald",
    nameEnglish: "Emerald",
    nameHindi: "Panna (पन्ना)",
    mineralSpecies: "Beryl",
    chemicalFormula: "Be₃Al₂Si₆O₁₈ with Cr/V",
    mohsHardness: "7.5 – 8.0 (Brittle due to natural fissures)",
    mohsNumeric: 7.75,
    refractiveIndex: "1.577 – 1.583",
    specificGravity: "2.72",
    primaryOrigins: ["Zambia", "Colombia (Muzo/Chivor)", "Brazil", "Russia"],
    commonTreatments: "Clarity enhancement with colorless cedarwood oil or polymer resin to mask internal 'jardin' fractures.",
    labReportMustState: "Degree of clarity enhancement: None, Minor, Moderate, or Significant clarity enhancement.",
    traditionalPlanet: "Mercury (Budh)",
    traditionalNotes: "Associated with communication, commerce, analytical reasoning, and speech.",
    accentColor: "#065F46",
    bgGlow: "rgba(6, 95, 70, 0.08)",
  },
  {
    id: "diamond",
    nameEnglish: "Natural Diamond",
    nameHindi: "Heera (हीरा)",
    mineralSpecies: "Carbon",
    chemicalFormula: "C (Crystalline Carbon)",
    mohsHardness: "10.0 (Hardest known natural mineral)",
    mohsNumeric: 10.0,
    refractiveIndex: "2.417 – 2.419",
    specificGravity: "3.52",
    primaryOrigins: ["Botswana", "Russia", "South Africa", "Canada", "Golconda (Historic)"],
    commonTreatments: "HPHT (High Pressure High Temperature) color improvement; laser drilling and fracture filling.",
    labReportMustState: "Must certify natural earth-mined origin and lack of artificial color/clarity enhancement.",
    traditionalPlanet: "Venus (Shukra)",
    traditionalNotes: "Associated with creative brilliance, refined beauty, prosperity, and personal grace.",
    accentColor: "#0284C7",
    bgGlow: "rgba(2, 132, 199, 0.08)",
  },
  {
    id: "natural-pearl",
    nameEnglish: "Natural Pearl / South Sea",
    nameHindi: "Moti (मोती)",
    mineralSpecies: "Organic (Calcium Carbonate - Aragonite)",
    chemicalFormula: "CaCO₃ + Conchiolin",
    mohsHardness: "2.5 – 4.5 (Soft, requires gentle care)",
    mohsNumeric: 3.5,
    refractiveIndex: "1.52 – 1.69",
    specificGravity: "2.60 – 2.78",
    primaryOrigins: ["Basra (Historic Arabian Gulf)", "Australia (South Sea)", "Venezuela", "Tahiti"],
    commonTreatments: "Bleaching, polishing; distinguish natural wild pearl from cultured nucleated pearl.",
    labReportMustState: "X-ray radiography / Micro-CT scanning confirming natural wild non-nucleated vs cultured origin.",
    traditionalPlanet: "Moon (Chandra)",
    traditionalNotes: "Associated with emotional equilibrium, tranquility, and peace of mind.",
    accentColor: "#475569",
    bgGlow: "rgba(71, 85, 105, 0.08)",
  },
  {
    id: "red-coral",
    nameEnglish: "Natural Red Coral",
    nameHindi: "Moonga (मूँगा)",
    mineralSpecies: "Organic (Corallium Rubrum)",
    chemicalFormula: "CaCO₃ (Calcite structure)",
    mohsHardness: "3.5 (Soft, vulnerable to acids & perfumes)",
    mohsNumeric: 3.5,
    refractiveIndex: "1.486 – 1.658",
    specificGravity: "2.65",
    primaryOrigins: ["Italy (Mediterranean / Sardinia)", "Japan", "Taiwan"],
    commonTreatments: "Dyeing of porous white coral or plastic resin composite imitations.",
    labReportMustState: "Natural un-dyed color verification and organic structure confirmation.",
    traditionalPlanet: "Mars (Mangal)",
    traditionalNotes: "Associated traditionally with courage, physical stamina, leadership, and vitality.",
    accentColor: "#C2410C",
    bgGlow: "rgba(194, 65, 12, 0.08)",
  },
  {
    id: "hessonite-garnet",
    nameEnglish: "Hessonite Garnet",
    nameHindi: "Gomed (गोमेद)",
    mineralSpecies: "Grossular Garnet",
    chemicalFormula: "Ca₃Al₂(SiO₄)₃ with Fe/Mn",
    mohsHardness: "7.0 – 7.5 (Good durability)",
    mohsNumeric: 7.25,
    refractiveIndex: "1.734 – 1.759",
    specificGravity: "3.60 – 3.68",
    primaryOrigins: ["Sri Lanka (Ceylon)", "India (Odisha / Rajasthan)", "Madagascar"],
    commonTreatments: "Generally untreated in nature; glass imitations common in roadside markets.",
    labReportMustState: "Confirmation of natural garnet species and natural honey/cinnamon color.",
    traditionalPlanet: "Rahu (North Lunar Node)",
    traditionalNotes: "Associated with clearing mental haze, neutralizing illusions, and sharp strategic thinking.",
    accentColor: "#78350F",
    bgGlow: "rgba(120, 53, 15, 0.08)",
  },
  {
    id: "cats-eye",
    nameEnglish: "Chrysoberyl Cat's Eye",
    nameHindi: "Lehsunia / Vaidurya (लहसुनिया)",
    mineralSpecies: "Chrysoberyl",
    chemicalFormula: "BeAl₂O₄ with microscopic rutile silk",
    mohsHardness: "8.5 (Exceptionally tough and durable)",
    mohsNumeric: 8.5,
    refractiveIndex: "1.744 – 1.755",
    specificGravity: "3.71 – 3.75",
    primaryOrigins: ["Sri Lanka (Ceylon)", "Brazil", "India (Odisha)", "Madagascar"],
    commonTreatments: "Natural sharp chatoyancy line ('milk & honey' effect); quartz imitations are common.",
    labReportMustState: "Confirmation of natural chrysoberyl species (not quartz cat's eye or synthetic fiber-optic glass).",
    traditionalPlanet: "Ketu (South Lunar Node)",
    traditionalNotes: "Associated traditionally with spiritual introspection, intuition, and discernment.",
    accentColor: "#854D0E",
    bgGlow: "rgba(133, 77, 14, 0.08)",
  },
];

export default function GemstoneComparisonPage() {
  const [gem1Id, setGem1Id] = useState<string>("blue-sapphire");
  const [gem2Id, setGem2Id] = useState<string>("emerald");

  const gem1 = GEMSTONES.find((g) => g.id === gem1Id) || GEMSTONES[0];
  const gem2 = GEMSTONES.find((g) => g.id === gem2Id) || GEMSTONES[3];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Header />

      <main className="flex-1 py-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#173B32]/10 border border-[#B08D57]/40 text-[#173B32] text-xs uppercase tracking-[0.22em] font-medium animate-float">
            <Gem className="w-3.5 h-3.5 text-[#B08D57]" />
            <span>Gemological Education Suite</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl text-[#182522] font-normal tracking-tight">
            Vedic Gemstone &amp; Ratna Comparison
          </h1>

          <p className="text-sm sm:text-base text-[#626A65] leading-relaxed">
            Compare structural mineralogy, Mohs durability scale, laboratory verification mandates, and Parashari planetary traditions across natural Navratnas.
          </p>
        </div>

        {/* Warning Banner */}
        <div className="bg-white border-2 border-[#E2D7C5] rounded-xs p-5 shadow-xs flex items-start gap-4 text-xs text-[#182522]">
          <div className="w-9 h-9 rounded-full bg-[#925700]/10 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-5 h-5 text-[#925700]" />
          </div>
          <div className="leading-relaxed">
            <strong className="text-[#925700] block text-sm font-serif mb-1">
              Our Shop Principle: Laboratory Proof Over Verbal Promises
            </strong>
            The absence of treatment remarks on a handwritten receipt or generic plastic barcode does <strong>NOT</strong> prove a colored stone is untreated. Always insist on an accredited gemological laboratory certificate explicitly stating: <em>&ldquo;No indications of heating or fracture enhancement detected.&rdquo;</em>
          </div>
        </div>

        {/* Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white p-5 border border-[#E2D7C5] rounded-xs shadow-xs space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#B08D57] font-semibold block">
              Gemstone Position A
            </span>
            <Select
              label="Select Primary Gemstone"
              value={gem1Id}
              onChange={(e) => setGem1Id(e.target.value)}
              options={GEMSTONES.map((g) => ({
                value: g.id,
                label: `${g.nameEnglish} — ${g.nameHindi}`,
              }))}
            />
          </div>

          <div className="bg-white p-5 border border-[#E2D7C5] rounded-xs shadow-xs space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#B08D57] font-semibold block">
              Gemstone Position B
            </span>
            <Select
              label="Select Comparison Gemstone"
              value={gem2Id}
              onChange={(e) => setGem2Id(e.target.value)}
              options={GEMSTONES.map((g) => ({
                value: g.id,
                label: `${g.nameEnglish} — ${g.nameHindi}`,
              }))}
            />
          </div>
        </div>

        {/* Side-by-Side Comparison Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Gemstone 1 Card */}
          <Card className="p-8 bg-white border border-[#E2D7C5] rounded-xs shadow-md space-y-6 relative overflow-hidden">
            <div
              className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16"
              style={{ background: gem1.bgGlow }}
            />

            <div className="border-b border-[#F0ECE2] pb-5 relative">
              <span className="text-[10px] uppercase tracking-[0.22em] text-[#B08D57] font-semibold block mb-1">
                {gem1.mineralSpecies} Species &bull; Navratna
              </span>
              <h2 className="font-serif text-3xl text-[#182522] font-normal">
                {gem1.nameEnglish}
              </h2>
              <p className="text-xs text-[#626A65] font-serif italic mt-0.5">{gem1.nameHindi}</p>
            </div>

            {/* Mohs Hardness Progress Bar */}
            <div className="space-y-1.5 p-4 rounded-xs bg-[#FAF8F5] border border-[#E5DFD5]">
              <div className="flex justify-between items-baseline text-xs">
                <span className="font-semibold text-[#182522]">Mohs Hardness:</span>
                <span className="font-mono font-bold text-[#173B32]">{gem1.mohsHardness}</span>
              </div>
              <div className="w-full bg-[#E5DFD5] h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#173B32] rounded-full transition-all duration-700"
                  style={{ width: `${(gem1.mohsNumeric / 10) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-[#8F9691] font-mono">
                <span>1 (Talc)</span>
                <span>5 (Apatite)</span>
                <span>10 (Diamond)</span>
              </div>
            </div>

            {/* Scientific Properties */}
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 bg-[#FAF8F5] rounded-xs border border-[#E5DFD5]">
                <div>
                  <strong className="text-[#626A65] block text-[10px] uppercase tracking-wider">Refractive Index:</strong>
                  <span className="font-mono font-medium text-[#182522]">{gem1.refractiveIndex}</span>
                </div>
                <div>
                  <strong className="text-[#626A65] block text-[10px] uppercase tracking-wider">Specific Gravity:</strong>
                  <span className="font-mono font-medium text-[#182522]">{gem1.specificGravity}</span>
                </div>
              </div>

              <div>
                <strong className="text-[#182522] block mb-1">Chemical Formula:</strong>
                <p className="text-[#626A65] font-mono bg-[#FAF8F5] px-2.5 py-1.5 rounded-xs border border-[#E5DFD5]">
                  {gem1.chemicalFormula}
                </p>
              </div>

              <div>
                <strong className="text-[#182522] block mb-1">Primary Geographic Origins:</strong>
                <p className="text-[#626A65] leading-relaxed">{gem1.primaryOrigins.join(", ")}</p>
              </div>

              <div className="p-4 bg-[#FFF8E7] border border-[#FFE5A3] rounded-xs space-y-1">
                <strong className="text-[#925700] block text-xs font-semibold uppercase tracking-wider">
                  Prevalent Market Treatments:
                </strong>
                <p className="text-[#925700] leading-relaxed">{gem1.commonTreatments}</p>
              </div>

              <div className="p-4 bg-[#EEF3EE] border border-[#C5D5C4] rounded-xs space-y-1">
                <strong className="text-[#173B32] block text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Required Lab Certificate Wording:
                </strong>
                <p className="text-[#173B32] leading-relaxed">{gem1.labReportMustState}</p>
              </div>

              <div className="pt-4 border-t border-[#F0ECE2] space-y-2">
                <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.2em] text-[#B08D57] block">
                  Parashari Jyotish Alignment
                </span>
                <p className="text-base font-serif font-medium text-[#182522]">
                  Ruling Graha: {gem1.traditionalPlanet}
                </p>
                <p className="text-xs text-[#626A65] leading-relaxed">
                  {gem1.traditionalNotes}
                </p>
              </div>
            </div>

            {/* Sourcing CTA for Stone 1 */}
            <div className="pt-2">
              <Link href={`/gemstones?sourcing=${gem1.id}`}>
                <Button variant="outline" size="sm" className="w-full text-xs uppercase tracking-wider border-[#173B32] text-[#173B32] hover:bg-[#173B32] hover:text-white">
                  Enquire About Natural {gem1.nameEnglish} &rarr;
                </Button>
              </Link>
            </div>
          </Card>

          {/* Gemstone 2 Card */}
          <Card className="p-8 bg-white border border-[#E2D7C5] rounded-xs shadow-md space-y-6 relative overflow-hidden">
            <div
              className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16"
              style={{ background: gem2.bgGlow }}
            />

            <div className="border-b border-[#F0ECE2] pb-5 relative">
              <span className="text-[10px] uppercase tracking-[0.22em] text-[#B08D57] font-semibold block mb-1">
                {gem2.mineralSpecies} Species &bull; Navratna
              </span>
              <h2 className="font-serif text-3xl text-[#182522] font-normal">
                {gem2.nameEnglish}
              </h2>
              <p className="text-xs text-[#626A65] font-serif italic mt-0.5">{gem2.nameHindi}</p>
            </div>

            {/* Mohs Hardness Progress Bar */}
            <div className="space-y-1.5 p-4 rounded-xs bg-[#FAF8F5] border border-[#E5DFD5]">
              <div className="flex justify-between items-baseline text-xs">
                <span className="font-semibold text-[#182522]">Mohs Hardness:</span>
                <span className="font-mono font-bold text-[#173B32]">{gem2.mohsHardness}</span>
              </div>
              <div className="w-full bg-[#E5DFD5] h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#173B32] rounded-full transition-all duration-700"
                  style={{ width: `${(gem2.mohsNumeric / 10) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-[#8F9691] font-mono">
                <span>1 (Talc)</span>
                <span>5 (Apatite)</span>
                <span>10 (Diamond)</span>
              </div>
            </div>

            {/* Scientific Properties */}
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 bg-[#FAF8F5] rounded-xs border border-[#E5DFD5]">
                <div>
                  <strong className="text-[#626A65] block text-[10px] uppercase tracking-wider">Refractive Index:</strong>
                  <span className="font-mono font-medium text-[#182522]">{gem2.refractiveIndex}</span>
                </div>
                <div>
                  <strong className="text-[#626A65] block text-[10px] uppercase tracking-wider">Specific Gravity:</strong>
                  <span className="font-mono font-medium text-[#182522]">{gem2.specificGravity}</span>
                </div>
              </div>

              <div>
                <strong className="text-[#182522] block mb-1">Chemical Formula:</strong>
                <p className="text-[#626A65] font-mono bg-[#FAF8F5] px-2.5 py-1.5 rounded-xs border border-[#E5DFD5]">
                  {gem2.chemicalFormula}
                </p>
              </div>

              <div>
                <strong className="text-[#182522] block mb-1">Primary Geographic Origins:</strong>
                <p className="text-[#626A65] leading-relaxed">{gem2.primaryOrigins.join(", ")}</p>
              </div>

              <div className="p-4 bg-[#FFF8E7] border border-[#FFE5A3] rounded-xs space-y-1">
                <strong className="text-[#925700] block text-xs font-semibold uppercase tracking-wider">
                  Prevalent Market Treatments:
                </strong>
                <p className="text-[#925700] leading-relaxed">{gem2.commonTreatments}</p>
              </div>

              <div className="p-4 bg-[#EEF3EE] border border-[#C5D5C4] rounded-xs space-y-1">
                <strong className="text-[#173B32] block text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Required Lab Certificate Wording:
                </strong>
                <p className="text-[#173B32] leading-relaxed">{gem2.labReportMustState}</p>
              </div>

              <div className="pt-4 border-t border-[#F0ECE2] space-y-2">
                <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.2em] text-[#B08D57] block">
                  Parashari Jyotish Alignment
                </span>
                <p className="text-base font-serif font-medium text-[#182522]">
                  Ruling Graha: {gem2.traditionalPlanet}
                </p>
                <p className="text-xs text-[#626A65] leading-relaxed">
                  {gem2.traditionalNotes}
                </p>
              </div>
            </div>

            {/* Sourcing CTA for Stone 2 */}
            <div className="pt-2">
              <Link href={`/gemstones?sourcing=${gem2.id}`}>
                <Button variant="outline" size="sm" className="w-full text-xs uppercase tracking-wider border-[#173B32] text-[#173B32] hover:bg-[#173B32] hover:text-white">
                  Enquire About Natural {gem2.nameEnglish} &rarr;
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* ====================================================================
            MOHS SCALE OF MINERAL HARDNESS & DAILY WEARABILITY EXPLAINER
            ==================================================================== */}
        <Card className="p-6 sm:p-8 bg-white border border-[#E2D7C5] rounded-xs shadow-md space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F0ECE2] pb-5">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-[0.24em] text-[#B08D57] font-semibold block">
                Gemological Durability Science
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#182522] font-normal">
                Mohs Hardness Scale (1 to 10) &amp; Daily Wearability Guide
              </h2>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#173B32]/10 text-[#173B32] text-xs font-mono font-medium shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-[#B08D57]" />
              <span>Comparative Analysis Active</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#626A65] leading-relaxed max-w-4xl">
            In gemstone science, <strong>Hardness</strong> (resistance to scratching on the Mohs scale) is not the same as <strong>Toughness</strong> (resistance to chipping and fracturing). For example, Emerald is hard (7.5–8.0 Mohs) but contains microscopic natural fissures called <em>jardin</em>, making it much more delicate than Ruby or Sapphire (9.0 Mohs) or Diamond (10.0 Mohs).
          </p>

          {/* Visual 1-10 Mohs Step Spectrum */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-[#626A65]">
              <span className="font-bold text-[#A61C1C]">1 &bull; Very Soft (Requires Gentle Care)</span>
              <span className="font-bold text-[#173B32]">10 &bull; Supreme Hardness (Indestructible to Scratching)</span>
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
              {[
                { level: 1, mineral: "Talc", gem: "—", tone: "bg-stone-100 text-stone-700" },
                { level: 2, mineral: "Gypsum", gem: "Amber (2-2.5)", tone: "bg-amber-50 text-amber-800" },
                { level: 3, mineral: "Calcite", gem: "Coral / Pearl (3-4)", tone: "bg-orange-50 text-orange-800" },
                { level: 4, mineral: "Fluorite", gem: "Pearl (4)", tone: "bg-yellow-50 text-yellow-800" },
                { level: 5, mineral: "Apatite", gem: "Turquoise (5-6)", tone: "bg-teal-50 text-teal-800" },
                { level: 6, mineral: "Orthoclase", gem: "Moonstone (6-6.5)", tone: "bg-cyan-50 text-cyan-800" },
                { level: 7, mineral: "Quartz", gem: "Hessonite (7-7.5)", tone: "bg-emerald-50 text-emerald-800" },
                { level: 8, mineral: "Topaz", gem: "Emerald (7.5-8.0)", tone: "bg-emerald-100 text-emerald-900" },
                { level: 9, mineral: "Corundum", gem: "Ruby & Sapphire (9.0)", tone: "bg-[#173B32]/10 text-[#173B32]" },
                { level: 10, mineral: "Diamond", gem: "Heera (10.0)", tone: "bg-[#173B32] text-white" },
              ].map((item) => {
                const isGem1Match = Math.round(gem1.mohsNumeric) === item.level;
                const isGem2Match = Math.round(gem2.mohsNumeric) === item.level;
                const isAnyMatch = isGem1Match || isGem2Match;

                return (
                  <div
                    key={item.level}
                    className={`p-2.5 rounded-xs border text-center transition-all relative ${
                      isAnyMatch
                        ? "border-2 border-[#B08D57] ring-2 ring-[#B08D57]/20 shadow-md scale-105 z-10 bg-white"
                        : "border-[#E5DFD5] bg-[#FAF8F5]"
                    }`}
                  >
                    <div className="font-mono text-xs font-bold text-[#182522]">
                      {item.level}
                    </div>
                    <div className="text-[10px] text-[#626A65] truncate font-medium">
                      {item.mineral}
                    </div>
                    <div className="text-[9px] text-[#8F9691] truncate mt-0.5">
                      {item.gem}
                    </div>

                    {isAnyMatch && (
                      <div className="mt-1.5 flex flex-col gap-0.5">
                        {isGem1Match && (
                          <span className="text-[8px] font-bold px-1 py-0.2 rounded-xs bg-[#173B32] text-white truncate">
                            {gem1.nameEnglish.split(" ")[0]}
                          </span>
                        )}
                        {isGem2Match && (
                          <span className="text-[8px] font-bold px-1 py-0.2 rounded-xs bg-[#B08D57] text-[#182522] truncate">
                            {gem2.nameEnglish.split(" ")[0]}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Practical Care & Durability Comparison between Gem 1 and Gem 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Gem 1 Care Verdict */}
            <div className="p-5 rounded-xs bg-[#FAF8F5] border border-[#E5DFD5] space-y-2">
              <div className="flex items-center justify-between">
                <strong className="font-serif text-base text-[#182522] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1B6442]" />
                  {gem1.nameEnglish} ({gem1.mohsHardness})
                </strong>
                <span className="text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded-xs bg-white border border-[#E5DFD5] text-[#173B32]">
                  {gem1.mohsNumeric >= 9 ? "Everyday Ring Safe" : gem1.mohsNumeric >= 7 ? "Occasion / Gentle Daily" : "Protective Care Only"}
                </span>
              </div>
              <p className="text-xs text-[#626A65] leading-relaxed">
                {gem1.mohsNumeric >= 9
                  ? "Extremely hard and durable stone. Resistant to everyday scratches and safe for daily ring wear."
                  : gem1.id === "emerald"
                  ? "Hard on the surface, but contains natural internal fissures (jardin). Never subject to ultrasonic cleaners or steam; avoid harsh chemicals and heavy blows."
                  : gem1.mohsNumeric <= 4.5
                  ? "Organic and delicate. Vulnerable to perfumes, hairsprays, sweat acidity, and abrasive friction. Clean with a dry microfiber cloth only."
                  : "Good scratch resistance for everyday jewellery, but avoid abrasive impacts with hard surfaces."}
              </p>
            </div>

            {/* Gem 2 Care Verdict */}
            <div className="p-5 rounded-xs bg-[#FAF8F5] border border-[#E5DFD5] space-y-2">
              <div className="flex items-center justify-between">
                <strong className="font-serif text-base text-[#182522] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1B6442]" />
                  {gem2.nameEnglish} ({gem2.mohsHardness})
                </strong>
                <span className="text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded-xs bg-white border border-[#E5DFD5] text-[#173B32]">
                  {gem2.mohsNumeric >= 9 ? "Everyday Ring Safe" : gem2.mohsNumeric >= 7 ? "Occasion / Gentle Daily" : "Protective Care Only"}
                </span>
              </div>
              <p className="text-xs text-[#626A65] leading-relaxed">
                {gem2.mohsNumeric >= 9
                  ? "Extremely hard and durable stone. Resistant to everyday scratches and safe for daily ring wear."
                  : gem2.id === "emerald"
                  ? "Hard on the surface, but contains natural internal fissures (jardin). Never subject to ultrasonic cleaners or steam; avoid harsh chemicals and heavy blows."
                  : gem2.mohsNumeric <= 4.5
                  ? "Organic and delicate. Vulnerable to perfumes, hairsprays, sweat acidity, and abrasive friction. Clean with a dry microfiber cloth only."
                  : "Good scratch resistance for everyday jewellery, but avoid abrasive impacts with hard surfaces."}
              </p>
            </div>
          </div>

          {/* Educational Callout on Why Mohs Matters for Precious Jewellery */}
          <div className="bg-[#FFF8E7] border border-[#FFE5A3] p-4 rounded-xs flex items-start gap-3 text-xs text-[#925700]">
            <Info className="w-4 h-4 mt-0.5 shrink-0 text-[#B08D57]" />
            <div className="leading-relaxed">
              <strong className="font-semibold block mb-0.5">The Airborne Dust Benchmark (Mohs 7.0):</strong>
              Ordinary atmospheric dust particles contain microscopic quartz (Mohs 7). Any gemstone softer than 7 (such as Pearl, Coral, or Turquoise) can be scratched over time simply by aggressive rubbing with a dry abrasive cloth. Always wash delicate gems gently in clean lukewarm water and dry with a soft clean cloth.
            </div>
          </div>
        </Card>

        {/* Studio sourcing CTA */}
        <div className="bg-[#173B32] text-white p-8 sm:p-10 rounded-xs shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-mono uppercase tracking-[0.22em] text-[#F3E5AB]">
                Direct Sourcing &bull; Unheated Certification
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white">
                Looking for a Natural, Unheated Ratna?
              </h3>
              <p className="text-xs sm:text-sm text-[#DDE5DC] max-w-xl leading-relaxed">
                We source natural, unheated colored gemstones tailored to your astrological recommendation or personal collection. Every stone includes recognized laboratory documentation and is available for physical inspection at our shop.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Link href="/gemstones" className="w-full sm:w-auto">
                <Button variant="gold" size="md" className="w-full sm:w-auto text-xs uppercase tracking-wider font-semibold whitespace-nowrap btn-gold-shimmer">
                  Explore Real Gemstones
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </Link>
              <Link href="/astrology" className="w-full sm:w-auto">
                <Button variant="outline" size="md" className="w-full sm:w-auto text-white border-[#3A6B60] hover:bg-[#122e27] text-xs uppercase tracking-wider whitespace-nowrap">
                  Book Jyotish Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
