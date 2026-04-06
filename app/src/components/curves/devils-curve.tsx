"use client";

import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { devilsCurvePoint } from "@/lib/curves/factories";
import { normalize, buildPath } from "@/lib/curves/normalize";

const defaultD = buildPath(normalize(devilsCurvePoint(1, 0.8, 10), 480), 480, true);

const defaults: Partial<CurveAnimatedProps> = {
  progress: 0.3,
  duration: 6,
  trailWidth: 4.3,
  breatheDuration: 5,
};

interface DevilsCurveProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ a: number; b: number }>;
}

export function DevilsCurve({ args, ...props }: DevilsCurveProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { a: 1, b: 0.8, ...args };
    return buildPath(normalize(devilsCurvePoint(merged.a, merged.b, 10), 480), 480, true);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
