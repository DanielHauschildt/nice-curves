import type { PointFunction } from "./types";
import { TARGET, DEFAULT_STEPS } from "./constants";

/**
 * Auto-scales a curve to fill a centered bounding box in the 100×100 viewBox.
 * Returns a new point function that produces centered, uniformly-sized output.
 */
export function normalize(fn: PointFunction, steps = DEFAULT_STEPS): PointFunction {
  let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
  for (let i = 0; i <= steps; i++) {
    const pt = fn(i / steps);
    if (pt.x < x0) x0 = pt.x;
    if (pt.x > x1) x1 = pt.x;
    if (pt.y < y0) y0 = pt.y;
    if (pt.y > y1) y1 = pt.y;
  }
  const cx = (x0 + x1) / 2;
  const cy = (y0 + y1) / 2;
  const sc = (TARGET * 2) / Math.max(x1 - x0, y1 - y0);
  return (p) => {
    const pt = fn(p);
    return { x: 50 + (pt.x - cx) * sc, y: 50 + (pt.y - cy) * sc };
  };
}

/**
 * Converts a point function into an SVG path `d` attribute string.
 */
export function buildPath(fn: PointFunction, steps = DEFAULT_STEPS, close = true): string {
  const d = Array.from({ length: steps + 1 }, (_, i) => {
    const p = fn(i / steps);
    return `${i === 0 ? "M" : "L"}${p.x.toFixed(2)},${p.y.toFixed(2)}`;
  }).join(" ");
  return close ? d + " Z" : d;
}
