"use client";

import React, { useState } from "react";
import { POPULAR_INDIAN_CITIES, CityPreset, resolveHistoricalIndianOffset } from "@/lib/lal-kitab/timezone";
import { Calendar, Clock, MapPin, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

export interface BirthWizardData {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  cityName: string;
  lat: number;
  lon: number;
  currentAge: number;
  consentGiven: boolean;
}

interface BirthWizardProps {
  onSubmit: (data: BirthWizardData) => void;
  isLoading?: boolean;
}

export function BirthWizard({ onSubmit, isLoading = false }: BirthWizardProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Default values
  const [day, setDay] = useState(15);
  const [month, setMonth] = useState(8);
  const [year, setYear] = useState(1995);
  const [hour, setHour] = useState(10);
  const [minute, setMinute] = useState(30);

  const [selectedCity, setSelectedCity] = useState<CityPreset>(POPULAR_INDIAN_CITIES[0]); // Jaipur
  const [currentAge, setCurrentAge] = useState(new Date().getFullYear() - 1995);
  const [consentGiven, setConsentGiven] = useState(true);

  const tzMeta = resolveHistoricalIndianOffset(year, month, day);

  const handleNext = () => {
    if (step === 1) setStep(2);
    else if (step === 2) setStep(3);
    else {
      if (!consentGiven) return;
      onSubmit({
        year,
        month,
        day,
        hour,
        minute,
        cityName: selectedCity.name,
        lat: selectedCity.lat,
        lon: selectedCity.lon,
        currentAge,
        consentGiven,
      });
    }
  };

  return (
    <div className="bg-[#04170F] border border-[#D4AF37]/50 rounded-xs p-6 sm:p-8 text-[#FAF7F0] shadow-2xl max-w-xl mx-auto">
      {/* Progress Tabs */}
      <div className="flex items-center justify-between border-b border-[#D4AF37]/25 pb-4 mb-6 text-xs font-mono">
        <span className={step >= 1 ? "text-[#F1D98A] font-bold" : "text-white/40"}>
          01. Date &amp; Time
        </span>
        <span className="text-[#D4AF37]/40">&rarr;</span>
        <span className={step >= 2 ? "text-[#F1D98A] font-bold" : "text-white/40"}>
          02. Birth Place
        </span>
        <span className="text-[#D4AF37]/40">&rarr;</span>
        <span className={step === 3 ? "text-[#F1D98A] font-bold" : "text-white/40"}>
          03. Timezone &amp; Privacy
        </span>
      </div>

      {/* Step 1: Date & Time */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#F1D98A]">
            <Calendar className="w-3.5 h-3.5" />
            <span>Enter Exact Birth Details</span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-mono text-[#A8B6AF] mb-1">Day</label>
              <input
                type="number"
                min={1}
                max={31}
                value={day}
                onChange={(e) => setDay(Number(e.target.value))}
                className="w-full bg-white/5 border border-[#D4AF37]/40 px-3 py-2 rounded-xs text-sm font-mono text-white focus:outline-none focus:border-[#F1D98A]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-[#A8B6AF] mb-1">Month</label>
              <input
                type="number"
                min={1}
                max={12}
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
                className="w-full bg-white/5 border border-[#D4AF37]/40 px-3 py-2 rounded-xs text-sm font-mono text-white focus:outline-none focus:border-[#F1D98A]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-[#A8B6AF] mb-1">Year</label>
              <input
                type="number"
                min={1920}
                max={2026}
                value={year}
                onChange={(e) => {
                  const y = Number(e.target.value);
                  setYear(y);
                  setCurrentAge(new Date().getFullYear() - y);
                }}
                className="w-full bg-white/5 border border-[#D4AF37]/40 px-3 py-2 rounded-xs text-sm font-mono text-white focus:outline-none focus:border-[#F1D98A]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-[11px] font-mono text-[#A8B6AF] mb-1">
                Hour (0-23, 24hr format)
              </label>
              <input
                type="number"
                min={0}
                max={23}
                value={hour}
                onChange={(e) => setHour(Number(e.target.value))}
                className="w-full bg-white/5 border border-[#D4AF37]/40 px-3 py-2 rounded-xs text-sm font-mono text-white focus:outline-none focus:border-[#F1D98A]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-[#A8B6AF] mb-1">Minute</label>
              <input
                type="number"
                min={0}
                max={59}
                value={minute}
                onChange={(e) => setMinute(Number(e.target.value))}
                className="w-full bg-white/5 border border-[#D4AF37]/40 px-3 py-2 rounded-xs text-sm font-mono text-white focus:outline-none focus:border-[#F1D98A]"
              />
            </div>
          </div>

          <div className="pt-2 text-[11px] text-[#A8B6AF] flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Exact birth time is essential for precise planetary degrees.</span>
          </div>
        </div>
      )}

      {/* Step 2: Birth Place */}
      {step === 2 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#F1D98A]">
            <MapPin className="w-3.5 h-3.5" />
            <span>Select Birth Place</span>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-[#A8B6AF] mb-1.5">
              Select Major Indian City (Preset Coordinates):
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1">
              {POPULAR_INDIAN_CITIES.map((city) => (
                <button
                  key={city.name}
                  type="button"
                  onClick={() => setSelectedCity(city)}
                  className={`p-2.5 rounded-xs text-left border cursor-pointer transition-colors ${
                    selectedCity.name === city.name
                      ? "bg-[#D4AF37]/20 border-[#D4AF37] text-[#F6E7B4]"
                      : "bg-white/5 border-white/10 text-white/80 hover:border-[#D4AF37]/40"
                  }`}
                >
                  <strong className="block text-xs font-serif">{city.name}</strong>
                  <span className="text-[10px] text-[#A8B6AF] block">{city.state}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-xs bg-white/5 border border-white/10 text-xs text-[#A8B6AF]">
            Selected: <strong className="text-white">{selectedCity.name}, {selectedCity.state}</strong> &bull; Lat: {selectedCity.lat}&deg;N, Lon: {selectedCity.lon}&deg;E
          </div>
        </div>
      )}

      {/* Step 3: Timezone Confirmation & Privacy Consent */}
      {step === 3 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#F1D98A]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verify Calculation Standard &amp; Consent</span>
          </div>

          {/* Timezone Confirmation Box */}
          <div className="caution-ruby-glass p-4 space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#F1D98A] block">
              Resolved UTC Timezone Offset
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-xl font-bold text-white">
                {tzMeta.offsetString}
              </span>
              <span className="text-xs text-[#FAF7F0]/80">
                ({tzMeta.note})
              </span>
            </div>
          </div>

          {/* Age selection */}
          <div>
            <label className="block text-[11px] font-mono text-[#A8B6AF] mb-1">
              Current Age (for Age-Cycle Planet Period Analysis):
            </label>
            <input
              type="number"
              min={1}
              max={120}
              value={currentAge}
              onChange={(e) => setCurrentAge(Number(e.target.value))}
              className="w-full bg-white/5 border border-[#D4AF37]/40 px-3 py-2 rounded-xs text-sm font-mono text-white focus:outline-none focus:border-[#F1D98A]"
            />
          </div>

          {/* DPDP Act 2023 Consent Checkbox */}
          <label className="flex items-start gap-2.5 pt-2 cursor-pointer text-xs text-[#A8B6AF]">
            <input
              type="checkbox"
              checked={consentGiven}
              onChange={(e) => setConsentGiven(e.target.checked)}
              className="mt-0.5 accent-[#D4AF37]"
            />
            <span>
              I consent to calculating my astrological chart in accordance with India&apos;s <strong>DPDP Act 2023</strong>. My birth data is processed in-memory for this calculation and is never sold or shared.
            </span>
          </label>
        </div>
      )}

      {/* Wizard Navigation Actions */}
      <div className="flex items-center justify-between pt-6 border-t border-[#D4AF37]/25 mt-6">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => setStep((s) => (s - 1) as 1 | 2)}
            className="text-xs font-mono text-[#A8B6AF] hover:text-white uppercase tracking-wider cursor-pointer"
          >
            &larr; Back
          </button>
        ) : <div />}

        <MagneticButton
          onClick={handleNext}
          disabled={isLoading || (step === 3 && !consentGiven)}
          variant="gold"
          className="px-6 py-2.5 text-xs font-mono"
        >
          {isLoading ? (
            <span>Computing Ephemeris...</span>
          ) : step === 3 ? (
            <span className="flex items-center gap-1.5">
              <span>Generate Kundali</span>
              <CheckCircle2 className="w-4 h-4" />
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
              <span>Next Step</span>
              <ArrowRight className="w-4 h-4" />
            </span>
          )}
        </MagneticButton>
      </div>
    </div>
  );
}
