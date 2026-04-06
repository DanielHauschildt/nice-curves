"use client";

import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { cinquefoilKnotPoint } from "@/lib/curves/factories";
import { normalize, buildPath } from "@/lib/curves/normalize";

const defaultD = buildPath(normalize(cinquefoilKnotPoint(11), 480), 480, true);

const defaults: Partial<CurveAnimatedProps> = {
  progress: 0.3,
  duration: 6.0,
  trailWidth: 4.3,
  breatheDuration: 5.0,
};

export function CinquefoilKnot(props: Partial<CurveAnimatedProps>) {
  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={defaultD} />
    </CurveAnimated>
  );
}
