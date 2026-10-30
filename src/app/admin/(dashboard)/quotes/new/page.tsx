"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { createQuoteAction } from "@/app/admin/quotes/actions";
import { ArrowLeft, Plus, Trash2, Save, AlertCircle } from "lucide-react";

interface LineItem {
  id: string;
  description: string;
  purity: string;
  weightGrams: number;
  unitRate: number;
  amount: number;
}

export default function NewQuotePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [customerName, setCustomerName] = useState(searchParams.get("customerName") || "");
  const [customerContact, setCustomerContact] = useState(searchParams.get("customerContact") || "");
  const customDesignId = searchParams.get("customDesignId") || null;
  const enquiryId = searchParams.get("enquiryId") || null;

  const [goldRatePerGram, setGoldRatePerGram] = useState<number>(7330); // 22K reference
  const [items, setItems] = useState<LineItem[]>([
    {
      id: "item-1",
      description: "22K Gold Handcrafted Item",
      purity: "22K (916)",
      weightGrams: 20,
      unitRate: 7330,
      amount: 146600,
    },
  ]);

  const [makingCharges, setMakingCharges] = useState<number>(18000);
  const [stoneCharges, setStoneCharges] = useState<number>(0);
  const otherCharges = 0;
  const [validUntilDate, setValidUntilDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2); // 48 hours validity
    return d.toISOString().split("T")[0];
  });
  const [terms, setTerms] = useState(
    "1. Gold rate quoted is valid for 48 hours. Any market rate fluctuation after validity will be adjusted on final invoice.\n2. Final billing is based on physical net weight confirmed on shop digital scale.\n3. In-person collection at our shop only."
  );
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Recalculate totals
  const totalGoldValue = items.reduce((sum, item) => sum + (item.amount || 0), 0);
  const subtotalBeforeTax = totalGoldValue + makingCharges + stoneCharges + otherCharges;
  const calculatedTax = Math.round(subtotalBeforeTax * 0.03 * 100) / 100;
  const finalTotal = Math.round(subtotalBeforeTax + calculatedTax);

  const addLineItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: `item-${Date.now()}`,
        description: "Additional Jewellery Element",
        purity: "22K (916)",
        weightGrams: 5,
        unitRate: goldRatePerGram,
        amount: Math.round(5 * goldRatePerGram),
      },
    ]);
  };

  const removeLineItem = (id: string) => {
    if (items.length <= 1) return;
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateItem = (id: string, field: keyof LineItem, val: unknown) => {
    setItems((prev) =>
      prev.map((i) => {
        if (i.id !== id) return i;
        const updated = { ...i, [field]: val };
        if (field === "weightGrams" || field === "unitRate") {
          updated.amount = Math.round(updated.weightGrams * updated.unitRate);
        }
        return updated;
      })
    );
  };

  const handleSaveQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMsg(null);

    const payload = {
      customerName,
      customerContact,
      enquiryId,
      customDesignId,
      goldRatePerGramApplied: goldRatePerGram,
      totalGoldValue,
      makingCharges,
      stoneCharges,
      otherCharges,
      taxCharges: calculatedTax,
      finalTotal,
      validUntilDate,
      termsAndExclusions: terms,
      items: items.map((i) => ({
        description: i.description,
        purity: i.purity,
        weightGrams: i.weightGrams,
        unitRate: i.unitRate,
        amount: i.amount,
      })),
    };

    const res = await createQuoteAction(payload);
    if (res.success && res.quoteId) {
      router.push(`/admin/quotes/${res.quoteId}`);
      router.refresh();
    } else {
      setErrorMsg(res.message || "Failed to create quote.");
    }
    setIsSaving(false);
  };

  return (
    <form onSubmit={handleSaveQuote} className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-baseline justify-between gap-4 border-b border-[#E5DFD5] pb-4">
        <div>
          <Link
            href="/admin/quotes"
            className="inline-flex items-center gap-1 text-xs text-[#626A65] hover:text-[#182522] mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Quotes</span>
          </Link>
          <h1 className="font-serif text-2xl text-[#182522] font-normal">
            New Studio Quotation
          </h1>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isSaving}
          className="text-xs uppercase tracking-wider font-semibold"
        >
          <Save className="w-3.5 h-3.5 mr-1.5" />
          Save &amp; Issue Quotation
        </Button>
      </div>

      {errorMsg && (
        <div className="p-3.5 bg-[#FFF0F0] border border-[#FFD0D0] text-xs text-[#A61C1C] flex items-center gap-2 rounded-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Recipient & Market Reference */}
      <Card className="p-6 bg-white space-y-4">
        <h2 className="font-serif text-base text-[#182522] font-medium border-b border-[#E5DFD5] pb-2">
          1. Recipient &amp; Market Rate Applied
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input
            label="Customer Name"
            required
            placeholder="e.g. Priya Sharma"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />

          <Input
            label="Contact Detail (Phone / Email)"
            required
            placeholder="e.g. +91 98765 43210"
            value={customerContact}
            onChange={(e) => setCustomerContact(e.target.value)}
          />

          <Input
            label="Applied 22K Gold Rate (₹/Gram)"
            type="number"
            required
            value={goldRatePerGram}
            onChange={(e) => setGoldRatePerGram(parseFloat(e.target.value))}
            helperText="Timestamped at creation time"
          />
        </div>
      </Card>

      {/* Line Items */}
      <Card className="p-6 bg-white space-y-4">
        <div className="flex items-center justify-between border-b border-[#E5DFD5] pb-2">
          <h2 className="font-serif text-base text-[#182522] font-medium">
            2. Precious Metal &amp; Item Breakdown
          </h2>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addLineItem}
            className="text-xs uppercase tracking-wider"
          >
            <Plus className="w-3.5 h-3.5 mr-1" />
            Add Item
          </Button>
        </div>

        <div className="space-y-3">
          {items.map((item, idx) => (
            <div key={item.id} className="p-4 bg-[#F7F4ED] rounded-sm border border-[#E5DFD5] grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
              <div className="sm:col-span-5">
                <Input
                  label={`Item ${idx + 1} Description`}
                  required
                  value={item.description}
                  onChange={(e) => updateItem(item.id, "description", e.target.value)}
                />
              </div>

              <div className="sm:col-span-2">
                <Input
                  label="Purity"
                  value={item.purity}
                  onChange={(e) => updateItem(item.id, "purity", e.target.value)}
                />
              </div>

              <div className="sm:col-span-2">
                <Input
                  label="Weight (g)"
                  type="number"
                  step="0.01"
                  required
                  value={item.weightGrams}
                  onChange={(e) => updateItem(item.id, "weightGrams", parseFloat(e.target.value) || 0)}
                />
              </div>

              <div className="sm:col-span-2">
                <Input
                  label="Amount (₹)"
                  type="number"
                  readOnly
                  value={item.amount}
                />
              </div>

              <div className="sm:col-span-1 pb-2 flex justify-end">
                {items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeLineItem(item.id)}
                    className="p-1.5 text-[#A61C1C] hover:bg-[#FFF0F0] rounded-xs"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Charges & Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
        {/* Left: Charges Inputs */}
        <Card className="p-6 bg-white space-y-4">
          <h2 className="font-serif text-base text-[#182522] font-medium border-b border-[#E5DFD5] pb-2">
            3. Workmanship &amp; Validity
          </h2>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Making Charges (₹)"
              type="number"
              value={makingCharges}
              onChange={(e) => setMakingCharges(parseFloat(e.target.value) || 0)}
            />

            <Input
              label="Gemstone Charges (₹)"
              type="number"
              value={stoneCharges}
              onChange={(e) => setStoneCharges(parseFloat(e.target.value) || 0)}
            />
          </div>

          <Input
            label="Quote Valid Until Date"
            type="date"
            required
            value={validUntilDate}
            onChange={(e) => setValidUntilDate(e.target.value)}
            helperText="Due to daily bullion volatility, quotes typically expire in 24–48 hours."
          />

          <Textarea
            label="Terms &amp; Collection Policy"
            rows={4}
            value={terms}
            onChange={(e) => setTerms(e.target.value)}
          />
        </Card>

        {/* Right: Total Summary */}
        <Card className="p-6 bg-[#173B32] text-white space-y-4">
          <h2 className="font-serif text-base text-white font-medium border-b border-[#2A5248] pb-2">
            Quotation Summary
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center text-[#DDE5DC]">
              <span>Precious Metal Subtotal:</span>
              <span className="font-mono text-white">₹{totalGoldValue.toLocaleString("en-IN")}</span>
            </div>

            <div className="flex justify-between items-center text-[#DDE5DC]">
              <span>Making / Workmanship Charges:</span>
              <span className="font-mono text-white">₹{makingCharges.toLocaleString("en-IN")}</span>
            </div>

            {stoneCharges > 0 && (
              <div className="flex justify-between items-center text-[#DDE5DC]">
                <span>Gemstones / Pearls:</span>
                <span className="font-mono text-white">₹{stoneCharges.toLocaleString("en-IN")}</span>
              </div>
            )}

            <div className="pt-2 border-t border-[#2A5248] flex justify-between items-center text-[#DDE5DC]">
              <span>Taxable Subtotal:</span>
              <span className="font-mono text-white">₹{subtotalBeforeTax.toLocaleString("en-IN")}</span>
            </div>

            <div className="flex justify-between items-center text-[#DDE5DC]">
              <span>Applicable GST (3%):</span>
              <span className="font-mono text-white">₹{calculatedTax.toLocaleString("en-IN")}</span>
            </div>

            <div className="pt-3 border-t border-[#3A6B60] flex justify-between items-baseline">
              <span className="text-sm font-semibold uppercase tracking-wider text-[#B08D57]">
                Grand Total:
              </span>
              <span className="font-serif text-2xl font-bold text-white">
                ₹{finalTotal.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-[#2A5248]">
            <Button
              type="submit"
              variant="gold"
              size="lg"
              isLoading={isSaving}
              className="w-full text-xs uppercase tracking-wider font-semibold"
            >
              Generate Printable Quotation
            </Button>
          </div>
        </Card>
      </div>
    </form>
  );
}
