"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import { submitGemstoneSourcingRequest } from "@/app/gemstones/actions";
import { CheckCircle2, AlertCircle } from "lucide-react";

export function GemstoneSourcingDialog({
  isOpen,
  onClose,
  initialGemstone = "Blue Sapphire (Neelam)",
}: {
  isOpen: boolean;
  onClose: () => void;
  initialGemstone?: string;
}) {
  const [gemstoneType, setGemstoneType] = useState(initialGemstone);
  const [budgetRange, setBudgetRange] = useState("₹25,000 – ₹75,000");
  const purpose = "astrological_ratna";
  const [weightCaratsPreferred, setWeightCaratsPreferred] = useState("");
  const [treatmentPreference, setTreatmentPreference] = useState("natural_untreated_only");
  const [customerName, setCustomerName] = useState("");
  const [customerContactMethod, setCustomerContactMethod] = useState<"whatsapp" | "phone" | "email">("whatsapp");
  const [customerContactValue, setCustomerContactValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await submitGemstoneSourcingRequest({
        gemstoneType,
        budgetRange,
        purpose,
        weightCaratsPreferred: weightCaratsPreferred || undefined,
        treatmentPreference,
        labReportRequired: true,
        customerName,
        customerContactMethod,
        customerContactValue,
      });

      if (res.success && res.referenceCode) {
        setSubmittedRef(res.referenceCode);
      } else {
        setErrorMsg(res.message || "Could not submit sourcing request.");
      }
    } catch {
      setErrorMsg("Network error. Please try again or reach out directly to our shop.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setSubmittedRef(null);
    setErrorMsg(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleResetAndClose} title="Request Gemstone Sourcing" maxWidth="md">
      {submittedRef ? (
        <div className="text-center py-6 space-y-4">
          <div className="mx-auto w-12 h-12 rounded-full bg-[#EEF3EE] flex items-center justify-center text-[#173B32]">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="font-serif text-lg font-medium text-[#182522]">
            Sourcing Request Received
          </h4>
          <p className="text-xs text-[#626A65] max-w-sm mx-auto leading-relaxed">
            Thank you, {customerName}. Our family will check our stock and trusted mine sources to find genuine, certified gemstones for you.
          </p>
          <div className="p-3 bg-[#F7F4ED] border border-[#E5DFD5] rounded-xs font-mono text-sm font-bold text-[#173B32] inline-block">
            Reference: {submittedRef}
          </div>
          <div className="pt-2">
            <Button variant="primary" size="sm" onClick={handleResetAndClose}>
              Done
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {errorMsg && (
            <div className="p-3 bg-[#FFF0F0] border border-[#FFD0D0] text-[#A61C1C] flex items-center gap-2 rounded-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Select
              label="Gemstone Type"
              value={gemstoneType}
              onChange={(e) => setGemstoneType(e.target.value)}
              options={[
                { value: "Blue Sapphire (Neelam)", label: "Blue Sapphire (Neelam)" },
                { value: "Yellow Sapphire (Pukhraj)", label: "Yellow Sapphire (Pukhraj)" },
                { value: "Natural Emerald (Panna)", label: "Natural Emerald (Panna)" },
                { value: "Natural Ruby (Manik)", label: "Natural Ruby (Manik)" },
                { value: "Natural Pearl (Basra/South Sea)", label: "Natural Pearl (Moti)" },
                { value: "Red Coral (Moonga)", label: "Red Coral (Moonga)" },
                { value: "Hessonite (Gomed)", label: "Hessonite (Gomed)" },
                { value: "Cat's Eye (Lehsunia)", label: "Cat's Eye (Lehsunia)" },
                { value: "Other Rare Gemstone", label: "Other Natural Gemstone" },
              ]}
            />

            <Select
              label="Comfort Budget Range"
              value={budgetRange}
              onChange={(e) => setBudgetRange(e.target.value)}
              options={[
                { value: "under_25k", label: "Under ₹25,000" },
                { value: "25k_to_75k", label: "₹25,000 – ₹75,000" },
                { value: "75k_to_2lakh", label: "₹75,000 – ₹2,00,000" },
                { value: "above_2lakh", label: "Above ₹2,00,000 (Fine Collector)" },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Approximate Carat Weight (Optional)"
              placeholder="e.g. 3.5 to 5.0 Carats"
              value={weightCaratsPreferred}
              onChange={(e) => setWeightCaratsPreferred(e.target.value)}
            />

            <Select
              label="Treatment Standard"
              value={treatmentPreference}
              onChange={(e) => setTreatmentPreference(e.target.value)}
              options={[
                { value: "natural_untreated_only", label: "Natural Completely Untreated Only" },
                { value: "standard_traditional_heat_acceptable", label: "Standard Traditional Heating Acceptable" },
                { value: "need_guidance", label: "Need Gemologist Advice" },
              ]}
            />
          </div>

          <Input
            label="Your Name"
            required
            placeholder="e.g. Vikram Malhotra"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Select
              label="Contact Channel"
              value={customerContactMethod}
              onChange={(e) => setCustomerContactMethod(e.target.value as "whatsapp" | "phone" | "email")}
              options={[
                { value: "whatsapp", label: "WhatsApp Message" },
                { value: "phone", label: "Phone Call" },
                { value: "email", label: "Email" },
              ]}
            />

            <Input
              label="Contact Details"
              required
              placeholder="e.g. +91 98765 43210"
              value={customerContactValue}
              onChange={(e) => setCustomerContactValue(e.target.value)}
            />
          </div>

          <div className="p-3 bg-[#EEF3EE] border border-[#C5D5C4] rounded-xs text-[11px] text-[#173B32]">
            <strong>Notice:</strong> Rare untreated natural gemstones take time to source properly. Every stone we source comes with a genuine laboratory test certificate and can be inspected in person at our shop before purchase.
          </div>

          <div className="pt-2 border-t border-[#E5DFD5] flex items-center justify-end gap-2">
            <Button type="button" variant="ghost" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md" isLoading={isSubmitting} className="uppercase tracking-wider text-xs">
              Submit Sourcing Request
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
