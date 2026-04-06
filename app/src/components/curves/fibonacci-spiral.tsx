"use client";

import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { fibonacciSpiralPoint } from "@/lib/curves/factories";
import { normalize, buildPath } from "@/lib/curves/normalize";

const defaultD = buildPath(normalize(fibonacciSpiralPoint(2, 0.08), 480), 480, false);

const defaults: Partial<CurveAnimatedProps> = {
  progress: 0.2,
  duration: 7.0,
  trailWidth: 4.0,
  breatheDuration: 5.5,
};

interface FibonacciSpiralProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ turns: number }>;
}

export function FibonacciSpiral({ args, ...props }: FibonacciSpiralProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { turns: 2, ...args };
    return buildPath(normalize(fibonacciSpiralPoint(merged.turns, 0.08), 480), 480, false);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
