"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { submitProductEnquiry } from "@/app/jewellery/actions";
import { CheckCircle2, AlertCircle } from "lucide-react";

export interface ProductEnquiryDialogProps {
  productId: string;
  productName: string;
  productSku: string;
  isOpen: boolean;
  onClose: () => void;
  defaultEnquiryType?: "quote_request" | "availability_check" | "showroom_viewing";
}

export function ProductEnquiryDialog({
  productId,
  productName,
  productSku,
  isOpen,
  onClose,
  defaultEnquiryType = "quote_request",
}: ProductEnquiryDialogProps) {
  const [enquiryType, setEnquiryType] = useState(defaultEnquiryType);
  const [customerName, setCustomerName] = useState("");
  const [customerContactMethod, setCustomerContactMethod] = useState<"whatsapp" | "phone" | "email">("whatsapp");
  const [customerContactValue, setCustomerContactValue] = useState("");
  const [preferredViewingDate, setPreferredViewingDate] = useState("");
  const [message, setMessage] = useState(`Inquiring about ${productName} (${productSku}). Please share current pricing and availability details.`);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await submitProductEnquiry({
        productId,
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
        setErrorMsg(res.message || "Could not submit enquiry.");
      }
    } catch {
      setErrorMsg("Network error. Please try again or contact our shop directly.");
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
    <Modal isOpen={isOpen} onClose={handleResetAndClose} title={`Enquire: ${productName}`} maxWidth="md">
      {submittedRef ? (
        <div className="text-center py-6 space-y-5 text-[#faf7f0]">
          <div className="mx-auto w-16 h-16 rounded-full bg-[#10b981]/15 border border-[#10b981]/50 flex items-center justify-center text-[#10b981] shadow-[0_0_30px_rgba(16,185,129,0.3)]">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <h4 className="font-serif text-2xl font-normal text-white">
            Enquiry Received by Master Karigar
          </h4>
          <p className="text-xs sm:text-sm text-[#a8b6af] max-w-sm mx-auto leading-relaxed font-light">
            Our Varanasi team has logged your enquiry. We will check physical hallmark inventory and reach out via {customerContactMethod}.
          </p>
          <div className="p-3.5 bg-[#04170f] border border-[#d4af37]/40 rounded-xl font-mono text-sm font-bold text-[#f1d98a] inline-block shadow-inner">
            Reference Code: {submittedRef}
          </div>
          <div className="pt-4">
            <button
              type="button"
              onClick={handleResetAndClose}
              className="bg-gold-gradient text-[#04170f] px-6 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider font-bold shadow-md hover:brightness-105 transition-all cursor-pointer"
            >
              Close Window
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-[#faf7f0]">
          {errorMsg && (
            <div className="p-3 bg-[#8e1b2e]/30 border border-[#8e1b2e]/60 text-xs text-[#f6e7b4] flex items-center gap-2 rounded-xl">
              <AlertCircle className="w-4 h-4 shrink-0 text-[#ff8888]" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="text-xs text-[#a8b6af] bg-[#04170f] p-3.5 rounded-xl border border-white/10 font-mono flex items-center justify-between">
            <span>Piece: <strong className="text-white font-serif text-sm">{productName}</strong></span>
            <span className="text-[#d4af37]">SKU: {productSku}</span>
          </div>

          <Select
            label="Enquiry Nature"
            value={enquiryType}
            onChange={(e) => setEnquiryType(e.target.value as "quote_request" | "availability_check" | "showroom_viewing")}
            options={[
              { value: "quote_request", label: "Request Current Bullion Valuation & Quote" },
              { value: "availability_check", label: "Check In-Store Availability in Varanasi" },
              { value: "showroom_viewing", label: "Book Personal Viewing Appointment" },
              { value: "general_question", label: "Ask Karigar / Gemstone Question" },
            ]}
          />

          <Input
            label="Your Full Name"
            required
            placeholder="e.g. Ananya Patel"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Select
              label="Contact Preference"
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
              label="Preferred Viewing Date"
              type="date"
              value={preferredViewingDate}
              onChange={(e) => setPreferredViewingDate(e.target.value)}
              helperText="Our shop is open Mon-Sat 11 AM - 8 PM"
            />
          )}

          <Textarea
            label="Enquiry Details / Custom Notes"
            required
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-mono uppercase tracking-wider text-[#a8b6af] hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-gold-gradient text-[#04170f] px-6 py-2.5 rounded-xl text-xs font-mono uppercase tracking-widest font-bold shadow-lg hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer gold-shimmer-sweep disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Send Studio Enquiry"}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
