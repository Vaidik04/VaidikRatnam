import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "./Badge";
import { Product } from "@/lib/db/repo";
import { ShieldCheck, MessageCircle, ArrowUpRight } from "lucide-react";

export function ProductCard({ product }: { product: Product }) {
  const imageUrl = product.primary_media_url || "/placeholder-jewellery.svg";
  const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "919876543210";

  return (
    <div className="group bg-white border border-[#E5DFD5] rounded-xs flex flex-col overflow-hidden luxury-card-hover relative">
      {/* High-Jewellery Image Container with Zoom & Vignette */}
      <Link
        href={`/jewellery/${product.slug}`}
        className="relative aspect-square bg-[#FAF8F5] block overflow-hidden cursor-pointer"
      >
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Soft Luxury Gradient Vignette Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#182522]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Purity Badge overlay */}
        {product.metal_purity && (
          <div className="absolute top-3 left-3 z-10">
            <span className="text-[10px] font-mono uppercase tracking-wider font-semibold bg-[#173B32]/95 backdrop-blur-xs text-[#F3E5AB] px-2.5 py-1 rounded-xs border border-[#B08D57]/40 shadow-xs">
              {product.metal_purity}
            </span>
          </div>
        )}

        {/* Hallmark Pill overlay */}
        <div className="absolute bottom-3 left-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-[9px] font-sans uppercase tracking-widest bg-white/95 backdrop-blur-xs text-[#173B32] px-2 py-0.5 rounded-xs font-semibold flex items-center gap-1 shadow-xs border border-[#E5DFD5]">
            <ShieldCheck className="w-3 h-3 text-[#1B6442]" />
            BIS HUID
          </span>
        </div>

        {product.is_demo === 1 && (
          <div className="absolute top-3 right-3 z-10">
            <Badge variant="demo">Demo Sample</Badge>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3 bg-white">
        <div>
          {/* SKU and Category */}
          <div className="flex items-center justify-between text-[11px] text-[#626A65] mb-1">
            <span className="font-mono tracking-wider">{product.sku}</span>
            {product.category_name && (
              <span className="uppercase tracking-widest text-[10px] text-[#B08D57] font-medium">
                {product.category_name}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-serif text-base sm:text-lg text-[#182522] font-normal leading-snug line-clamp-2 group-hover:text-[#173B32] transition-colors">
            <Link href={`/jewellery/${product.slug}`}>
              {product.name}
            </Link>
          </h3>

          {/* Specifications summary */}
          <div className="mt-2 text-xs text-[#626A65] flex items-center gap-3">
            {product.gross_weight_grams && (
              <span className="bg-[#FAF8F5] px-2 py-0.5 rounded-xs border border-[#E5DFD5] text-[11px]">
                Gross: <strong className="text-[#182522] font-medium">{product.gross_weight_grams}g</strong>
              </span>
            )}
            {product.net_gold_weight_grams && (
              <span className="bg-[#EEF3EE] px-2 py-0.5 rounded-xs border border-[#C5D5C4] text-[11px] text-[#173B32]">
                Net Gold: <strong className="font-medium">{product.net_gold_weight_grams}g</strong>
              </span>
            )}
          </div>
        </div>

        {/* Price / Mode & Action Bar */}
        <div className="pt-3 border-t border-[#F0ECE2] flex items-end justify-between gap-2">
          <div>
            {product.price_mode === "fixed_price" && product.fixed_price_amount ? (
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#626A65] block">
                  Shop Price
                </span>
                <span className="font-serif text-base sm:text-lg font-bold text-[#182522]">
                  ₹{product.fixed_price_amount.toLocaleString("en-IN")}
                </span>
              </div>
            ) : product.price_mode === "indicative_estimate" ? (
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#1A4B75] block font-medium">
                  Estimated Price
                </span>
                <span className="text-xs text-[#182522] font-medium">
                  Based on Gold Rate
                </span>
              </div>
            ) : (
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#B08D57] block font-medium">
                  Custom Made
                </span>
                <span className="text-xs text-[#182522] font-medium">
                  Price on Request
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Direct WhatsApp Quick Chat */}
            <a
              href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
                `Namaste Vaidik Ratnam, I am inquiring about ${product.name} (SKU: ${product.sku}). Please share current pricing and hallmark details.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-xs text-[#173B32] hover:text-[#1B6442] hover:bg-[#EEF3EE] transition-colors"
              title="Quick enquiry on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            {/* Inspect Link */}
            <Link
              href={`/jewellery/${product.slug}`}
              className="text-[11px] uppercase tracking-wider font-semibold text-[#173B32] hover:text-[#B08D57] flex items-center gap-0.5 py-1 px-2.5 rounded-xs bg-[#FAF8F5] hover:bg-[#EAE4D7] border border-[#E5DFD5] transition-colors"
            >
              <span>View</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
