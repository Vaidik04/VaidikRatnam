# Vaidik Ratnam — 3D Asset Pipeline & Model Guidelines

This directory houses production-ready GLB/GLTF assets for real-time jewellery rendering in Three.js and React Three Fiber.

---

## 1. Required Asset Inventory

| File Name | Category | Pivot & Scale Convention | Target Budget |
| :--- | :--- | :--- | :--- |
| `nakshi-choker.glb` | Hero Jewellery | Centered on collar curvature; 1 unit = 10 cm | < 1.4 MB, < 80k tris |
| `fluted-kada.glb` | Hero Jewellery | Centered inside wrist opening; 1 unit = 7 cm | < 900 KB, < 50k tris |
| `emerald-pendant.glb` | Hero Jewellery | Top bail loop at Y=1.2; 1 unit = 4 cm | < 800 KB, < 40k tris |
| `sapphire-ring.glb` | Hero Jewellery | Finger hole centered at origin; 1 unit = 2 cm | < 700 KB, < 35k tris |
| `jhumka-earrings.glb` | Hero Jewellery | Stud post at Y=1.0; 1 unit = 5 cm | < 950 KB, < 60k tris |
| `gold-bar-999.glb` | Bullion / Tool | Centered flat on base (Y=0); 1 unit = 10 cm | < 250 KB, < 5k tris |
| `gold-coin-mohur.glb` | Bullion / Tool | Centered flat on coin center; 1 unit = 3 cm | < 200 KB, < 8k tris |
| `vr-monogram.glb` | Brand / Logo | Centered at origin; 1 unit = 10 cm | < 300 KB, < 12k tris |
| `sacred-kalash.glb` | Prop / Cultural | Base flat at Y=0; 1 unit = 12 cm | < 450 KB, < 18k tris |

---

## 2. Technical Standards & Compression

1. **Geometry & Scale:**
   - Units: Metric (1 Three.js unit = 1 decimeter / 10 cm unless specified).
   - Up Axis: **Y-Up**.
   - Maximum triangles: **100k triangles max** per hero piece; **15k triangles** for props and coins.
   - Clean non-manifold topology, welded vertices, baked ambient occlusion in vertex colors or separate AO channel.

2. **Textures & PBR Workflow:**
   - Texture format: KTX2 or web-optimized PNG.
   - Texture resolution: **2048×2048 max** for hero pieces; 1024×1024 for coins and gemstones.
   - Channels:
     - `BaseColor` (sRGB)
     - `MetallicRoughness` (Linear: Blue = Metallic, Green = Roughness)
     - `Normal` (OpenGL tangent-space normal map)

3. **Draco + Meshopt Compression:**
   Run via `gltf-transform`:
   ```bash
   npx @gltf-transform/cli optimize input.glb output.glb \
     --compress draco \
     --texture-compress webp
   ```

4. **Procedural Geometry Fallback:**
   The codebase provides built-in procedural geometry generators in `src/components/3d/geometries/GemGeometries.ts`. If an external `.glb` file is not present, the system renders procedural high-precision models with identical physics materials.

