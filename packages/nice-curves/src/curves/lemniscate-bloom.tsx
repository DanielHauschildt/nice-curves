import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { lemniscatePoint } from "../factories";
import { normalize, buildPath } from "../normalize";

const defaultD = buildPath(normalize(lemniscatePoint(20, 7), 480), 480, true);

const defaults: Partial<CurveAnimatedProps> = {
  trailSpan: 0.40,
  duration: 5.6,
  trailWidth: 4.8,
  breatheDuration: 5.0,
};

interface LemniscateBloomProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ a: number; bo: number }>;
}

export function LemniscateBloom({ args, ...props }: LemniscateBloomProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { a: 20, bo: 7, ...args };
    return buildPath(normalize(lemniscatePoint(merged.a, merged.bo), 480), 480, true);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
