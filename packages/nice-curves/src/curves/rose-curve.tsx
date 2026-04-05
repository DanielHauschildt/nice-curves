import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { roseCurvePoint } from "../factories";
import { normalize, buildPath } from "../normalize";

const defaultD = buildPath(normalize(roseCurvePoint(9.2, 0.6, 0.72, 0.28, 5, 3.25), 480), 480, true);

const defaults: Partial<CurveAnimatedProps> = {
  trailSpan: 0.32,
  duration: 5.4,
  trailWidth: 4.5,
  breatheDuration: 4.6,
  rotateSpeed: 30 / 28,
};

interface RoseCurveProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ a: number; aB: number; k: number; sc: number }>;
}

export function RoseCurve({ args, ...props }: RoseCurveProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { a: 9.2, aB: 0.6, k: 5, sc: 3.25, ...args };
    return buildPath(normalize(roseCurvePoint(merged.a, merged.aB, 0.72, 0.28, merged.k, merged.sc), 480), 480, true);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
