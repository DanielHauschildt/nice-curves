"use client";

import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { torusKnotConfigPoint } from "@/lib/curves/factories";
import { normalize, buildPath } from "@/lib/curves/normalize";

const defaultD = buildPath(normalize(torusKnotConfigPoint(3, 2, 2, 1, 10), 480), 480, true);

const defaults: Partial<CurveAnimatedProps> = {
  progress: 0.30,
  duration: 6.0,
  trailWidth: 4.3,
  breatheDuration: 5.2,
};

interface TorusKnotProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ p: number; q: number; R: number; r: number }>;
}

export function TorusKnot({ args, ...props }: TorusKnotProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { p: 3, q: 2, R: 2, r: 1, ...args };
    return buildPath(normalize(torusKnotConfigPoint(merged.p, merged.q, merged.R, merged.r, 10), 480), 480, true);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
