"use client";

import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { trisectrixPoint } from "@/lib/curves/factories";
import { normalize, buildPath } from "@/lib/curves/normalize";

const defaultD = buildPath(normalize(trisectrixPoint(1, 10), 480), 480, false);

const defaults: Partial<CurveAnimatedProps> = {
  progress: 0.25,
  duration: 6,
  trailWidth: 4.2,
  breatheDuration: 5.5,
};

interface TrisectrixProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ a: number }>;
}

export function Trisectrix({ args, ...props }: TrisectrixProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { a: 1, ...args };
    return buildPath(normalize(trisectrixPoint(merged.a, 10), 480), 480, false);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
