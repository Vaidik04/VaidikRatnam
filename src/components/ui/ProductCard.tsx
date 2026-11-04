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
    <div className="group bg-[#0a2a1d]/85 border border-[#d4af37]/30 hover:border-[#d4af37] rounded-2xl flex flex-col overflow-hidden shadow-xl hover:shadow-[0_10px_35px_rgba(212,175,55,0.2)] transition-all duration-500 relative text-[#faf7f0]">
      {/* High-Jewellery Image Container with Zoom & Vignette */}
      <Link
        href={`/jewellery/${product.slug}`}
        className="relative aspect-square bg-radial from-[#0f3a28] to-[#04170f] block overflow-hidden cursor-pointer"
      >
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-108 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        />

        {/* Soft Luxury Gradient Vignette Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#04170f] via-transparent to-[#04170f]/30 opacity-60 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none" />

        {/* Purity Badge overlay */}
        {product.metal_purity && (
          <div className="absolute top-3 left-3 z-10">
            <span className="text-[10px] font-mono uppercase tracking-wider font-semibold bg-[#04170f]/90 backdrop-blur-md text-[#f1d98a] px-2.5 py-1 rounded-full border border-[#d4af37]/50 shadow-md">
              {product.metal_purity}
            </span>
          </div>
        )}

        {/* Hallmark Pill overlay */}
        <div className="absolute bottom-3 left-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-[9px] font-mono uppercase tracking-widest bg-[#04170f]/95 backdrop-blur-md text-[#f1d98a] px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1 shadow-md border border-[#d4af37]/50">
            <ShieldCheck className="w-3 h-3 text-[#10b981]" />
            <span>BIS Care 6-Digit HUID</span>
          </span>
        </div>

        {product.is_demo === 1 && (
          <div className="absolute top-3 right-3 z-10">
            <Badge variant="demo">Demo Sample</Badge>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4 bg-[#04170f]/90">
        <div>
          {/* SKU and Category */}
          <div className="flex items-center justify-between text-[11px] text-[#a8b6af] mb-1.5 font-mono">
            <span className="tracking-wider">{product.sku}</span>
            {product.category_name && (
              <span className="uppercase tracking-widest text-[10px] text-[#d4af37] font-medium">
                {product.category_name}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-serif text-lg text-white font-normal leading-snug line-clamp-2 group-hover:text-[#f1d98a] transition-colors">
            <Link href={`/jewellery/${product.slug}`}>
              {product.name}
            </Link>
          </h3>

          {/* Specifications summary */}
          <div className="mt-2.5 text-xs text-[#a8b6af] flex items-center gap-2 flex-wrap font-mono">
            {product.gross_weight_grams && (
              <span className="bg-[#0a2a1d] px-2 py-0.5 rounded-md border border-[#d4af37]/25 text-[11px] text-[#c8d4cf]">
                Gross: <strong className="text-white font-medium">{product.gross_weight_grams}g</strong>
              </span>
            )}
            {product.net_gold_weight_grams && (
              <span className="bg-[#14502f]/40 px-2 py-0.5 rounded-md border border-[#10b981]/40 text-[11px] text-[#f1d98a]">
                Net Gold: <strong className="font-medium text-white">{product.net_gold_weight_grams}g</strong>
              </span>
            )}
          </div>
        </div>

        {/* Price / Mode & Action Bar */}
        <div className="pt-3.5 border-t border-white/10 flex items-end justify-between gap-2">
          <div>
            {product.price_mode === "fixed_price" && product.fixed_price_amount ? (
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#a8b6af] block font-mono">
                  Shop Price
                </span>
                <span className="font-mono text-lg font-bold text-[#f1d98a]">
                  ₹{product.fixed_price_amount.toLocaleString("en-IN")}
                </span>
              </div>
            ) : product.price_mode === "indicative_estimate" ? (
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#d4af37] block font-mono font-medium">
                  Live Gold Valuation
                </span>
                <span className="text-xs text-white font-mono">
                  Calculated by Gram Rate
                </span>
              </div>
            ) : (
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#d4af37] block font-mono font-medium">
                  Bespoke Karigari
                </span>
                <span className="text-xs text-white font-mono">
                  Quotation on Request
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Direct WhatsApp Quick Chat */}
            <a
              href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
                `Namaste Vaidik Ratnam, I am inquiring about ${product.name} (SKU: ${product.sku}). Please share current pricing and hallmark details.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-[#25D366] bg-[#0a2a1d] border border-[#25D366]/40 hover:bg-[#25D366] hover:text-[#04170f] transition-all shadow-md"
              title="Quick enquiry on WhatsApp"
              aria-label={`Inquire about ${product.name} on WhatsApp`}
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            {/* Inspect Link */}
            <Link
              href={`/jewellery/${product.slug}`}
              className="text-[11px] font-mono uppercase tracking-wider font-semibold text-[#f1d98a] hover:text-white flex items-center gap-1 py-1.5 px-3 rounded-lg bg-[#14502f] hover:bg-[#1a663c] border border-[#d4af37]/40 transition-colors shadow-md"
            >
              <span>View</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
