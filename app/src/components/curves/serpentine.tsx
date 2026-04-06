"use client";

import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { serpentinePoint } from "@/lib/curves/factories";
import { normalize, buildPath } from "@/lib/curves/normalize";

const defaultD = buildPath(normalize(serpentinePoint(3, 4, 6), 480), 480, false);

const defaults: Partial<CurveAnimatedProps> = {
  progress: 0.2,
  duration: 7,
  trailWidth: 4.2,
  breatheDuration: 5.5,
};

interface SerpentineProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ a: number; b: number }>;
}

export function Serpentine({ args, ...props }: SerpentineProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { a: 3, b: 4, ...args };
    return buildPath(normalize(serpentinePoint(merged.a, merged.b, 6), 480), 480, false);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
