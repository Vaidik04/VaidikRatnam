"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { submitConsultationRequest } from "../actions";
import {
  Calendar,
  CheckCircle2,
  AlertCircle,
  Clock,
  Lock,
} from "lucide-react";

const SERVICE_OPTIONS = [
  { value: "Vedic Gemstone (Ratna) Suitability Analysis", label: "Vedic Gemstone (Ratna) Suitability Analysis (45 Min)" },
  { value: "Comprehensive Janma Kundali Consultation", label: "Comprehensive Janma Kundali Consultation (60 Min)" },
  { value: "Auspicious Timing (Shubh Muhurat) Selection", label: "Auspicious Timing (Shubh Muhurat) Selection (30 Min)" },
  { value: "General Astrological Guidance & Life Direction", label: "General Astrological Guidance & Life Direction (45 Min)" },
];

const TIME_SLOTS = [
  { value: "morning_11am", label: "Morning: 11:00 AM – 1:00 PM" },
  { value: "afternoon_2pm", label: "Afternoon: 2:00 PM – 4:00 PM" },
  { value: "evening_5pm", label: "Evening: 5:00 PM – 7:00 PM" },
];

const FOCUS_AREA_OPTIONS = [
  "Gemstone Suitability & Ratna Prescription",
  "Career, Trade & Business Milestones",
  "Marriage, Compatibility & Kundali Milan",
  "Sade Sati, Dhaiya & Shani Transit Guidance",
  "Health, Stress & Mental Peace",
  "Children, Progeny & Education",
  "Spiritual Sadhana & Karmic Perspective",
];

function ConsultationRequestForm() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get("service") || SERVICE_OPTIONS[0].value;
  const initialSign = searchParams.get("sign") || "";

  const [formData, setFormData] = useState({
    serviceTitle: initialService,
    requestedDate: "",
    requestedTimeSlot: TIME_SLOTS[0].value,
    mode: "in_person_showroom" as "in_person_showroom" | "phone" | "video",
    customerName: "",
    customerContactMethod: "whatsapp" as "whatsapp" | "phone" | "email",
    customerContactValue: "",
    preferredLanguage: "Hindi & English",
    birthDate: "",
    birthTime: "",
    birthTimeAccuracy: "exact" as "exact" | "within_15_mins" | "approximate_1h" | "unknown_prashna",
    birthPlace: "",
    gender: "Unspecified",
    focusAreas: [] as string[],
    currentGemstones: "",
    specificQuestions: initialSign ? `Selected Lagna / Sign from Explorer: ${initialSign}\n` : "",
    privacyAcknowledged: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [submittedReference, setSubmittedReference] = useState<string | null>(null);

  const updateField = (field: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleFocusArea = (area: string) => {
    setFormData((prev) => {
      const exists = prev.focusAreas.includes(area);
      return {
        ...prev,
        focusAreas: exists
          ? prev.focusAreas.filter((a) => a !== area)
          : [...prev.focusAreas, area],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacyAcknowledged) {
      alert("Please acknowledge the privacy notice to proceed.");
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      const res = await submitConsultationRequest(formData);
      if (res.success && res.referenceCode) {
        setSubmittedReference(res.referenceCode);
        window.scrollTo({ top: 100, behavior: "smooth" });
      } else {
        setSubmissionError(res.message || "Failed to schedule appointment request.");
      }
    } catch {
      setSubmissionError("Network error. Please try again or reach out directly to the studio.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submittedReference) {
    return (
      <Card className="p-8 sm:p-10 bg-white border border-[#E5DFD5] text-center space-y-6">
        <div className="mx-auto w-16 h-16 rounded-full bg-[#EEF3EE] border border-[#C5D5C4] flex items-center justify-center text-[#173B32]">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div>
          <span className="text-xs uppercase tracking-widest text-[#B08D57] font-semibold block mb-1">
            Request Recorded
          </span>
          <h1 className="font-serif text-3xl text-[#182522] font-medium">
            Appointment Request Received
          </h1>
          <p className="text-sm text-[#626A65] mt-2 leading-relaxed">
            Thank you, {formData.customerName}. Your appointment request has been securely logged in our consultation diary.
          </p>
        </div>

        <div className="bg-[#FAF8F5] border border-[#E5DFD5] rounded-xs p-5 max-w-md mx-auto text-left space-y-2.5 text-xs">
          <div className="flex justify-between items-center border-b border-[#E5DFD5] pb-2">
            <span className="text-[#626A65]">Reference Number:</span>
            <span className="font-mono font-bold text-sm text-[#173B32]">
              {submittedReference}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#626A65]">Service:</span>
            <span className="font-medium text-[#182522] text-right">{formData.serviceTitle}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#626A65]">Requested Date:</span>
            <span className="font-medium text-[#182522]">{formData.requestedDate}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#626A65]">Consultation Mode:</span>
            <span className="font-medium text-[#182522] capitalize">
              {formData.mode.replace(/_/g, " ")}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#626A65]">Language:</span>
            <span className="font-medium text-[#182522]">{formData.preferredLanguage}</span>
          </div>
        </div>

        {/* Preparation Guide Card */}
        <div className="p-5 bg-[#EEF3EE] border border-[#C5D5C4] rounded-xs max-w-md mx-auto text-left text-xs space-y-2">
          <h4 className="font-serif text-sm font-semibold text-[#173B32] flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            What Happens Next:
          </h4>
          <ol className="list-decimal list-inside space-y-1.5 text-[#182522]">
            <li>Our studio coordinator checks the practitioner&apos;s diary for {formData.requestedDate}.</li>
            <li>We contact you via {formData.customerContactMethod} ({formData.customerContactValue}) to confirm the exact time slot.</li>
            <li>Before the session, the practitioner casts your Janma Kundali and Navamsha chart using the birth coordinates provided.</li>
            <li>No payment is required until your appointment time is mutually confirmed.</li>
          </ol>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/astrology">
            <Button variant="outline" size="md" className="text-xs uppercase tracking-wider">
              &larr; Return to Astrology Page
            </Button>
          </Link>
          <Link href="/learn/navratna-and-vedic-gemstone-guidance-principles">
            <Button variant="primary" size="md" className="text-xs uppercase tracking-wider">
              Read Our Astrological Ethics &rarr;
            </Button>
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="text-center max-w-xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-[#B08D57] font-semibold block mb-1">
          Private Studio Diary
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#182522] font-normal leading-tight">
          Request a Jyotish &amp; Ratna Consultation
        </h1>
        <p className="text-xs sm:text-sm text-[#626A65] mt-2 leading-relaxed">
          Grounded, classical horoscope analysis by the studio elder. Every request is reviewed manually—we do not use automated horoscope generators or pushy sales scripts.
        </p>
      </div>

      {submissionError && (
        <div className="p-4 bg-[#FFF0F0] border border-[#FFD0D0] text-xs text-[#A61C1C] flex items-center gap-2 rounded-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{submissionError}</span>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Step 1: Service & Time Preferences */}
        <Card className="p-6 bg-white border border-[#E5DFD5] space-y-5">
          <div className="border-b border-[#E5DFD5] pb-3">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#B08D57] font-semibold block">
              Step 1 of 4
            </span>
            <h2 className="font-serif text-lg font-medium text-[#182522]">
              Consultation Service &amp; Timing
            </h2>
          </div>

          <div className="space-y-4 text-xs">
            <Select
              label="Select Consultation Service"
              required
              value={formData.serviceTitle}
              onChange={(e) => updateField("serviceTitle", e.target.value)}
              options={SERVICE_OPTIONS}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Preferred Date"
                type="date"
                required
                value={formData.requestedDate}
                onChange={(e) => updateField("requestedDate", e.target.value)}
                min={new Date().toISOString().split("T")[0]}
              />

              <Select
                label="Preferred Time Window"
                required
                value={formData.requestedTimeSlot}
                onChange={(e) => updateField("requestedTimeSlot", e.target.value)}
                options={TIME_SLOTS}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#182522] mb-1.5">
                Consultation Mode:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: "in_person_showroom",
                    label: "In-Person Shop Visit",
                    desc: "Sit with our elder astrologer at our family shop.",
                  },
                  {
                    id: "phone",
                    label: "Phone Voice Call",
                    desc: "Direct telephone call at agreed time.",
                  },
                  {
                    id: "video",
                    label: "Video Call",
                    desc: "Google Meet or WhatsApp video call.",
                  },
                ].map((m) => (
                  <label
                    key={m.id}
                    className={`p-3.5 rounded-xs border cursor-pointer block transition-colors ${
                      formData.mode === m.id
                        ? "border-[#173B32] bg-[#EEF3EE]/60 text-[#173B32]"
                        : "border-[#E5DFD5] bg-white hover:border-[#B08D57]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="mode"
                      value={m.id}
                      checked={formData.mode === m.id}
                      onChange={() => updateField("mode", m.id)}
                      className="sr-only"
                    />
                    <strong className="block text-xs font-semibold text-[#182522]">
                      {m.label}
                    </strong>
                    <span className="text-[11px] text-[#626A65] block mt-0.5 leading-snug">
                      {m.desc}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <Select
                label="Preferred Language"
                value={formData.preferredLanguage}
                onChange={(e) => updateField("preferredLanguage", e.target.value)}
                options={[
                  { value: "Hindi & English", label: "Hindi & English (Bilingual)" },
                  { value: "Hindi", label: "Hindi (हिंदी)" },
                  { value: "English", label: "English" },
                  { value: "Gujarati", label: "Gujarati (ગુજરાતી)" },
                ]}
              />

              <div>
                <label className="block text-xs font-medium text-[#182522] mb-1">
                  Gender (Used solely for traditional chart calculation):
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => updateField("gender", e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D4CCC0] rounded-sm text-[#182522]"
                >
                  <option value="Unspecified">Prefer not to say</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
          </div>
        </Card>

        {/* Step 2: Birth Details (Isolated & Confidential) */}
        <Card className="p-6 bg-white border border-[#E5DFD5] space-y-5">
          <div className="border-b border-[#E5DFD5] pb-3 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#B08D57] font-semibold block">
                Step 2 of 4
              </span>
              <h2 className="font-serif text-lg font-medium text-[#182522]">
                Birth Coordinates for Kundali Casting
              </h2>
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] text-[#173B32] font-mono bg-[#EEF3EE] px-2 py-0.5 rounded-xs">
              <Lock className="w-3 h-3" />
              Restricted to Astrologer
            </span>
          </div>

          <div className="space-y-4 text-xs">
            <p className="text-[11px] text-[#626A65] leading-relaxed">
              Classical Vedic astrology requires the precise geographic coordinates and exact minute of birth to establish your <strong>Lagna (Rising Sign)</strong> and <strong>Navamsha (D9)</strong>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Date of Birth"
                type="date"
                required
                value={formData.birthDate}
                onChange={(e) => updateField("birthDate", e.target.value)}
              />

              <Input
                label="Time of Birth (e.g. 06:45 AM or 18:45)"
                type="time"
                value={formData.birthTime}
                onChange={(e) => updateField("birthTime", e.target.value)}
                helperText="If exact minute is unknown, indicate below."
              />
            </div>

            {/* Birth Time Accuracy Selector */}
            <div>
              <label className="block text-xs font-medium text-[#182522] mb-1.5">
                Birth Time Accuracy:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                {[
                  { id: "exact", label: "Exact (Certificate)", desc: "From birth card / hospital" },
                  { id: "within_15_mins", label: "Within 15–30 Mins", desc: "Approximate family memory" },
                  { id: "approximate_1h", label: "Within 1–2 Hours", desc: "Time of day (e.g. dawn)" },
                  { id: "unknown_prashna", label: "Time Unknown", desc: "Prashna Kundali needed" },
                ].map((acc) => (
                  <label
                    key={acc.id}
                    className={`p-2.5 rounded-xs border text-left cursor-pointer transition-colors ${
                      formData.birthTimeAccuracy === acc.id
                        ? "border-[#173B32] bg-[#EEF3EE]/50 text-[#173B32]"
                        : "border-[#E5DFD5] bg-white hover:border-[#B08D57]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="birthTimeAccuracy"
                      value={acc.id}
                      checked={formData.birthTimeAccuracy === acc.id}
                      onChange={() => updateField("birthTimeAccuracy", acc.id)}
                      className="sr-only"
                    />
                    <strong className="block text-[11px] font-semibold text-[#182522]">
                      {acc.label}
                    </strong>
                    <span className="text-[10px] text-[#626A65] block mt-0.5">
                      {acc.desc}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <Input
              label="City &amp; Country of Birth"
              required
              placeholder="e.g. Jaipur, Rajasthan, India"
              value={formData.birthPlace}
              onChange={(e) => updateField("birthPlace", e.target.value)}
              helperText="Used to look up latitude, longitude, and local sunrise coordinates."
            />
          </div>
        </Card>

        {/* Step 3: Consultation Focus & Existing Gemstones */}
        <Card className="p-6 bg-white border border-[#E5DFD5] space-y-5">
          <div className="border-b border-[#E5DFD5] pb-3">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#B08D57] font-semibold block">
              Step 3 of 4
            </span>
            <h2 className="font-serif text-lg font-medium text-[#182522]">
              Areas of Life &amp; Specific Inquiries
            </h2>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-xs font-medium text-[#182522] mb-2">
                What are your primary areas of focus for this session? (Select all that apply)
              </label>
              <div className="flex flex-wrap gap-2">
                {FOCUS_AREA_OPTIONS.map((area) => {
                  const isSelected = formData.focusAreas.includes(area);
                  return (
                    <button
                      key={area}
                      type="button"
                      onClick={() => toggleFocusArea(area)}
                      className={`text-xs px-3 py-1.5 rounded-xs transition-colors cursor-pointer border ${
                        isSelected
                          ? "bg-[#173B32] text-white border-[#173B32] font-semibold"
                          : "bg-[#FAF8F5] text-[#182522] border-[#E5DFD5] hover:border-[#B08D57]"
                      }`}
                    >
                      {isSelected ? "✓ " : "+ "}
                      {area}
                    </button>
                  );
                })}
              </div>
            </div>

            <Input
              label="Are you currently wearing any gemstones? (Optional)"
              placeholder="e.g. Red Coral on right ring finger for 3 years, Pearl on little finger..."
              value={formData.currentGemstones}
              onChange={(e) => updateField("currentGemstones", e.target.value)}
              helperText="Essential to ensure no conflicting or hostile gemstone pairings are currently active."
            />

            <Textarea
              label="Specific Questions or Life Context for the Astrologer"
              rows={3}
              placeholder="Please share any specific life transition, major career decision, or question you wish the practitioner to examine in advance..."
              value={formData.specificQuestions}
              onChange={(e) => updateField("specificQuestions", e.target.value)}
            />
          </div>
        </Card>

        {/* Step 4: Contact Details & Consent */}
        <Card className="p-6 bg-white border border-[#E5DFD5] space-y-5">
          <div className="border-b border-[#E5DFD5] pb-3">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#B08D57] font-semibold block">
              Step 4 of 4
            </span>
            <h2 className="font-serif text-lg font-medium text-[#182522]">
              Your Contact Information
            </h2>
          </div>

          <div className="space-y-4 text-xs">
            <Input
              label="Your Full Name"
              required
              placeholder="e.g. Rajesh Sharma"
              value={formData.customerName}
              onChange={(e) => updateField("customerName", e.target.value)}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Preferred Contact Channel"
                value={formData.customerContactMethod}
                onChange={(e) =>
                  updateField(
                    "customerContactMethod",
                    e.target.value as "whatsapp" | "phone" | "email"
                  )
                }
                options={[
                  { value: "whatsapp", label: "WhatsApp Message" },
                  { value: "phone", label: "Direct Phone Call" },
                  { value: "email", label: "Email" },
                ]}
              />

              <Input
                label="Phone Number or Email"
                required
                placeholder={
                  formData.customerContactMethod === "email"
                    ? "name@example.com"
                    : "+91 98765 43210"
                }
                value={formData.customerContactValue}
                onChange={(e) => updateField("customerContactValue", e.target.value)}
              />
            </div>

            {/* Privacy Checkbox */}
            <div className="p-4 bg-[#FAF8F5] border border-[#E5DFD5] rounded-xs space-y-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.privacyAcknowledged}
                  onChange={(e) => updateField("privacyAcknowledged", e.target.checked)}
                  className="mt-0.5 rounded-xs text-[#173B32] focus:ring-[#173B32]"
                />
                <span className="text-[11px] text-[#626A65] leading-relaxed">
                  I consent to sharing my birth coordinates with the studio elder solely for the purpose of casting my Janma Kundali and conducting this astrological consultation. I understand that my details are kept confidential, will never be sold or shared, and that submitting this request does not obligate me to purchase any gemstone.
                </span>
              </label>
            </div>
          </div>
        </Card>

        {/* Submit Button */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSubmitting}
            className="w-full text-xs uppercase tracking-widest font-semibold py-3.5"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Submit Appointment Request to Studio Diary &rarr;
          </Button>
          <span className="block text-center text-[11px] text-[#626A65] mt-2">
            No advance online payment required. Staff will confirm your slot via {formData.customerContactMethod}.
          </span>
        </div>
      </form>
    </div>
  );
}

export default function ConsultationRequestPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F4ED]">
      <Header />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full">
        <Suspense fallback={<div className="text-center py-12 text-xs text-[#626A65]">Loading consultation booking form...</div>}>
          <ConsultationRequestForm />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
