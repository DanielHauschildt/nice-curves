"use client";

import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { doubleFoliumPoint } from "@/lib/curves/factories";
import { normalize, buildPath } from "@/lib/curves/normalize";

const defaultD = buildPath(normalize(doubleFoliumPoint(1, 10), 480), 480, true);

const defaults: Partial<CurveAnimatedProps> = {
  progress: 0.3,
  duration: 5.5,
  trailWidth: 4.4,
  breatheDuration: 5,
};

interface DoubleFoliumProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ a: number }>;
}

export function DoubleFolium({ args, ...props }: DoubleFoliumProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { a: 1, ...args };
    return buildPath(normalize(doubleFoliumPoint(merged.a, 10), 480), 480, true);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
