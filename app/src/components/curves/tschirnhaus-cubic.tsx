"use client";

import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { tschirnhausCubicPoint } from "@/lib/curves/factories";
import { normalize, buildPath } from "@/lib/curves/normalize";

const defaultD = buildPath(normalize(tschirnhausCubicPoint(1, 3), 480), 480, false);

const defaults: Partial<CurveAnimatedProps> = {
  progress: 0.25,
  duration: 6,
  trailWidth: 4.3,
  breatheDuration: 5.5,
};

interface TschirnhausCubicProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ a: number }>;
}

export function TschirnhausCubic({ args, ...props }: TschirnhausCubicProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { a: 1, ...args };
    return buildPath(normalize(tschirnhausCubicPoint(merged.a, 3), 480), 480, false);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
