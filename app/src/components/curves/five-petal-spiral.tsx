"use client";

import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { petalSpiralPoint } from "@/lib/curves/factories";
import { normalize, buildPath } from "@/lib/curves/normalize";

const defaultD = buildPath(normalize(petalSpiralPoint(5, 1, 3, 2.2, 0.45), 480), 480, true);

const defaults: Partial<CurveAnimatedProps> = {
  progress: 0.34,
  duration: 4.6,
  trailWidth: 4.4,
  breatheDuration: 4.2,
  rotateSpeed: 30 / 28,
};

interface FivePetalSpiralProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ R: number; r: number; d: number }>;
}

export function FivePetalSpiral({ args, ...props }: FivePetalSpiralProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { R: 5, r: 1, d: 3, ...args };
    return buildPath(normalize(petalSpiralPoint(merged.R, merged.r, merged.d, 2.2, 0.45), 480), 480, true);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
