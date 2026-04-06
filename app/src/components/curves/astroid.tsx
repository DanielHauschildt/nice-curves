"use client";

import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { astroidPoint } from "@/lib/curves/factories";
import { normalize, buildPath } from "@/lib/curves/normalize";

const defaultD = buildPath(normalize(astroidPoint(28), 480), 480, true);

const defaults: Partial<CurveAnimatedProps> = {
  progress: 0.32,
  duration: 4.8,
  trailWidth: 4.8,
  breatheDuration: 4.2,
  rotateSpeed: 30 / 22,
};

export function Astroid(props: Partial<CurveAnimatedProps>) {
  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={defaultD} />
    </CurveAnimated>
  );
}
