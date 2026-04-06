"use client";

import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { plateauCurvePoint } from "@/lib/curves/factories";
import { normalize, buildPath } from "@/lib/curves/normalize";

const defaultD = buildPath(normalize(plateauCurvePoint(3, 1, 1, 10), 480), 480, false);

const defaults: Partial<CurveAnimatedProps> = {
  progress: 0.25,
  duration: 7,
  trailWidth: 4,
  breatheDuration: 5.5,
};

interface PlateauCurveProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ m: number; n: number }>;
}

export function PlateauCurve({ args, ...props }: PlateauCurveProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { m: 3, n: 1, ...args };
    return buildPath(normalize(plateauCurvePoint(merged.m, merged.n, 1, 10), 480), 480, false);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
