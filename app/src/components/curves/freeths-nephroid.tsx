"use client";

import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { freethNephroidPoint } from "@/lib/curves/factories";
import { normalize, buildPath } from "@/lib/curves/normalize";

const defaultD = buildPath(normalize(freethNephroidPoint(1, 10), 720), 720, true);

const defaults: Partial<CurveAnimatedProps> = {
  progress: 0.25,
  duration: 6,
  trailWidth: 4.3,
  breatheDuration: 5,
};

interface FreethsNephroidProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ a: number }>;
}

export function FreethsNephroid({ args, ...props }: FreethsNephroidProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { a: 1, ...args };
    return buildPath(normalize(freethNephroidPoint(merged.a, 10), 720), 720, true);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
