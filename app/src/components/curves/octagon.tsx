"use client";

import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { roundedPolygonPoint } from "@/lib/curves/factories";
import { normalize, buildPath } from "@/lib/curves/normalize";

const defaultD = buildPath(normalize(roundedPolygonPoint(8, 28, 0.08), 480), 480, true);

const defaults: Partial<CurveAnimatedProps> = {
  progress: 0.30,
  duration: 4.0,
  trailWidth: 5.0,
  breatheDuration: 4.0,
};

interface OctagonProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ sides: number; amp: number }>;
}

export function Octagon({ args, ...props }: OctagonProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { sides: 8, amp: 0.08, ...args };
    return buildPath(normalize(roundedPolygonPoint(merged.sides, 28, merged.amp), 480), 480, true);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
