"use client";

import React, { useState } from "react";
import { ShieldCheck, Sparkles, AlertCircle } from "lucide-react";

interface HouseInfo {
  number: number;
  name: string;
  sanskritName: string;
  category: "Trikona (Grace / Gemstones)" | "Kendra (Pillars)" | "Dusthana (Obstacles)" | "Upachaya (Growth)" | "Maraka (Caution)";
  significance: string;
  gemstoneRule: string;
  color: string;
}

const HOUSES_DATA: Record<number, HouseInfo> = {
  1: {
    number: 1,
    name: "1st House (Ascendant / Lagna)",
    sanskritName: "Tanu Bhava (तनु भाव)",
    category: "Trikona (Grace / Gemstones)",
    significance: "Physical vitality, self, lifespan, health, personal charisma, and mental constitution.",
    gemstoneRule: "Supreme Auspicious: Gemstone of Lagna Lord (Lagnesha) strengthens immunity, protection, and life force. Safe for lifetime wear.",
    color: "#173B32",
  },
  2: {
    number: 2,
    name: "2nd House",
    sanskritName: "Dhana / Kutumba Bhava (धन भाव)",
    category: "Maraka (Caution)",
    significance: "Accumulated wealth, speech, family lineage, right eye, and nutritional intake.",
    gemstoneRule: "Caution: Primary Maraka (death-inflicting / vulnerable) house. Gemstone only recommended if planet is also a friendly trine lord.",
    color: "#B08D57",
  },
  3: {
    number: 3,
    name: "3rd House",
    sanskritName: "Sahaja / Bhratru Bhava (सहज भाव)",
    category: "Upachaya (Growth)",
    significance: "Courage, younger siblings, self-effort, hands, artistic skill, and short journeys.",
    gemstoneRule: "Mild Caution: House of exertion. Strengthening usually done through physical discipline rather than heavy gemstones.",
    color: "#626A65",
  },
  4: {
    number: 4,
    name: "4th House",
    sanskritName: "Sukha / Matru Bhava (सुख भाव)",
    category: "Kendra (Pillars)",
    significance: "Mother, domestic peace, vehicles, land, property, and heart tranquility.",
    gemstoneRule: "Kendra Pillar: Lord's gemstone brings domestic peace and property prosperity, provided it does not suffer Kendradhipati Dosha.",
    color: "#173B32",
  },
  5: {
    number: 5,
    name: "5th House",
    sanskritName: "Putra / Purva Punya Bhava (पुत्र / पूर्व पुण्य)",
    category: "Trikona (Grace / Gemstones)",
    significance: "Intellect (Buddhi), past life merit, children, creative arts, mantras, and speculative wisdom.",
    gemstoneRule: "Supreme Auspicious: The house of Divine Merit. Gemstone of 5th lord (Panchamesha) awakens genius, scholarly success, and luck.",
    color: "#173B32",
  },
  6: {
    number: 6,
    name: "6th House",
    sanskritName: "Ripu / Roga / Rina Bhava (रोग / ऋण भाव)",
    category: "Dusthana (Obstacles)",
    significance: "Debts, litigation, biological illness, enemies, competitive trials, and daily servitude.",
    gemstoneRule: "Strictly Prohibited: Gemstone of 6th lord must NEVER be worn. Gemstones amplify cosmic energy; wearing this stone intensifies debts and disease.",
    color: "#A61C1C",
  },
  7: {
    number: 7,
    name: "7th House",
    sanskritName: "Kalatra / Jaya Bhava (कलत्र भाव)",
    category: "Maraka (Caution)",
    significance: "Spouse, marriage, commercial partnerships, foreign travel, and public trade relations.",
    gemstoneRule: "Dual Nature: It is both a vital Kendra (partnership) and a potent Maraka sthana. Requires meticulous chart analysis before prescribing.",
    color: "#B08D57",
  },
  8: {
    number: 8,
    name: "8th House",
    sanskritName: "Randhra / Ayur Bhava (आयुर्भाव)",
    category: "Dusthana (Obstacles)",
    significance: "Longevity, sudden shocks, hidden knowledge, unearned wealth, chronic illness, and psychological transformation.",
    gemstoneRule: "Strictly Prohibited: The most intense Dusthana. Stones of the 8th lord are strictly avoided in classical Parashari Jyotish.",
    color: "#A61C1C",
  },
  9: {
    number: 9,
    name: "9th House",
    sanskritName: "Bhagya / Dharma Bhava (भाग्य / धर्म भाव)",
    category: "Trikona (Grace / Gemstones)",
    significance: "Supreme fortune, father, guru, dharma, divine grace, higher learning, and spiritual pilgrimage.",
    gemstoneRule: "Supreme Auspicious: The throne of Fortune. Gemstone of 9th lord (Bhagyesha) unlocks destiny doors, dissolves adversity, and brings grace.",
    color: "#173B32",
  },
  10: {
    number: 10,
    name: "10th House",
    sanskritName: "Karma / Rajya Bhava (कर्म भाव)",
    category: "Kendra (Pillars)",
    significance: "Career authority, social status, executive power, public reputation, and worldly actions.",
    gemstoneRule: "Kendra Peak: The highest house of worldly achievement. Strengthens career elevation if the planet is a functional friend to Lagna.",
    color: "#173B32",
  },
  11: {
    number: 11,
    name: "11th House",
    sanskritName: "Labha / Aya Bhava (लाभ भाव)",
    category: "Upachaya (Growth)",
    significance: "Gains, cash flow, social networks, elder siblings, fulfillment of ambitions.",
    gemstoneRule: "Careful Assessment: Strong house of income, but also a Badhaka / Trishadaya house that can stimulate excessive desires or obstacles.",
    color: "#626A65",
  },
  12: {
    number: 12,
    name: "12th House",
    sanskritName: "Vyaya / Moksha Bhava (व्यय / मोक्ष भाव)",
    category: "Dusthana (Obstacles)",
    significance: "Expenses, overseas isolation, sleep quality, hospital stays, spiritual renunciation, and liberation.",
    gemstoneRule: "Strictly Prohibited: House of loss and drainage. Wearing 12th lord stones is traditionally forbidden as it invites expenditure and vitality drain.",
    color: "#A61C1C",
  },
};

export function KundaliVisual() {
  const [selectedHouse, setSelectedHouse] = useState<number>(1);
  const house = HOUSES_DATA[selectedHouse] || HOUSES_DATA[1];

  return (
    <div className="bg-[#0a2a1d]/85 border border-[#d4af37]/35 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-md text-white">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 border-b border-[#d4af37]/20 pb-6 mb-2">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#d4af37] mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Classical Chakra Shastra</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal">
            The North-Indian Janma Kundali &amp; Ratna Law
          </h2>
          <p className="text-xs text-[#a8b6af] mt-1 max-w-xl font-light">
            In authentic Parashari Jyotish, gemstones act as cosmic antennas that <strong className="text-[#f1d98a]">amplify</strong> energy. We only wear stones for the <strong className="text-[#10b981]">Dharma Trikona</strong> (Houses 1, 5, 9) and strictly avoid <strong className="text-[#f87171]">Dusthana</strong> (Houses 6, 8, 12).
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-2.5 text-[11px] font-mono">
          <span className="flex items-center gap-1.5 bg-[#10b981]/20 px-3 py-1 rounded-full text-[#10b981] font-medium border border-[#10b981]/40">
            <span className="w-2 h-2 rounded-full bg-[#10b981]" />
            Trikona (Benefic)
          </span>
          <span className="flex items-center gap-1.5 bg-[#8e1b2e]/30 px-3 py-1 rounded-full text-[#fca5a5] font-medium border border-[#8e1b2e]/60">
            <span className="w-2 h-2 rounded-full bg-[#f87171]" />
            Dusthana (Avoid)
          </span>
          <span className="flex items-center gap-1.5 bg-[#d4af37]/20 px-3 py-1 rounded-full text-[#f1d98a] font-medium border border-[#d4af37]/40">
            <span className="w-2 h-2 rounded-full bg-[#d4af37]" />
            Kendra / Maraka
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* SVG North Indian Diamond Chart */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="relative w-full max-w-[380px] aspect-square">
            <svg
              viewBox="0 0 400 400"
              className="w-full h-full drop-shadow-2xl select-none"
            >
              {/* Outer Square */}
              <rect
                x="10"
                y="10"
                width="380"
                height="380"
                fill="#04170f"
                stroke="#d4af37"
                strokeWidth="2"
              />

              {/* Major Diagonals */}
              <line x1="10" y1="10" x2="390" y2="390" stroke="#d4af37" strokeWidth="1.5" strokeOpacity="0.6" />
              <line x1="390" y1="10" x2="10" y2="390" stroke="#d4af37" strokeWidth="1.5" strokeOpacity="0.6" />

              {/* Inner Diamond */}
              <polygon
                points="200,10 390,200 200,390 10,200"
                fill="none"
                stroke="#d4af37"
                strokeWidth="1.5"
                strokeOpacity="0.6"
              />

              {/* House 1: Top Center Diamond (Lagna) */}
              <polygon
                points="200,10 295,105 200,200 105,105"
                className={`cursor-pointer transition-all ${
                  selectedHouse === 1 ? "fill-[#10b981]/40 stroke-[#f1d98a] stroke-[2.5]" : "fill-[#10b981]/20 hover:fill-[#10b981]/30 stroke-[#d4af37]/40"
                }`}
                onClick={() => setSelectedHouse(1)}
              />
              <text x="200" y="105" textAnchor="middle" className="font-serif text-sm font-bold fill-[#f6e7b4]">
                1 (Lagna)
              </text>
              <text x="200" y="125" textAnchor="middle" className="text-[10px] font-mono fill-[#10b981]">
                Trikona / Kendra
              </text>

              {/* House 2: Top Left Upper Triangle */}
              <polygon
                points="10,10 200,10 105,105"
                className={`cursor-pointer transition-all ${
                  selectedHouse === 2 ? "fill-[#d4af37]/40 stroke-[#f1d98a] stroke-[2.5]" : "fill-[#0a2a1d] hover:fill-[#0f3a28] stroke-[#d4af37]/40"
                }`}
                onClick={() => setSelectedHouse(2)}
              />
              <text x="105" y="45" textAnchor="middle" className="font-serif text-xs font-semibold fill-[#a8b6af]">
                2nd House
              </text>

              {/* House 3: Top Left Lower Triangle */}
              <polygon
                points="10,10 105,105 10,200"
                className={`cursor-pointer transition-all ${
                  selectedHouse === 3 ? "fill-[#d4af37]/40 stroke-[#f1d98a] stroke-[2.5]" : "fill-[#0a2a1d] hover:fill-[#0f3a28] stroke-[#d4af37]/40"
                }`}
                onClick={() => setSelectedHouse(3)}
              />
              <text x="45" y="105" textAnchor="middle" className="font-serif text-xs font-semibold fill-[#a8b6af]">
                3rd
              </text>

              {/* House 4: Left Center Diamond */}
              <polygon
                points="10,200 105,105 200,200 105,295"
                className={`cursor-pointer transition-all ${
                  selectedHouse === 4 ? "fill-[#d4af37]/40 stroke-[#f1d98a] stroke-[2.5]" : "fill-[#0a2a1d] hover:fill-[#0f3a28] stroke-[#d4af37]/40"
                }`}
                onClick={() => setSelectedHouse(4)}
              />
              <text x="105" y="205" textAnchor="middle" className="font-serif text-sm font-bold fill-[#f1d98a]">
                4th (Kendra)
              </text>

              {/* House 5: Bottom Left Upper Triangle */}
              <polygon
                points="10,200 105,295 10,390"
                className={`cursor-pointer transition-all ${
                  selectedHouse === 5 ? "fill-[#10b981]/40 stroke-[#f1d98a] stroke-[2.5]" : "fill-[#10b981]/20 hover:fill-[#10b981]/30 stroke-[#d4af37]/40"
                }`}
                onClick={() => setSelectedHouse(5)}
              />
              <text x="45" y="295" textAnchor="middle" className="font-serif text-xs font-bold fill-[#10b981]">
                5th (Trikona)
              </text>

              {/* House 6: Bottom Left Lower Triangle (Dusthana) */}
              <polygon
                points="10,390 105,295 200,390"
                className={`cursor-pointer transition-all ${
                  selectedHouse === 6 ? "fill-[#8e1b2e]/50 stroke-[#f87171] stroke-[2.5]" : "fill-[#8e1b2e]/25 hover:fill-[#8e1b2e]/35 stroke-[#d4af37]/40"
                }`}
                onClick={() => setSelectedHouse(6)}
              />
              <text x="105" y="355" textAnchor="middle" className="font-serif text-xs font-bold fill-[#fca5a5]">
                6th (Dusthana)
              </text>

              {/* House 7: Bottom Center Diamond */}
              <polygon
                points="200,200 105,295 200,390 295,295"
                className={`cursor-pointer transition-all ${
                  selectedHouse === 7 ? "fill-[#d4af37]/40 stroke-[#f1d98a] stroke-[2.5]" : "fill-[#0a2a1d] hover:fill-[#0f3a28] stroke-[#d4af37]/40"
                }`}
                onClick={() => setSelectedHouse(7)}
              />
              <text x="200" y="295" textAnchor="middle" className="font-serif text-sm font-bold fill-[#f1d98a]">
                7th (Kendra)
              </text>

              {/* House 8: Bottom Right Lower Triangle (Dusthana) */}
              <polygon
                points="200,390 295,295 390,390"
                className={`cursor-pointer transition-all ${
                  selectedHouse === 8 ? "fill-[#8e1b2e]/50 stroke-[#f87171] stroke-[2.5]" : "fill-[#8e1b2e]/25 hover:fill-[#8e1b2e]/35 stroke-[#d4af37]/40"
                }`}
                onClick={() => setSelectedHouse(8)}
              />
              <text x="295" y="355" textAnchor="middle" className="font-serif text-xs font-bold fill-[#fca5a5]">
                8th (Dusthana)
              </text>

              {/* House 9: Bottom Right Upper Triangle */}
              <polygon
                points="295,295 390,200 390,390"
                className={`cursor-pointer transition-all ${
                  selectedHouse === 9 ? "fill-[#10b981]/40 stroke-[#f1d98a] stroke-[2.5]" : "fill-[#10b981]/20 hover:fill-[#10b981]/30 stroke-[#d4af37]/40"
                }`}
                onClick={() => setSelectedHouse(9)}
              />
              <text x="355" y="295" textAnchor="middle" className="font-serif text-xs font-bold fill-[#10b981]">
                9th (Trikona)
              </text>

              {/* House 10: Right Center Diamond */}
              <polygon
                points="200,200 295,105 390,200 295,295"
                className={`cursor-pointer transition-all ${
                  selectedHouse === 10 ? "fill-[#d4af37]/40 stroke-[#f1d98a] stroke-[2.5]" : "fill-[#0a2a1d] hover:fill-[#0f3a28] stroke-[#d4af37]/40"
                }`}
                onClick={() => setSelectedHouse(10)}
              />
              <text x="295" y="205" textAnchor="middle" className="font-serif text-sm font-bold fill-[#f1d98a]">
                10th (Kendra)
              </text>

              {/* House 11: Top Right Lower Triangle */}
              <polygon
                points="295,105 390,10 390,200"
                className={`cursor-pointer transition-all ${
                  selectedHouse === 11 ? "fill-[#d4af37]/40 stroke-[#f1d98a] stroke-[2.5]" : "fill-[#0a2a1d] hover:fill-[#0f3a28] stroke-[#d4af37]/40"
                }`}
                onClick={() => setSelectedHouse(11)}
              />
              <text x="355" y="105" textAnchor="middle" className="font-serif text-xs font-semibold fill-[#a8b6af]">
                11th
              </text>

              {/* House 12: Top Right Upper Triangle (Dusthana) */}
              <polygon
                points="200,10 390,10 295,105"
                className={`cursor-pointer transition-all ${
                  selectedHouse === 12 ? "fill-[#8e1b2e]/50 stroke-[#f87171] stroke-[2.5]" : "fill-[#8e1b2e]/25 hover:fill-[#8e1b2e]/35 stroke-[#d4af37]/40"
                }`}
                onClick={() => setSelectedHouse(12)}
              />
              <text x="295" y="45" textAnchor="middle" className="font-serif text-xs font-bold fill-[#fca5a5]">
                12th (Dusthana)
              </text>
            </svg>
          </div>
        </div>

        {/* Selected House Details Panel */}
        <div className="lg:col-span-6 bg-[#04170f]/90 border border-[#d4af37]/35 rounded-2xl p-6 sm:p-7 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <span className="text-[11px] font-mono text-[#d4af37] uppercase tracking-wider block">
                {house.sanskritName}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-white">
                {house.name}
              </h3>
            </div>
            <span
              className={`text-[10px] uppercase font-mono tracking-wider font-semibold px-3 py-1 rounded-full border ${
                house.category.includes("Trikona")
                  ? "bg-[#10b981]/20 text-[#10b981] border-[#10b981]/40"
                  : house.category.includes("Dusthana")
                  ? "bg-[#8e1b2e]/30 text-[#fca5a5] border-[#8e1b2e]/60"
                  : "bg-[#d4af37]/20 text-[#f1d98a] border-[#d4af37]/40"
              }`}
            >
              {house.category}
            </span>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#d4af37] mb-1">
              Core Vedic Significations:
            </h4>
            <p className="text-xs text-[#a8b6af] leading-relaxed">
              {house.significance}
            </p>
          </div>

          <div className="p-4 bg-[#0a2a1d] rounded-xl border border-[#d4af37]/30 space-y-1.5 shadow-inner">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#f1d98a] flex items-center gap-1.5">
              {house.category.includes("Dusthana") ? (
                <AlertCircle className="w-4 h-4 text-[#f87171]" />
              ) : (
                <ShieldCheck className="w-4 h-4 text-[#10b981]" />
              )}
              <span>Ratna Shastra Prescription Rule:</span>
            </h4>
            <p className="text-xs text-[#faf7f0] leading-relaxed">
              {house.gemstoneRule}
            </p>
          </div>

          {/* Quick House Selector Buttons */}
          <div className="pt-3 border-t border-white/10">
            <span className="text-[11px] font-mono text-[#a8b6af] block mb-2">
              Select any house number to inspect classical gemstone rules:
            </span>
            <div className="grid grid-cols-6 gap-2">
              {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setSelectedHouse(num)}
                  className={`text-xs py-2 rounded-lg font-mono font-semibold transition-all cursor-pointer ${
                    selectedHouse === num
                      ? "bg-gold-gradient text-[#04170f] shadow-md"
                      : "bg-[#04170f] text-[#f1d98a] border border-[#d4af37]/30 hover:bg-[#d4af37]/20"
                  }`}
                >
                  H{num}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

