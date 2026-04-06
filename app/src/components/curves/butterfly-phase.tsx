"use client";

import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { butterflyPoint } from "@/lib/curves/factories";
import { normalize, buildPath } from "@/lib/curves/normalize";

const defaultD = buildPath(normalize(butterflyPoint(12, 4.6, 0.45, 2, 5), 960), 960, true);

const defaults: Partial<CurveAnimatedProps> = {
  progress: 0.32,
  duration: 9.0,
  trailWidth: 4.4,
  breatheDuration: 7.0,
};

interface ButterflyPhaseProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ turns: number; sc: number; cw: number; pw: number }>;
}

export function ButterflyPhase({ args, ...props }: ButterflyPhaseProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { turns: 12, sc: 4.6, cw: 2, pw: 5, ...args };
    return buildPath(normalize(butterflyPoint(merged.turns, merged.sc, 0.45, merged.cw, merged.pw), 960), 960, true);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
