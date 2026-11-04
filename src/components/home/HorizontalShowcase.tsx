"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Rotate3D, MessageCircle, Sparkles } from "lucide-react";
import { Product3DModal } from "@/components/3d/components/Product3DModal";
import { Product3DType } from "@/components/3d/components/ProductViewer3D";
import { MagneticButton } from "@/components/ui/MagneticButton";

export interface ShowcaseProduct {
  id: string;
  title: string;
  category: string;
  purity: string;
  huid: string;
  weight: string;
  priceDesc: string;
  image: string;
  href: string;
  tag: string;
  product3DType: Product3DType;
  badge: "Bridal Signature" | "Heirloom Classic" | "Jyotish Certified" | "Rare Natural Gem";
}

interface HorizontalShowcaseProps {
  products: ShowcaseProduct[];
  whatsappPhone: string;
  title?: string;
  subtitle?: string;
}

export function HorizontalShowcase({
  products,
  whatsappPhone,
  title = "Curated High Jewellery & Ratnas",
  subtitle = "Each piece crafted in-house by hereditary goldsmiths, weighed before your eyes with digital accuracy.",
}: HorizontalShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{
    type: Product3DType;
    title: string;
  }>({
    type: "emerald-pendant",
    title: "Zambian Emerald Pendant",
  });

  const categories = [
    { id: "all", label: "All Masterpieces" },
    { id: "bridal", label: "Bridal Signature" },
    { id: "ratna", label: "Certified Ratnas" },
    { id: "heirloom", label: "Heritage Gold" },
  ];

  const filteredProducts = products.filter((p) => {
    if (activeCategory === "bridal") return p.badge === "Bridal Signature";
    if (activeCategory === "ratna") return p.badge === "Jyotish Certified" || p.badge === "Rare Natural Gem";
    if (activeCategory === "heirloom") return p.badge === "Heirloom Classic";
    return true;
  });

  const handleOpen3D = (type: Product3DType, productTitle: string) => {
    setSelectedProduct({ type, title: productTitle });
    setModalOpen(true);
  };

  return (
    <section className="relative py-24 bg-[#04170f] text-white overflow-hidden border-t border-[#d4af37]/20">
      {/* Giant Outlined Collection Watermark Drifting Behind */}
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 text-[14vw] font-serif font-black tracking-widest text-transparent uppercase select-none pointer-events-none opacity-5 whitespace-nowrap z-0"
        style={{
          WebkitTextStroke: "2px #d4af37",
        }}
      >
        VAIDIK RATNAM HERITAGE
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#d4af37] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Signature Vault</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal tracking-tight">
              {title}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#a8b6af] max-w-xl">
              {subtitle}
            </p>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-[#d4af37] text-[#04170f] font-bold shadow-lg shadow-[#d4af37]/20"
                    : "bg-[#0a2a1d]/60 text-[#d4af37] border border-[#d4af37]/30 hover:border-[#d4af37]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Horizontal Scroll Track */}
        <div className="flex gap-6 overflow-x-auto pb-8 pt-2 scrollbar-none snap-x snap-mandatory">
          {filteredProducts.map((item) => (
            <div
              key={item.id}
              className="min-w-[300px] sm:min-w-[340px] max-w-[360px] shrink-0 snap-start bg-[#0a2a1d]/70 backdrop-blur-md border border-[#d4af37]/30 rounded-2xl overflow-hidden group hover:border-[#d4af37] transition-all duration-500 shadow-2xl flex flex-col justify-between"
            >
              <div>
                {/* Image Container with Velvet Plinth Gradient */}
                <div className="relative aspect-[4/5] bg-radial from-[#0f3a28] to-[#04170f] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 300px, 360px"
                    className="object-cover group-hover:scale-108 transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  />

                  {/* Curated Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="text-[10px] font-mono uppercase tracking-wider font-semibold bg-[#04170f]/90 text-[#f1d98a] px-3 py-1 rounded-full border border-[#d4af37]/40 backdrop-blur-sm shadow-md">
                      {item.badge}
                    </span>
                  </div>

                  {/* 3D Real-time viewer trigger */}
                  <button
                    type="button"
                    onClick={() => handleOpen3D(item.product3DType, item.title)}
                    className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#04170f]/80 text-[#d4af37] border border-[#d4af37]/40 flex items-center justify-center hover:bg-[#d4af37] hover:text-[#04170f] transition-all duration-300 shadow-lg group-hover:scale-110 cursor-pointer"
                    title="Interactive 360° 3D Inspection"
                    aria-label={`View ${item.title} in real-time 3D`}
                  >
                    <Rotate3D className="w-4 h-4" />
                  </button>

                  {/* Bottom Hairline Metadata Strip */}
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#04170f] via-[#04170f]/80 to-transparent flex items-center justify-between text-[11px] font-mono text-[#a8b6af]">
                    <span>{item.purity}</span>
                    <span className="text-[#f1d98a]">{item.weight}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#d4af37] mb-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>HUID: {item.huid}</span>
                  </div>
                  <h3 className="font-serif text-xl text-white font-normal group-hover:text-[#f1d98a] transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#a8b6af] mt-1">
                    {item.priceDesc}
                  </p>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-5 pb-5 pt-2 border-t border-[#d4af37]/15 flex items-center justify-between gap-3">
                <Link
                  href={item.href}
                  className="text-xs font-mono uppercase tracking-wider text-[#d4af37] hover:text-[#f6e7b4] transition-colors"
                >
                  Inspect Details &rarr;
                </Link>
                <a
                  href={`https://wa.me/${whatsappPhone}?text=Namaste%2C%20I%20am%20inquiring%20about%20the%20${encodeURIComponent(
                    item.title
                  )}%20(HUID%3A%20${encodeURIComponent(item.huid)})`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] flex items-center justify-center hover:bg-[#25D366] hover:text-black transition-all"
                  aria-label="Enquire on WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA to Full Vault */}
        <div className="mt-8 text-center">
          <Link href="/jewellery">
            <MagneticButton variant="gold" className="px-6 py-2.5 text-xs font-mono uppercase tracking-wider">
              Explore Full Hallmarked Vault &rarr;
            </MagneticButton>
          </Link>
        </div>
      </div>

      {/* 3D Product Inspection Modal */}
      <Product3DModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        productType={selectedProduct.type}
        productTitle={selectedProduct.title}
      />
    </section>
  );
}
