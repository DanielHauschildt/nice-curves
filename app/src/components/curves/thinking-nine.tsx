"use client";

import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { customRosePoint } from "@/lib/curves/factories";
import { normalize, buildPath } from "@/lib/curves/normalize";

const defaultD = buildPath(normalize(customRosePoint(7, 3, 9, 3.9), 480), 480, true);

const defaults: Partial<CurveAnimatedProps> = {
  progress: 0.39,
  duration: 4.7,
  trailWidth: 5.5,
  breatheDuration: 4.2,
  rotateSpeed: 30 / 30,
};

interface ThinkingNineProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ R: number; A: number; k: number; sc: number }>;
}

export function ThinkingNine({ args, ...props }: ThinkingNineProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { R: 7, A: 3, k: 9, sc: 3.9, ...args };
    return buildPath(normalize(customRosePoint(merged.R, merged.A, merged.k, merged.sc), 480), 480, true);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
