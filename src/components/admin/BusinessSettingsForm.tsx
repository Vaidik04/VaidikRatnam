"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { updateBusinessSettingsAction, fetchAndSyncBullionRatesAction } from "@/app/admin/settings/actions";
import { Save, CheckCircle2, AlertCircle, RefreshCw, Zap, Clock, ShieldCheck } from "lucide-react";

export function BusinessSettingsForm({ initialSettings }: { initialSettings: Record<string, string> }) {
  const [settings, setSettings] = useState(initialSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Bullion API sync state
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  const updateKey = (key: string, val: string) => {
    setSettings((prev) => ({ ...prev, [key]: val }));
  };

  const handleSyncBullionRates = async () => {
    setIsSyncing(true);
    setSyncStatus(null);
    try {
      const spread = Number(settings["gold_city_spread_per_gram"] || 0);
      const res = await fetchAndSyncBullionRatesAction(spread);
      if (res.success && res.rates) {
        setSettings((prev) => ({
          ...prev,
          gold_indicative_rate_24k: res.rates!.gold24kPer10g.toString(),
          gold_indicative_rate_22k: res.rates!.gold22kPer10g.toString(),
          gold_rate_24k_per_gram: res.rates!.gold24kPerGram.toString(),
          gold_rate_22k_per_gram: res.rates!.gold22kPerGram.toString(),
          gold_rate_18k_per_gram: res.rates!.gold18kPerGram.toString(),
          gold_rate_14k_per_gram: res.rates!.gold14kPerGram.toString(),
          silver_rate_per_gram: res.rates!.silverPerGram.toString(),
          rates_last_synced_at: res.timestamp || new Date().toISOString(),
          rates_source: res.source || "Live Market Feed",
        }));
        setSyncStatus({
          success: true,
          message: `Successfully fetched live market rates! (24K: ₹${res.rates.gold24kPerGram}/g • 22K: ₹${res.rates.gold22kPerGram}/g • Silver: ₹${res.rates.silverPerGram}/g)`,
        });
        setTimeout(() => setSyncStatus(null), 6000);
      } else {
        setSyncStatus({ success: false, message: res.message || "Failed to fetch market rates." });
      }
    } catch {
      setSyncStatus({ success: false, message: "Network error while calling bullion API." });
    } finally {
      setIsSyncing(false);
    }
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
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl text-[#faf7f0]">
      <div className="flex flex-col sm:flex-row items-baseline justify-between gap-4 border-b border-[#d4af37]/25 pb-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold block">
            Studio Profile &amp; Policies
          </span>
          <h1 className="font-serif text-2xl text-white font-normal">
            Business Settings
          </h1>
          <p className="text-xs text-[#a8b6af] mt-0.5">
            Configure verified family shop facts, telephone numbers, and practitioner profile.
          </p>
        </div>

        <Button
          type="submit"
          variant="gold"
          size="md"
          isLoading={isSaving}
          className="text-xs uppercase tracking-wider font-semibold"
        >
          <Save className="w-3.5 h-3.5 mr-1.5" />
          Save Settings
        </Button>
      </div>

      {saveSuccess && (
        <div className="p-3.5 bg-[#0f3a28] border border-[#10b981]/50 text-xs text-[#a7f3d0] flex items-center gap-2 rounded-xl shadow-lg">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-[#34d399]" />
          <span>Business settings updated successfully and reflected across the public website!</span>
        </div>
      )}

      {errorMessage && (
        <div className="caution-ruby-glass p-3.5 text-xs text-[#fca5a5] flex items-center gap-2 rounded-xl">
          <AlertCircle className="w-4 h-4 shrink-0 text-[#f87171]" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* 1. Public Brand Identity */}
      <Card className="p-6 bg-[#0a2a1d] border border-[#d4af37]/30 rounded-2xl space-y-4">
        <h2 className="font-serif text-base text-[#f1d98a] font-medium border-b border-white/10 pb-2">
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

      {/* 2. Shop Location, Contact & Payments */}
      <Card className="p-6 bg-[#0a2a1d] border border-[#d4af37]/30 rounded-2xl space-y-4">
        <h2 className="font-serif text-base text-[#f1d98a] font-medium border-b border-white/10 pb-2">
          2. Shop Contact, Hours &amp; Payments
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Shop Phone Display"
            placeholder="e.g. +91 98765 43210"
            value={settings["phone_display"] || ""}
            onChange={(e) => updateKey("phone_display", e.target.value)}
          />
          <Input
            label="WhatsApp Business Phone (Digits only)"
            placeholder="e.g. 919876543210"
            value={settings["whatsapp_phone"] || ""}
            onChange={(e) => updateKey("whatsapp_phone", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Official Contact Email"
            type="email"
            placeholder="shop@vaidikratnam.com"
            value={settings["email_contact"] || ""}
            onChange={(e) => updateKey("email_contact", e.target.value)}
          />
          <Input
            label="Shop UPI ID (for advance bookings)"
            placeholder="e.g. vaidikratnam@upi"
            value={settings["shop_upi_id"] || ""}
            onChange={(e) => updateKey("shop_upi_id", e.target.value)}
          />
        </div>

        <Input
          label="Physical Shop Address"
          placeholder="e.g. 42, Johari Bazar, Jaipur, Rajasthan 302003"
          value={settings["shop_address"] || settings["showroom_address"] || ""}
          onChange={(e) => {
            updateKey("shop_address", e.target.value);
            updateKey("showroom_address", e.target.value);
          }}
        />

        <Input
          label="Operating Hours"
          placeholder="e.g. Mon - Sat: 10:30 AM - 8:30 PM | Sun: 11:00 AM - 6:00 PM"
          value={settings["shop_hours"] || settings["showroom_hours"] || ""}
          onChange={(e) => {
            updateKey("shop_hours", e.target.value);
            updateKey("showroom_hours", e.target.value);
          }}
        />
      </Card>

      {/* 3. Astrologer / Father Profile */}
      <Card className="p-6 bg-[#0a2a1d] border border-[#d4af37]/30 rounded-2xl space-y-4">
        <h2 className="font-serif text-base text-[#f1d98a] font-medium border-b border-white/10 pb-2">
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

      {/* 4. Live Bullion Rates & Market API Synchronization */}
      <Card className="p-6 bg-[#0a2a1d] border border-[#d4af37]/40 rounded-2xl space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#d4af37]" />
              <h2 className="font-serif text-base text-[#f1d98a] font-medium">
                4. Live Bullion Rates &amp; Market API Sync
              </h2>
            </div>
            <p className="text-xs text-[#a8b6af] mt-0.5">
              Live market rates power your website&apos;s top marquee ticker, gold budget calculator, and indicative product quotes.
            </p>
          </div>

          <Button
            type="button"
            variant="gold"
            size="sm"
            onClick={handleSyncBullionRates}
            isLoading={isSyncing}
            className="uppercase tracking-wider text-xs whitespace-nowrap shadow-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${isSyncing ? "animate-spin" : ""}`} />
            Sync Market Rates via API
          </Button>
        </div>

        {/* Sync feedback notification */}
        {syncStatus && (
          <div
            className={`p-3.5 rounded-xl text-xs flex items-center gap-2 ${
              syncStatus.success
                ? "bg-[#0f3a28] border border-[#10b981]/50 text-[#a7f3d0]"
                : "caution-ruby-glass text-[#fca5a5]"
            }`}
          >
            {syncStatus.success ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-[#34d399]" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0 text-[#f87171]" />
            )}
            <span>{syncStatus.message}</span>
          </div>
        )}

        {/* Live Active Rates Display Board */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-4 bg-[#04170f] rounded-xl border border-[#d4af37]/30">
          <div className="p-3 bg-[#0a2a1d] rounded-lg border border-white/10 space-y-1">
            <span className="text-[10px] font-mono uppercase text-[#a8b6af] block">24K Pure Gold</span>
            <strong className="font-serif text-lg text-white block">
              ₹{Number(settings["gold_rate_24k_per_gram"] || Math.round(Number(settings["gold_indicative_rate_24k"] || 81500) / 10)).toLocaleString("en-IN")}/g
            </strong>
            <span className="text-[10px] text-[#a8b6af] block">
              ₹{(Number(settings["gold_rate_24k_per_gram"] || Math.round(Number(settings["gold_indicative_rate_24k"] || 81500) / 10)) * 10).toLocaleString("en-IN")} / 10g
            </span>
          </div>

          <div className="p-3 bg-[#0a2a1d] rounded-lg border border-[#d4af37]/60 space-y-1 shadow-inner">
            <span className="text-[10px] font-mono uppercase text-[#d4af37] font-bold block">22K (916) Gold</span>
            <strong className="font-serif text-lg text-[#f1d98a] block">
              ₹{Number(settings["gold_rate_22k_per_gram"] || Math.round(Number(settings["gold_indicative_rate_22k"] || 74700) / 10)).toLocaleString("en-IN")}/g
            </strong>
            <span className="text-[10px] text-[#34d399] font-medium block">
              Standard BIS Hallmark
            </span>
          </div>

          <div className="p-3 bg-[#0a2a1d] rounded-lg border border-white/10 space-y-1">
            <span className="text-[10px] font-mono uppercase text-[#a8b6af] block">18K (750) Gold</span>
            <strong className="font-serif text-lg text-white block">
              ₹{Number(settings["gold_rate_18k_per_gram"] || 6115).toLocaleString("en-IN")}/g
            </strong>
            <span className="text-[10px] text-[#a8b6af] block">Diamond Settings</span>
          </div>

          <div className="p-3 bg-[#0a2a1d] rounded-lg border border-white/10 space-y-1">
            <span className="text-[10px] font-mono uppercase text-[#a8b6af] block">14K (585) Gold</span>
            <strong className="font-serif text-lg text-white block">
              ₹{Number(settings["gold_rate_14k_per_gram"] || 4770).toLocaleString("en-IN")}/g
            </strong>
            <span className="text-[10px] text-[#a8b6af] block">Daily Wear</span>
          </div>

          <div className="p-3 bg-[#0a2a1d] rounded-lg border border-white/10 space-y-1 col-span-2 sm:col-span-1">
            <span className="text-[10px] font-mono uppercase text-[#a8b6af] block">925 Sterling Silver</span>
            <strong className="font-serif text-lg text-[#e2ece7] block">
              ₹{Number(settings["silver_rate_per_gram"] || 98).toLocaleString("en-IN")}/g
            </strong>
            <span className="text-[10px] text-[#a8b6af] block">
              ₹{(Number(settings["silver_rate_per_gram"] || 98) * 1000).toLocaleString("en-IN")} / kg
            </span>
          </div>
        </div>

        {/* Rate Origin & Timestamp Meta */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#a8b6af] bg-[#04170f] p-3.5 rounded-xl border border-white/10">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#34d399]" />
            <span>Active Rate Source: <strong className="text-white">{settings["rates_source"] || "Indian Retail Bullion Benchmark (Live Feed)"}</strong></span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Last Synced: {settings["rates_last_synced_at"] ? new Date(settings["rates_last_synced_at"]).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", day: "numeric", month: "short" }) : "Today"}</span>
          </div>
        </div>

        {/* Local City Association Premium / Spread */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <Input
            label="Local Sarafa Association Premium (₹ per gram)"
            type="number"
            placeholder="e.g. 0 or +50 or -20"
            helperText="Spread added/subtracted for your local city benchmark"
            value={settings["gold_city_spread_per_gram"] || "0"}
            onChange={(e) => updateKey("gold_city_spread_per_gram", e.target.value)}
          />

          <Input
            label="Manual 24K Rate Override (₹ per 10g)"
            type="number"
            value={settings["gold_indicative_rate_24k"] || "81500"}
            onChange={(e) => updateKey("gold_indicative_rate_24k", e.target.value)}
          />

          <Input
            label="Manual 22K Rate Override (₹ per 10g)"
            type="number"
            value={settings["gold_indicative_rate_22k"] || "74700"}
            onChange={(e) => updateKey("gold_indicative_rate_22k", e.target.value)}
          />
        </div>

        {/* API Key Guide Box */}
        <div className="p-4 bg-[#04170f] border border-[#d4af37]/40 rounded-xl text-xs space-y-1.5">
          <strong className="text-[#f1d98a] block font-semibold">
            💡 Using Custom GoldAPI.io Key (Optional):
          </strong>
          <p className="text-[#a8b6af] leading-relaxed">
            By default, your shop uses our live calibrated Indian retail bullion benchmark feed. If you wish to connect your own direct institutional key from <a href="https://www.goldapi.io" target="_blank" rel="noopener noreferrer" className="text-[#d4af37] underline font-medium hover:text-[#f6e7b4]">GoldAPI.io</a>, simply add <code className="bg-[#0a2a1d] px-1.5 py-0.5 rounded-md border border-[#d4af37]/30 font-mono text-[11px] text-[#f1d98a]">GOLD_API_KEY=your_key_here</code> to your <code className="bg-[#0a2a1d] px-1.5 py-0.5 rounded-md border border-[#d4af37]/30 font-mono text-[11px] text-[#f1d98a]">.env.local</code> file.
          </p>
        </div>
      </Card>
    </form>
  );
}

