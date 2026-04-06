"use client";

import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { reuleauxTrianglePoint } from "@/lib/curves/factories";
import { normalize, buildPath } from "@/lib/curves/normalize";

const defaultD = buildPath(normalize(reuleauxTrianglePoint(22), 480), 480, true);

const defaults: Partial<CurveAnimatedProps> = {
  progress: 0.32,
  duration: 4.8,
  trailWidth: 5.0,
  breatheDuration: 4.2,
  rotateSpeed: 30 / 20,
};

export function ReuleauxTriangle(props: Partial<CurveAnimatedProps>) {
  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={defaultD} />
    </CurveAnimated>
  );
}
