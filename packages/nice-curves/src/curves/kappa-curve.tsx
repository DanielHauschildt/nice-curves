import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { kappaCurvePoint } from "../factories";
import { normalize, buildPath } from "../normalize";

const defaultD = buildPath(normalize(kappaCurvePoint(1, 10), 480), 480, false);

const defaults: Partial<CurveAnimatedProps> = {
  progress: 0.25,
  duration: 6,
  trailWidth: 4.2,
  breatheDuration: 5.5,
};

interface KappaCurveProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ a: number }>;
}

export function KappaCurve({ args, ...props }: KappaCurveProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { a: 1, ...args };
    return buildPath(normalize(kappaCurvePoint(merged.a, 10), 480), 480, false);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
