"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  Printer,
  CheckSquare,
  ExternalLink,
  ShieldCheck,
  RotateCcw,
  CheckCheck,
  Share2,
  ArrowRight,
} from "lucide-react";

interface ChecklistItem {
  id: string;
  category: "Purity & Assaying" | "Weight & Billing" | "Billing & Taxes" | "Gemstones & Diamonds" | "Policies & Craftsmanship";
  title: string;
  explanation: string;
  officialRef?: string;
  officialLink?: string;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: "chk-1",
    category: "Purity & Assaying",
    title: "Verify the 3 Mandatory BIS Hallmark Marks",
    explanation: "Inspect the inside of the jewellery using a magnifying glass or loupe. It must clearly show the triangular BIS logo, purity stamp (like 22K916 or 18K750), and the unique 6-digit laser HUID code.",
    officialRef: "Bureau of Indian Standards (BIS)",
    officialLink: "https://www.bis.gov.in",
  },
  {
    id: "chk-2",
    category: "Purity & Assaying",
    title: "Verify the HUID Number on the BIS Care App",
    explanation: "Open the official government BIS Care App, enter the 6-digit alphanumeric HUID code, and confirm that the registration matches the jeweler's identity and article description.",
    officialRef: "BIS Care App Portal",
    officialLink: "https://www.bis.gov.in/bis-apps/",
  },
  {
    id: "chk-3",
    category: "Weight & Billing",
    title: "Check Gross Weight vs. Net Gold Weight",
    explanation: "Ensure the digital scale reading is clearly visible in front of you. Studded stones, pearls, enamel, thread, and lacquer must be deducted. You must NEVER pay gold price on stone weight.",
  },
  {
    id: "chk-4",
    category: "Weight & Billing",
    title: "Confirm Transparent Making Charges (No Hidden Ghat)",
    explanation: "Verify whether workmanship is charged as a transparent percentage or a fixed per-gram amount. Ensure that melting loss or wastage (ghat) is not double-counted on top of making charges.",
  },
  {
    id: "chk-5",
    category: "Billing & Taxes",
    title: "Insist on a GST Tax Invoice with Itemized Breakdown",
    explanation: "The bill must record the jeweler's 15-digit GSTIN, separate line items for net gold value, making charge, individual stone values, and statutory 3% GST. An informal kacha receipt provides zero consumer warranty.",
    officialRef: "Dept of Consumer Affairs (Govt of India)",
    officialLink: "https://consumeraffairs.gov.in",
  },
  {
    id: "chk-6",
    category: "Gemstones & Diamonds",
    title: "Inspect Independent Gemological Laboratory Reports",
    explanation: "For natural colored gemstones or diamonds, require an accredited laboratory report (e.g. GIA, IGI). An internal plastic shop card with a self-printed barcode is NOT an independent laboratory certificate.",
  },
  {
    id: "chk-7",
    category: "Gemstones & Diamonds",
    title: "Demand Written Disclosure of Gemstone Treatments",
    explanation: "Explicitly ask if the colored gemstone is unheated, heated, oil-treated, or lead-glass filled. The GST invoice must explicitly record the stone's enhancement status in writing.",
  },
  {
    id: "chk-8",
    category: "Policies & Craftsmanship",
    title: "Verify Written Buyback & Exchange Terms",
    explanation: "Confirm the terms for future gold exchange: is melting loss deducted? What percentage of making charges or stone costs are retained on upgrade or exchange?",
  },
  {
    id: "chk-9",
    category: "Policies & Craftsmanship",
    title: "Test Clasps, Screws, and Prong Security",
    explanation: "For bangles, kada hinges, and necklace clasps, test smooth movement and firm locking. Verify that prongs holding stones are thick and flush so they do not catch on fine silk cloth.",
  },
  {
    id: "chk-10",
    category: "Policies & Craftsmanship",
    title: "Agree on Weight Tolerances for Custom Orders",
    explanation: "For custom handmade pieces, agree on acceptable weight difference (±5–10%) and completion date before paying the advance deposit.",
  },
];

const CATEGORIES = [
  "All Criteria",
  "Purity & Assaying",
  "Weight & Billing",
  "Billing & Taxes",
  "Gemstones & Diamonds",
  "Policies & Craftsmanship",
] as const;

export default function JewelleryBuyingChecklistPage() {
  const [checkedState, setCheckedState] = useState<Record<string, boolean>>({});
  const [selectedCategory, setSelectedCategory] = useState<string>("All Criteria");
  const [copiedLink, setCopiedLink] = useState(false);

  const toggleCheck = (id: string) => {
    setCheckedState((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const checkAll = () => {
    const all: Record<string, boolean> = {};
    CHECKLIST_ITEMS.forEach((item) => {
      all[item.id] = true;
    });
    setCheckedState(all);
  };

  const resetAll = () => {
    setCheckedState({});
  };

  const shareChecklist = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const filteredItems = selectedCategory === "All Criteria"
    ? CHECKLIST_ITEMS
    : CHECKLIST_ITEMS.filter((item) => item.category === selectedCategory);

  const completedCount = Object.values(checkedState).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / CHECKLIST_ITEMS.length) * 100);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <div className="no-print">
        <Header />
      </div>

      {/* PRINT-ONLY SHOP HEADER MASTHEAD */}
      <div className="hidden print:block p-8 border-b-2 border-[#173B32] mb-6">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-semibold block">
              Gold Jewellery &amp; Gemstone Buying Guide
            </span>
            <h1 className="font-serif text-2xl font-bold text-[#182522]">
              VAIDIK RATNAM
            </h1>
            <p className="text-xs text-[#626A65]">
              Family Jewellery &amp; Gemstone Shop &bull; vaidikratnam.com
            </p>
          </div>
          <div className="text-right text-xs text-[#626A65]">
            <p className="font-medium text-[#182522]">Inspection Checklist</p>
            <p>100% BIS Hallmarking &bull; HUID Laser Verified</p>
            <p className="text-[10px] text-[#8F9691] mt-1">
              Printed on {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
            </p>
          </div>
        </div>
      </div>

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#173B32]/10 border border-[#B08D57]/40 text-[#173B32] text-xs uppercase tracking-[0.22em] font-medium animate-float no-print">
            <ShieldCheck className="w-3.5 h-3.5 text-[#B08D57]" />
            <span>Consumer Protection Standard</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-[#182522] font-normal tracking-tight">
            Jewellery Buying &amp; Inspection Checklist
          </h1>

          <p className="text-sm text-[#626A65] leading-relaxed">
            Essential verification steps before buying gold jewellery or natural gemstones in India. Follow this honest checklist at any jewellery shop.
          </p>

          {/* Action toolbar (Screen only) */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 no-print">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.print()}
              className="text-xs uppercase tracking-wider border-[#D4CCC0] hover:border-[#173B32] hover:bg-white"
            >
              <Printer className="w-3.5 h-3.5 mr-1.5 text-[#173B32]" />
              Print / Save as PDF
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={shareChecklist}
              className="text-xs uppercase tracking-wider border-[#D4CCC0] hover:border-[#173B32] hover:bg-white"
            >
              <Share2 className="w-3.5 h-3.5 mr-1.5 text-[#B08D57]" />
              {copiedLink ? "Link Copied!" : "Share Checklist"}
            </Button>

            <Link href="/tools/gold-budget-estimator">
              <Button variant="secondary" size="sm" className="text-xs uppercase tracking-wider">
                Gold Budget Calculator &rarr;
              </Button>
            </Link>
          </div>
        </div>

        {/* Progress Tracker (Screen only) */}
        <div className="bg-white border border-[#E2D7C5] rounded-xs p-5 mb-8 shadow-xs no-print">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#173B32]/10 flex items-center justify-center text-[#173B32] shrink-0">
                <CheckSquare className="w-5 h-5 text-[#173B32]" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-[#182522] block">
                  Shop Buying Checklist: {completedCount} of {CHECKLIST_ITEMS.length} Confirmed
                </span>
                <span className="text-[11px] text-[#626A65]">
                  {progressPercent === 100
                    ? "✓ Complete Verification Done — All criteria satisfied."
                    : `${100 - progressPercent}% remaining before completing purchase review.`}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="w-32 bg-[#FAF8F5] h-2.5 rounded-full overflow-hidden border border-[#E5DFD5]">
                <div
                  className="bg-[#173B32] h-full transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="font-mono text-xs font-bold text-[#173B32] min-w-10">
                {progressPercent}%
              </span>
              <div className="flex items-center gap-1.5 ml-2">
                <button
                  type="button"
                  onClick={checkAll}
                  title="Check All"
                  className="p-1.5 text-xs text-[#626A65] hover:text-[#173B32] rounded-xs hover:bg-[#FAF8F5] cursor-pointer"
                >
                  <CheckCheck className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={resetAll}
                  title="Reset All"
                  className="p-1.5 text-xs text-[#626A65] hover:text-[#A61C1C] rounded-xs hover:bg-[#FAF8F5] cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="mt-5 pt-4 border-t border-[#F0ECE2] flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 text-xs rounded-full cursor-pointer transition-all ${
                    isSelected
                      ? "bg-[#173B32] text-white font-medium shadow-xs"
                      : "bg-[#FAF8F5] text-[#626A65] hover:text-[#182522] border border-[#E5DFD5]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Checklist Cards */}
        <div className="space-y-4">
          {filteredItems.map((item, idx) => {
            const isChecked = !!checkedState[item.id];
            return (
              <Card
                key={item.id}
                className={`p-6 transition-all rounded-xs border print:border-neutral-400 print:shadow-none print:break-inside-avoid print:p-4 print:mb-3 print:bg-white ${
                  isChecked
                    ? "bg-[#EEF3EE]/80 border-[#C5D5C4] shadow-xs"
                    : "bg-white border-[#E2D7C5] hover:border-[#B08D57]"
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Physical printable checkbox box for paper printouts */}
                  <div className="hidden print:inline-flex w-4 h-4 border-2 border-black rounded-xs items-center justify-center shrink-0 mt-1">
                    {isChecked && <span className="font-bold text-[10px] leading-none text-black">✓</span>}
                  </div>
                  <input
                    type="checkbox"
                    id={item.id}
                    checked={isChecked}
                    onChange={() => toggleCheck(item.id)}
                    className="mt-1 w-5 h-5 rounded-xs text-[#173B32] focus:ring-[#173B32] border-[#D4CCC0] cursor-pointer print:hidden"
                  />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded-xs bg-[#FAF8F5] text-[#B08D57] border border-[#E5DFD5]">
                        Item {idx + 1} &bull; {item.category}
                      </span>
                    </div>

                    <label
                      htmlFor={item.id}
                      className={`font-serif text-lg font-medium cursor-pointer block mb-2 transition-colors ${
                        isChecked
                          ? "text-[#173B32] line-through decoration-[#B08D57]"
                          : "text-[#182522]"
                      }`}
                    >
                      {item.title}
                    </label>

                    <p className="text-xs sm:text-sm text-[#626A65] leading-relaxed mb-3">
                      {item.explanation}
                    </p>

                    {item.officialRef && item.officialLink && (
                      <div className="no-print pt-1">
                        <a
                          href={item.officialLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#173B32] hover:text-[#B08D57] transition-colors"
                        >
                          <span>Official Portal: {item.officialRef}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Free In-Shop Inspection Callout */}
        <div className="mt-12 bg-[#173B32] text-white p-8 rounded-xs shadow-md no-print relative overflow-hidden">
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#F3E5AB]">
                In-Person Shop Verification
              </span>
              <h3 className="font-serif text-2xl font-normal text-white">
                Inspect Any Piece on Digital Scales &amp; Magnifiers
              </h3>
              <p className="text-xs text-[#DDE5DC] max-w-lg leading-relaxed">
                We welcome you to inspect every piece on our digital scale, check the 6-digit laser HUID, and review laboratory certificates in person at our shop.
              </p>
            </div>
            <Link href="/contact">
              <Button
                variant="gold"
                size="md"
                className="text-xs uppercase tracking-wider font-semibold whitespace-nowrap btn-gold-shimmer"
              >
                Visit Our Shop
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Printable Footer note */}
        <div className="mt-8 pt-6 border-t border-[#E5DFD5] text-xs text-[#626A65] text-center">
          <p className="mb-1 font-serif text-sm text-[#182522]">
            Vaidik Ratnam — Traditional Gold Jewellery &amp; Gemstone Shop
          </p>
          <p className="text-[11px] text-[#8F9691]">
            Official Portal: vaidikratnam.com &bull; BIS HUID Laser Hallmarked &bull; Independent Lab Reports
          </p>
        </div>
      </main>

      <div className="no-print">
        <Footer />
      </div>
    </div>
  );
}
