"use client";

import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { roundedPolygonPoint } from "@/lib/curves/factories";
import { normalize, buildPath } from "@/lib/curves/normalize";

const defaultD = buildPath(normalize(roundedPolygonPoint(5, 28, 0.18), 480), 480, true);

const defaults: Partial<CurveAnimatedProps> = {
  progress: 0.30,
  duration: 4.5,
  trailWidth: 5.0,
  breatheDuration: 4.0,
  rotateSpeed: 30 / 18,
};

interface RoundedPentagonProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ sides: number; amp: number }>;
}

export function RoundedPentagon({ args, ...props }: RoundedPentagonProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { sides: 5, amp: 0.18, ...args };
    return buildPath(normalize(roundedPolygonPoint(merged.sides, 28, merged.amp), 480), 480, true);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
