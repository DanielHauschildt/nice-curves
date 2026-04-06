"use client";

import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { involutePoint } from "@/lib/curves/factories";
import { normalize, buildPath } from "@/lib/curves/normalize";

const defaultD = buildPath(normalize(involutePoint(3, 1.8), 480), 480, false);

const defaults: Partial<CurveAnimatedProps> = {
  progress: 0.24,
  duration: 7.0,
  trailWidth: 4.2,
  breatheDuration: 5.5,
};

interface CircleInvoluteProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ turns: number }>;
}

export function CircleInvolute({ args, ...props }: CircleInvoluteProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { turns: 3, ...args };
    return buildPath(normalize(involutePoint(merged.turns, 1.8), 480), 480, false);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
