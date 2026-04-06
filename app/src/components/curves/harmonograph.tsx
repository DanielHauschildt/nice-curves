"use client";

import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { harmonographPoint } from "@/lib/curves/factories";
import { normalize, buildPath } from "@/lib/curves/normalize";

const defaultD = buildPath(normalize(harmonographPoint(), 960), 960, false);

const defaults: Partial<CurveAnimatedProps> = {
  progress: 0.15,
  duration: 10,
  trailWidth: 3.8,
  breatheDuration: 6.0,
};

export function Harmonograph(props: Partial<CurveAnimatedProps>) {
  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={defaultD} />
    </CurveAnimated>
  );
}
