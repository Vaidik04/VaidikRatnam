"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
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
        <div className="text-center py-6 space-y-4">
          <div className="mx-auto w-12 h-12 rounded-full bg-[#EEF3EE] flex items-center justify-center text-[#173B32]">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="font-serif text-lg font-medium text-[#182522]">
            Enquiry Successfully Submitted
          </h4>
          <p className="text-xs text-[#626A65] max-w-sm mx-auto leading-relaxed">
            Our shop team has received your enquiry. We will check physical stock and reach out via {customerContactMethod}.
          </p>
          <div className="p-3 bg-[#F7F4ED] border border-[#E5DFD5] rounded-xs font-mono text-sm font-bold text-[#173B32] inline-block">
            Reference: {submittedRef}
          </div>
          <div className="pt-3">
            <Button variant="primary" size="sm" onClick={handleResetAndClose}>
              Close Window
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMsg && (
            <div className="p-3 bg-[#FFF0F0] border border-[#FFD0D0] text-xs text-[#A61C1C] flex items-center gap-2 rounded-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="text-xs text-[#626A65] bg-[#F7F4ED] p-3 rounded-xs border border-[#E5DFD5]">
            Item: <strong className="text-[#182522]">{productName}</strong> | SKU: <strong className="font-mono text-[#182522]">{productSku}</strong>
          </div>

          <Select
            label="Request Type"
            value={enquiryType}
            onChange={(e) => setEnquiryType(e.target.value as "quote_request" | "availability_check" | "showroom_viewing")}
            options={[
              { value: "quote_request", label: "Request Current Price Quote" },
              { value: "availability_check", label: "Check If In Stock at Shop" },
              { value: "showroom_viewing", label: "Visit Shop to Try & Inspect" },
              { value: "general_question", label: "Ask a General Question" },
            ]}
          />

          <Input
            label="Your Name"
            required
            placeholder="e.g. Ananya Patel"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Select
              label="Preferred Contact Method"
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
            label="Message / Questions"
            required
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <div className="pt-2 border-t border-[#E5DFD5] flex items-center justify-end gap-2">
            <Button type="button" variant="ghost" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md" isLoading={isSubmitting} className="uppercase tracking-wider text-xs">
              Send Shop Enquiry
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}

