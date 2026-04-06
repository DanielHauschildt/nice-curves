"use client";

import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { trefoilKnotPoint } from "@/lib/curves/factories";
import { normalize, buildPath } from "@/lib/curves/normalize";

const defaultD = buildPath(normalize(trefoilKnotPoint(12), 480), 480, true);

const defaults: Partial<CurveAnimatedProps> = {
  progress: 0.35,
  duration: 5.5,
  trailWidth: 4.5,
  breatheDuration: 5.0,
};

export function TrefoilKnot(props: Partial<CurveAnimatedProps>) {
  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={defaultD} />
    </CurveAnimated>
  );
}
