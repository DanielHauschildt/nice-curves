import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { roseCurvePoint } from "../factories";
import { normalize, buildPath } from "../normalize";

const defaultD = buildPath(normalize(roseCurvePoint(9.2, 0.6, 0.72, 0.28, 3, 3.25), 480), 480, true);

const defaults: Partial<CurveAnimatedProps> = {
  progress: 0.31,
  duration: 5.3,
  trailWidth: 4.6,
  breatheDuration: 4.4,
  rotateSpeed: 30 / 28,
};

interface RoseThreeProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ a: number; k: number; sc: number }>;
}

export function RoseThree({ args, ...props }: RoseThreeProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { a: 9.2, k: 3, sc: 3.25, ...args };
    return buildPath(normalize(roseCurvePoint(merged.a, 0.6, 0.72, 0.28, merged.k, merged.sc), 480), 480, true);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
