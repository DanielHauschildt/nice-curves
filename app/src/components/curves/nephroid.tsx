"use client";

import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { nephroidPoint } from "@/lib/curves/factories";
import { normalize, buildPath } from "@/lib/curves/normalize";

const defaultD = buildPath(normalize(nephroidPoint(7.5), 480), 480, true);

const defaults: Partial<CurveAnimatedProps> = {
  progress: 0.34,
  duration: 5.2,
  trailWidth: 4.7,
  breatheDuration: 5.0,
};

export function Nephroid(props: Partial<CurveAnimatedProps>) {
  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={defaultD} />
    </CurveAnimated>
  );
}
