"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/db/repo";
import { Badge } from "@/components/ui/Badge";
import { ProductEnquiryDialog } from "./ProductEnquiryDialog";
import {
  ShieldCheck,
  Calendar,
  MapPin,
  MessageCircle,
  Sparkles,
  Scale,
  ZoomIn,
  X,
} from "lucide-react";

export function ProductDetailView({ product }: { product: Product }) {
  // Parse gallery images from product record
  const galleryImages: string[] = (() => {
    const list: string[] = [];
    if (product.primary_media_url) list.push(product.primary_media_url);

    if (Array.isArray(product.gallery_media_urls)) {
      product.gallery_media_urls.forEach((img) => {
        if (typeof img === "string" && !list.includes(img)) {
          list.push(img);
        }
      });
    } else if (product.gallery_media_ids) {
      try {
        const parsed = JSON.parse(product.gallery_media_ids);
        if (Array.isArray(parsed)) {
          parsed.forEach((img) => {
            if (typeof img === "string" && !list.includes(img)) {
              list.push(img);
            }
          });
        }
      } catch {
        // ignore parse error
      }
    }

    if (list.length === 0) list.push("/placeholder-jewellery.svg");
    return list;
  })();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const activeImage = galleryImages[activeImageIndex] || galleryImages[0];

  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [enquiryType, setEnquiryType] = useState<"quote_request" | "availability_check" | "showroom_viewing">("quote_request");

  const openEnquiry = (type: "quote_request" | "availability_check" | "showroom_viewing") => {
    setEnquiryType(type);
    setEnquiryModalOpen(true);
  };

  const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "919876543210";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start text-[#faf7f0]">
      {/* ====================================================================
          LEFT: MULTI-IMAGE GALLERY WITH THUMBNAIL SELECTOR (6 cols)
          ==================================================================== */}
      <div className="lg:col-span-6 space-y-4">
        {/* Main Display Stage with Hover Loupe Zoom */}
        <div
          className="relative aspect-square bg-radial from-[#0f3a28] to-[#04170f] border border-[#d4af37]/40 rounded-3xl overflow-hidden shadow-2xl group cursor-crosshair"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onMouseMove={handleMouseMove}
          onClick={() => setIsZoomModalOpen(true)}
        >
          <div
            className="w-full h-full relative transition-transform duration-200 ease-out"
            style={{
              transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
              transform: isHovering ? "scale(2.2)" : "scale(1)",
            }}
          >
            <Image
              src={activeImage}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Metal Purity Tag */}
          {product.metal_purity && (
            <div className="absolute top-4 left-4 z-10 pointer-events-none">
              <span className="text-[11px] font-mono uppercase tracking-wider font-semibold bg-[#04170f]/90 backdrop-blur-md text-[#f1d98a] px-3.5 py-1.5 rounded-full border border-[#d4af37]/50 shadow-lg">
                {product.metal_purity}
              </span>
            </div>
          )}

          {/* Demo Tag */}
          {product.is_demo === 1 && (
            <div className="absolute top-4 right-4 z-10 pointer-events-none">
              <Badge variant="demo">Demo Sample</Badge>
            </div>
          )}

          {/* High-Jewellery Zoom Hint */}
          <div className="absolute bottom-4 right-4 z-10 transition-opacity flex items-center gap-1.5 bg-[#04170f]/85 border border-white/10 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-[10px] uppercase font-mono tracking-wider pointer-events-none shadow-lg">
            <ZoomIn className="w-3.5 h-3.5 text-[#f1d98a]" />
            <span>{isHovering ? "2.2x Loupe Active" : "Click / Hover to Inspect"}</span>
          </div>
        </div>

        {/* Thumbnail Selector (if multiple images exist) */}
        {galleryImages.length > 1 && (
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                  activeImageIndex === idx
                    ? "border-[#d4af37] shadow-lg ring-2 ring-[#d4af37]/40 scale-105"
                    : "border-white/15 opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={img}
                  alt={`${product.name} view ${idx + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* BIS Hallmark & Metrology Guarantee Pill */}
        <div className="p-4 bg-[#0a2a1d]/85 border border-[#d4af37]/40 rounded-2xl text-xs text-[#faf7f0] flex items-center justify-between shadow-xl">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#10b981] shrink-0" />
            <div>
              <strong className="block font-serif text-sm text-[#f1d98a]">100% BIS Hallmarked Creation</strong>
              <span className="text-[11px] text-[#a8b6af] font-mono">
                Laser-engraved with verifiable 6-digit alphanumeric HUID.
              </span>
            </div>
          </div>
          <Link
            href="/tools/jewellery-buying-checklist"
            className="text-[11px] font-mono uppercase tracking-wider font-semibold text-[#f1d98a] hover:text-white underline ml-2 shrink-0 transition-colors"
          >
            How to verify &rarr;
          </Link>
        </div>
      </div>

      {/* ====================================================================
          RIGHT: SPECIFICATIONS, BULLION BREAKDOWN & INQUIRY ACTIONS (6 cols)
          ==================================================================== */}
      <div className="lg:col-span-6 space-y-6">
        {/* Breadcrumb & Identifier */}
        <div>
          <div className="flex items-center gap-2 text-xs text-[#a8b6af] mb-2 font-mono">
            <Link href="/jewellery" className="hover:text-[#f1d98a]">Jewellery</Link>
            <span>/</span>
            {product.category_name && (
              <>
                <span className="uppercase text-[#d4af37]">{product.category_name}</span>
                <span>/</span>
              </>
            )}
            <span className="font-bold text-white">{product.sku}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-white font-normal leading-tight">
            {product.name}
          </h1>
        </div>

        {/* Pricing & Valuation Card */}
        <div className="p-6 bg-[#0a2a1d]/90 border border-[#d4af37]/40 rounded-2xl shadow-xl space-y-4">
          {product.price_mode === "fixed_price" && product.fixed_price_amount ? (
            <div>
              <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#d4af37] block mb-1">
                Fixed Studio Price
              </span>
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-3xl sm:text-4xl font-bold text-white">
                  ₹{product.fixed_price_amount.toLocaleString("en-IN")}
                </span>
                <span className="text-xs text-[#a8b6af] font-mono">Inclusive of statutory taxes (3% GST)</span>
              </div>
            </div>
          ) : product.price_mode === "indicative_estimate" ? (
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-[#14502f] text-[#f1d98a] border border-[#d4af37]/40 text-xs font-mono uppercase px-3 py-1 rounded-full">
                  Indicative Bullion Valuation
                </span>
              </div>
              <p className="text-xs text-[#c8d4cf] mt-2 leading-relaxed font-light">
                Calculated from today&apos;s gold benchmark rate plus handcrafting making charges. The exact final weight is confirmed before you on our digital scale.
              </p>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-[#14502f] text-[#f1d98a] border border-[#d4af37]/40 text-xs font-mono uppercase px-3 py-1 rounded-full">
                  Price on Formal Quotation
                </span>
              </div>
              <p className="text-xs text-[#c8d4cf] mt-2 leading-relaxed font-light">
                {product.price_assumptions ||
                  "This piece is valued upon in-shop inspection, based on the day's bullion benchmark and exact gemstone weight."}
              </p>
            </div>
          )}

          {/* Physical Shop Status */}
          <div className="pt-3.5 border-t border-white/10 flex items-center justify-between text-xs text-[#a8b6af] font-mono">
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]"></span>
              </span>
              Studio Availability: <strong className="text-white capitalize font-sans">{product.status}</strong>
            </span>
            <span className="text-[11px] text-[#f1d98a]">
              Available in Varanasi Shop
            </span>
          </div>
        </div>

        {/* Primary Action Suite */}
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => openEnquiry("quote_request")}
              className="bg-gold-gradient text-[#04170f] py-3.5 px-4 rounded-xl text-xs font-mono uppercase tracking-[0.18em] font-bold flex items-center justify-center gap-2 shadow-lg hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer gold-shimmer-sweep"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Request Price Quote</span>
            </button>

            <button
              type="button"
              onClick={() => openEnquiry("showroom_viewing")}
              className="py-3.5 px-4 rounded-xl text-xs font-mono uppercase tracking-[0.18em] font-semibold text-[#f1d98a] bg-[#04170f] border border-[#d4af37]/50 hover:bg-[#14502f] hover:text-white transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Visit Shop to Try</span>
            </button>
          </div>

          {/* WhatsApp Direct Concierge Button */}
          <a
            href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
              `Namaste Vaidik Ratnam, I am inquiring about ${product.name} (SKU: ${product.sku}).`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-4 bg-[#14502f] hover:bg-[#1a663c] border border-[#25D366]/40 text-white rounded-xl text-xs font-mono font-bold uppercase tracking-[0.16em] flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>Enquire on WhatsApp</span>
          </a>
        </div>

        {/* Verified Physical Specifications Table (Indian Legal Metrology Compliance) */}
        <div className="p-6 bg-[#04170f]/90 border border-[#d4af37]/35 rounded-2xl shadow-xl">
          <h3 className="font-serif text-lg font-normal text-white border-b border-white/10 pb-3 mb-4 flex items-center gap-2">
            <Scale className="w-4 h-4 text-[#d4af37]" />
            <span>Exact Weight &amp; Purity Details</span>
          </h3>

          <div className="grid grid-cols-2 gap-y-3.5 text-xs font-mono">
            <span className="text-[#a8b6af]">Unique SKU Identifier:</span>
            <span className="text-white font-bold">{product.sku}</span>

            {product.metal_purity && (
              <>
                <span className="text-[#a8b6af]">Metal Purity:</span>
                <span className="text-[#f1d98a] font-semibold">{product.metal_purity}</span>
              </>
            )}

            {product.gross_weight_grams && (
              <>
                <span className="text-[#a8b6af]">Gross Weight (Total):</span>
                <span className="text-white font-medium">{product.gross_weight_grams} Grams</span>
              </>
            )}

            {product.net_gold_weight_grams && (
              <>
                <span className="text-[#a8b6af]">Net Gold (Metal Only):</span>
                <span className="text-[#10b981] font-bold">{product.net_gold_weight_grams} Grams</span>
              </>
            )}

            {product.dimensions && (
              <>
                <span className="text-[#a8b6af]">Dimensions / Length:</span>
                <span className="text-white">{product.dimensions}</span>
              </>
            )}

            {product.size_variant && (
              <>
                <span className="text-[#a8b6af]">Size Variant:</span>
                <span className="text-white">{product.size_variant}</span>
              </>
            )}

            {product.gemstone_details && (
              <>
                <span className="text-[#a8b6af]">Studded Gemstones:</span>
                <span className="text-[#f1d98a] font-medium">{product.gemstone_details}</span>
              </>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="space-y-3 text-xs sm:text-sm text-[#c8d4cf] leading-relaxed">
          {product.short_description && (
            <p className="font-medium text-white font-serif text-base">
              {product.short_description}
            </p>
          )}
          {product.long_description && (
            <p className="font-light">{product.long_description}</p>
          )}
        </div>

        {/* In-Shop Collection Policy Notice */}
        <div className="bg-[#0a2a1d]/60 border border-[#d4af37]/25 rounded-2xl p-4 text-xs text-[#a8b6af] flex items-start gap-3">
          <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
          <div>
            <strong className="text-white block mb-0.5 font-serif text-sm">In-Person Shop Collection:</strong>
            To ensure 100% purity, zero transit risk, and allow you to weigh the piece in person on digital scales, all final purchases are completed at our Varanasi shop counter.
          </div>
        </div>
      </div>

      {/* ====================================================================
          FULLSCREEN ZOOM LIGHTBOX MODAL
          ==================================================================== */}
      {isZoomModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            type="button"
            onClick={() => setIsZoomModalOpen(false)}
            className="absolute top-6 right-6 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10 cursor-pointer"
            aria-label="Close zoom modal"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative w-full max-w-4xl aspect-square max-h-[85vh]">
            <Image
              src={activeImage}
              alt={product.name}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}

      {/* Enquiry Form Dialog */}
      <ProductEnquiryDialog
        productId={product.id}
        productName={product.name}
        productSku={product.sku}
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        defaultEnquiryType={enquiryType}
      />
    </div>
  );
}
