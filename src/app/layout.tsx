import type { Metadata } from "next";
import {
  Playfair_Display,
  Cormorant_Garamond,
  Inter,
  Noto_Serif_Devanagari,
  Space_Mono,
} from "next/font/google";
import "./globals.css";
import { Preloader } from "@/components/ui/Preloader";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { StudioAssistantWidget } from "@/components/ai/StudioAssistantWidget";
import { CapabilityProvider } from "@/components/3d/context/CapabilityContext";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { PageTransition } from "@/components/ui/PageTransition";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-accent",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const devanagari = Noto_Serif_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Vaidik Ratnam",
    default: "Vaidik Ratnam — Timeless Jewellery • Guided by Wisdom",
  },
  description:
    "Traditional Indian Gold Jewellery & Genuine Astrological Gemstone Shop. 100% BIS Hallmarked 22K/18K gold with 6-digit HUID, custom handmade pieces by in-house karigars, certified natural Ratna, and honest Parashari Jyotish guidance.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://vaidikratnam.com"
  ),
  keywords: [
    "Vaidik Ratnam",
    "Indian Jewellery Shop",
    "Gold Jewellery",
    "Custom Jewellery",
    "Natural Gemstones",
    "Certified Ratna",
    "Vedic Astrology Advice",
    "BIS Hallmarked Gold",
    "Jaipur Jewellery",
  ],
  authors: [{ name: "Vaidik Ratnam Family Shop" }],
  icons: {
    icon: [
      { url: "/favicon-32x32.png?v=2", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png?v=2", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico?v=2" },
      { url: "/favicon-192x192.png?v=2", sizes: "192x192", type: "image/png" },
      { url: "/favicon-512x512.png?v=2", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico?v=2",
    apple: "/apple-touch-icon.png?v=2",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://vaidikratnam.com",
    siteName: "Vaidik Ratnam",
    title: "Vaidik Ratnam — Timeless Jewellery • Guided by Wisdom",
    description:
      "100% BIS Hallmarked gold, custom karigari, and natural gemstones from our trusted multi-generational family shop.",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Vaidik Ratnam — Timeless Jewellery • Guided by Wisdom",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vaidik Ratnam — Timeless Jewellery • Guided by Wisdom",
    description:
      "100% BIS Hallmarked gold, custom karigari, and natural gemstones from our trusted multi-generational family shop.",
    images: ["/api/og"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${inter.variable} ${devanagari.variable} ${spaceMono.variable}`}
    >
      <body className="antialiased bg-[#FAF7F0] text-[#0B0B0B] selection:bg-[#D4AF37]/25 selection:text-[#04170F]">
        <CapabilityProvider>
          <SmoothScrollProvider>
            <Preloader />
            <CustomCursor />
            <PageTransition />
            {children}
            <FloatingWhatsApp />
            <StudioAssistantWidget />
          </SmoothScrollProvider>
        </CapabilityProvider>
      </body>
    </html>
  );
}
