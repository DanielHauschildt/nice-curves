"use client";

import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { cassiniOvalPoint } from "@/lib/curves/factories";
import { normalize, buildPath } from "@/lib/curves/normalize";

const defaultD = buildPath(normalize(cassiniOvalPoint(10, 12.5, 2.3), 480), 480, true);

const defaults: Partial<CurveAnimatedProps> = {
  progress: 0.34,
  duration: 5.5,
  trailWidth: 4.6,
  breatheDuration: 5.0,
};

interface CassiniOvalProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ a: number; b: number }>;
}

export function CassiniOval({ args, ...props }: CassiniOvalProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { a: 10, b: 12.5, ...args };
    return buildPath(normalize(cassiniOvalPoint(merged.a, merged.b, 2.3), 480), 480, true);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
