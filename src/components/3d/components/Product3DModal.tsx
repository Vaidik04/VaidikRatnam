"use client";

import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ProductViewer3D, Product3DType } from "./ProductViewer3D";
import { X, MessageCircle, Rotate3D, Sliders } from "lucide-react";

interface Product3DModalProps {
  isOpen: boolean;
  onClose: () => void;
  productType: Product3DType;
  productTitle: string;
  whatsappMessage?: string;
}

export function Product3DModal({
  isOpen,
  onClose,
  productType,
  productTitle,
  whatsappMessage = "Namaste, I am inquiring about viewing this jewellery piece in 3D.",
}: Product3DModalProps) {
  const [lightAngle, setLightAngle] = useState(45);

  if (!isOpen) return null;

  const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
    `${whatsappMessage} (${productTitle})`
  )}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl h-[85vh] bg-[#071913] border border-[#d4af37]/40 rounded-xs shadow-2xl flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#d4af37]/20 bg-[#0a231b]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center">
              <Rotate3D className="w-4 h-4 text-[#d4af37]" />
            </div>
            <div>
              <h3 className="font-serif text-lg text-[#f3e5ab] font-medium leading-tight">
                {productTitle}
              </h3>
              <span className="text-[10px] text-[#a8b6af] font-mono uppercase tracking-wider block">
                Interactive 360° Studio Inspection &bull; Drag to Rotate
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#a8b6af] hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3D Canvas Area */}
        <div className="flex-1 relative cursor-grab active:cursor-grabbing">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 45 }}
            gl={{ antialias: true, alpha: true }}
          >
            {/* Dynamic light driven by slider */}
            <directionalLight
              position={[
                Math.cos((lightAngle * Math.PI) / 180) * 5,
                4,
                Math.sin((lightAngle * Math.PI) / 180) * 5,
              ]}
              intensity={2.0}
              color="#fff6e0"
            />
            <ProductViewer3D
              productType={productType}
              autoRotate={false}
              showAnnotations={true}
            />
          </Canvas>

          {/* Floating Instructions */}
          <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[10px] text-[#dde5dc] pointer-events-none">
            Click &amp; drag to examine facets &bull; Tap gold markers for details
          </div>
        </div>

        {/* Bottom Control Bar */}
        <div className="px-6 py-4 border-t border-[#d4af37]/20 bg-[#0a231b] flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Light Direction Slider */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Sliders className="w-4 h-4 text-[#d4af37] shrink-0" />
            <span className="text-xs text-[#dde5dc] whitespace-nowrap">Studio Key Light:</span>
            <input
              type="range"
              min="0"
              max="360"
              value={lightAngle}
              onChange={(e) => setLightAngle(Number(e.target.value))}
              className="w-32 accent-[#d4af37] cursor-pointer"
            />
          </div>

          {/* WhatsApp Action */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xs bg-[#25D366] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#20ba5a] transition-all shadow-md cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Enquire on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}

