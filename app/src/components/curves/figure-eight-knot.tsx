"use client";

import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { figureEightKnotPoint } from "@/lib/curves/factories";
import { normalize, buildPath } from "@/lib/curves/normalize";

const defaultD = buildPath(normalize(figureEightKnotPoint(11), 480), 480, true);

const defaults: Partial<CurveAnimatedProps> = {
  progress: 0.3,
  duration: 5.5,
  trailWidth: 4.3,
  breatheDuration: 5.2,
};

export function FigureEightKnot(props: Partial<CurveAnimatedProps>) {
  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={defaultD} />
    </CurveAnimated>
  );
}
