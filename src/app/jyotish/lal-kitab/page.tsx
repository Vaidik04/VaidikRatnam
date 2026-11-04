"use client";

import React, { useState, useRef } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LalKitabHero } from "@/components/lal-kitab/LalKitabHero";
import { BirthWizard, BirthWizardData } from "@/components/lal-kitab/BirthWizard";
import { DiamondChart } from "@/components/lal-kitab/DiamondChart";
import { RinCards } from "@/components/lal-kitab/RinCards";
import { AgeTimeline } from "@/components/lal-kitab/AgeTimeline";
import { UpayPlanner } from "@/components/lal-kitab/UpayPlanner";
import { LalKitabChartModel, LalKitabHouse } from "@/lib/lal-kitab/chart-builder";
import { AstronomyCalculationResult } from "@/lib/lal-kitab/astronomy";
import { RuleEngineEvaluationResult } from "@/lib/lal-kitab/rule-engine";
import { ShieldCheck, MessageCircle, Sparkles } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

interface LalKitabReportData {
  astronomy: AstronomyCalculationResult;
  chart: LalKitabChartModel;
  evaluation: RuleEngineEvaluationResult;
  timezone: {
    offsetHours: number;
    offsetString: string;
    note: string;
  };
  disclaimer: string;
}

export default function LalKitabPage() {
  const wizardRef = useRef<HTMLDivElement>(null);
  const reportRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [reportData, setReportData] = useState<LalKitabReportData | null>(null);
  const [selectedHouse, setSelectedHouse] = useState<LalKitabHouse | null>(null);

  const scrollToWizard = () => {
    wizardRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCalculateChart = async (data: BirthWizardData) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/lal-kitab/chart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (json.success && json.data) {
        setReportData(json.data);
        setTimeout(() => {
          reportRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    } catch (err) {
      console.error("Calculation error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "919876543210";

  return (
    <div className="min-h-screen flex flex-col bg-[#04170F] text-[#FAF7F0] selection:bg-[#D4AF37]/30 selection:text-white">
      <Header />

      <main className="flex-1">
        {/* 1. Cinematic Red-and-Emerald Hero Section */}
        <LalKitabHero onStartWizard={scrollToWizard} />

        {/* 2. Birth Input Wizard Section */}
        <section ref={wizardRef} className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#D4AF37]/30">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#F1D98A] block">
              Step-by-Step Birth Chart Engine
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white">
              Enter Your Birth Details
            </h2>
            <p className="text-xs text-[#A8B6AF] font-light">
              Processed in-memory under India&apos;s DPDP Act 2023 with historical timezone offset calculation.
            </p>
          </div>

          <BirthWizard onSubmit={handleCalculateChart} isLoading={isLoading} />
        </section>

        {/* 3. Generated Report Scroll-Story */}
        {reportData && (
          <section ref={reportRef} className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-16">
            {/* Header Badge */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#14502F]/30 border border-[#D4AF37]/50 text-[#F6E7B4] text-xs font-mono uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Horoscope Generated &bull; 1952 Gutka Standard</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal">
                Your Lal Kitab Kundali &amp; Karmic Report
              </h2>
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-[#F1D98A]">
                <span>Ayanamsa: {reportData.astronomy.ayanamsaName} ({reportData.astronomy.ayanamsa}&deg;)</span>
                <span>&bull;</span>
                <span>Chart Type: <strong>{reportData.evaluation.chartType.type}</strong></span>
                <span>&bull;</span>
                <span>UTC Offset: {reportData.timezone.offsetString}</span>
              </div>
            </div>

            {/* Top Grid: Diamond Chart + Selected House Details */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 flex justify-center">
                <DiamondChart
                  chart={reportData.chart}
                  onSelectHouse={(h) => setSelectedHouse(h)}
                  selectedHouseNumber={selectedHouse?.houseNumber || 1}
                />
              </div>

              {/* Selected House Details Panel */}
              <div className="lg:col-span-6 bg-white/5 border border-[#D4AF37]/40 rounded-xs p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] block">
                      House Inspection
                    </span>
                    <h3 className="font-serif text-2xl text-white">
                      House {selectedHouse ? selectedHouse.houseNumber : 1} &bull; {selectedHouse ? selectedHouse.signSanskrit : "Mesha"} ({selectedHouse ? selectedHouse.signName : "Aries"})
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-[#F6E7B4] text-xs font-mono">
                    Lord: {selectedHouse ? selectedHouse.naturalLord : "Mars"}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-mono text-[#A8B6AF] uppercase tracking-wider block mb-1">
                    Resident Planets:
                  </span>
                  {selectedHouse && selectedHouse.planets.length > 0 ? (
                    <div className="space-y-2">
                      {selectedHouse.planets.map((p) => (
                        <div key={p.name} className="p-3 rounded-xs bg-[#04170F] border border-[#D4AF37]/30 flex items-center justify-between text-xs">
                          <div>
                            <strong className="text-white block font-serif text-sm">
                              {p.name} ({p.sanskritName}) {p.isRetrograde ? "[Retrograde]" : ""}
                            </strong>
                            <span className="text-[#A8B6AF] text-[11px]">
                              Longitude: {p.longitude}&deg; &bull; In Sign: {p.degreeString}
                            </span>
                          </div>
                          {p.isBoundaryWarning && (
                            <span className="text-[9px] font-mono bg-[#8E1B2E]/40 text-[#F6E7B4] border border-[#8E1B2E] px-2 py-0.5 rounded-xs">
                              Boundary Degree
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-[#A8B6AF] italic p-3 bg-black/20 rounded-xs border border-white/5">
                      Soya Hua Ghar (No resident grahas in this house).
                    </p>
                  )}
                </div>

                <div className="pt-2 text-[11px] text-[#A8B6AF] leading-relaxed">
                  Tip: Tap any diamond section on the chart to inspect its resident planets, degrees, and natural lordship.
                </div>
              </div>
            </div>

            {/* 4. Karmic Debt (Rin) Section */}
            <RinCards rins={reportData.evaluation.detectedRins} />

            {/* 5. Age Timeline Section */}
            <AgeTimeline currentAge={reportData.astronomy.birthDetails.year ? new Date().getFullYear() - reportData.astronomy.birthDetails.year : 32} />

            {/* 6. Upay Planner Section */}
            <UpayPlanner upayList={reportData.evaluation.suggestedUpay} />

            {/* 7. Honest Guidance & WhatsApp Consultation Callout */}
            <div className="bg-gradient-to-r from-[#0A2A1D] to-[#04170F] border-2 border-[#D4AF37]/60 rounded-xs p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
              <div className="space-y-2 max-w-xl">
                <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#F1D98A]">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span>Human Consultation Available</span>
                </div>
                <h3 className="font-serif text-2xl text-white font-normal">
                  Discuss Your Chart with Our Family Jyotishi
                </h3>
                <p className="text-xs text-[#A8B6AF] leading-relaxed">
                  Lal Kitab interpretations are nuanced and best reviewed with a human practitioner who looks at your whole family context. We never prescribe gemstones under fear.
                </p>
              </div>

              <a
                href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
                  "Namaste Vaidik Ratnam, I generated my Lal Kitab chart on your website and would like to consult with your astrologer."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MagneticButton variant="gold" className="px-6 py-3 text-xs tracking-wider whitespace-nowrap">
                  <MessageCircle className="w-4 h-4" />
                  <span>Discuss on WhatsApp</span>
                </MagneticButton>
              </a>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
