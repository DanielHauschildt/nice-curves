"use client";

import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { sinusoidalSpiralPoint } from "@/lib/curves/factories";
import { normalize, buildPath } from "@/lib/curves/normalize";

const defaultD = buildPath(normalize(sinusoidalSpiralPoint(1.5, 1, 10), 480), 480, true);

const defaults: Partial<CurveAnimatedProps> = {
  progress: 0.3,
  duration: 5.5,
  trailWidth: 4.4,
  breatheDuration: 5,
};

interface SinusoidalSpiralProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ pp: number }>;
}

export function SinusoidalSpiral({ args, ...props }: SinusoidalSpiralProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { pp: 1.5, ...args };
    return buildPath(normalize(sinusoidalSpiralPoint(merged.pp, 1, 10), 480), 480, true);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
