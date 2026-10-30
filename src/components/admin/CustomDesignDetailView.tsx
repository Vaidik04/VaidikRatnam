"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CustomDesignRequest } from "@/lib/db/repo";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Select, Textarea } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { updateCustomDesignAdminAction } from "@/app/admin/custom-designs/actions";
import { ArrowLeft, Save, ShieldAlert, CheckCircle2 } from "lucide-react";

export function CustomDesignDetailView({ brief }: { brief: CustomDesignRequest }) {
  const router = useRouter();
  const [status, setStatus] = useState(brief.status);
  const [privateNotes, setPrivateNotes] = useState(brief.private_notes || "");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    const res = await updateCustomDesignAdminAction(brief.id, status, privateNotes);
    if (res.success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
      router.refresh();
    } else {
      alert(res.message || "Failed to update brief.");
    }
    setIsSaving(false);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-baseline justify-between gap-4 border-b border-[#E5DFD5] pb-4">
        <div>
          <Link
            href="/admin/custom-designs"
            className="inline-flex items-center gap-1 text-xs text-[#626A65] hover:text-[#182522] mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Briefs</span>
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="font-serif text-2xl text-[#182522] font-normal">
              Brief {brief.reference_code}
            </h1>
            <Badge variant="purity">{brief.piece_type}</Badge>
          </div>
          <p className="text-xs text-[#626A65] mt-0.5">
            Submitted on {new Date(brief.created_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
          </p>
        </div>

        <Link href={`/admin/quotes/new?customDesignId=${brief.id}&customerName=${encodeURIComponent(brief.customer_name)}&customerContact=${encodeURIComponent(brief.customer_contact_value)}`}>
          <Button variant="gold" size="sm" className="text-xs uppercase tracking-wider font-semibold">
            Draft Quote from Brief &rarr;
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Client Specifications (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Brief Content Card */}
          <Card className="p-6 bg-white space-y-4">
            <h2 className="font-serif text-base text-[#182522] font-medium border-b border-[#E5DFD5] pb-2">
              Client Design Brief
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[#626A65] block">Intended Wearer:</span>
                <strong className="text-[#182522]">{brief.intended_wearer || "Not specified"}</strong>
              </div>
              <div>
                <span className="text-[#626A65] block">Occasion:</span>
                <strong className="text-[#182522]">{brief.occasion || "Not specified"}</strong>
              </div>
            </div>

            <div className="pt-2 border-t border-[#F0ECE2] text-xs">
              <span className="text-[#626A65] block mb-1">Design Vision &amp; Style Notes:</span>
              <p className="text-[#182522] leading-relaxed bg-[#F7F4ED] p-3.5 rounded-xs border border-[#E5DFD5]">
                {brief.style_notes}
              </p>
            </div>

            {brief.must_have_details && (
              <div className="text-xs">
                <span className="text-[#626A65] block mb-1">Must-Have Details / References:</span>
                <p className="text-[#182522] bg-[#F7F4ED] p-3 rounded-xs border border-[#E5DFD5]">
                  {brief.must_have_details}
                </p>
              </div>
            )}

            {brief.exclusions && (
              <div className="text-xs">
                <span className="text-[#626A65] block mb-1">Exclusions / Dislikes:</span>
                <p className="text-[#182522] bg-[#FFF0F0] p-3 rounded-xs border border-[#FFD0D0]">
                  {brief.exclusions}
                </p>
              </div>
            )}
          </Card>

          {/* Materials & Preferences */}
          <Card className="p-6 bg-white space-y-3">
            <h2 className="font-serif text-base text-[#182522] font-medium border-b border-[#E5DFD5] pb-2">
              Materials, Sizing &amp; Astrological Guidance
            </h2>

            <div className="grid grid-cols-2 gap-y-3 text-xs">
              <span className="text-[#626A65]">Preferred Precious Metal:</span>
              <span className="font-medium text-[#182522]">{brief.preferred_metal || "Undecided"}</span>

              <span className="text-[#626A65]">Preferred Gemstone / Diamond:</span>
              <span className="font-medium text-[#182522]">{brief.preferred_gemstone || "Plain gold / None"}</span>

              <span className="text-[#626A65]">Ring / Wrist Size:</span>
              <span className="text-[#182522]">{brief.ring_or_wrist_size || "Measure at studio"}</span>

              <span className="text-[#626A65]">Budget Comfort Range:</span>
              <span className="font-semibold text-[#182522]">{brief.budget_range.replace(/_/g, " ")}</span>

              <span className="text-[#626A65]">Astrology Consultation:</span>
              <span className="font-medium text-[#182522]">
                {brief.need_astrology_consultation ? "Yes, requested with father" : "No, jewellery only"}
              </span>

              <span className="text-[#626A65]">Target Date:</span>
              <span className="text-[#182522]">{brief.target_date || "Flexible / Not specified"}</span>
            </div>
          </Card>

          {/* Contact Details */}
          <Card className="p-6 bg-white space-y-3">
            <h2 className="font-serif text-base text-[#182522] font-medium border-b border-[#E5DFD5] pb-2">
              Customer Contact Profile
            </h2>

            <div className="grid grid-cols-2 gap-y-2 text-xs">
              <span className="text-[#626A65]">Name:</span>
              <span className="font-semibold text-[#182522]">{brief.customer_name}</span>

              <span className="text-[#626A65]">Preferred Channel:</span>
              <span className="capitalize font-medium text-[#182522]">{brief.customer_contact_method}</span>

              <span className="text-[#626A65]">Contact Detail:</span>
              <span className="font-mono text-[#182522] font-medium">{brief.customer_contact_value}</span>

              <span className="text-[#626A65]">Preferred Contact Time:</span>
              <span className="text-[#182522]">{brief.preferred_contact_time || "Any reasonable hour"}</span>

              <span className="text-[#626A65]">City / Location:</span>
              <span className="text-[#182522]">{brief.city || "Not specified"}</span>
            </div>
          </Card>
        </div>

        {/* Right: Pipeline Management & Private Notes (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <form onSubmit={handleSave} className="space-y-6">
            {/* Status Management */}
            <Card className="p-6 bg-white space-y-4">
              <h2 className="font-serif text-base text-[#182522] font-medium border-b border-[#E5DFD5] pb-2">
                Pipeline Status
              </h2>

              <Select
                label="Current Stage"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                options={[
                  { value: "new", label: "New (Unread)" },
                  { value: "reviewing", label: "Reviewing (Artisan Feasibility)" },
                  { value: "needs_information", label: "Needs Client Clarification" },
                  { value: "consultation_requested", label: "Consultation Requested" },
                  { value: "quote_draft", label: "Quote Draft in Progress" },
                  { value: "quote_sent", label: "Quote Sent to Client" },
                  { value: "customer_review", label: "Customer Reviewing Quote" },
                  { value: "approved", label: "Approved by Customer" },
                  { value: "in_progress_manual", label: "In Goldsmithing Production" },
                  { value: "ready_for_viewing", label: "Ready for Shop Inspection / Pickup" },
                  { value: "completed", label: "Completed & Collected" },
                  { value: "declined", label: "Declined" },
                  { value: "closed", label: "Closed" },
                ]}
              />

              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isSaving}
                className="w-full text-xs uppercase tracking-wider font-semibold"
              >
                <Save className="w-3.5 h-3.5 mr-1.5" />
                Update Brief Status
              </Button>

              {saveSuccess && (
                <div className="p-2.5 bg-[#EEF3EE] border border-[#C5D5C4] rounded-xs text-[11px] text-[#173B32] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Brief updated successfully!</span>
                </div>
              )}
            </Card>

            {/* Internal Private Notes */}
            <Card className="p-6 bg-white space-y-4">
              <div className="flex items-center justify-between border-b border-[#E5DFD5] pb-2">
                <h2 className="font-serif text-base text-[#182522] font-medium">
                  Private Studio Notes
                </h2>
                <ShieldAlert className="w-3.5 h-3.5 text-[#A61C1C]" />
              </div>

              <Textarea
                rows={5}
                placeholder="Internal notes on metal alloy calculations, karigar assignments, stone quotes..."
                value={privateNotes}
                onChange={(e) => setPrivateNotes(e.target.value)}
                helperText="Never shown on public customer confirmation page."
              />

              <Button
                type="submit"
                variant="outline"
                size="sm"
                isLoading={isSaving}
                className="w-full text-xs uppercase tracking-wider"
              >
                Save Private Notes
              </Button>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
}
