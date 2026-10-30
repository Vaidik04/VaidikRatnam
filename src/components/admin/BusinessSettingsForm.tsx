"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { updateBusinessSettingsAction } from "@/app/admin/settings/actions";
import { Save, CheckCircle2, AlertCircle } from "lucide-react";

export function BusinessSettingsForm({ initialSettings }: { initialSettings: Record<string, string> }) {
  const [settings, setSettings] = useState(initialSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const updateKey = (key: string, val: string) => {
    setSettings((prev) => ({ ...prev, [key]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);
    setErrorMessage(null);

    const res = await updateBusinessSettingsAction(settings);
    if (res.success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } else {
      setErrorMessage(res.message || "Failed to update settings.");
    }
    setIsSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row items-baseline justify-between gap-4 border-b border-[#E5DFD5] pb-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#B08D57] font-semibold block">
            Studio Profile &amp; Policies
          </span>
          <h1 className="font-serif text-2xl text-[#182522] font-normal">
            Business Settings
          </h1>
          <p className="text-xs text-[#626A65] mt-0.5">
            Configure verified family shop facts, telephone numbers, and practitioner profile.
          </p>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isSaving}
          className="text-xs uppercase tracking-wider font-semibold"
        >
          <Save className="w-3.5 h-3.5 mr-1.5" />
          Save Settings
        </Button>
      </div>

      {saveSuccess && (
        <div className="p-3.5 bg-[#EEF3EE] border border-[#C5D5C4] text-xs text-[#173B32] flex items-center gap-2 rounded-xs">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Business settings updated successfully and reflected across the public website!</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-3.5 bg-[#FFF0F0] border border-[#FFD0D0] text-xs text-[#A61C1C] flex items-center gap-2 rounded-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* 1. Public Brand Identity */}
      <Card className="p-6 bg-white space-y-4">
        <h2 className="font-serif text-base text-[#182522] font-medium border-b border-[#E5DFD5] pb-2">
          1. Brand Identity
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Brand Name"
            value={settings["business_name"] || ""}
            onChange={(e) => updateKey("business_name", e.target.value)}
          />
          <Input
            label="Brand Tagline"
            placeholder="e.g. Timeless Jewellery • Guided by Wisdom"
            value={settings["tagline"] || ""}
            onChange={(e) => updateKey("tagline", e.target.value)}
          />
        </div>
      </Card>

      {/* 2. Shop Location & Contact */}
      <Card className="p-6 bg-white space-y-4">
        <h2 className="font-serif text-base text-[#182522] font-medium border-b border-[#E5DFD5] pb-2">
          2. Shop Contact &amp; Hours
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Shop Phone Display"
            placeholder="e.g. +91 98765 43210"
            value={settings["phone_display"] || ""}
            onChange={(e) => updateKey("phone_display", e.target.value)}
          />
          <Input
            label="Official Contact Email"
            type="email"
            placeholder="shop@vaidikratnam.com"
            value={settings["email_contact"] || ""}
            onChange={(e) => updateKey("email_contact", e.target.value)}
          />
        </div>

        <Input
          label="Physical Shop Address"
          placeholder="e.g. 42, Johari Bazar, Jaipur, Rajasthan 302003"
          value={settings["showroom_address"] || ""}
          onChange={(e) => updateKey("showroom_address", e.target.value)}
        />

        <Input
          label="Operating Hours"
          placeholder="e.g. Mon - Sat: 11:00 AM - 8:00 PM | Sun: By Appointment"
          value={settings["showroom_hours"] || ""}
          onChange={(e) => updateKey("showroom_hours", e.target.value)}
        />
      </Card>

      {/* 3. Astrologer / Father Profile */}
      <Card className="p-6 bg-white space-y-4">
        <h2 className="font-serif text-base text-[#182522] font-medium border-b border-[#E5DFD5] pb-2">
          3. Astrology Practitioner (Father&apos;s Verified Profile)
        </h2>

        <Input
          label="Practitioner Full Name"
          placeholder="e.g. Pandit Ji / Father's Name"
          value={settings["father_consultant_name"] || ""}
          onChange={(e) => updateKey("father_consultant_name", e.target.value)}
        />

        <Textarea
          label="Verified Biography / Method"
          rows={3}
          placeholder="Traditional background, Vedic study, and consultation approach..."
          value={settings["father_consultant_bio"] || ""}
          onChange={(e) => updateKey("father_consultant_bio", e.target.value)}
        />
      </Card>

      {/* 4. Bullion Estimator Defaults */}
      <Card className="p-6 bg-white space-y-4">
        <h2 className="font-serif text-base text-[#182522] font-medium border-b border-[#E5DFD5] pb-2">
          4. Indicative Bullion Estimator References
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Indicative 24K Rate Reference (₹ per 10g)"
            type="number"
            value={settings["gold_indicative_rate_24k"] || "78500"}
            onChange={(e) => updateKey("gold_indicative_rate_24k", e.target.value)}
          />
          <Input
            label="Indicative 22K Rate Reference (₹ per 10g)"
            type="number"
            value={settings["gold_indicative_rate_22k"] || "72000"}
            onChange={(e) => updateKey("gold_indicative_rate_22k", e.target.value)}
          />
        </div>
      </Card>
    </form>
  );
}

