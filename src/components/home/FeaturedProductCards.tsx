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
            className="group bg-white border border-[#E8DFC8] rounded-xs flex flex-col overflow-hidden luxury-card-hover relative shadow-xs"
          >
            {/* Image Container */}
            <div className="relative aspect-square bg-[#FAF8F5] block overflow-hidden">
              <Link href={item.href}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </Link>

              {/* Tag */}
              <div className="absolute top-3 left-3 z-10 pointer-events-none">
                <span className="text-[10px] font-mono uppercase tracking-wider font-semibold bg-[#0F3D2E]/95 text-[#F3E5AB] px-2.5 py-1 rounded-xs border border-[#D4AF37]/40 shadow-xs">
                  {item.tag}
                </span>
              </div>

              {/* 3D Quick Inspect Button */}
              <button
                type="button"
                onClick={() => handleOpen3D(item.product3DType, item.title)}
                className="absolute top-3 right-3 z-10 bg-black/60 hover:bg-[#0F3D2E] text-[#F3E5AB] border border-[#D4AF37]/60 px-2 py-1 rounded-full text-[10px] font-mono flex items-center gap-1 backdrop-blur-md transition-all shadow-md cursor-pointer hover:scale-105"
                title="Inspect in 3D"
              >
                <Rotate3D className="w-3 h-3 text-[#D4AF37]" />
                <span>3D</span>
              </button>

              {/* BIS HUID Badge */}
              <div className="absolute bottom-3 left-3 z-10 opacity-90 pointer-events-none">
                <span className="text-[9px] font-sans uppercase tracking-widest bg-white/95 text-[#0F3D2E] px-2 py-0.5 rounded-xs font-semibold flex items-center gap-1 shadow-xs border border-[#E8DFC8]">
                  <ShieldCheck className="w-3 h-3 text-[#1B6442]" />
                  BIS HUID
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3 bg-white">
              <div>
                <span className="text-[10px] font-mono text-[#B59328] uppercase tracking-wider block mb-1">
                  {item.category}
                </span>
                <Link href={item.href}>
                  <h3 className="font-serif text-base font-normal text-[#0F3D2E] leading-snug group-hover:text-[#B59328] transition-colors">
                    {item.title}
                  </h3>
                </Link>
                <p className="text-[11px] text-[#4B3F36] mt-1 font-light">
                  {item.purity} &bull; {item.huid}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E8DFC8] flex items-center justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-[#A8B6AF] block">
                    Pricing Formula
                  </span>
                  <span className="text-xs font-mono font-semibold text-[#0F3D2E]">
                    Weight &times; Daily Rate + Craft
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleOpen3D(item.product3DType, item.title)}
                    className="p-2 rounded-xs bg-[#D4AF37]/15 hover:bg-[#D4AF37] text-[#0F3D2E] hover:text-black transition-colors cursor-pointer"
                    title="View in 3D"
                  >
                    <Rotate3D className="w-4 h-4 text-[#B59328]" />
                  </button>

                  <a
                    href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
                      `Namaste Vaidik Ratnam, I am interested in viewing "${item.title}" at your shop. Please share availability and today's final estimate.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xs bg-[#0F3D2E]/10 hover:bg-[#0F3D2E] text-[#0F3D2E] hover:text-[#F3E5AB] transition-colors"
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

