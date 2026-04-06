"use client";

import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { hyperbolicSpiralPoint } from "@/lib/curves/factories";
import { normalize, buildPath } from "@/lib/curves/normalize";

const defaultD = buildPath(normalize(hyperbolicSpiralPoint(10, 0.3, 7 * Math.PI, 4.5), 480), 480, false);

const defaults: Partial<CurveAnimatedProps> = {
  progress: 0.25,
  duration: 7.0,
  trailWidth: 4.0,
  breatheDuration: 5.5,
};

interface HyperbolicSpiralProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ a: number }>;
}

export function HyperbolicSpiral({ args, ...props }: HyperbolicSpiralProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { a: 10, ...args };
    return buildPath(normalize(hyperbolicSpiralPoint(merged.a, 0.3, 7 * Math.PI, 4.5), 480), 480, false);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
