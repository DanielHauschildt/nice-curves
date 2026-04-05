import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { cochleoidPoint } from "../factories";
import { normalize, buildPath } from "../normalize";

const defaultD = buildPath(normalize(cochleoidPoint(30, 6 * Math.PI), 480), 480, false);

const defaults: Partial<CurveAnimatedProps> = {
  trailSpan: 0.2,
  duration: 7,
  trailWidth: 4,
  breatheDuration: 5.5,
};

interface CochleoidProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ a: number }>;
}

export function Cochleoid({ args, ...props }: CochleoidProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { a: 30, ...args };
    return buildPath(normalize(cochleoidPoint(merged.a, 6 * Math.PI), 480), 480, false);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
