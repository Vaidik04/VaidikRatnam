import type { Metadata } from "next";
import "./styles/globals.css";
import { Hero } from "./components/Hero";

export const metadata: Metadata = {
  title: "VaidikRatnam | Timeless Jewellery • Guided by Wisdom",
  description: "Premium Indian jewellery, natural gemstones, and expert astrological guidance.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <main>{children}</main>
      </body>
    </html>
  );
}
