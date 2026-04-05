import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { roseCurvePoint } from "../factories";
import { normalize, buildPath } from "../normalize";

const defaultD = buildPath(normalize(roseCurvePoint(9.2, 0.6, 0.72, 0.28, 2, 3.25), 480), 480, true);

const defaults: Partial<CurveAnimatedProps> = {
  progress: 0.30,
  duration: 5.2,
  trailWidth: 4.6,
  breatheDuration: 4.3,
  rotateSpeed: 30 / 28,
};

interface RoseTwoProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ a: number; k: number; sc: number }>;
}

export function RoseTwo({ args, ...props }: RoseTwoProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { a: 9.2, k: 2, sc: 3.25, ...args };
    return buildPath(normalize(roseCurvePoint(merged.a, 0.6, 0.72, 0.28, merged.k, merged.sc), 480), 480, true);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
