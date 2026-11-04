# VaidikRatnam — Comprehensive Visual Asset & Media Guide

This document details all technical standards, aspect ratios, lighting specifications, and replacement procedures for images, 3D assets, and media across the VaidikRatnam platform.

---

## 1. Photography & Image Asset Standards

### A. Lighting & Tone Philosophy
- **Sacred & Heritage Luxury:** Lighting should feel warm and architectural, reminiscent of heritage Indian temple sanctums and high-end atelier workbenches (e.g., Cartier, Bulgari, Sabyasachi Jewellery).
- **Gold Rendering:** 3200K warm directional key light with soft fill to highlight 22K/18K gold luster, nakshi engraving relief, and filigree detail without harsh digital clipping.
- **Gemstone Rendering (Ratnas):** Untreated, certified gemstones (Panna, Manik, Neelam, Pukhraj, Moti, Gomed, Lehsunia, Moonga, Heera) must be photographed under neutral daylight-balanced 5500K illumination to faithfully depict their natural pleochroism, silk inclusions, and authentic hue. Never oversaturate.

---

### B. Image Dimension & Compression Ratios

| Asset Category | Target Path / Usage | Aspect Ratio | Dimensions (WxH) | Target File Size | Preferred Formats |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Banners** | `public/images/hero/` | 16:9 / 21:9 | 2560 × 1440 px | < 350 KB | WebP, AVIF |
| **Salon / Heritage** | `public/images/salon/` | 4:3 or 16:10 | 1920 × 1280 px | < 250 KB | WebP, AVIF |
| **Product Showcase** | `public/images/products/` | 4:5 (Portrait) | 1200 × 1500 px | < 180 KB | WebP, AVIF |
| **Loose Gemstones** | `public/images/gemstones/`| 1:1 (Square) | 1200 × 1200 px | < 140 KB | WebP, AVIF |
| **Karigar Workshop** | `public/images/craft/` | 3:2 | 1800 × 1200 px | < 200 KB | WebP, AVIF |
| **Zodiac & Jyotish** | `src/components/lal-kitab`| Vector / SVG | Scalable Vector | < 50 KB | Inline SVG / SVG |

---

### C. Replacing Stock Photography with Real Store Inventory
1. Capture pieces on neutral slate, charcoal velvet, or warm raw silk fabric.
2. Export as high-resolution WebP files (`cwebp -q 82 input.png -o output.webp`).
3. Store assets in `/public/images/` or upload via the Admin Media Library at `/admin/media`.
4. Link images to individual products via `/admin/products/[id]/edit`.

---

## 2. 3D Model Pipeline & Geometries

### A. Procedural Fallbacks vs. External GLB Files
The site includes a dual-layer 3D engine:
1. **Zero-Byte Procedural Engine:** In `src/components/3d/geometries/GemGeometries.ts`, procedural geometries for emerald cut, round brilliant, oval, cushion, pear, bullion ingots, and coins render instantly without any external network request.
2. **External GLB Enhancements:** When placed in `public/models/`, pre-baked GLB models are loaded with Three.js `useGLTF`.

### B. Compression Standards
Run all 3D assets through Draco and Meshopt optimization:
```bash
npx @gltf-transform/cli optimize input.glb public/models/output.glb \
  --compress draco \
  --texture-compress webp
```

### C. Target Triangle & Memory Budgets
- **Hero Jewellery Piece:** < 80,000 triangles, < 1.4 MB.
- **Bullion Bars & Coins:** < 8,000 triangles, < 250 KB.
- **Zodiac Armillary Rings:** < 25,000 triangles, procedural cylinder and torus meshes.
- **Texture Maps:** Maximum 2048×2048 sRGB BaseColor and Linear Roughness/Metalness.

---

## 3. Bullion Rates & Currency Synchronization
- **Indicative Rates:** Updated automatically from Indian Bullion and Jewellers Association (IBJA) feeds or manually adjusted in Admin Settings (`/admin/settings`).
- **City Spread:** Dynamic city spread per gram added based on selected customer city (e.g. Mumbai, Delhi, Varanasi, Bengaluru).
- **Odometer Display:** Rates animate smoothly via `src/components/ui/RollingNumber.tsx`.

---

## 4. Lal Kitab Planetary & Chart Engine
- **Astronomical Precision:** Ephemeris calculations computed with Chitrapaksha (Lahiri) ayanamsa.
- **Fixed Houses:** Kal Purush chart (House 1 = Aries) strictly maintained across all 12 houses.
- **Safe Remedies:** All remedies in `src/lib/lal-kitab/data/upay.json` comply with safety principles:
  - 100% non-fear-based.
  - Respectful of animal welfare and human dignity.
  - Zero requirement of costly gemstones as the default remedy.
  - Safe 43-day continuous observance timelines.
