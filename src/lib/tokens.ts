/**
 * VAIDIK RATNAM LUXURY DESIGN TOKENS
 * "Royal heritage meets modern luxury"
 * Three-generation authentic Indian jewellery, natural gemstones, and Vedic Jyotish.
 */

export const COLOR_TOKENS = {
  emerald: {
    950: "#04170f", // Deepest sanctum emerald
    900: "#0a2a1d", // Rich temple emerald
    800: "#0f3a28", // Primary luxury emerald
    700: "#14502f", // Vibrant forest emerald
  },
  gold: {
    200: "#f6e7b4", // Pale gold highlight
    300: "#f1d98a", // Shimmering light gold
    500: "#d4af37", // Authentic 22K antique gold
    700: "#a8821f", // Deep burnished bronze-gold
  },
  neutral: {
    ivory: "#faf7f0", // Sacred silk ivory canvas
    sand: "#f1e9d8",  // Warm sandstone background
    ink: "#0b0b0b",   // Pure carbon typography
    white: "#ffffff",
  },
  accent: {
    ruby: "#8e1b2e",      // Sacred Manikya red
    rubyGlass: "rgba(142, 27, 46, 0.12)",
    rubyBorder: "rgba(142, 27, 46, 0.35)",
    sapphire: "#1d3b8b",  // Deep Neelam royal blue
    sapphireGlass: "rgba(29, 59, 139, 0.12)",
    emeraldGlass: "rgba(15, 58, 40, 0.12)",
  },
} as const;

export const GRADIENTS = {
  goldMetallic: "linear-gradient(135deg, #f1d98a 0%, #d4af37 50%, #a8821f 100%)",
  goldShimmer: "linear-gradient(90deg, #d4af37 0%, #f6e7b4 50%, #d4af37 100%)",
  emeraldSanctum: "linear-gradient(180deg, #04170f 0%, #0a2a1d 50%, #04170f 100%)",
  glassDark: "linear-gradient(135deg, rgba(10, 42, 29, 0.75) 0%, rgba(4, 23, 15, 0.9) 100%)",
  glassIvory: "linear-gradient(135deg, rgba(250, 247, 240, 0.95) 0%, rgba(241, 233, 216, 0.9) 100%)",
} as const;

export const MOTION_TOKENS = {
  easeLuxury: "cubic-bezier(0.22, 1, 0.36, 1)", // Slow, weighty, expensive
  easeSnappy: "cubic-bezier(0.16, 1, 0.3, 1)",
  duration: {
    fast: 0.3,
    normal: 0.6,
    deliberate: 0.9,
    ceremonial: 1.4,
  },
  stagger: {
    tight: 0.04,
    medium: 0.08,
    broad: 0.12,
  },
} as const;

export const TYPOGRAPHY = {
  display: 'var(--font-display), "Cormorant Garamond", "Playfair Display", Georgia, serif',
  accent: 'var(--font-accent), "Cormorant Garamond", Georgia, serif',
  body: 'var(--font-body), "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
  devanagari: 'var(--font-devanagari), "Noto Serif Devanagari", serif',
  mono: 'var(--font-mono), "Space Mono", monospace',
} as const;

