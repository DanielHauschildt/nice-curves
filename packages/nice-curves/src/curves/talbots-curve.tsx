import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { talbotCurvePoint } from "../factories";
import { normalize, buildPath } from "../normalize";

const defaultD = buildPath(normalize(talbotCurvePoint(1, 1.5, 0.8, 10), 480), 480, true);

const defaults: Partial<CurveAnimatedProps> = {
  trailSpan: 0.3,
  duration: 5.5,
  trailWidth: 4.3,
  breatheDuration: 5,
};

interface TalbotsCurveProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ a: number; b: number; f: number }>;
}

export function TalbotsCurve({ args, ...props }: TalbotsCurveProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { a: 1, b: 1.5, f: 0.8, ...args };
    return buildPath(normalize(talbotCurvePoint(merged.a, merged.b, merged.f, 10), 480), 480, true);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
