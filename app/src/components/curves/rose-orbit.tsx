"use client";

import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { roseOrbitPoint } from "@/lib/curves/factories";
import { normalize, buildPath } from "@/lib/curves/normalize";

const defaultD = buildPath(normalize(roseOrbitPoint(7, 2.7, 7, 3.9), 480), 480, true);

const defaults: Partial<CurveAnimatedProps> = {
  progress: 0.42,
  duration: 5.2,
  trailWidth: 5.2,
  breatheDuration: 4.6,
  rotateSpeed: 30 / 28,
};

interface RoseOrbitProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ R: number; A: number; k: number; sc: number }>;
}

export function RoseOrbit({ args, ...props }: RoseOrbitProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { R: 7, A: 2.7, k: 7, sc: 3.9, ...args };
    return buildPath(normalize(roseOrbitPoint(merged.R, merged.A, merged.k, merged.sc), 480), 480, true);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
