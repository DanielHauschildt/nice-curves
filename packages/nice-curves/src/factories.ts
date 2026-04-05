import type { PointFunction } from "./types";
import { S } from "./constants";

// ── Rose Variants ─────────────────────────────────────────

export function customRosePoint(R: number, A: number, k: number, sc: number): PointFunction {
  return (p) => {
    const t = p * Math.PI * 2;
    return {
      x: 50 + (R * Math.cos(t) - A * S * Math.cos(k * t)) * sc,
      y: 50 + (R * Math.sin(t) - A * S * Math.sin(k * t)) * sc,
    };
  };
}

export function roseOrbitPoint(R: number, A: number, k: number, sc: number): PointFunction {
  return (p) => {
    const t = p * Math.PI * 2;
    const r = R - A * S * Math.cos(k * t);
    return { x: 50 + Math.cos(t) * r * sc, y: 50 + Math.sin(t) * r * sc };
  };
}

export function roseCurvePoint(
  a: number, aB: number, bB: number, bBo: number, k: number, sc: number,
): PointFunction {
  return (p) => {
    const t = p * Math.PI * 2;
    const A = a + S * aB;
    const r = A * (bB + S * bBo) * Math.cos(k * t);
    return { x: 50 + Math.cos(t) * r * sc, y: 50 + Math.sin(t) * r * sc };
  };
}

// ── Harmonic / Oscillating ────────────────────────────────

export function lissajousPoint(
  amp: number, aB: number, a: number, b: number, ph: number, yS: number,
): PointFunction {
  return (p) => {
    const t = p * Math.PI * 2;
    const A = amp + S * aB;
    return { x: 50 + Math.sin(a * t + ph) * A, y: 50 + Math.sin(b * t) * A * yS };
  };
}

export function heartWavePoint(
  b: number, root: number, amp: number, sX: number, sY: number,
): PointFunction {
  return (p) => {
    const xL = Math.sqrt(root);
    const x = -xL + p * xL * 2;
    const sf = Math.max(0, root - x * x);
    const w = amp * Math.sqrt(sf) * Math.sin(b * Math.PI * x);
    const c = Math.pow(Math.abs(x), 2 / 3);
    const y = c + w;
    const sy = sY + S * 1.5;
    return { x: 50 + x * sX, y: 18 + (1.75 - y) * sy };
  };
}

export function fourierFlowPoint(
  x1: number, x3: number, x5: number,
  y1: number, y2: number, y4: number,
  mB: number, mP: number,
): PointFunction {
  return (p) => {
    const t = p * Math.PI * 2;
    const m = mB + S * mP;
    const x = x1 * Math.cos(t) + x3 * Math.cos(3 * t + 0.6 * m) + x5 * Math.sin(5 * t - 0.4);
    const y = y1 * Math.sin(t) + y2 * Math.sin(2 * t + 0.25) - y4 * Math.cos(4 * t - 0.5 * m);
    return { x: 50 + x, y: 50 + y };
  };
}

export function harmonographPoint(): PointFunction {
  return (p) => {
    const t = p * 45;
    const d1 = Math.exp(-0.015 * t);
    const d2 = Math.exp(-0.022 * t);
    const x = 22 * Math.sin(2 * t + 0.7) * d1 + 10 * Math.sin(3.01 * t) * d2;
    const y = 22 * Math.sin(3 * t + 1.5) * d1 + 10 * Math.sin(2.01 * t + 0.5) * d2;
    return { x: 50 + x, y: 50 + y };
  };
}

// ── Special Curves ────────────────────────────────────────

export function lemniscatePoint(a: number, bo: number): PointFunction {
  return (p) => {
    const t = p * Math.PI * 2;
    const sc = a + S * bo;
    const d = 1 + Math.sin(t) ** 2;
    return { x: 50 + (sc * Math.cos(t)) / d, y: 50 + (sc * Math.sin(t) * Math.cos(t)) / d };
  };
}

export function butterflyPoint(
  turns: number, sc: number, pu: number, cw: number, pw: number,
): PointFunction {
  return (p) => {
    const t = p * Math.PI * turns;
    const b = Math.exp(Math.cos(t)) - cw * Math.cos(4 * t) - Math.sin(t / 12) ** pw;
    const s = sc + S * pu;
    return { x: 50 + Math.sin(t) * b * s, y: 50 + Math.cos(t) * b * s };
  };
}

export function cardioidGlowPoint(a: number, pu: number, sc: number): PointFunction {
  return (p) => {
    const t = p * Math.PI * 2;
    const A = a + S * pu;
    const r = A * (1 - Math.cos(t));
    return { x: 50 + Math.cos(t) * r * sc, y: 50 + Math.sin(t) * r * sc };
  };
}

export function cardioidHeartPoint(a: number, pu: number, sc: number): PointFunction {
  return (p) => {
    const t = p * Math.PI * 2;
    const A = a + S * pu;
    const r = A * (1 + Math.cos(t));
    const bx = Math.cos(t) * r;
    const by = Math.sin(t) * r;
    return { x: 50 - by * sc, y: 50 - bx * sc };
  };
}

// ── Spirograph / Cycloid ──────────────────────────────────

export function hypotrochoidPoint(
  R: number, r: number, rB: number, d: number, dB: number, sc: number,
): PointFunction {
  return (p) => {
    const t = p * Math.PI * 2;
    const rr = r + S * rB;
    const dd = d + S * dB;
    const x = (R - rr) * Math.cos(t) + dd * Math.cos(((R - rr) / rr) * t);
    const y = (R - rr) * Math.sin(t) - dd * Math.sin(((R - rr) / rr) * t);
    return { x: 50 + x * sc, y: 50 + y * sc };
  };
}

export function petalSpiralPoint(
  R: number, r: number, d: number, sc: number, br: number,
): PointFunction {
  return (p) => {
    const t = p * Math.PI * 2;
    const dd = d + S * 0.25;
    const bx = (R - r) * Math.cos(t) + dd * Math.cos(((R - r) / r) * t);
    const by = (R - r) * Math.sin(t) - dd * Math.sin(((R - r) / r) * t);
    const s = sc + S * br;
    return { x: 50 + bx * s, y: 50 + by * s };
  };
}

export function epitrochoidPoint(R: number, r: number, d: number, sc: number): PointFunction {
  return (p) => {
    const t = p * Math.PI * 2;
    const x = (R + r) * Math.cos(t) - d * Math.cos(((R + r) / r) * t);
    const y = (R + r) * Math.sin(t) - d * Math.sin(((R + r) / r) * t);
    return { x: 50 + x * sc, y: 50 + y * sc };
  };
}

// ── Spirals ───────────────────────────────────────────────

export function spiralSearchPoint(
  turns: number, base: number, rAmp: number, pu: number, sc: number,
): PointFunction {
  return (p) => {
    const t = p * Math.PI * 2;
    const a = t * turns;
    const r = base + (1 - Math.cos(t)) * (rAmp + S * pu);
    return { x: 50 + Math.cos(a) * r * sc, y: 50 + Math.sin(a) * r * sc };
  };
}

export function fermatSpiralPoint(turns: number, maxR: number): PointFunction {
  return (p) => {
    const maxT = turns * Math.PI * 2;
    const t = p * maxT;
    const r = maxR * Math.sqrt(t / maxT);
    return { x: 50 + Math.cos(t) * r, y: 50 + Math.sin(t) * r };
  };
}

export function logSpiralPoint(b: number, turns: number, maxR: number): PointFunction {
  const maxT = turns * Math.PI * 2;
  const eM = Math.exp(b * maxT) - 1;
  return (p) => {
    const t = p * maxT;
    const r = ((Math.exp(b * t) - 1) / eM) * maxR;
    return { x: 50 + Math.cos(t) * r, y: 50 + Math.sin(t) * r };
  };
}

export function involutePoint(turns: number, sc: number): PointFunction {
  const maxT = turns * Math.PI * 2;
  return (p) => {
    const t = p * maxT;
    return {
      x: 50 + (Math.cos(t) + t * Math.sin(t)) * sc,
      y: 50 + (Math.sin(t) - t * Math.cos(t)) * sc,
    };
  };
}

export function lituusPoint(k: number, tMin: number, tMax: number, sc: number): PointFunction {
  return (p) => {
    const t = tMin + p * (tMax - tMin);
    const r = Math.sqrt(k / t) * sc;
    return { x: 50 + Math.cos(t) * r, y: 50 + Math.sin(t) * r };
  };
}

// ── Simple / Knot Curves ──────────────────────────────────

export function trefoilKnotPoint(sc: number): PointFunction {
  return (p) => {
    const t = p * Math.PI * 2;
    return {
      x: 50 + (Math.sin(t) + 2 * Math.sin(2 * t)) * sc,
      y: 50 + (Math.cos(t) - 2 * Math.cos(2 * t)) * sc,
    };
  };
}

export function torusKnotPoint(sc: number): PointFunction {
  return (p) => {
    const t = p * Math.PI * 2;
    const r = 2 + Math.cos(2 * t);
    return { x: 50 + r * Math.cos(3 * t) * sc, y: 50 + r * Math.sin(3 * t) * sc };
  };
}

export function superellipsePoint(n: number, a: number, b: number): PointFunction {
  return (p) => {
    const t = p * Math.PI * 2;
    const c = Math.cos(t);
    const s = Math.sin(t);
    const e = 2 / n;
    return {
      x: 50 + a * Math.sign(c) * Math.pow(Math.abs(c), e),
      y: 50 + b * Math.sign(s) * Math.pow(Math.abs(s), e),
    };
  };
}

export function astroidPoint(a: number): PointFunction {
  return (p) => {
    const t = p * Math.PI * 2;
    return { x: 50 + a * Math.pow(Math.cos(t), 3), y: 50 + a * Math.pow(Math.sin(t), 3) };
  };
}

export function deltoidPoint(sc: number): PointFunction {
  return (p) => {
    const t = p * Math.PI * 2;
    return {
      x: 50 + (2 * Math.cos(t) + Math.cos(2 * t)) * sc,
      y: 50 + (2 * Math.sin(t) - Math.sin(2 * t)) * sc,
    };
  };
}

export function nephroidPoint(a: number): PointFunction {
  return (p) => {
    const t = p * Math.PI * 2;
    return {
      x: 50 + a * (3 * Math.cos(t) - Math.cos(3 * t)),
      y: 50 + a * (3 * Math.sin(t) - Math.sin(3 * t)),
    };
  };
}

export function cassiniOvalPoint(a: number, b: number, sc: number): PointFunction {
  const a2 = a * a, a4 = a2 * a2, b4 = b * b * b * b;
  return (p) => {
    const t = p * Math.PI * 2;
    const c2 = Math.cos(2 * t);
    const s2 = Math.sin(2 * t);
    const r2 = a2 * c2 + Math.sqrt(Math.max(0, b4 - a4 * s2 * s2));
    const r = Math.sqrt(Math.max(0, r2)) * sc;
    return { x: 50 + Math.cos(t) * r, y: 50 + Math.sin(t) * r };
  };
}

export function maurerRosePoint(n: number, d: number, sc: number): PointFunction {
  return (p) => {
    const theta = p * 360 * d * (Math.PI / 180);
    const r = Math.sin(n * theta) * sc;
    return { x: 50 + r * Math.cos(theta), y: 50 + r * Math.sin(theta) };
  };
}

// ── Polygon / Geometric ───────────────────────────────────

export function roundedPolygonPoint(n: number, R: number, amp: number): PointFunction {
  return (p) => {
    const t = p * Math.PI * 2;
    const r = R * (1 + amp * Math.cos(n * t));
    return { x: 50 + r * Math.cos(t), y: 50 + r * Math.sin(t) };
  };
}

export function reuleauxTrianglePoint(sz: number): PointFunction {
  const v = [0, 1, 2].map((i) => {
    const a = Math.PI / 2 + (i * 2 * Math.PI) / 3;
    return [sz * Math.cos(a), sz * Math.sin(a)] as const;
  });
  const side = sz * Math.sqrt(3);
  return (p) => {
    const seg = Math.min(2, Math.floor(p * 3));
    const lp = p * 3 - seg;
    const [cx, cy] = v[seg];
    const [fx, fy] = v[(seg + 1) % 3];
    const [tx, ty] = v[(seg + 2) % 3];
    const a1 = Math.atan2(fy - cy, fx - cx);
    const a2 = Math.atan2(ty - cy, tx - cx);
    let da = a2 - a1;
    if (da > Math.PI) da -= 2 * Math.PI;
    if (da < -Math.PI) da += 2 * Math.PI;
    const angle = a1 + lp * da;
    return { x: 50 + cx + side * Math.cos(angle), y: 50 + cy + side * Math.sin(angle) };
  };
}

export function circlePoint(r: number): PointFunction {
  return (p) => {
    const t = p * Math.PI * 2;
    return { x: 50 + r * Math.cos(t), y: 50 + r * Math.sin(t) };
  };
}

// ── Classical / Algebraic Curves ─────────────────────────

export function witchOfAgnesiPoint(a: number, range: number): PointFunction {
  return (p) => {
    const t = -range + p * 2 * range;
    return { x: 50 + a * t, y: 50 - a / (1 + t * t) };
  };
}

export function foliumPoint(a: number, scale: number): PointFunction {
  return (p) => {
    const t = -0.9 + p * 10.9;
    const denom = 1 + t * t * t;
    if (Math.abs(denom) < 0.01) return { x: 50, y: 50 };
    return { x: 50 + 3 * a * t / denom * scale, y: 50 + 3 * a * t * t / denom * scale };
  };
}

export function cissoidPoint(a: number): PointFunction {
  return (p) => {
    const t = -1.2 + p * 2.4;
    const s = Math.sin(t);
    const c = Math.cos(t);
    if (Math.abs(c) < 0.01) return { x: 50, y: 50 };
    return { x: 50 + 2 * a * s * s, y: 50 + 2 * a * s * s * s / c };
  };
}

export function conchoidPoint(a: number, b: number, sc: number): PointFunction {
  return (p) => {
    const t = -1.3 + p * 2.6;
    const c = Math.cos(t);
    if (Math.abs(c) < 0.05) return { x: 50, y: 50 };
    const r = b + a / c;
    return { x: 50 + r * c * sc, y: 50 + r * Math.sin(t) * sc };
  };
}

// ── Knots & Lissajous ────────────────────────────────────

export function cinquefoilKnotPoint(sc: number): PointFunction {
  return (p) => {
    const t = p * Math.PI * 2;
    const r = 2 + Math.cos(5 * t);
    return { x: 50 + r * Math.cos(2 * t) * sc, y: 50 + r * Math.sin(2 * t) * sc };
  };
}

export function figureEightKnotPoint(sc: number): PointFunction {
  return (p) => {
    const t = p * Math.PI * 2;
    const r = 2 + Math.cos(3 * t);
    return { x: 50 + r * Math.cos(2 * t) * sc, y: 50 + r * Math.sin(2 * t) * sc };
  };
}

export function lissajousKnotPoint(sc: number): PointFunction {
  return (p) => {
    const t = p * Math.PI * 2;
    return { x: 50 + Math.sin(3 * t + 0.5) * sc, y: 50 + Math.sin(5 * t) * sc };
  };
}

// ── Rose / Superformula ──────────────────────────────────

export function fractionalRosePoint(k: number, sc: number): PointFunction {
  return (p) => {
    const t = p * Math.PI * 6;
    const r = Math.sin(k * t) * sc;
    return { x: 50 + r * Math.cos(t), y: 50 + r * Math.sin(t) };
  };
}

export function starfishPoint(m: number, n1: number, sc: number): PointFunction {
  return (p) => {
    const t = p * Math.PI * 2;
    const c = Math.abs(Math.cos(m * t / 4));
    const s = Math.abs(Math.sin(m * t / 4));
    const r = Math.pow(Math.pow(c, n1) + Math.pow(s, n1), -1 / n1) * sc;
    return { x: 50 + r * Math.cos(t), y: 50 + r * Math.sin(t) };
  };
}

export function superformulaPoint(m: number, n1: number, n2: number, n3: number, sc: number): PointFunction {
  return (p) => {
    const t = p * Math.PI * 2;
    const c = Math.abs(Math.cos(m * t / 4));
    const s = Math.abs(Math.sin(m * t / 4));
    const r = Math.pow(Math.pow(c, n2) + Math.pow(s, n3), -1 / n1) * sc;
    return { x: 50 + r * Math.cos(t), y: 50 + r * Math.sin(t) };
  };
}

// ── Epicycloid / Spirals ─────────────────────────────────

export function ranunculoidPoint(R: number, r: number, sc: number): PointFunction {
  return (p) => {
    const t = p * Math.PI * 2;
    const x = (R + r) * Math.cos(t) - r * Math.cos(((R + r) / r) * t);
    const y = (R + r) * Math.sin(t) - r * Math.sin(((R + r) / r) * t);
    return { x: 50 + x * sc, y: 50 + y * sc };
  };
}

export function cornuSpiralPoint(maxT: number, sc: number): PointFunction {
  const N = 500;
  const pts: { x: number; y: number }[] = [];
  let cx = 0, cy = 0;
  const dt = (2 * maxT) / N;
  for (let i = 0; i <= N; i++) {
    const t = -maxT + i * dt;
    cx += Math.cos(Math.PI * t * t / 2) * dt;
    cy += Math.sin(Math.PI * t * t / 2) * dt;
    pts.push({ x: cx, y: cy });
  }
  return (p) => {
    const idx = Math.min(N, Math.floor(p * N));
    const pt = pts[idx];
    return { x: 50 + pt.x * sc, y: 50 + pt.y * sc };
  };
}

export function fibonacciSpiralPoint(turns: number, sc: number): PointFunction {
  const phi = (1 + Math.sqrt(5)) / 2;
  return (p) => {
    const t = p * turns * Math.PI * 2;
    const r = Math.pow(phi, t / (Math.PI / 2)) * sc;
    return { x: 50 + r * Math.cos(t), y: 50 + r * Math.sin(t) };
  };
}

export function hyperbolicSpiralPoint(a: number, tMin: number, tMax: number, sc: number): PointFunction {
  return (p) => {
    const t = tMin + p * (tMax - tMin);
    const r = (a / t) * sc;
    return { x: 50 + Math.cos(t) * r, y: 50 + Math.sin(t) * r };
  };
}

// ── Figure-Eight / Beetle ────────────────────────────────

export function geronoLemniscatePoint(sc: number): PointFunction {
  return (p) => {
    const t = p * Math.PI * 2;
    return { x: 50 + Math.cos(t) * sc, y: 50 + Math.sin(t) * Math.cos(t) * sc };
  };
}

export function scarabaeusPoint(a: number, b: number, sc: number): PointFunction {
  return (p) => {
    const t = p * Math.PI * 2;
    const r = (a * Math.cos(2 * t) + b * Math.cos(t)) * sc;
    return { x: 50 + r * Math.cos(t), y: 50 + r * Math.sin(t) };
  };
}

// ── Mathematical Curves ─────────────────────────────────

export function bicornPoint(a: number): PointFunction {
  return (p) => {
    const t = p * Math.PI * 2;
    const s = Math.sin(t), c = Math.cos(t);
    return { x: 50 + a * s, y: 50 + a * c * c * (2 + c) / (3 + s * s) };
  };
}

export function catenaryPoint(a: number, range: number): PointFunction {
  return (p) => {
    const t = -range + p * 2 * range;
    return { x: 50 + a * t, y: 50 + a * Math.cosh(t) };
  };
}

export function cayleySexticPoint(a: number, sc: number): PointFunction {
  return (p) => {
    const t = p * Math.PI * 3;
    const r = 4 * a * Math.pow(Math.cos(t / 3), 3);
    return { x: 50 + r * Math.cos(t) * sc, y: 50 + r * Math.sin(t) * sc };
  };
}

export function cochleoidPoint(a: number, maxT: number): PointFunction {
  return (p) => {
    const t = 0.1 + p * maxT;
    const r = a * Math.sin(t) / t;
    return { x: 50 + r * Math.cos(t), y: 50 + r * Math.sin(t) };
  };
}

export function conchoidDeSluzePoint(a: number, sc: number): PointFunction {
  return (p) => {
    const t = -1.2 + p * 2.4;
    const c = Math.cos(t);
    if (Math.abs(c) < 0.05) return { x: 50, y: 50 };
    const r = (1 / c + a * c) * sc;
    return { x: 50 + r * Math.cos(t), y: 50 + r * Math.sin(t) };
  };
}

export function devilsCurvePoint(a: number, b: number, sc: number): PointFunction {
  return (p) => {
    const t = p * Math.PI * 2;
    const s2 = Math.sin(t) * Math.sin(t), c2 = Math.cos(t) * Math.cos(t);
    const denom = s2 - c2;
    if (Math.abs(denom) < 0.02) return { x: 50, y: 50 };
    const r2 = (a * a * s2 - b * b * c2) / denom;
    if (r2 < 0) return { x: 50, y: 50 };
    const r = Math.sqrt(r2) * sc;
    return { x: 50 + r * Math.cos(t), y: 50 + r * Math.sin(t) };
  };
}

export function doubleFoliumPoint(a: number, sc: number): PointFunction {
  return (p) => {
    const t = p * Math.PI * 2;
    const r = 4 * a * Math.cos(t) * Math.sin(t) * Math.sin(t) * sc;
    return { x: 50 + r * Math.cos(t), y: 50 + r * Math.sin(t) };
  };
}

export function trifoliumPoint(a: number, sc: number): PointFunction {
  return (p) => {
    const t = p * Math.PI * 2;
    const r = a * Math.cos(t) * (4 * Math.sin(t) * Math.sin(t) - 1) * sc;
    return { x: 50 + r * Math.cos(t), y: 50 + r * Math.sin(t) };
  };
}

export function freethNephroidPoint(a: number, sc: number): PointFunction {
  return (p) => {
    const t = p * Math.PI * 4;
    const r = a * (1 + 2 * Math.sin(t / 2)) * sc;
    return { x: 50 + r * Math.cos(t), y: 50 + r * Math.sin(t) };
  };
}

export function kampylePoint(a: number, sc: number): PointFunction {
  return (p) => {
    const t = -1.2 + p * 2.4;
    const c = Math.cos(t);
    if (Math.abs(c) < 0.05) return { x: 50, y: 50 };
    const sec = 1 / c;
    return { x: 50 + a * sec * sec * sc, y: 50 + a * Math.tan(t) * sec * sc };
  };
}

export function kappaCurvePoint(a: number, sc: number): PointFunction {
  return (p) => {
    const t = 0.15 + p * (Math.PI - 0.3);
    const s = Math.sin(t);
    if (Math.abs(s) < 0.05) return { x: 50, y: 50 };
    return { x: 50 + a * Math.cos(t) * Math.cos(t) / s * sc, y: 50 + a * Math.cos(t) * sc };
  };
}

export function pearShapedPoint(a: number, b: number, sc: number): PointFunction {
  return (p) => {
    const t = p * Math.PI * 2;
    const s = Math.sin(t), c = Math.cos(t);
    const x = a * s * s;
    const y = (a * a / b) * s * s * s * c;
    return { x: 50 + x * sc, y: 50 + y * sc };
  };
}

export function plateauCurvePoint(m: number, n: number, a: number, sc: number): PointFunction {
  return (p) => {
    const t = 0.05 + p * (Math.PI - 0.1);
    const denom = Math.sin((m - n) * t);
    if (Math.abs(denom) < 0.02) return { x: 50, y: 50 };
    const x = a * Math.sin((m + n) * t) / denom;
    const y = 2 * a * Math.sin(m * t) * Math.sin(n * t) / denom;
    return { x: 50 + x * sc, y: 50 + y * sc };
  };
}

export function rightStrophoidPoint(a: number, sc: number): PointFunction {
  return (p) => {
    const t = -1.2 + p * 2.4;
    const c = Math.cos(t);
    if (Math.abs(c) < 0.05) return { x: 50, y: 50 };
    const r = -a * Math.cos(2 * t) / c;
    return { x: 50 + r * Math.cos(t) * sc, y: 50 + r * Math.sin(t) * sc };
  };
}

export function serpentinePoint(a: number, b: number, range: number): PointFunction {
  return (p) => {
    const t = -range + p * 2 * range;
    return { x: 50 + a * t, y: 50 + a * a * t / (t * t + b) };
  };
}

export function sinusoidalSpiralPoint(pp: number, a: number, sc: number): PointFunction {
  return (p) => {
    const t = p * Math.PI * 2;
    const cospt = Math.cos(pp * t);
    if (cospt <= 0) return { x: 50, y: 50 };
    const r = a * Math.pow(cospt, 1 / pp) * sc;
    return { x: 50 + r * Math.cos(t), y: 50 + r * Math.sin(t) };
  };
}

export function spiricSectionPoint(a: number, b: number, sc: number): PointFunction {
  return (p) => {
    const t = p * Math.PI * 2;
    const s = Math.sin(t);
    const r2 = 4 * b * (a - b * s * s);
    if (r2 < 0) return { x: 50, y: 50 };
    const r = Math.sqrt(r2) * sc;
    return { x: 50 + r * Math.cos(t), y: 50 + r * Math.sin(t) };
  };
}

export function talbotCurvePoint(a: number, b: number, f: number, sc: number): PointFunction {
  return (p) => {
    const t = p * Math.PI * 2;
    const s = Math.sin(t), c = Math.cos(t), s2 = s * s;
    const x = (a * a + f * f * s2) * c / a;
    const y = (a * a - 2 * f * f + f * f * s2) * s / b;
    return { x: 50 + x * sc, y: 50 + y * sc };
  };
}

export function tractrixPoint(a: number, range: number, sc: number): PointFunction {
  return (p) => {
    const t = -range + p * 2 * range;
    return { x: 50 + a / Math.cosh(t) * sc, y: 50 + (t - Math.tanh(t)) * a * sc };
  };
}

export function tschirnhausCubicPoint(a: number, sc: number): PointFunction {
  return (p) => {
    const t = -2 + p * 4;
    const t2m3 = t * t - 3;
    return { x: 50 + a * t2m3 * sc, y: 50 + a * t * t2m3 * sc };
  };
}

export function trisectrixPoint(a: number, sc: number): PointFunction {
  return (p) => {
    const t = 0.1 + p * (Math.PI - 0.2);
    const denom = Math.sin(2 * t);
    if (Math.abs(denom) < 0.03) return { x: 50, y: 50 };
    const r = 2 * a * Math.sin(3 * t) / denom * sc;
    return { x: 50 + r * Math.cos(t), y: 50 + r * Math.sin(t) };
  };
}

export function teardropPoint(a: number, n: number, sc: number): PointFunction {
  return (p) => {
    const t = p * Math.PI * 2;
    return { x: 50 + a * Math.cos(t) * sc, y: 50 + a * Math.sin(t) * Math.pow(Math.abs(Math.sin(t / 2)), n) * sc };
  };
}
