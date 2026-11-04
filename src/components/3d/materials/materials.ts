import * as THREE from "three";

export const GOLD_COLORS = {
  antique: "#d4af37",
  purity24k: "#ffd859",
  purity22k: "#d4af37",
  purity18k: "#dfba6a",
  purity14k: "#e09384", // Rose gold nuance
  whiteGold: "#e8eaed",
} as const;

export const GEM_PROPERTIES = {
  emerald: {
    color: "#0f7a4a",
    ior: 1.57,
    thickness: 1.2,
    roughness: 0.05,
    transmission: 0.95,
    chromaticAberration: 0.04,
    anisotropy: 0.1,
    distortion: 0.15,
  },
  ruby: {
    color: "#9b111e",
    ior: 1.77,
    thickness: 1.4,
    roughness: 0.04,
    transmission: 0.92,
    chromaticAberration: 0.05,
    anisotropy: 0.1,
    distortion: 0.12,
  },
  blueSapphire: {
    color: "#1d3b8b",
    ior: 1.77,
    thickness: 1.3,
    roughness: 0.04,
    transmission: 0.93,
    chromaticAberration: 0.06,
    anisotropy: 0.1,
    distortion: 0.14,
  },
  yellowSapphire: {
    color: "#f5bc28",
    ior: 1.77,
    thickness: 1.3,
    roughness: 0.03,
    transmission: 0.96,
    chromaticAberration: 0.05,
    anisotropy: 0.1,
    distortion: 0.12,
  },
  diamond: {
    color: "#ffffff",
    ior: 2.417,
    thickness: 1.6,
    roughness: 0.01,
    transmission: 0.98,
    chromaticAberration: 0.08,
    anisotropy: 0.2,
    distortion: 0.2,
  },
  pearl: {
    color: "#fcf8f2",
    ior: 1.53,
    roughness: 0.25,
    metalness: 0.1,
    clearcoat: 0.8,
    sheen: 1.0,
    sheenColor: "#f4dbbd",
  },
  redCoral: {
    color: "#cf3c2b",
    ior: 1.48,
    roughness: 0.35,
    metalness: 0.05,
    clearcoat: 0.4,
  },
  hessonite: {
    color: "#993d18", // Honey cinnamon
    ior: 1.74,
    thickness: 1.4,
    roughness: 0.06,
    transmission: 0.9,
    chromaticAberration: 0.05,
    anisotropy: 0.1,
    distortion: 0.12,
  },
  catsEye: {
    color: "#7e8346", // Chrysoberyl golden green
    ior: 1.75,
    roughness: 0.18,
    clearcoat: 0.6,
  },
} as const;

/**
 * Creates an Antique 22K Gold Material with micro-roughness, clearcoat, and warm diffuse body.
 */
export function createAntiqueGoldMaterial(): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#f1d98a"),
    emissive: new THREE.Color("#4a3b10"),
    emissiveIntensity: 0.25,
    metalness: 0.8,
    roughness: 0.2,
    clearcoat: 0.6,
    clearcoatRoughness: 0.15,
    reflectivity: 0.95,
    envMapIntensity: 1.5,
  });
}

/**
 * Creates a High-Polish Gold Bar/Coin Material with purity tint.
 */
export function createPolishedGoldMaterial(
  purity: "24k" | "22k" | "18k" | "14k" = "22k"
): THREE.MeshPhysicalMaterial {
  const colorMap = {
    "24k": "#ffd859",
    "22k": "#ffd154",
    "18k": "#dfba6a",
    "14k": "#e09384",
  };

  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(colorMap[purity]),
    emissive: new THREE.Color("#59430c"),
    emissiveIntensity: 0.2,
    metalness: 0.85,
    roughness: 0.08,
    clearcoat: 0.8,
    clearcoatRoughness: 0.05,
    reflectivity: 1.0,
    envMapIntensity: 2.0,
  });
}

/**
 * Creates a luxury dark emerald or midnight black velvet material with gold-tinted sheen.
 */
export function createVelvetMaterial(color: string = "#0b251d"): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color),
    metalness: 0.1,
    roughness: 0.85,
    sheen: 1.0,
    sheenRoughness: 0.5,
    sheenColor: new THREE.Color("#d4af37"),
  });
}
