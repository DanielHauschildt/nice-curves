import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { hypotrochoidPoint } from "../factories";
import { normalize, buildPath } from "../normalize";

const defaultD = buildPath(normalize(hypotrochoidPoint(8.2, 2.7, 0.45, 4.8, 1.2, 3.05), 480), 480, true);

const defaults: Partial<CurveAnimatedProps> = {
  trailSpan: 0.46,
  duration: 7.6,
  trailWidth: 4.6,
  breatheDuration: 6.2,
};

interface HypotrochoidLoopProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ R: number; r: number; d: number; sc: number }>;
}

export function HypotrochoidLoop({ args, ...props }: HypotrochoidLoopProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { R: 8.2, r: 2.7, d: 4.8, sc: 3.05, ...args };
    return buildPath(normalize(hypotrochoidPoint(merged.R, merged.r, 0.45, merged.d, 1.2, merged.sc), 480), 480, true);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
