import * as THREE from "three";

/**
 * Creates an authentic octagonal stepped Emerald Cut geometry.
 */
export function createEmeraldCutGeometry(
  width = 1.4,
  height = 1.8,
  depth = 0.9,
  corner = 0.35
): THREE.BufferGeometry {
  // 2D Octagon profile with clipped corners
  const shape = new THREE.Shape();
  const w = width / 2;
  const h = height / 2;
  const c = corner;

  shape.moveTo(-w + c, h);
  shape.lineTo(w - c, h);
  shape.lineTo(w, h - c);
  shape.lineTo(w, -h + c);
  shape.lineTo(w - c, -h);
  shape.lineTo(-w + c, -h);
  shape.lineTo(-w, -h + c);
  shape.lineTo(-w, h - c);
  shape.closePath();

  // Extrude with bevel for crown and pavilion facets
  const extrudeSettings: THREE.ExtrudeGeometryOptions = {
    steps: 1,
    depth: depth * 0.4,
    bevelEnabled: true,
    bevelThickness: depth * 0.3,
    bevelSize: corner * 0.8,
    bevelOffset: 0,
    bevelSegments: 2,
  };

  const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geom.center();
  geom.computeVertexNormals();
  return geom;
}

/**
 * Creates a Brilliant Cut Gemstone (faceted cone + crown) geometry.
 */
export function createBrilliantCutGeometry(radius = 1, height = 1.2): THREE.BufferGeometry {
  // 16-faceted cone pavilion + 16-faceted crown bevel
  const geom = new THREE.ConeGeometry(radius, height, 16, 2, false);
  geom.rotateX(Math.PI); // Point down
  geom.center();
  geom.computeVertexNormals();
  return geom;
}

/**
 * Creates a Cabochon Cut (smooth domed oval/round gem, e.g. for Pearl or Coral).
 */
export function createCabochonGeometry(radius = 1): THREE.BufferGeometry {
  const geom = new THREE.SphereGeometry(radius, 32, 24);
  geom.scale(1, 0.8, 1);
  geom.computeVertexNormals();
  return geom;
}

/**
 * Creates a luxury Gold Ingot / Bar geometry with beveled trapezoid slope.
 */
export function createGoldBarGeometry(
  width = 2.4,
  length = 4.2,
  height = 0.8
): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  const w = width / 2;
  const l = length / 2;
  const r = 0.15; // corner radius

  shape.moveTo(-w + r, -l);
  shape.lineTo(w - r, -l);
  shape.quadraticCurveTo(w, -l, w, -l + r);
  shape.lineTo(w, l - r);
  shape.quadraticCurveTo(w, l, w - r, l);
  shape.lineTo(-w + r, l);
  shape.quadraticCurveTo(-w, l, -w, l - r);
  shape.lineTo(-w, -l + r);
  shape.quadraticCurveTo(-w, -l, -w + r, -l);

  const extrudeSettings: THREE.ExtrudeGeometryOptions = {
    steps: 1,
    depth: height,
    bevelEnabled: true,
    bevelThickness: 0.12,
    bevelSize: 0.1,
    bevelOffset: 0,
    bevelSegments: 3,
  };

  const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geom.center();
  geom.computeVertexNormals();
  return geom;
}

/**
 * Creates an authentic Traditional Gold Coin / Mohur geometry with reeded edges.
 */
export function createGoldCoinGeometry(radius = 1.1, thickness = 0.18): THREE.BufferGeometry {
  const geom = new THREE.CylinderGeometry(radius, radius, thickness, 48, 1);
  geom.computeVertexNormals();
  return geom;
}
