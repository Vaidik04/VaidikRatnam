"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { submitProductEnquiry } from "@/app/jewellery/actions";
import { CheckCircle2, AlertCircle } from "lucide-react";

export function ContactForm() {
  const [enquiryType, setEnquiryType] = useState<"showroom_viewing" | "quote_request" | "general_question">("showroom_viewing");
  const [customerName, setCustomerName] = useState("");
  const [customerContactMethod, setCustomerContactMethod] = useState<"whatsapp" | "phone" | "email">("whatsapp");
  const [customerContactValue, setCustomerContactValue] = useState("");
  const [preferredViewingDate, setPreferredViewingDate] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await submitProductEnquiry({
        enquiryType,
        customerName,
        customerContactMethod,
        customerContactValue,
        preferredViewingDate: preferredViewingDate || undefined,
        message,
      });

      if (res.success && res.referenceCode) {
        setSubmittedRef(res.referenceCode);
      } else {
        setErrorMsg(res.message || "Failed to submit enquiry.");
      }
    } catch {
      setErrorMsg("Network error. Please try again or call our shop directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submittedRef) {
    return (
      <div className="text-center py-8 space-y-4">
        <div className="mx-auto w-12 h-12 rounded-full bg-[#10b981]/20 border border-[#10b981]/40 flex items-center justify-center text-[#10b981]">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="font-serif text-2xl font-normal text-white">
          Inquiry Successfully Sent
        </h3>
        <p className="text-xs text-[#a8b6af] max-w-sm mx-auto leading-relaxed">
          Thank you, {customerName}. Our family shop has received your message and will reach out via {customerContactMethod}.
        </p>
        <div className="p-3 bg-[#04170f] border border-[#d4af37]/40 rounded-xl font-mono text-sm font-bold text-[#f1d98a] inline-block shadow-md">
          Reference: {submittedRef}
        </div>
        <div className="pt-2">
          <Button variant="primary" size="sm" onClick={() => setSubmittedRef(null)}>
            Send Another Inquiry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMsg && (
        <div className="caution-ruby-glass flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 text-[#f6e7b4]" />
          <span>{errorMsg}</span>
        </div>
      )}

      <Select
        label="Purpose of Inquiry"
        value={enquiryType}
        onChange={(e) => setEnquiryType(e.target.value as "showroom_viewing" | "quote_request" | "general_question")}
        options={[
          { value: "showroom_viewing", label: "Plan a Shop Visit & Try Jewellery" },
          { value: "quote_request", label: "Request a Gold Jewellery Quote" },
          { value: "general_question", label: "General Question / Family Shop Inquiry" },
        ]}
      />

      <Input
        label="Your Full Name"
        required
        placeholder="e.g. Meera Joshi"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Select
          label="Preferred Contact Channel"
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

      {enquiryType === "showroom_viewing" && (
        <Input
          label="Preferred Shop Visit Date"
          type="date"
          value={preferredViewingDate}
          onChange={(e) => setPreferredViewingDate(e.target.value)}
        />
      )}

      <Textarea
        label="Your Message / Specific Requirements"
        required
        rows={4}
        placeholder="Please mention any designs you wish to inspect, gold purity preferences, or visit timing..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isSubmitting}
          className="w-full text-xs uppercase tracking-wider font-semibold"
        >
          Send Inquiry to Our Shop
        </Button>
      </div>
    </form>
  );
}

