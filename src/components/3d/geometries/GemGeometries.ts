import * as THREE from "three";

/**
 * Helper to build an 8-vertex octagonal ring at a given Z plane.
 */
function octRing(w: number, h: number, c: number, z: number): [number, number, number][] {
  return [
    [-w + c, h, z],
    [w - c, h, z],
    [w, h - c, z],
    [w, -h + c, z],
    [w - c, -h, z],
    [-w + c, -h, z],
    [-w, -h + c, z],
    [-w, h - c, z],
  ];
}

/**
 * Creates an authentic stepped Emerald Cut (Octagonal Step Cut) geometry
 * with genuine Table, Crown steps, Girdle, and Pavilion steps sloping to a Keel/Culet.
 * Every single facet is unindexed, producing crisp specular glints across individual facets.
 */
export function createEmeraldCutGeometry(
  width = 1.6,
  height = 2.1,
  depth = 1.0,
  corner = 0.45
): THREE.BufferGeometry {
  const positions: number[] = [];

  function addTri(
    p1: [number, number, number],
    p2: [number, number, number],
    p3: [number, number, number]
  ) {
    positions.push(...p1, ...p2, ...p3);
  }

  function addQuad(
    p1: [number, number, number],
    p2: [number, number, number],
    p3: [number, number, number],
    p4: [number, number, number]
  ) {
    addTri(p1, p2, p3);
    addTri(p1, p3, p4);
  }

  const w = width / 2;
  const h = height / 2;
  const c = corner;

  // 1. Table ring (+Z)
  const table = octRing(w * 0.55, h * 0.55, c * 0.45, depth * 0.5);
  // 2. Crown step ring (+Z)
  const crown = octRing(w * 0.8, h * 0.8, c * 0.75, depth * 0.28);
  // 3. Girdle top (+Z)
  const girdleTop = octRing(w, h, c, depth * 0.05);
  // 4. Girdle bottom (-Z)
  const girdleBot = octRing(w, h, c, -depth * 0.05);
  // 5. Pavilion step ring (-Z)
  const pavBreak = octRing(w * 0.6, h * 0.6, c * 0.5, -depth * 0.38);
  // 6. Keel / Culet (-Z)
  const culet: [number, number, number][] = [
    [-w * 0.08, h * 0.4, -depth * 0.65],
    [w * 0.08, h * 0.4, -depth * 0.65],
    [w * 0.08, -h * 0.4, -depth * 0.65],
    [-w * 0.08, -h * 0.4, -depth * 0.65],
  ];

  // Table top face (fan from center)
  const centerTable: [number, number, number] = [0, 0, depth * 0.5];
  for (let i = 0; i < 8; i++) {
    addTri(centerTable, table[i], table[(i + 1) % 8]);
  }

  // Table to Crown step quads
  for (let i = 0; i < 8; i++) {
    const next = (i + 1) % 8;
    addQuad(table[i], crown[i], crown[next], table[next]);
  }

  // Crown to Girdle top step quads
  for (let i = 0; i < 8; i++) {
    const next = (i + 1) % 8;
    addQuad(crown[i], girdleTop[i], girdleTop[next], crown[next]);
  }

  // Girdle top to Girdle bottom belt quads
  for (let i = 0; i < 8; i++) {
    const next = (i + 1) % 8;
    addQuad(girdleTop[i], girdleBot[i], girdleBot[next], girdleTop[next]);
  }

  // Girdle bottom to Pavilion break quads
  for (let i = 0; i < 8; i++) {
    const next = (i + 1) % 8;
    addQuad(girdleBot[i], pavBreak[i], pavBreak[next], girdleBot[next]);
  }

  // Pavilion break to Culet keel
  addQuad(pavBreak[0], pavBreak[1], culet[1], culet[0]);
  addTri(pavBreak[1], pavBreak[2], culet[1]);
  addQuad(pavBreak[2], pavBreak[3], culet[2], culet[1]);
  addTri(pavBreak[3], pavBreak[4], culet[2]);
  addQuad(pavBreak[4], pavBreak[5], culet[3], culet[2]);
  addTri(pavBreak[5], pavBreak[6], culet[3]);
  addQuad(pavBreak[6], pavBreak[7], culet[0], culet[3]);
  addTri(pavBreak[7], pavBreak[0], culet[0]);

  // Culet bottom keel face
  addQuad(culet[0], culet[1], culet[2], culet[3]);

  const geom = new THREE.BufferGeometry();
  geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geom.computeVertexNormals();
  return geom;
}

/**
 * Creates an authentic Brilliant Cut Gemstone (faceted cone + table crown + pavilion)
 * with individual flat facet reflections.
 */
export function createBrilliantCutGeometry(
  radius = 1,
  crownHeight = 0.35,
  pavHeight = 0.85,
  facets = 16
): THREE.BufferGeometry {
  const positions: number[] = [];
  const tableR = radius * 0.55;
  const tableZ = crownHeight;
  const girdleZ = 0;
  const culetZ = -pavHeight;

  function addTri(
    p1: [number, number, number],
    p2: [number, number, number],
    p3: [number, number, number]
  ) {
    positions.push(...p1, ...p2, ...p3);
  }

  // 1. Table fan
  const tableCenter: [number, number, number] = [0, 0, tableZ];
  for (let i = 0; i < facets; i++) {
    const a1 = (i * Math.PI * 2) / facets;
    const a2 = ((i + 1) * Math.PI * 2) / facets;
    const v1: [number, number, number] = [Math.cos(a1) * tableR, Math.sin(a1) * tableR, tableZ];
    const v2: [number, number, number] = [Math.cos(a2) * tableR, Math.sin(a2) * tableR, tableZ];
    addTri(tableCenter, v1, v2);

    // 2. Crown quads to girdle
    const g1: [number, number, number] = [Math.cos(a1) * radius, Math.sin(a1) * radius, girdleZ];
    const g2: [number, number, number] = [Math.cos(a2) * radius, Math.sin(a2) * radius, girdleZ];
    addTri(v1, g1, g2);
    addTri(v1, g2, v2);

    // 3. Pavilion triangles to culet
    const culet: [number, number, number] = [0, 0, culetZ];
    addTri(g1, culet, g2);
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geom.computeVertexNormals();
  return geom;
}

/**
 * Creates a Cabochon Cut (smooth domed oval/round gem, e.g. for Pearl or Coral).
 */
export function createCabochonGeometry(radius = 1): THREE.BufferGeometry {
  const geom = new THREE.SphereGeometry(radius, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.65);
  geom.center();
  geom.computeVertexNormals();
  return geom;
}

/**
 * Creates a Gold Ingot/Bar geometry with beveled chamfers.
 */
export function createGoldBarGeometry(
  width = 1.4,
  length = 2.6,
  height = 0.4
): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  const w = width / 2;
  const l = length / 2;
  const c = 0.12;

  shape.moveTo(-w + c, l);
  shape.lineTo(w - c, l);
  shape.lineTo(w, l - c);
  shape.lineTo(w, -l + c);
  shape.lineTo(w - c, -l);
  shape.lineTo(-w + c, -l);
  shape.lineTo(-w, -l + c);
  shape.lineTo(-w, l - c);
  shape.closePath();

  const geom = new THREE.ExtrudeGeometry(shape, {
    depth: height,
    bevelEnabled: true,
    bevelThickness: 0.08,
    bevelSize: 0.08,
    bevelSegments: 2,
  });
  geom.center();
  return geom;
}

/**
 * Creates a minted Gold Coin geometry.
 */
export function createGoldCoinGeometry(radius = 0.65, thickness = 0.1): THREE.BufferGeometry {
  const geom = new THREE.CylinderGeometry(radius, radius, thickness, 32);
  geom.rotateX(Math.PI / 2);
  return geom;
}
