import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F4ED]">
      <Header />

      <main className="flex-1 flex items-center justify-center py-20 px-4 text-center">
        <div className="max-w-md mx-auto space-y-6">
          <div className="w-20 h-20 rounded-full bg-[#0F3D2E] border border-[#D4AF37]/60 mx-auto flex items-center justify-center p-1.5 shadow-md relative overflow-hidden">
            <Image
              src="/images/brand/app-icon-emerald-256.png"
              alt="Vaidik Ratnam"
              width={80}
              height={80}
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#D4AF37] font-semibold block mb-1">
              Page Not Found &bull; 404
            </span>
            <h1 className="font-serif text-3xl text-[#182522] font-normal">
              The Path You Seek Is Elsewhere
            </h1>
            <p className="text-xs sm:text-sm text-[#626A65] mt-2 leading-relaxed">
              The jewellery piece, gemstone, or page reference does not exist or may have been updated in our shop inventory.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link href="/jewellery">
              <Button variant="primary" size="md" className="text-xs uppercase tracking-wider">
                Browse Jewellery Catalogue
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="md" className="text-xs uppercase tracking-wider">
                Return Home
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
