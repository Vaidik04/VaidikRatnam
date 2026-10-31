/**
 * VAIDIK RATNAM — DESIGN SYSTEM
 * ============================================================================
 * Single source of truth for colour, typography, spacing, motion and
 * component behaviour. Every component imports from here rather than
 * hard-coding values, so the brand stays consistent and easy to retune.
 *
 * Usage:
 *   import { T, EM, EASE, Z } from "@/design/tokens";
 *   style={{ color: T.gold[500], ease: EASE.out }}
 */

// ---------------------------------------------------------------------------
// COLOUR
// ---------------------------------------------------------------------------
export const T = {
  emerald: {
    950: "#04170f",
    900: "#0a2a1d",
    700: "#14502f",
    600: "#1a6b47",
    500: "#22865a",
    400: "#2aa878",
    300: "#f1d98a",
  },
  gold: {
    700: "#a8821f",
    600: "#b8942a",
    500: "#d4af37",
    400: "#e6c774",
    300: "#f1d98a",
  },
  ruby: {
    500: "#8e1b2e",
    400: "#a8263a",
    300: "#c83b53",
  },
  sapphire: {
    500: "#1d3b8b",
    400: "#2a50a6",
    300: "#3d5cb9",
  },
  ivory: "#faf7f0",
  ink: "#0b0b0b",
  // CSS-variable aliases used across the codebase
  bg: "#04170f",
  surface: "#0a2a1d",
  text: "#faf7f0",
  muted: "#b9c9bd",
  border: `rgba(${["0", "23", "31", "0.25"].join(",")})`,
  borderStrong: `rgba(212,175,55,0.55)`,
};

/** Metallic gold gradient string (135deg, 300 -> 500 -> 700) */
export const GOLD_GRADIENT = `linear-gradient(135deg, ${T.gold[300]} 0%, ${T.gold[500]} 45%, ${T.gold[700]} 100%)`;
/** Gold gradient with a wider stop for shimmer sweeps */
export const GOLD_GRADIENT_WIDE = `linear-gradient(135deg, ${T.gold[700]} 0%, ${T.gold[500]} 25%, ${T.gold[300]} 50%, ${T.gold[500]} 75%, ${T.gold[700]} 100%)`;

/** Emerald gradient for deep backgrounds */
export const EMERALD_GRADIENT = `linear-gradient(180deg, ${T.emerald[950]} 0%, ${T.emerald[900]} 50%, ${T.emerald[700]} 100%)`;

/** Subtle vertical linen/ark pattern for textures */
export const TEXTURE_PATTERN = `url(#texture-linen)`;

// ---------------------------------------------------------------------------
// EASING & MOTION
// ---------------------------------------------------------------------------
export const EASE = {
  /** Standard reveal — slow, weighty, expensive */
  out: "cubic-bezier(0.22, 1, 0.36, 1)",
  /** In-out for scrubbed scroll sections */
  io: "cubic-bezier(0.65, 0, 0.35, 1)",
  /** Elastic-less "luxury" settle */
  back: "cubic-bezier(0.34, 1.56, 0.64, 1)",
};

/** Motion durations tuned to the luxury brief */
export const EM = {
  duration: {
    /** Quick micro-interaction */
    fast: 0.3,
    /** Standard button hover / focus */
    mid: 0.5,
    /** Section reveal / image crossfade */
    slow: 0.8,
    /** Parallax / mouse-tracking */
    slower: 1.2,
    /** Hero preloader / curtain wipe */
    hero: 1.6,
  },
  stagger: {
    /** Tight stagger for list reveals */
    tight: 0.03,
    /** Default stagger for CTAs / cards */
    default: 0.08,
    /** Loose stagger for widely spaced items */
    loose: 0.14,
  },
};

// ---------------------------------------------------------------------------
// Z-INDEX LAYERING
// ---------------------------------------------------------------------------
export const Z = {
  base: 0,
  content: 1,
  float: 10,
  header: 50,
  overlay: 60,
  cursor: 90,
  modal: 100,
  preloader: 200,
};

// ---------------------------------------------------------------------------
// SPACING (8pt-ish editorial scale)
// ---------------------------------------------------------------------------
export const SPACING = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "0.75rem",
  lg: "1.25rem",
  xl: "2rem",
  "2xl": "3rem",
  "3xl": "4rem",
  "4xl": "6rem",
  "5xl": "8rem",
  "6xl": "12rem",
};

// ---------------------------------------------------------------------------
// FLUID TYPE CLAMP() HELPERS
// ---------------------------------------------------------------------------
export const TYPE = {
  /** Hero display: "Where Sacred Indian Craft Meets" */
  display: "clamp(2.5rem, 10vw, 9rem)",
  /** Section headings */
  h1: "clamp(2rem, 5vw, 4.5rem)",
  h2: "clamp(1.75rem, 4vw, 3.5rem)",
  h3: "clamp(1.25rem, 3vw, 2rem)",
  body: "clamp(0.95rem, 1.4vw, 1.15rem)",
  small: "clamp(0.75rem, 1vw, 0.85rem)",
  mono: "clamp(0.65rem, 0.8vw, 0.75rem)",
};

/** Fluid Devanagari size for sacred accents */
export const TYPE_DEVANAGARI = "clamp(0.85rem, 2.2vw, 1.5rem)";

// ---------------------------------------------------------------------------
// SHARED CSS STRING TOKENS (injected into globals.css via this file)
// ---------------------------------------------------------------------------
export const CSS = {
  goldText: `background: ${GOLD_GRADIENT_WIDE}; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-size: 200% auto;`,
  goldBorder: `1px solid transparent; background: ${GOLD_GRADIENT} padding-box;`,
  goldBorderAccent: `border: 1px solid ${T.gold[300]};`,
  glass: "backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);",
  glassDark: "backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);",
  grain: "filter: url(#grain);",
  /** Emerald deep background */
  emeraldBg: "background: ${EMERALD_GRADIENT}",
  inkText: "color: ${T.ink}",
};

/** Liquid gold shimmer sweep keyframes */
export const SHARED = {
  goldShimmerSweep: {
    keyframes: {
      "0%": { backgroundPosition: "-200% 0" },
      "100%": { backgroundPosition: "200% 0" },
    },
    animation: "goldShimmerSweep 4s infinite cubic-bezier(0.22, 1, 0.36, 1)",
  },
  /** Subtle float for gemstones and elements */
  delicateFloat: {
    keyframes: {
      "0%, 100%": { transform: "translateY(0px)" },
      "50%": { transform: "translateY(-4px)" },
    },
    animation: "delicateFloat 6s ease-in-out infinite",
  },
  /** Sparkle for primary CTA */
  sparkleTwinkle: {
    keyframes: {
      "0%, 100%": { opacity: "0.2", transform: "scale(0.8) rotate(0deg)" },
      "50%": { opacity: "1", transform: "scale(1.15) rotate(90deg)" },
    },
    animation: "sparkleTwinkle 4s ease-in-out infinite",
  },
  /** Infinite marquee */
  marqueeInfinite: {
    keyframes: {
      "0%": { transform: "translateX(0%)" },
      "100%": { transform: "translateX(-50%)" },
    },
    animation: "marqueeInfinite 35s linear infinite",
  },
  /** Slow rotation for cosmic backgrounds */
  spinSlow: {
    keyframes: {
      from: { transform: "rotate(0deg)" },
      to: { transform: "rotate(360deg)" },
    },
    animation: "spinSlow 90s linear infinite",
  },
};

/** Preloader door-open animation keyframes */
export const PRELOADER = {
  keyframes: {
    "0%": { opacity: 1, transform: "scale(1)" },
    "50%": { opacity: 0, transform: "scale(0.98) translateY(-2px)" },
    "100%": { opacity: 0, transform: "scale(0.95) translateY(-4px)" },
  },
  animation: "preloaderDoorOpen 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
};

/** Scroll progress bar animation */
export const SCROLL = {
  progressAnim: {
    keyframes: {
      "0%": { width: "0%" },
      "100%": { width: "100%" },
    },
    animation: "progressBar 0.5s ease-out forwards",
  },
};

/** Custom cursor dot + ring animation */
export const CURSOR = {
  ringExpand: {
    keyframes: {
      "0%": { width: "4px", opacity: 0.8 },
      "50%": { width: "24px", opacity: 0.4 },
      "100%": { width: "4px", opacity: 0.8 },
    },
    animation: "cursorRingExpand 2s ease-in-out infinite",
  },
};

/* ==============================================================================
   LUXURY KEYFRAMES & MOTION GRAPHICS
   ============================================================================== */

export const KEYFRAMES = {
  /** Metallic liquid gold gradient sweep */
  goldShimmerSweep: {
    "0%": { backgroundPosition: "-200% 0" },
    "100%": { backgroundPosition: "200% 0" },
  },
  /** Delicate float for gemstones and subtle elements */
  delicateFloat: {
    "0%, 100%": { transform: "translateY(0px)" },
    "50%": { transform: "translateY(-4px)" },
  },
  /** Sparkle twinkle for primary CTAs and gem facets */
  sparkleTwinkle: {
    "0%, 100%": { opacity: 0.2, transform: "scale(0.8) rotate(0deg)" },
    "50%": { opacity: 1, transform: "scale(1.15) rotate(90deg)" },
  },
  /** Infinite horizontal marquee */
  marqueeInfinite: {
    "0%": { transform: "translateX(0%)" },
    "100%": { transform: "translateX(-50%)" },
  },
  /** Slow continuous spin for cosmic/background elements */
  spinSlow: {
    from: { transform: "rotate(0deg)" },
    to: { transform: "rotate(360deg)" },
  },
  /** Preloader: temple doors splitting open */
  preloaderDoorOpen: {
    "0%": { opacity: 1 },
    "20%": { opacity: 1 },
    "40%": { opacity: 0, transform: "translateY(-100%)" },
    "100%": { opacity: 0 },
  },
  /** Scroll progress bar */
  progressBar: {
    from: { width: "0%" },
    to: { width: "100%" },
  },
  /** Custom cursor ring expand */
  cursorRingExpand: {
    "0%": { width: "4px", opacity: 0.8 },
    "50%": { width: "24px", opacity: 0.4 },
    "100%": { width: "4px", opacity: 0.8 },
  },
};
