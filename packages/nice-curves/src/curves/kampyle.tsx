import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { kampylePoint } from "../factories";
import { normalize, buildPath } from "../normalize";

const defaultD = buildPath(normalize(kampylePoint(1, 10), 480), 480, false);

const defaults: Partial<CurveAnimatedProps> = {
  trailSpan: 0.25,
  duration: 7,
  trailWidth: 4,
  breatheDuration: 5.5,
};

interface KampyleProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ a: number }>;
}

export function Kampyle({ args, ...props }: KampyleProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { a: 1, ...args };
    return buildPath(normalize(kampylePoint(merged.a, 10), 480), 480, false);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
