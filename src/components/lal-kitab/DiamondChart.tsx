"use client";

import React, { useState } from "react";
import { LalKitabChartModel, LalKitabHouse } from "@/lib/lal-kitab/chart-builder";

interface DiamondChartProps {
  chart: LalKitabChartModel;
  onSelectHouse?: (house: LalKitabHouse) => void;
  selectedHouseNumber?: number;
}

export function DiamondChart({
  chart,
  onSelectHouse,
  selectedHouseNumber = 1,
}: DiamondChartProps) {
  const [useDevanagari, setUseDevanagari] = useState(true);

  // Helper to get planets in a house
  const getHouse = (num: number) => chart.houses.find((h) => h.houseNumber === num);

  const renderPlanetBadges = (house: LalKitabHouse | undefined) => {
    if (!house || house.planets.length === 0) {
      return (
        <span className="text-[10px] font-mono text-[#D4AF37]/30 italic">
          —
        </span>
      );
    }

    return (
      <div className="flex flex-wrap items-center justify-center gap-1 max-w-[85px]">
        {house.planets.map((p) => (
          <span
            key={p.name}
            className={`inline-block px-1.5 py-0.5 rounded-xs text-[10px] font-semibold border ${
              p.isRetrograde
                ? "bg-[#8E1B2E]/25 border-[#8E1B2E] text-[#F6E7B4]"
                : "bg-[#04170F]/80 border-[#D4AF37]/40 text-[#F1D98A]"
            }`}
            title={`${p.name} (${p.sanskritName}) at ${p.degreeString} in ${p.signName}${p.isRetrograde ? " [Retrograde]" : ""}`}
          >
            {useDevanagari ? p.devanagariSymbol : p.name.substring(0, 2)}
            {p.isRetrograde && <span className="text-[8px] text-[#F6E7B4] ml-0.5">(R)</span>}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center select-none">
      {/* Controls: Devanagari / English Toggle */}
      <div className="flex items-center justify-between w-full max-w-[420px] mb-3 px-2 text-xs">
        <span className="text-[11px] font-mono uppercase tracking-widest text-[#D4AF37]">
          Fixed House Kundali (Mesha = H1)
        </span>
        <button
          type="button"
          onClick={() => setUseDevanagari(!useDevanagari)}
          className="px-2.5 py-1 rounded-full border border-[#D4AF37]/40 text-[10px] font-mono uppercase tracking-wider text-[#F1D98A] hover:bg-white/5 transition-colors cursor-pointer"
        >
          {useDevanagari ? "Language: Devanagari" : "Language: English"}
        </button>
      </div>

      {/* Classical North-Indian Diamond SVG Chart */}
      <div className="relative w-full max-w-[420px] aspect-square rounded-xs bg-[#04170F] border-2 border-[#D4AF37]/60 p-2 shadow-2xl overflow-hidden">
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full text-[#FAF7F0]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Border */}
          <rect x="2" y="2" width="396" height="396" stroke="#D4AF37" strokeWidth="2.5" />

          {/* Diagonals */}
          <line x1="0" y1="0" x2="400" y2="400" stroke="#D4AF37" strokeWidth="1.2" opacity="0.7" />
          <line x1="400" y1="0" x2="0" y2="400" stroke="#D4AF37" strokeWidth="1.2" opacity="0.7" />

          {/* Central Diamond Lines connecting midpoints */}
          <line x1="200" y1="0" x2="400" y2="200" stroke="#D4AF37" strokeWidth="1.5" />
          <line x1="400" y1="200" x2="200" y2="400" stroke="#D4AF37" strokeWidth="1.5" />
          <line x1="200" y1="400" x2="0" y2="200" stroke="#D4AF37" strokeWidth="1.5" />
          <line x1="0" y1="200" x2="200" y2="0" stroke="#D4AF37" strokeWidth="1.5" />

          {/* Inner Diamond Center Lines */}
          <line x1="200" y1="0" x2="200" y2="400" stroke="#D4AF37" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.3" />
          <line x1="0" y1="200" x2="400" y2="200" stroke="#D4AF37" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.3" />

          {/* House 1: Top Center Diamond */}
          <text x="200" y="45" textAnchor="middle" fill="#D4AF37" fontSize="12" fontWeight="bold" fontFamily="monospace">1</text>

          {/* House 2: Top Left Triangle */}
          <text x="100" y="40" textAnchor="middle" fill="#D4AF37" fontSize="11" fontWeight="bold" fontFamily="monospace">2</text>

          {/* House 3: Far Left Top Triangle */}
          <text x="40" y="100" textAnchor="middle" fill="#D4AF37" fontSize="11" fontWeight="bold" fontFamily="monospace">3</text>

          {/* House 4: Left Center Diamond */}
          <text x="120" y="200" textAnchor="middle" fill="#D4AF37" fontSize="12" fontWeight="bold" fontFamily="monospace">4</text>

          {/* House 5: Far Left Bottom Triangle */}
          <text x="40" y="300" textAnchor="middle" fill="#D4AF37" fontSize="11" fontWeight="bold" fontFamily="monospace">5</text>

          {/* House 6: Bottom Left Triangle */}
          <text x="100" y="360" textAnchor="middle" fill="#D4AF37" fontSize="11" fontWeight="bold" fontFamily="monospace">6</text>

          {/* House 7: Bottom Center Diamond */}
          <text x="200" y="355" textAnchor="middle" fill="#D4AF37" fontSize="12" fontWeight="bold" fontFamily="monospace">7</text>

          {/* House 8: Bottom Right Triangle */}
          <text x="300" y="360" textAnchor="middle" fill="#D4AF37" fontSize="11" fontWeight="bold" fontFamily="monospace">8</text>

          {/* House 9: Far Right Bottom Triangle */}
          <text x="360" y="300" textAnchor="middle" fill="#D4AF37" fontSize="11" fontWeight="bold" fontFamily="monospace">9</text>

          {/* House 10: Right Center Diamond */}
          <text x="280" y="200" textAnchor="middle" fill="#D4AF37" fontSize="12" fontWeight="bold" fontFamily="monospace">10</text>

          {/* House 11: Far Right Top Triangle */}
          <text x="360" y="100" textAnchor="middle" fill="#D4AF37" fontSize="11" fontWeight="bold" fontFamily="monospace">11</text>

          {/* House 12: Top Right Triangle */}
          <text x="300" y="40" textAnchor="middle" fill="#D4AF37" fontSize="11" fontWeight="bold" fontFamily="monospace">12</text>
        </svg>

        {/* Absolute HTML Overlay for Interactive Resident Planet Badges */}
        {/* House 1 */}
        <div
          onClick={() => onSelectHouse?.(getHouse(1)!)}
          className={`absolute top-[18%] left-[32%] right-[32%] h-[18%] flex flex-col items-center justify-center cursor-pointer transition-transform hover:scale-105 ${
            selectedHouseNumber === 1 ? "ring-1 ring-[#D4AF37] bg-white/5 rounded-xs" : ""
          }`}
        >
          {renderPlanetBadges(getHouse(1))}
        </div>

        {/* House 2 */}
        <div
          onClick={() => onSelectHouse?.(getHouse(2)!)}
          className="absolute top-[8%] left-[12%] w-[22%] h-[16%] flex flex-col items-center justify-center cursor-pointer transition-transform hover:scale-105"
        >
          {renderPlanetBadges(getHouse(2))}
        </div>

        {/* House 3 */}
        <div
          onClick={() => onSelectHouse?.(getHouse(3)!)}
          className="absolute top-[22%] left-[4%] w-[18%] h-[20%] flex flex-col items-center justify-center cursor-pointer transition-transform hover:scale-105"
        >
          {renderPlanetBadges(getHouse(3))}
        </div>

        {/* House 4 */}
        <div
          onClick={() => onSelectHouse?.(getHouse(4)!)}
          className={`absolute top-[40%] left-[18%] w-[24%] h-[20%] flex flex-col items-center justify-center cursor-pointer transition-transform hover:scale-105 ${
            selectedHouseNumber === 4 ? "ring-1 ring-[#D4AF37] bg-white/5 rounded-xs" : ""
          }`}
        >
          {renderPlanetBadges(getHouse(4))}
        </div>

        {/* House 5 */}
        <div
          onClick={() => onSelectHouse?.(getHouse(5)!)}
          className="absolute bottom-[22%] left-[4%] w-[18%] h-[20%] flex flex-col items-center justify-center cursor-pointer transition-transform hover:scale-105"
        >
          {renderPlanetBadges(getHouse(5))}
        </div>

        {/* House 6 */}
        <div
          onClick={() => onSelectHouse?.(getHouse(6)!)}
          className="absolute bottom-[8%] left-[12%] w-[22%] h-[16%] flex flex-col items-center justify-center cursor-pointer transition-transform hover:scale-105"
        >
          {renderPlanetBadges(getHouse(6))}
        </div>

        {/* House 7 */}
        <div
          onClick={() => onSelectHouse?.(getHouse(7)!)}
          className={`absolute bottom-[18%] left-[32%] right-[32%] h-[18%] flex flex-col items-center justify-center cursor-pointer transition-transform hover:scale-105 ${
            selectedHouseNumber === 7 ? "ring-1 ring-[#D4AF37] bg-white/5 rounded-xs" : ""
          }`}
        >
          {renderPlanetBadges(getHouse(7))}
        </div>

        {/* House 8 */}
        <div
          onClick={() => onSelectHouse?.(getHouse(8)!)}
          className="absolute bottom-[8%] right-[12%] w-[22%] h-[16%] flex flex-col items-center justify-center cursor-pointer transition-transform hover:scale-105"
        >
          {renderPlanetBadges(getHouse(8))}
        </div>

        {/* House 9 */}
        <div
          onClick={() => onSelectHouse?.(getHouse(9)!)}
          className="absolute bottom-[22%] right-[4%] w-[18%] h-[20%] flex flex-col items-center justify-center cursor-pointer transition-transform hover:scale-105"
        >
          {renderPlanetBadges(getHouse(9))}
        </div>

        {/* House 10 */}
        <div
          onClick={() => onSelectHouse?.(getHouse(10)!)}
          className={`absolute top-[40%] right-[18%] w-[24%] h-[20%] flex flex-col items-center justify-center cursor-pointer transition-transform hover:scale-105 ${
            selectedHouseNumber === 10 ? "ring-1 ring-[#D4AF37] bg-white/5 rounded-xs" : ""
          }`}
        >
          {renderPlanetBadges(getHouse(10))}
        </div>

        {/* House 11 */}
        <div
          onClick={() => onSelectHouse?.(getHouse(11)!)}
          className="absolute top-[22%] right-[4%] w-[18%] h-[20%] flex flex-col items-center justify-center cursor-pointer transition-transform hover:scale-105"
        >
          {renderPlanetBadges(getHouse(11))}
        </div>

        {/* House 12 */}
        <div
          onClick={() => onSelectHouse?.(getHouse(12)!)}
          className="absolute top-[8%] right-[12%] w-[22%] h-[16%] flex flex-col items-center justify-center cursor-pointer transition-transform hover:scale-105"
        >
          {renderPlanetBadges(getHouse(12))}
        </div>
      </div>
    </div>
  );
}
