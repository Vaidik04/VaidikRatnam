"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, MessageCircle, Rotate3D } from "lucide-react";
import { Product3DModal } from "@/components/3d/components/Product3DModal";
import { Product3DType } from "@/components/3d/components/ProductViewer3D";

interface FeaturedItem {
  title: string;
  category: string;
  purity: string;
  huid: string;
  priceDesc: string;
  image: string;
  href: string;
  tag: string;
  product3DType: Product3DType;
}

interface FeaturedProductCardsProps {
  items: FeaturedItem[];
  whatsappPhone: string;
}

export function FeaturedProductCards({ items, whatsappPhone }: FeaturedProductCardsProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{
    type: Product3DType;
    title: string;
  }>({
    type: "emerald-pendant",
    title: "Zambian Emerald Pendant",
  });

  const handleOpen3D = (type: Product3DType, title: string) => {
    setSelectedProduct({ type, title });
    setModalOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div
            key={item.title}
            className="group bg-[#0a2a1d]/85 border border-[#d4af37]/30 rounded-2xl flex flex-col overflow-hidden hover:border-[#d4af37] transition-all duration-500 relative shadow-xl hover:shadow-[#d4af37]/10"
          >
            {/* Image Container */}
            <div className="relative aspect-square bg-[#04170f] block overflow-hidden">
              <Link href={item.href}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
              </Link>

              {/* Tag */}
              <div className="absolute top-3 left-3 z-10 pointer-events-none">
                <span className="text-[10px] font-mono uppercase tracking-wider font-semibold bg-[#04170f]/90 text-[#f1d98a] px-2.5 py-1 rounded-full border border-[#d4af37]/40 shadow-sm backdrop-blur-sm">
                  {item.tag}
                </span>
              </div>

              {/* 3D Quick Inspect Button */}
              <button
                type="button"
                onClick={() => handleOpen3D(item.product3DType, item.title)}
                className="absolute top-3 right-3 z-10 bg-[#04170f]/80 hover:bg-[#d4af37] text-[#d4af37] hover:text-[#04170f] border border-[#d4af37]/50 px-2.5 py-1 rounded-full text-[10px] font-mono flex items-center gap-1.5 backdrop-blur-md transition-all shadow-md cursor-pointer hover:scale-105"
                title="Inspect in 3D"
              >
                <Rotate3D className="w-3.5 h-3.5" />
                <span>3D</span>
              </button>

              {/* BIS HUID Badge */}
              <div className="absolute bottom-3 left-3 z-10 opacity-95 pointer-events-none">
                <span className="text-[9px] font-mono uppercase tracking-widest bg-[#04170f]/95 text-[#f6e7b4] px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1 shadow-xs border border-[#d4af37]/40">
                  <ShieldCheck className="w-3 h-3 text-[#d4af37]" />
                  BIS HUID
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3 bg-[#0a2a1d]/90 text-[#faf7f0]">
              <div>
                <span className="text-[10px] font-mono text-[#d4af37] uppercase tracking-wider block mb-1">
                  {item.category}
                </span>
                <Link href={item.href}>
                  <h3 className="font-serif text-base font-normal text-white leading-snug group-hover:text-[#f1d98a] transition-colors">
                    {item.title}
                  </h3>
                </Link>
                <p className="text-[11px] text-[#a8b6af] mt-1 font-mono">
                  {item.purity} &bull; {item.huid}
                </p>
              </div>

              <div className="pt-3 border-t border-[#d4af37]/20 flex items-center justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-[#a8b6af] block font-mono">
                    Pricing Formula
                  </span>
                  <span className="text-xs font-mono font-semibold text-[#f1d98a]">
                    Weight &times; Daily Rate + Craft
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpen3D(item.product3DType, item.title)}
                    className="p-2 rounded-lg bg-[#04170f] hover:bg-[#d4af37] text-[#d4af37] hover:text-[#04170f] border border-[#d4af37]/40 transition-colors cursor-pointer"
                    title="View in 3D"
                  >
                    <Rotate3D className="w-4 h-4" />
                  </button>

                  <a
                    href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
                      `Namaste Vaidik Ratnam, I am interested in viewing "${item.title}" at your shop. Please share availability and today's final estimate.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-black border border-[#25D366]/40 transition-colors"
                    title="Enquire on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3D Immersive Viewer Modal */}
      <Product3DModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        productType={selectedProduct.type}
        productTitle={selectedProduct.title}
      />
    </>
  );
}

