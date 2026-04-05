import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { cissoidPoint } from "../factories";
import { normalize, buildPath } from "../normalize";

const defaultD = buildPath(normalize(cissoidPoint(8), 480), 480, false);

const defaults: Partial<CurveAnimatedProps> = {
  progress: 0.25,
  duration: 7.0,
  trailWidth: 4.0,
  breatheDuration: 5.5,
};

interface CissoidProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ a: number }>;
}

export function Cissoid({ args, ...props }: CissoidProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { a: 8, ...args };
    return buildPath(normalize(cissoidPoint(merged.a), 480), 480, false);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
