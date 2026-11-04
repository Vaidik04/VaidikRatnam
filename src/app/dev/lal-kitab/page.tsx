"use client";

import React, { useState } from "react";
import Link from "next/link";
import { calculatePlanetaryPositions } from "@/lib/lal-kitab/astronomy";
import { buildLalKitabChart } from "@/lib/lal-kitab/chart-builder";
import { evaluateLalKitabRules } from "@/lib/lal-kitab/rule-engine";
import { resolveHistoricalIndianOffset, POPULAR_INDIAN_CITIES } from "@/lib/lal-kitab/timezone";
import { ArrowLeft, Bug } from "lucide-react";

export default function DevLalKitabAdminPage() {
  const [year, setYear] = useState(1995);
  const [month, setMonth] = useState(8);
  const [day, setDay] = useState(15);
  const [hour, setHour] = useState(10);
  const [minute, setMinute] = useState(30);
  const [city, setCity] = useState(POPULAR_INDIAN_CITIES[0]);

  const tz = resolveHistoricalIndianOffset(year, month, day);
  const astronomy = calculatePlanetaryPositions(year, month, day, hour, minute, city.lat, city.lon, tz.offsetHours);
  const chart = buildLalKitabChart(astronomy.planets);
  const evaluation = evaluateLalKitabRules(chart, 30);

  return (
    <div className="min-h-screen bg-[#04170F] text-[#FAF7F0] p-6 sm:p-10 font-mono text-xs">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between border-b border-[#D4AF37]/30 pb-4">
          <div className="flex items-center gap-2">
            <Bug className="w-5 h-5 text-[#D4AF37]" />
            <h1 className="text-base font-bold text-white uppercase tracking-wider">
              Lal Kitab Rule Inspector &bull; Dev Diagnostic Sandbox
            </h1>
          </div>
          <Link href="/jyotish/lal-kitab" className="text-[#F1D98A] hover:underline flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>View Public User Interface</span>
          </Link>
        </div>

        {/* Live Controls */}
        <div className="bg-white/5 border border-white/10 p-4 rounded-xs grid grid-cols-2 sm:grid-cols-6 gap-3">
          <div>
            <label className="text-[10px] text-[#A8B6AF] block">Day</label>
            <input
              type="number"
              value={day}
              onChange={(e) => setDay(Number(e.target.value))}
              className="bg-black/30 border border-white/20 p-1 rounded-xs w-full text-white"
            />
          </div>
          <div>
            <label className="text-[10px] text-[#A8B6AF] block">Month</label>
            <input
              type="number"
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="bg-black/30 border border-white/20 p-1 rounded-xs w-full text-white"
            />
          </div>
          <div>
            <label className="text-[10px] text-[#A8B6AF] block">Year</label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="bg-black/30 border border-white/20 p-1 rounded-xs w-full text-white"
            />
          </div>
          <div>
            <label className="text-[10px] text-[#A8B6AF] block">Hour</label>
            <input
              type="number"
              value={hour}
              onChange={(e) => setHour(Number(e.target.value))}
              className="bg-black/30 border border-white/20 p-1 rounded-xs w-full text-white"
            />
          </div>
          <div>
            <label className="text-[10px] text-[#A8B6AF] block">Minute</label>
            <input
              type="number"
              value={minute}
              onChange={(e) => setMinute(Number(e.target.value))}
              className="bg-black/30 border border-white/20 p-1 rounded-xs w-full text-white"
            />
          </div>
          <div>
            <label className="text-[10px] text-[#A8B6AF] block">City</label>
            <select
              value={city.name}
              onChange={(e) => {
                const found = POPULAR_INDIAN_CITIES.find((c) => c.name === e.target.value);
                if (found) setCity(found);
              }}
              className="bg-black/30 border border-white/20 p-1 rounded-xs w-full text-white"
            >
              {POPULAR_INDIAN_CITIES.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Fired Rules Output */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-[#F1D98A] uppercase">
            Fired Rule IDs ({evaluation.firedRules.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {evaluation.firedRules.map((r) => (
              <div key={r.id} className="p-3 bg-white/5 border border-[#D4AF37]/40 rounded-xs space-y-1">
                <div className="flex justify-between items-center text-[#D4AF37]">
                  <span className="font-bold">Rule ID: {r.id}</span>
                  <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded-xs">{r.confidence}</span>
                </div>
                <div className="text-white font-semibold">{r.title}</div>
                <p className="text-[#A8B6AF] text-[11px]">{r.description}</p>
                {r.remedy && <p className="text-[#F6E7B4] text-[10px]">Remedy: {r.remedy}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Raw Planets JSON */}
        <div className="space-y-2">
          <h2 className="text-sm font-bold text-[#F1D98A] uppercase">
            Raw Computed Planetary Positions (JSON)
          </h2>
          <pre className="p-4 bg-black/60 border border-white/10 rounded-xs overflow-x-auto text-[11px] text-[#A8B6AF]">
            {JSON.stringify(astronomy, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
