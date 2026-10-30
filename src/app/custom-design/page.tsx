"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { submitCustomDesignBrief } from "./actions";
import { Check, ChevronRight, ChevronLeft, Shield, AlertCircle, Info, Upload, X, RotateCcw } from "lucide-react";

const PIECE_TYPES = [
  { value: "ring", label: "Ring / Band" },
  { value: "necklace", label: "Necklace / Choker / Haar" },
  { value: "pendant", label: "Pendant / Locket" },
  { value: "earrings", label: "Earrings / Jhumkas / Tops" },
  { value: "bracelet", label: "Bangle / Kada / Bracelet" },
  { value: "bridal", label: "Bridal Jewellery Set" },
  { value: "redesign", label: "Redesign / Remodel Heirloom Gold" },
  { value: "other", label: "Other Custom Item" },
];

const BUDGET_RANGES = [
  { value: "under_50k", label: "₹25,000 – ₹50,000" },
  { value: "50k_to_1lakh", label: "₹50,000 – ₹1,00,000" },
  { value: "1lakh_to_2_5lakh", label: "₹1,00,000 – ₹2,50,000" },
  { value: "2_5lakh_to_5lakh", label: "₹2,50,000 – ₹5,00,000" },
  { value: "above_5lakh", label: "Above ₹5,00,000" },
  { value: "not_sure", label: "Not sure yet / Need guidance" },
];

const METALS = [
  { value: "22k_yellow_gold", label: "22K Yellow Gold (916 Hallmarked)" },
  { value: "18k_yellow_gold", label: "18K Yellow Gold (750)" },
  { value: "14k_yellow_gold", label: "14K Gold (585 Contemporary)" },
  { value: "18k_rose_gold", label: "18K Rose Gold (750)" },
  { value: "18k_white_gold", label: "18K White Gold (750)" },
  { value: "925_sterling_silver", label: "925 Sterling Silver (Chandi)" },
  { value: "platinum_950", label: "Platinum 950" },
  { value: "undecided", label: "Need artisan advice on metal selection" },
];

const DEFAULT_FORM_DATA = {
  pieceType: "ring",
  intendedWearer: "",
  occasion: "",
  styleNotes: "",
  mustHaveDetails: "",
  exclusions: "",
  preferredMetal: "22k_yellow_gold",
  preferredGemstone: "",
  ringOrWristSize: "",
  budgetRange: "50k_to_1lakh",
  needAstrologyConsultation: false,
  targetDate: "",
  customerName: "",
  customerContactMethod: "whatsapp" as "whatsapp" | "phone" | "email",
  customerContactValue: "",
  preferredContactTime: "Afternoon (1 PM - 5 PM)",
  city: "",
  privacyAcknowledged: false,
  marketingOptIn: false,
};

type CustomFormData = typeof DEFAULT_FORM_DATA;

function getInitialCustomFormData(): { data: CustomFormData; step: number; restored: boolean } {
  if (typeof window === "undefined") {
    return { data: DEFAULT_FORM_DATA, step: 1, restored: false };
  }

  // 1. Check URL parameters first (e.g. transferred from gold budget calculator)
  const params = new URLSearchParams(window.location.search);
  const urlPieceType = params.get("pieceType");
  const urlMetal = params.get("metal") || params.get("purity");
  const urlBudget = params.get("budget");
  const urlNotes = params.get("notes");

  if (urlPieceType || urlMetal || urlBudget || urlNotes) {
    return {
      data: {
        ...DEFAULT_FORM_DATA,
        pieceType: urlPieceType || DEFAULT_FORM_DATA.pieceType,
        preferredMetal:
          urlMetal === "24K" || urlMetal === "22K" || urlMetal === "22k_yellow_gold"
            ? "22k_yellow_gold"
            : urlMetal === "18K" || urlMetal === "18k_yellow_gold"
            ? "18k_yellow_gold"
            : urlMetal === "14K" || urlMetal === "14k_yellow_gold"
            ? "14k_yellow_gold"
            : urlMetal === "925_silver" || urlMetal === "silver" || urlMetal === "925_sterling_silver"
            ? "925_sterling_silver"
            : (urlMetal || DEFAULT_FORM_DATA.preferredMetal),
        budgetRange: urlBudget || DEFAULT_FORM_DATA.budgetRange,
        styleNotes: urlNotes ? decodeURIComponent(urlNotes) : DEFAULT_FORM_DATA.styleNotes,
      },
      step: 1,
      restored: false,
    };
  }

  // 2. Otherwise restore from sessionStorage
  try {
    const saved = sessionStorage.getItem("vaidikratnam_custom_design_draft_v1");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.formData) {
        return {
          data: { ...DEFAULT_FORM_DATA, ...parsed.formData },
          step: parsed.currentStep || 1,
          restored: true,
        };
      }
    }
  } catch {
    // ignore
  }

  return { data: DEFAULT_FORM_DATA, step: 1, restored: false };
}

export default function CustomDesignStudioPage() {
  const router = useRouter();
  const [initialState] = useState(() => getInitialCustomFormData());
  const [currentStep, setCurrentStep] = useState<number>(initialState.step);
  const totalSteps = 10;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [previewImages, setPreviewImages] = useState<Array<{ name: string; url: string }>>([]);
  const [draftRestored, setDraftRestored] = useState(initialState.restored);

  // Form State
  const [formData, setFormData] = useState<CustomFormData>(initialState.data);

  const STORAGE_KEY = "vaidikratnam_custom_design_draft_v1";

  // Save changes to sessionStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ formData, currentStep }));
    } catch {
      // ignore
    }
  }, [formData, currentStep]);

  const clearDraft = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(STORAGE_KEY);
    }
    setDraftRestored(false);
    window.location.reload();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const newPreviews = Array.from(files).map((f) => ({
      name: f.name,
      url: URL.createObjectURL(f),
    }));
    setPreviewImages((prev) => [...prev, ...newPreviews].slice(0, 4));
  };

  const removePreviewImage = (index: number) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const updateField = (field: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: number): boolean => {
    if (step === 1 && !formData.pieceType) return false;
    if (step === 3 && formData.styleNotes.trim().length < 10) {
      alert("Please provide at least a short description of your design idea (10+ characters).");
      return false;
    }
    if (step === 5 && !formData.budgetRange) return false;
    if (step === 8) {
      if (!formData.customerName.trim()) {
        alert("Please enter your name.");
        return false;
      }
      if (!formData.customerContactValue.trim()) {
        alert("Please enter your phone number or email address.");
        return false;
      }
    }
    if (step === 9 && !formData.privacyAcknowledged) {
      alert("Please acknowledge the privacy notice to proceed.");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
      window.scrollTo({ top: 150, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 150, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    if (!validateStep(9)) return;

    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      const res = await submitCustomDesignBrief(formData);
      if (res.success && res.referenceCode) {
        if (typeof window !== "undefined") {
          sessionStorage.removeItem(STORAGE_KEY);
        }
        router.push(`/custom-design/received/${res.referenceCode}`);
      } else {
        setSubmissionError(res.message || "Failed to submit request. Please check required fields.");
      }
    } catch {
      setSubmissionError("Network error. Please try again or reach out directly via our contact details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Header />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-8">
        {/* Editorial Custom Banner */}
        <div className="relative rounded-xs overflow-hidden bg-[#061410] text-white border border-[#B08D57]/40 shadow-xl">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/salon-bespoke.jpg"
              alt="Custom Jewellery Workshop"
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#061410] via-[#061410]/85 to-transparent" />
          </div>

          <div className="relative z-10 p-8 sm:p-12 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0F3D2E]/90 border border-[#D4AF37]/60 text-[#F3E5AB] text-xs uppercase tracking-[0.22em] font-medium shadow-md">
              <Image
                src="/images/brand/element-lotus-transparent.png"
                alt="Lotus"
                width={20}
                height={20}
                className="w-4 h-4 object-contain"
              />
              <span>Custom Jewellery &bull; Made to Order</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl text-white font-normal tracking-tight leading-tight">
              Order Custom Jewellery &amp; <span className="text-gold-gradient italic">Design</span>
            </h1>

            <p className="text-xs sm:text-sm text-[#DDE5DC] leading-relaxed font-light">
              Turn your old gold, family design, Pinterest photo, or sketch into 100% hallmarked 22K or 18K gold. Fill out this simple form to get an honest quote from our goldsmiths (karigars).
            </p>
          </div>
        </div>

        {/* Draft Restored Pill */}
        {draftRestored && (
          <div className="p-3 bg-[#EEF3EE] border border-[#C5D5C4] rounded-xs flex items-center justify-between text-xs text-[#173B32]">
            <span className="flex items-center gap-1.5 font-medium">
              <Check className="w-4 h-4 text-[#1B6442]" />
              Restored your in-progress custom brief draft from this session.
            </span>
            <button
              type="button"
              onClick={clearDraft}
              className="text-[11px] underline text-[#8F9691] hover:text-[#A61C1C] flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Brief</span>
            </button>
          </div>
        )}

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center text-xs text-[#626A65] mb-2 font-medium">
            <span>Step {currentStep} of {totalSteps}</span>
            <span className="text-[#173B32]">
              {currentStep === 1 && "Piece Selection"}
              {currentStep === 2 && "Inspiration & References"}
              {currentStep === 3 && "Design Brief Details"}
              {currentStep === 4 && "Metals & Gemstones"}
              {currentStep === 5 && "Budget Preference"}
              {currentStep === 6 && "Astrology Guidance (Optional)"}
              {currentStep === 7 && "Target Timeline"}
              {currentStep === 8 && "Your Contact Details"}
              {currentStep === 9 && "Privacy & Consent"}
              {currentStep === 10 && "Review & Submit"}
            </span>
          </div>
          <div className="w-full bg-[#E5DFD5] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#173B32] h-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Container */}
        <Card className="p-6 sm:p-8 bg-white border border-[#E5DFD5] shadow-xs">
          {/* STEP 1: Piece Type */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-xl text-[#182522] mb-1">
                  1. What kind of piece would you like to create?
                </h2>
                <p className="text-xs text-[#626A65]">
                  Select the category that best matches your idea.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PIECE_TYPES.map((pt) => {
                  const isSelected = formData.pieceType === pt.value;
                  return (
                    <button
                      key={pt.value}
                      type="button"
                      onClick={() => updateField("pieceType", pt.value)}
                      className={`text-left p-4 rounded-sm border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#173B32] text-white border-[#173B32]"
                          : "bg-white text-[#182522] border-[#E5DFD5] hover:border-[#B08D57]"
                      }`}
                    >
                      <span className="text-sm font-medium block">{pt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Inspiration & References */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-xl text-[#182522] mb-1">
                  2. Inspiration &amp; Visual References
                </h2>
                <p className="text-xs text-[#626A65]">
                  Share visual ideas, antique inspirations, or heirloom sketches you love.
                </p>
              </div>

              <div className="bg-[#EEF3EE] border border-[#C5D5C4] rounded-sm p-4 text-xs text-[#173B32] flex items-start gap-3">
                <Shield className="w-5 h-5 mt-0.5 shrink-0" />
                <div>
                  <strong className="block mb-0.5 font-semibold">Strict Privacy Assurance</strong>
                  Your reference ideas and uploaded sketches are confidential. We never publish customer briefs or inspiration images to public galleries without explicit written permission.
                </div>
              </div>

              <div>
                <Textarea
                  label="Inspiration Links or Reference Descriptions"
                  value={formData.mustHaveDetails}
                  onChange={(e) => updateField("mustHaveDetails", e.target.value)}
                  placeholder="e.g. Traditional south Indian temple carving with matte antique finish, or references similar to art deco motifs..."
                  rows={3}
                />
              </div>

              {/* Visual Photo Upload Box */}
              <div className="space-y-3">
                <label className="block text-xs font-medium text-[#182522]">
                  Upload Reference Photos, Heirloom Pictures or Sketches (Optional):
                </label>
                
                <div className="border-2 border-dashed border-[#D4CCC0] rounded-xs p-5 text-center bg-[#FAF8F5] hover:bg-[#F4EFE6] transition-colors">
                  <Upload className="w-6 h-6 text-[#173B32] mx-auto mb-2" />
                  <p className="text-xs text-[#182522] font-medium mb-1">
                    Select images from your device (JPEG, PNG, WebP)
                  </p>
                  <p className="text-[11px] text-[#626A65] mb-3">
                    Up to 4 images &bull; Kept in strict private storage for our artisan team.
                  </p>
                  <label className="cursor-pointer inline-block">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <span className="px-4 py-2 bg-[#173B32] text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-[#122e27] transition-colors inline-block">
                      Browse Images
                    </span>
                  </label>
                </div>

                {/* Previews Grid */}
                {previewImages.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    {previewImages.map((img, idx) => (
                      <div
                        key={idx}
                        className="relative aspect-square rounded-xs overflow-hidden border border-[#B08D57] bg-[#FAF8F5] shadow-xs group"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img.url}
                          alt={img.name}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removePreviewImage(idx)}
                          className="absolute top-1 right-1 p-1 bg-black/70 hover:bg-black text-white rounded-full transition-colors cursor-pointer"
                          title="Remove image"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[9px] px-1 py-0.5 truncate block">
                          {img.name}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: Design Brief */}
          {currentStep === 3 && (
            <div className="space-y-5">
              <div>
                <h2 className="font-serif text-xl text-[#182522] mb-1">
                  3. The Design Brief
                </h2>
                <p className="text-xs text-[#626A65]">
                  Tell our senior artisans about the story, style, and must-have details.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Intended Wearer"
                  placeholder="e.g. Self, Bride, Mother, Partner"
                  value={formData.intendedWearer}
                  onChange={(e) => updateField("intendedWearer", e.target.value)}
                />
                <Input
                  label="Occasion"
                  placeholder="e.g. Wedding, Engagement, Milestone Birthday, Daily Wear"
                  value={formData.occasion}
                  onChange={(e) => updateField("occasion", e.target.value)}
                />
              </div>

              <div>
                <Textarea
                  label="Describe Your Vision & Must-Have Details"
                  required
                  placeholder="Describe the shape, motifs, texture, weight preference, or special personal engravings..."
                  value={formData.styleNotes}
                  onChange={(e) => updateField("styleNotes", e.target.value)}
                  rows={4}
                  helperText="Minimum 10 characters required."
                />
              </div>

              <div>
                <Input
                  label="Any Specific Exclusions or Dislikes?"
                  placeholder="e.g. No sharp prongs, avoid rhodium plating, no synthetic stones..."
                  value={formData.exclusions}
                  onChange={(e) => updateField("exclusions", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* STEP 4: Materials & Preferences */}
          {currentStep === 4 && (
            <div className="space-y-5">
              <div>
                <h2 className="font-serif text-xl text-[#182522] mb-1">
                  4. Metals &amp; Gemstone Preferences
                </h2>
                <p className="text-xs text-[#626A65]">
                  Select your precious metal purity and gemstone setting requirements.
                </p>
              </div>

              <Select
                label="Preferred Precious Metal"
                value={formData.preferredMetal}
                onChange={(e) => updateField("preferredMetal", e.target.value)}
                options={METALS}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Preferred Gemstones / Diamonds"
                  placeholder="e.g. Natural Emerald, Unheated Yellow Sapphire, Solitaire Diamond, or Plain Gold"
                  value={formData.preferredGemstone}
                  onChange={(e) => updateField("preferredGemstone", e.target.value)}
                />

                <Input
                  label="Ring / Bangle Size (If known)"
                  placeholder="e.g. Indian Ring Size 14, or Bangle Size 2.4"
                  value={formData.ringOrWristSize}
                  onChange={(e) => updateField("ringOrWristSize", e.target.value)}
                  helperText="Leave empty if you would like us to measure at our shop."
                />
              </div>
            </div>
          )}

          {/* STEP 5: Budget Range */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-xl text-[#182522] mb-1">
                  5. Estimated Budget Comfort Range
                </h2>
                <p className="text-xs text-[#626A65]">
                  This helps our master craftsmen tailor gold weight and gemstone specifications realistically.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BUDGET_RANGES.map((b) => {
                  const isSelected = formData.budgetRange === b.value;
                  return (
                    <button
                      key={b.value}
                      type="button"
                      onClick={() => updateField("budgetRange", b.value)}
                      className={`text-left p-4 rounded-sm border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#173B32] text-white border-[#173B32]"
                          : "bg-white text-[#182522] border-[#E5DFD5] hover:border-[#B08D57]"
                      }`}
                    >
                      <span className="text-sm font-medium block">{b.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 6: Optional Astrology Consultation */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-xl text-[#182522] mb-1">
                  6. Astrological / Ratna Guidance Option
                </h2>
                <p className="text-xs text-[#626A65]">
                  Would you like our father to review your planetary alignment for suitable gemstone selection?
                </p>
              </div>

              <div className="bg-[#FFF8E7] border border-[#FFE5A3] p-4 rounded-sm text-xs text-[#925700] space-y-1">
                <strong className="block font-semibold">Independent &amp; Optional Service:</strong>
                <p>
                  You are never obligated to combine custom jewellery with astrology. Our father conducts traditional consultations as an independent advisory practice without sales pressure.
                </p>
              </div>

              <div className="space-y-3">
                <label className="flex items-start gap-3 p-4 border border-[#E5DFD5] rounded-sm cursor-pointer hover:bg-[#F7F4ED]">
                  <input
                    type="radio"
                    name="needAstrology"
                    checked={!formData.needAstrologyConsultation}
                    onChange={() => updateField("needAstrologyConsultation", false)}
                    className="mt-0.5 text-[#173B32] focus:ring-[#173B32]"
                  />
                  <div>
                    <span className="text-sm font-medium text-[#182522] block">
                      Jewellery Design Only (No Astrology Consultation)
                    </span>
                    <span className="text-xs text-[#626A65]">
                      Focus purely on artistic craftsmanship, aesthetics, and fine metalwork.
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 border border-[#E5DFD5] rounded-sm cursor-pointer hover:bg-[#F7F4ED]">
                  <input
                    type="radio"
                    name="needAstrology"
                    checked={formData.needAstrologyConsultation}
                    onChange={() => updateField("needAstrologyConsultation", true)}
                    className="mt-0.5 text-[#173B32] focus:ring-[#173B32]"
                  />
                  <div>
                    <span className="text-sm font-medium text-[#182522] block">
                      Include Astrological / Ratna Guidance
                    </span>
                    <span className="text-xs text-[#626A65]">
                      Request our father to evaluate auspicious metal, stone type, and setting timing.
                    </span>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* STEP 7: Timing */}
          {currentStep === 7 && (
            <div className="space-y-5">
              <div>
                <h2 className="font-serif text-xl text-[#182522] mb-1">
                  7. Desired Timeline
                </h2>
                <p className="text-xs text-[#626A65]">
                  When would you ideally like your custom piece ready?
                </p>
              </div>

              <div className="bg-[#F7F4ED] border border-[#E5DFD5] rounded-sm p-4 text-xs text-[#626A65] flex items-start gap-3">
                <Info className="w-5 h-5 text-[#173B32] mt-0.5 shrink-0" />
                <div>
                  <strong className="text-[#182522] block mb-0.5">Artisan Handcraft Timelines:</strong>
                  Bespoke fine jewellery typically takes <strong>2 to 4 weeks</strong> from final design approval to hallmarking. Stated dates are preferred targets and will be officially confirmed upon review.
                </div>
              </div>

              <Input
                label="Target Completion Date (Optional)"
                type="date"
                value={formData.targetDate}
                onChange={(e) => updateField("targetDate", e.target.value)}
              />
            </div>
          )}

          {/* STEP 8: Contact Details */}
          {currentStep === 8 && (
            <div className="space-y-5">
              <div>
                <h2 className="font-serif text-xl text-[#182522] mb-1">
                  8. Your Contact Information
                </h2>
                <p className="text-xs text-[#626A65]">
                  Guest submission enabled. No account registration required.
                </p>
              </div>

              <Input
                label="Full Name"
                required
                placeholder="e.g. Priya Sharma"
                value={formData.customerName}
                onChange={(e) => updateField("customerName", e.target.value)}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Preferred Contact Channel"
                  value={formData.customerContactMethod}
                  onChange={(e) => updateField("customerContactMethod", e.target.value as "whatsapp" | "phone" | "email")}
                  options={[
                    { value: "whatsapp", label: "WhatsApp Message" },
                    { value: "phone", label: "Phone Call" },
                    { value: "email", label: "Email" },
                  ]}
                />

                <Input
                  label="Contact Phone / Email"
                  required
                  placeholder="e.g. +91 98765 43210 or yourname@example.com"
                  value={formData.customerContactValue}
                  onChange={(e) => updateField("customerContactValue", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Preferred Contact Time"
                  placeholder="e.g. Morning 10 AM - 1 PM"
                  value={formData.preferredContactTime}
                  onChange={(e) => updateField("preferredContactTime", e.target.value)}
                />
                <Input
                  label="Your City / Location"
                  placeholder="e.g. Jaipur, Delhi NCR, Mumbai"
                  value={formData.city}
                  onChange={(e) => updateField("city", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* STEP 9: Privacy & Consent */}
          {currentStep === 9 && (
            <div className="space-y-5">
              <div>
                <h2 className="font-serif text-xl text-[#182522] mb-1">
                  9. Privacy Notice &amp; Consent
                </h2>
                <p className="text-xs text-[#626A65]">
                  Please review our data protection practices before submitting.
                </p>
              </div>

              <div className="p-4 bg-[#F7F4ED] border border-[#E5DFD5] rounded-sm text-xs text-[#626A65] space-y-2">
                <strong className="text-[#182522] block font-semibold">How We Handle Your Information:</strong>
                <p>
                  1. Your contact details and custom brief are used solely by Vaidik Ratnam studio staff to prepare your quote and answer questions.
                </p>
                <p>
                  2. We never sell or share your contact data with third-party marketing brokers.
                </p>
                <p>
                  3. You may request data correction or deletion at any time by contacting our studio desk.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.privacyAcknowledged}
                    onChange={(e) => updateField("privacyAcknowledged", e.target.checked)}
                    className="mt-1 w-4 h-4 rounded-xs text-[#173B32] focus:ring-[#173B32] border-[#D4CCC0] cursor-pointer"
                  />
                  <span className="text-xs text-[#182522]">
                    <strong className="text-[#A61C1C]">* Required: </strong>
                    I acknowledge that I have read and agree to the storage and use of my brief details for preparing my jewellery consultation.
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.marketingOptIn}
                    onChange={(e) => updateField("marketingOptIn", e.target.checked)}
                    className="mt-1 w-4 h-4 rounded-xs text-[#173B32] focus:ring-[#173B32] border-[#D4CCC0] cursor-pointer"
                  />
                  <span className="text-xs text-[#626A65]">
                    (Optional) I would like to receive occasional studio exhibition updates and fine jewellery guides.
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* STEP 10: Review & Submit */}
          {currentStep === 10 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-xl text-[#182522] mb-1">
                  10. Review Your Design Brief
                </h2>
                <p className="text-xs text-[#626A65]">
                  Please verify your specifications before sending to our studio desk.
                </p>
              </div>

              {submissionError && (
                <div className="bg-[#FFF0F0] border border-[#FFD0D0] p-4 rounded-sm text-xs text-[#A61C1C] flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{submissionError}</span>
                </div>
              )}

              <div className="bg-[#F7F4ED] border border-[#E5DFD5] rounded-sm p-5 space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-3 border-b border-[#E5DFD5]">
                  <div>
                    <span className="text-[#626A65] block">Piece Type:</span>
                    <strong className="text-[#182522] capitalize">{formData.pieceType}</strong>
                  </div>
                  <div>
                    <span className="text-[#626A65] block">Budget Comfort:</span>
                    <strong className="text-[#182522]">{formData.budgetRange.replace(/_/g, " ")}</strong>
                  </div>
                </div>

                <div className="pb-3 border-b border-[#E5DFD5]">
                  <span className="text-[#626A65] block mb-1">Design Vision:</span>
                  <p className="text-[#182522] leading-relaxed">{formData.styleNotes}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-3 border-b border-[#E5DFD5]">
                  <div>
                    <span className="text-[#626A65] block">Precious Metal:</span>
                    <strong className="text-[#182522]">{formData.preferredMetal}</strong>
                  </div>
                  <div>
                    <span className="text-[#626A65] block">Astrology Service:</span>
                    <strong className="text-[#182522]">
                      {formData.needAstrologyConsultation ? "Requested" : "Jewellery Only"}
                    </strong>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-[#626A65] block">Applicant:</span>
                    <strong className="text-[#182522]">{formData.customerName}</strong>
                  </div>
                  <div>
                    <span className="text-[#626A65] block">Contact Via:</span>
                    <strong className="text-[#182522] capitalize">
                      {formData.customerContactMethod} ({formData.customerContactValue})
                    </strong>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-[#EEF3EE] border border-[#C5D5C4] rounded-xs text-[11px] text-[#173B32]">
                <strong>Next Step:</strong> Upon submission, you will receive a unique tracking reference. Our family studio staff will review feasible net weights, gemstone sourcing, and reach out to discuss preliminary sketches and quote options.
              </div>
            </div>
          )}

          {/* Controls Footer */}
          <div className="mt-8 pt-5 border-t border-[#E5DFD5] flex items-center justify-between">
            {currentStep > 1 ? (
              <Button
                variant="outline"
                size="md"
                onClick={handlePrev}
                disabled={isSubmitting}
                className="text-xs uppercase tracking-wider"
              >
                <ChevronLeft className="w-3.5 h-3.5 mr-1" />
                Previous
              </Button>
            ) : <div />}

            {currentStep < totalSteps ? (
              <Button
                variant="primary"
                size="md"
                onClick={handleNext}
                className="text-xs uppercase tracking-wider"
              >
                Next Step
                <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            ) : (
              <Button
                variant="gold"
                size="lg"
                onClick={handleSubmit}
                isLoading={isSubmitting}
                className="text-xs uppercase tracking-wider font-semibold"
              >
                <Check className="w-4 h-4 mr-1.5" />
                Submit Design Brief
              </Button>
            )}
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
}

