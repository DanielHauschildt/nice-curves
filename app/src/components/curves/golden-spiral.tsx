"use client";

import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { logSpiralPoint } from "@/lib/curves/factories";
import { normalize, buildPath } from "@/lib/curves/normalize";

const defaultD = buildPath(normalize(logSpiralPoint(0.18, 3.5, 36), 480), 480, false);

const defaults: Partial<CurveAnimatedProps> = {
  progress: 0.22,
  duration: 7.5,
  trailWidth: 4.0,
  breatheDuration: 5.5,
};

interface GoldenSpiralProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ b: number; turns: number }>;
}

export function GoldenSpiral({ args, ...props }: GoldenSpiralProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { b: 0.18, turns: 3.5, ...args };
    return buildPath(normalize(logSpiralPoint(merged.b, merged.turns, 36), 480), 480, false);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
