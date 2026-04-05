import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { trifoliumPoint } from "../factories";
import { normalize, buildPath } from "../normalize";

const defaultD = buildPath(normalize(trifoliumPoint(1, 10), 480), 480, true);

const defaults: Partial<CurveAnimatedProps> = {
  trailSpan: 0.3,
  duration: 5,
  trailWidth: 4.5,
  breatheDuration: 5,
};

interface TrifoliumProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ a: number }>;
}

export function Trifolium({ args, ...props }: TrifoliumProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { a: 1, ...args };
    return buildPath(normalize(trifoliumPoint(merged.a, 10), 480), 480, true);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
