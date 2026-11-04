# VaidikRatnam — Comprehensive QA & Verification Checklist

This document serves as the master quality assurance checklist across all 7 phases of the VaidikRatnam luxury jewellery, gemstone, and Jyotish digital experience.

---

## Phase 1: Foundation & Design System
- [x] **Brand Color Tokens:** Emerald (`#04170f`, `#0a2a1d`, `#0f3a28`), Antique Gold (`#f6e7b4`, `#d4af37`, `#a8821f`), Ivory (`#faf7f0`), Ruby Glass (`#8e1b2e`).
- [x] **Vector SVG Logo:** Transparent animatable VR monogram with stroke-draw, 135° gold gradient, and periodic specular sweep.
- [x] **Typography:** Cormorant Garamond / Playfair Display serif headings restored across every route; Noto Serif Devanagari for sacred glyphs; monospace data labels.
- [x] **Layout & Textures:** Jharokha arched masks, hairline gold dividers with central diamond ornament, 3% film grain overlay, and responsive asymmetric grids.
- [x] **Lenis Smooth Scroll:** Inertial scrolling wired with a 2.5px top gold progress bar.
- [x] **Lite Mode & Reduced Motion:** Instant toggle in footer and capability detector for low-power devices.

---

## Phase 2: Global Experience Layer
- [x] **Temple-Door Preloader:** Animated VR monogram extrusion with two-leaf temple door split reveal. Session-persisted via `sessionStorage`.
- [x] **Dynamic Custom Cursor:** Precision center dot, smooth lagging gold ring, context hover labels (`View`, `Craft`, `Explore`), and a 18-particle sparkle trail. Disabled on touch.
- [x] **Liquid Gold Page Transitions:** Curtain wipe transition on Next.js App Router route changes.
- [x] **Magnetic Buttons:** Damped cursor pull, shimmer sweep, and multidirectional sparkle particle bursts on primary CTAs.
- [x] **Live Bullion Ticker:** Continuous marquee with rolling number odometer, micro-trend arrows, and IBJA sync status.
- [x] **Concierge Tools:** Softly pulsing floating WhatsApp pill and celestial gold-glass AI Advisor orb.

---

## Phase 3 & 4: 3D Core & Interactive Home Experiences
- [x] **Persistent Canvas & Tiers:** Three.js / React Three Fiber with dynamic import (`ssr: false`), capability detection (`HIGH`, `MEDIUM`, `LOW`), adaptive DPR, and memory disposal on unmount.
- [x] **PBR Physical Materials:** Antique gold (metalness 1, roughness 0.22, clearcoat 0.3), polished gold (roughness 0.08), and physical refraction gemstones with authentic IORs (Emerald 1.57, Ruby/Sapphire 1.77, Diamond 2.4).
- [x] **Hero 3D Scene:** Sacred arched temple frame, refractive emerald, orbiting Navagraha satellites, and 2,000+ twinkling gold dust particles.
- [x] **Interactive 3D Gold Calculator:** Live stack of gold ingots & coins that dynamically scales with user-selected weight and purity karat tone (24K, 22K, 18K, 14K).
- [x] **360° Product Viewer & Modal:** Velvet plinth, drag-to-rotate, double-click reset, and pulsing metadata hotspots.
- [x] **Sketch to Solid Gold:** 5-phase transformation with wireframe, wax carving, emissive molten shader, and polished hallmarked finish.

---

## Phase 5: Jyotish Armillary & Heritage Pages
- [x] **12-Rashi Armillary Sphere:** 3D celestial rings with Devanagari glyphs, central radiance, and Navagraha orbits.
- [x] **Behind the Shop:** Parallax workshop photo stack, rotating mandala line art, and golden drawn timeline.
- [x] **Weigh Gold in Front of You:** Heritage visit us showcase with digital scale guarantee and Google Review tags.
- [x] **Inner Pages Polish:** Arched hero banners, split-text headings, and synchronized metadata across `/jewellery`, `/gemstones`, `/custom-design`, `/astrology`, `/about`, and `/contact`.

---

## Phase 6: Lal Kitab 1952 Module (`/jyotish/lal-kitab`)
- [x] **3-Layer Architecture:** Strict separation between Astronomical calculation, Data-driven rule engine, and Reviewed interpretation text.
- [x] **Sidereal Ephemeris & Ayanamsa:** Chitrapaksha / Lahiri ayanamsa with boundary warning flags (< 1°).
- [x] **Historical Timezone Resolver:** Automatic detection of Indian War Time (UTC+06:30 between 1942–1945) vs standard IST (UTC+05:30).
- [x] **Fixed-House Kal Purush Chart:** Mesha (Aries) permanently fixed as House 1; North-Indian diamond SVG layout with Devanagari and English toggles.
- [x] **Rule Engine Modules:** Sleeping houses/planets (*Soya Ghar/Grah*), chart classifications (*Dharmi*, *Andha*, *Ratondha*, *Nabalig*), and Rin karmic debts.
- [x] **Safe Upay Planner:** 43-day non-fear-based remedies; strictly zero animal harm, zero costly gemstone compulsion, zero medical abandonment.
- [x] **Data Privacy (DPDP Act 2023):** Explicit consent checkbox, ephemeral in-memory processing, no sensitive birth data logged to analytics.
- [x] **Diagnostic Route (`/dev/lal-kitab`):** Transparent debug panel displaying raw ephemeris JSON, fired rule IDs, and confidence levels.
- [x] **Scholarly Methods Page (`/jyotish/lal-kitab/methods`):** Comprehensive public disclosure of algorithms, texts, and reviewer credentials.

---

## Phase 7: Verification & Build Quality
- [x] **Unit & Integration Tests:** 33 / 33 tests passing cleanly (`npm test`).
- [x] **ESLint Static Analysis:** 0 errors, 0 warnings (`npm run lint`).
- [x] **Production Compilation:** 48 / 48 routes compiled with Next.js Turbopack (`npm run build`).
- [x] **Documentation & Guides:**
  - `public/assets-guide.md` (Photography specs, 3D pipeline, aspect ratios).
  - `README.md` (Complete architectural specification and operations manual).
