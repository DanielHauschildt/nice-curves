"use client";

import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { pearShapedPoint } from "@/lib/curves/factories";
import { normalize, buildPath } from "@/lib/curves/normalize";

const defaultD = buildPath(normalize(pearShapedPoint(3, 3, 3), 480), 480, true);

const defaults: Partial<CurveAnimatedProps> = {
  progress: 0.3,
  duration: 5.5,
  trailWidth: 4.4,
  breatheDuration: 5,
};

interface PearQuarticProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ a: number; b: number }>;
}

export function PearQuartic({ args, ...props }: PearQuarticProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { a: 3, b: 3, ...args };
    return buildPath(normalize(pearShapedPoint(merged.a, merged.b, 3), 480), 480, true);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
