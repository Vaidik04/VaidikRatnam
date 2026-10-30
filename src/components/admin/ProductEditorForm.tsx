"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Product, ProductCategory, MediaAsset } from "@/lib/db/repo";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { saveProductAction } from "@/app/admin/products/actions";
import { Save, ArrowLeft, AlertCircle, CheckCircle2, ShieldAlert } from "lucide-react";
import Link from "next/link";

interface ProductEditorFormProps {
  initialProduct?: Product | null;
  categories: ProductCategory[];
  mediaAssets: MediaAsset[];
}

export function ProductEditorForm({
  initialProduct,
  categories,
  mediaAssets,
}: ProductEditorFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    id: initialProduct?.id || "",
    sku: initialProduct?.sku || "",
    name: initialProduct?.name || "",
    product_type: initialProduct?.product_type || ("single_piece" as Product["product_type"]),
    category_id: initialProduct?.category_id || categories[0]?.id || "",
    short_description: initialProduct?.short_description || "",
    long_description: initialProduct?.long_description || "",
    metal_purity: initialProduct?.metal_purity || "22K Gold (916 Hallmarked)",
    metal_color: initialProduct?.metal_color || "Yellow Gold",
    gross_weight_grams: initialProduct?.gross_weight_grams?.toString() || "",
    net_gold_weight_grams: initialProduct?.net_gold_weight_grams?.toString() || "",
    dimensions: initialProduct?.dimensions || "",
    size_variant: initialProduct?.size_variant || "",
    gemstone_details: initialProduct?.gemstone_details || "",
    price_mode: initialProduct?.price_mode || ("quote_first" as Product["price_mode"]),
    fixed_price_amount: initialProduct?.fixed_price_amount?.toString() || "",
    price_assumptions: initialProduct?.price_assumptions || "",
    status: initialProduct?.status || ("draft" as Product["status"]),
    primary_media_id: initialProduct?.primary_media_id || "",
    care_instructions: initialProduct?.care_instructions || "",
    private_admin_notes: initialProduct?.private_admin_notes || "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const updateField = (field: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const payload = {
        ...formData,
        id: formData.id || undefined,
        gross_weight_grams: formData.gross_weight_grams ? parseFloat(formData.gross_weight_grams) : null,
        net_gold_weight_grams: formData.net_gold_weight_grams ? parseFloat(formData.net_gold_weight_grams) : null,
        fixed_price_amount: formData.fixed_price_amount ? parseFloat(formData.fixed_price_amount) : null,
      };

      const res = await saveProductAction(payload);
      if (res.success) {
        setSuccessMessage("Product specifications saved successfully!");
        setTimeout(() => {
          router.push("/admin/products");
          router.refresh();
        }, 800);
      } else {
        setErrorMessage(res.message || "Failed to save product.");
      }
    } catch {
      setErrorMessage("Network error while saving product.");
    } finally {
      setIsSaving(false);
    }
  };

  const selectedMedia = mediaAssets.find((m) => m.id === formData.primary_media_id);

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-baseline justify-between gap-4 border-b border-[#E5DFD5] pb-4">
        <div>
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-1 text-xs text-[#626A65] hover:text-[#182522] mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Products</span>
          </Link>
          <h1 className="font-serif text-2xl text-[#182522] font-normal">
            {initialProduct ? `Edit: ${initialProduct.name}` : "Create New Product Record"}
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
          Save Product Record
        </Button>
      </div>

      {errorMessage && (
        <div className="p-3.5 bg-[#FFF0F0] border border-[#FFD0D0] text-xs text-[#A61C1C] flex items-center gap-2 rounded-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div className="p-3.5 bg-[#EEF3EE] border border-[#C5D5C4] text-xs text-[#173B32] flex items-center gap-2 rounded-xs">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Core Specs (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* 1. Identification */}
          <Card className="p-6 bg-white space-y-4">
            <h2 className="font-serif text-base text-[#182522] font-medium border-b border-[#E5DFD5] pb-2">
              1. Identification &amp; Category
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Product SKU / Stock ID"
                required
                placeholder="e.g. VR-G-NK-005"
                value={formData.sku}
                onChange={(e) => updateField("sku", e.target.value)}
                helperText="Unique physical stock inventory code"
              />

              <Select
                label="Product Type"
                value={formData.product_type}
                onChange={(e) => updateField("product_type", e.target.value)}
                options={[
                  { value: "single_piece", label: "Single Physical Piece (One-of-a-kind)" },
                  { value: "multi_quantity", label: "Multi-Quantity Ready Stock" },
                  { value: "loose_gemstone", label: "Loose Certified Gemstone (Ratna)" },
                  { value: "custom_example", label: "Custom Design Archive Example" },
                ]}
              />
            </div>

            <Input
              label="Public Product Display Name"
              required
              placeholder="e.g. Handcrafted Heritage 22K Gold Nakshi Choker"
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
            />

            <Select
              label="Category"
              value={formData.category_id}
              onChange={(e) => updateField("category_id", e.target.value)}
              options={categories.map((c) => ({ value: c.id, label: c.name }))}
            />

            <Textarea
              label="Short Description"
              rows={2}
              placeholder="Brief summary for catalogue cards..."
              value={formData.short_description}
              onChange={(e) => updateField("short_description", e.target.value)}
            />

            <Textarea
              label="Detailed Artisan Description"
              rows={4}
              placeholder="Comprehensive details on crafting technique, motifs, provenance..."
              value={formData.long_description}
              onChange={(e) => updateField("long_description", e.target.value)}
            />
          </Card>

          {/* 2. Measured Physical Specifications */}
          <Card className="p-6 bg-white space-y-4">
            <h2 className="font-serif text-base text-[#182522] font-medium border-b border-[#E5DFD5] pb-2">
              2. Measured Physical Specifications
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Metal &amp; Purity"
                value={formData.metal_purity}
                onChange={(e) => updateField("metal_purity", e.target.value)}
                options={[
                  { value: "22K Gold (916 Hallmarked)", label: "22K Gold (916 Hallmarked)" },
                  { value: "18K Gold (750 Hallmarked)", label: "18K Gold (750 Hallmarked)" },
                  { value: "14K Gold (585)", label: "14K Gold (585)" },
                  { value: "925 Sterling Silver", label: "925 Sterling Silver" },
                  { value: "Platinum 950", label: "Platinum 950" },
                  { value: "Loose Gemstone", label: "Loose Gemstone / No Metal" },
                ]}
              />

              <Input
                label="Metal Tone"
                placeholder="e.g. Yellow Gold, Rose Gold, Antique Polish"
                value={formData.metal_color}
                onChange={(e) => updateField("metal_color", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Gross Weight (Grams)"
                type="number"
                step="0.001"
                placeholder="e.g. 48.650"
                value={formData.gross_weight_grams}
                onChange={(e) => updateField("gross_weight_grams", e.target.value)}
                helperText="Total scale weight including stones"
              />

              <Input
                label="Net Gold Weight (Grams)"
                type="number"
                step="0.001"
                placeholder="e.g. 48.650"
                value={formData.net_gold_weight_grams}
                onChange={(e) => updateField("net_gold_weight_grams", e.target.value)}
                helperText="Precious gold weight alone (billed amount)"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Dimensions / Length"
                placeholder="e.g. 16 inches with adjustable silk dori"
                value={formData.dimensions}
                onChange={(e) => updateField("dimensions", e.target.value)}
              />

              <Input
                label="Size Variant (If applicable)"
                placeholder="e.g. Size 2.6 (~60mm internal diameter)"
                value={formData.size_variant}
                onChange={(e) => updateField("size_variant", e.target.value)}
              />
            </div>

            <Input
              label="Studded Gemstone / Pearl Details"
              placeholder="e.g. Natural Basra seed pearls (4.5 cts total)"
              value={formData.gemstone_details}
              onChange={(e) => updateField("gemstone_details", e.target.value)}
            />

            <Textarea
              label="Care Instructions"
              rows={2}
              placeholder="e.g. Store in velvet box away from perfumes..."
              value={formData.care_instructions}
              onChange={(e) => updateField("care_instructions", e.target.value)}
            />
          </Card>

          {/* 3. Internal Private Notes */}
          <Card className="p-6 bg-white space-y-4">
            <div className="flex items-center justify-between border-b border-[#E5DFD5] pb-2">
              <h2 className="font-serif text-base text-[#182522] font-medium">
                3. Private Admin / Karigar Notes
              </h2>
              <span className="text-[11px] text-[#A61C1C] flex items-center gap-1 font-mono uppercase">
                <ShieldAlert className="w-3.5 h-3.5" />
                Never Exposed to Public
              </span>
            </div>

            <Textarea
              label="Internal Manufacturing Notes"
              rows={3}
              placeholder="e.g. Karigar batch #12, gold sourced from bullion refinery invoice #402..."
              value={formData.private_admin_notes}
              onChange={(e) => updateField("private_admin_notes", e.target.value)}
              helperText="Strictly private notes for family staff."
            />
          </Card>
        </div>

        {/* Right Column: Pricing, Status & Image (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Status & Visibility */}
          <Card className="p-6 bg-white space-y-4">
            <h2 className="font-serif text-base text-[#182522] font-medium border-b border-[#E5DFD5] pb-2">
              Stock Status
            </h2>

            <Select
              label="Publication State"
              value={formData.status}
              onChange={(e) => updateField("status", e.target.value)}
              options={[
                { value: "draft", label: "Draft (Private / In Review)" },
                { value: "incomplete", label: "Incomplete (Awaiting details)" },
                { value: "published", label: "Published (Live on Public Catalogue)" },
                { value: "reserved", label: "Reserved (Viewing scheduled)" },
                { value: "sold", label: "Sold (Out of Stock)" },
                { value: "archived", label: "Archived" },
              ]}
            />

            <div className="p-3 bg-[#F7F4ED] rounded-xs border border-[#E5DFD5] text-[11px] text-[#626A65]">
              Only items marked <strong className="text-[#182522]">Published</strong> will appear on the public jewellery catalogue.
            </div>
          </Card>

          {/* Pricing Model */}
          <Card className="p-6 bg-white space-y-4">
            <h2 className="font-serif text-base text-[#182522] font-medium border-b border-[#E5DFD5] pb-2">
              Pricing Mode
            </h2>

            <Select
              label="Price Display Mode"
              value={formData.price_mode}
              onChange={(e) => updateField("price_mode", e.target.value)}
              options={[
                { value: "quote_first", label: "Quote on Request (Daily Gold Rate)" },
                { value: "fixed_price", label: "Fixed Shop Price" },
                { value: "indicative_estimate", label: "Indicative Estimate (Calculated)" },
              ]}
            />

            {formData.price_mode === "fixed_price" && (
              <Input
                label="Fixed Shop Price (₹)"
                type="number"
                step="1"
                placeholder="e.g. 125000"
                value={formData.fixed_price_amount}
                onChange={(e) => updateField("fixed_price_amount", e.target.value)}
              />
            )}

            <Textarea
              label="Price Assumptions / Note"
              rows={2}
              placeholder="e.g. Quoted on net weight with 14% making charge..."
              value={formData.price_assumptions}
              onChange={(e) => updateField("price_assumptions", e.target.value)}
            />
          </Card>

          {/* Primary Photo Mapping */}
          <Card className="p-6 bg-white space-y-4">
            <h2 className="font-serif text-base text-[#182522] font-medium border-b border-[#E5DFD5] pb-2">
              Primary Photo
            </h2>

            {selectedMedia ? (
              <div className="relative aspect-square bg-[#F4EFE6] rounded-xs overflow-hidden border border-[#E5DFD5] mb-2">
                <Image src={selectedMedia.url} alt={formData.name} fill className="object-cover" />
              </div>
            ) : (
              <div className="aspect-square bg-[#F7F4ED] border border-dashed border-[#D4CCC0] rounded-xs flex items-center justify-center text-xs text-[#8F9691] mb-2">
                No photo linked yet
              </div>
            )}

            <Select
              label="Select from Stock Library"
              value={formData.primary_media_id}
              onChange={(e) => updateField("primary_media_id", e.target.value)}
              options={[
                { value: "", label: "-- None (Use Silhouette Placeholder) --" },
                ...mediaAssets.map((m) => ({
                  value: m.id,
                  label: `${m.original_name} (${(m.file_size / 1024).toFixed(0)}KB)`,
                })),
              ]}
            />

            <Link href="/admin/media" className="text-[11px] text-[#173B32] hover:underline block pt-1">
              + Upload more photos in Stock Library &rarr;
            </Link>
          </Card>
        </div>
      </div>
    </form>
  );
}

