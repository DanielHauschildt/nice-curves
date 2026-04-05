import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { conchoidPoint } from "../factories";
import { normalize, buildPath } from "../normalize";

const defaultD = buildPath(normalize(conchoidPoint(3, 5, 1), 480), 480, false);

const defaults: Partial<CurveAnimatedProps> = {
  trailSpan: 0.25,
  duration: 7.0,
  trailWidth: 4.2,
  breatheDuration: 5.5,
};

interface ConchoidProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ a: number; b: number }>;
}

export function Conchoid({ args, ...props }: ConchoidProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { a: 3, b: 5, ...args };
    return buildPath(normalize(conchoidPoint(merged.a, merged.b, 1), 480), 480, false);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
