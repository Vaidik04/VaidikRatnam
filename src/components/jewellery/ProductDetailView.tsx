"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/db/repo";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
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
    const x = Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - top) / height) * 100));
    setZoomPos({ x, y });
  };

  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [defaultEnquiryType, setDefaultEnquiryType] = useState<
    "quote_request" | "availability_check" | "showroom_viewing"
  >("quote_request");

  const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "919876543210";

  const openEnquiry = (type: "quote_request" | "availability_check" | "showroom_viewing") => {
    setDefaultEnquiryType(type);
    setIsEnquiryOpen(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
      {/* ====================================================================
          LEFT: MULTI-IMAGE GALLERY WITH THUMBNAIL SELECTOR (6 cols)
          ==================================================================== */}
      <div className="lg:col-span-6 space-y-4">
        {/* Main Display Stage with Hover Loupe Zoom */}
        <div
          className="relative aspect-square bg-[#FAF8F5] border border-[#E2D7C5] rounded-xs overflow-hidden shadow-sm group cursor-crosshair"
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
              <span className="text-[11px] font-mono uppercase tracking-wider font-semibold bg-[#173B32]/95 backdrop-blur-xs text-[#F3E5AB] px-3 py-1 rounded-xs border border-[#B08D57]/40 shadow-xs">
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
          <div className="absolute bottom-4 right-4 z-10 transition-opacity flex items-center gap-1.5 bg-black/70 backdrop-blur-xs text-white px-3 py-1.5 rounded-xs text-[10px] uppercase tracking-wider font-medium pointer-events-none">
            <ZoomIn className="w-3.5 h-3.5 text-[#F3E5AB]" />
            <span>{isHovering ? "2.2x Loupe Active" : "Hover / Click for Hallmark Zoom"}</span>
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
                className={`relative w-20 h-20 rounded-xs overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                  activeImageIndex === idx
                    ? "border-[#B08D57] shadow-sm ring-1 ring-[#B08D57]"
                    : "border-[#E5DFD5] opacity-70 hover:opacity-100"
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
        <div className="p-4 bg-[#EEF3EE] border border-[#C5D5C4] rounded-xs text-xs text-[#173B32] flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#1B6442] shrink-0" />
            <div>
              <strong className="block font-medium">100% BIS Hallmarked Creation</strong>
              <span className="text-[11px] text-[#626A65]">
                Laser-engraved with verifiable 6-digit alphanumeric HUID.
              </span>
            </div>
          </div>
          <Link
            href="/tools/jewellery-buying-checklist"
            className="text-[11px] uppercase tracking-wider font-semibold text-[#173B32] hover:text-[#B08D57] underline ml-2 shrink-0"
          >
            How to verify
          </Link>
        </div>
      </div>

      {/* ====================================================================
          RIGHT: SPECIFICATIONS, BULLION BREAKDOWN & INQUIRY ACTIONS (6 cols)
          ==================================================================== */}
      <div className="lg:col-span-6 space-y-6">
        {/* Breadcrumb & Identifier */}
        <div>
          <div className="flex items-center gap-2 text-xs text-[#626A65] mb-2 font-mono">
            <Link href="/jewellery" className="hover:text-[#182522]">Jewellery</Link>
            <span>/</span>
            {product.category_name && (
              <>
                <span className="uppercase">{product.category_name}</span>
                <span>/</span>
              </>
            )}
            <span className="font-bold text-[#173B32]">{product.sku}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-[#182522] font-normal leading-tight">
            {product.name}
          </h1>
        </div>

        {/* Pricing & Valuation Card */}
        <div className="p-6 bg-white border border-[#E2D7C5] rounded-xs shadow-xs space-y-3">
          {product.price_mode === "fixed_price" && product.fixed_price_amount ? (
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#626A65] block mb-1">
                Fixed Shop Price
              </span>
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-[#182522]">
                  ₹{product.fixed_price_amount.toLocaleString("en-IN")}
                </span>
                <span className="text-xs text-[#626A65]">Inclusive of all statutory taxes (3% GST)</span>
              </div>
            </div>
          ) : product.price_mode === "indicative_estimate" ? (
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="estimate">Indicative Gold Estimate</Badge>
              </div>
              <p className="text-xs text-[#626A65] mt-2 leading-relaxed">
                Calculated from today&apos;s gold market rate (22K ₹7,470/g) plus handcrafting making charges. Exact final bill is calculated on our digital scale at our shop.
              </p>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="quote">Price on Formal Quotation</Badge>
              </div>
              <p className="text-xs text-[#626A65] mt-2 leading-relaxed">
                {product.price_assumptions ||
                  "This piece is valued upon in-shop inspection, based on the day's gold rate and exact gemstone weight."}
              </p>
            </div>
          )}

          {/* Physical Shop Status */}
          <div className="pt-3 border-t border-[#F0ECE2] flex items-center justify-between text-xs text-[#626A65]">
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1B6442] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1B6442]"></span>
              </span>
              Shop Availability: <strong className="text-[#182522] capitalize">{product.status}</strong>
            </span>
            <span className="text-[11px] text-[#8F9691] font-mono">
              Available in Our Shop
            </span>
          </div>
        </div>

        {/* Primary Action Suite */}
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => openEnquiry("quote_request")}
              className="btn-gold-pure py-3.5 px-4 rounded-xs text-xs uppercase tracking-[0.18em] font-semibold flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#182522]" />
              <span>Request Price Quote</span>
            </button>

            <button
              type="button"
              onClick={() => openEnquiry("showroom_viewing")}
              className="py-3.5 px-4 rounded-xs text-xs uppercase tracking-[0.18em] font-semibold text-[#173B32] bg-white border border-[#173B32] hover:bg-[#173B32] hover:text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Calendar className="w-3.5 h-3.5 text-[#B08D57]" />
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
            className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20BA59] text-white rounded-xs text-xs font-semibold uppercase tracking-[0.16em] flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-white" />
            <span>Enquire on WhatsApp</span>
          </a>
        </div>

        {/* Verified Physical Specifications Table (Indian Legal Metrology Compliance) */}
        <Card className="p-6 bg-white border border-[#E5DFD5]">
          <h3 className="font-serif text-base font-medium text-[#182522] border-b border-[#E5DFD5] pb-3 mb-4 flex items-center gap-2">
            <Scale className="w-4 h-4 text-[#B08D57]" />
            Exact Weight &amp; Purity Details
          </h3>

          <div className="grid grid-cols-2 gap-y-3 text-xs">
            <span className="text-[#626A65]">Unique SKU Identifier:</span>
            <span className="font-mono text-[#182522] font-bold">{product.sku}</span>

            {product.metal_purity && (
              <>
                <span className="text-[#626A65]">Metal Purity:</span>
                <span className="text-[#182522] font-semibold">{product.metal_purity}</span>
              </>
            )}

            {product.gross_weight_grams && (
              <>
                <span className="text-[#626A65]">Gross Weight (Total):</span>
                <span className="text-[#182522] font-medium">{product.gross_weight_grams} Grams</span>
              </>
            )}

            {product.net_gold_weight_grams && (
              <>
                <span className="text-[#626A65]">Net Gold Weight (Metal Only):</span>
                <span className="text-[#173B32] font-bold">{product.net_gold_weight_grams} Grams</span>
              </>
            )}

            {product.dimensions && (
              <>
                <span className="text-[#626A65]">Dimensions / Length:</span>
                <span className="text-[#182522]">{product.dimensions}</span>
              </>
            )}

            {product.size_variant && (
              <>
                <span className="text-[#626A65]">Size Variant:</span>
                <span className="text-[#182522]">{product.size_variant}</span>
              </>
            )}

            {product.gemstone_details && (
              <>
                <span className="text-[#626A65]">Studded Gemstones:</span>
                <span className="text-[#182522] font-medium">{product.gemstone_details}</span>
              </>
            )}
          </div>
        </Card>

        {/* Description */}
        <div className="space-y-3 text-xs sm:text-sm text-[#626A65] leading-relaxed">
          {product.short_description && (
            <p className="font-medium text-[#182522]">
              {product.short_description}
            </p>
          )}
          {product.long_description && (
            <p>{product.long_description}</p>
          )}
        </div>

        {/* In-Shop Collection Policy Notice */}
        <div className="bg-[#FAF8F5] border border-[#E2D7C5] rounded-xs p-4 text-xs text-[#626A65] flex items-start gap-3">
          <MapPin className="w-4 h-4 text-[#B08D57] shrink-0 mt-0.5" />
          <div>
            <strong className="text-[#182522] block mb-0.5">In-Person Shop Collection:</strong>
            To ensure 100% purity, zero courier damage, and allow you to weigh the piece in person on digital scales, all purchases are completed at our shop counter.
          </div>
        </div>
      </div>

      {/* Inquiry Dialog */}
      <ProductEnquiryDialog
        productId={product.id}
        productName={product.name}
        productSku={product.sku}
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        defaultEnquiryType={defaultEnquiryType}
      />

      {/* Hallmark Inspection Macro Modal */}
      {isZoomModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setIsZoomModalOpen(false)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] w-full bg-[#061410] border border-[#B08D57]/60 rounded-xs p-4 sm:p-6 shadow-2xl flex flex-col space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between text-white border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#F3E5AB] font-bold block">
                  Close-Up Magnified View &bull; BIS Hallmark &amp; Detail Inspection
                </span>
                <h3 className="font-serif text-lg text-white">
                  {product.name} ({product.sku})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsZoomModalOpen(false)}
                className="p-1.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
                aria-label="Close zoom"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative flex-1 min-h-[50vh] sm:min-h-[65vh] w-full overflow-hidden rounded-2xs bg-[#0A1A15]">
              <Image
                src={activeImage}
                alt={`${product.name} macro zoom`}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-[#DDE5DC] border-t border-white/10 pt-3">
              <span className="flex items-center gap-1.5 text-[11px] text-[#F3E5AB]">
                <ShieldCheck className="w-4 h-4 text-[#25D366]" />
                Inspect laser-etched BIS HUID, prong symmetry, and metal chasing details.
              </span>
              <span className="text-[10px] text-[#A3B3A9] font-mono">
                Click anywhere outside to close
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
