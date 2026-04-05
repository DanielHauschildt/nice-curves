import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { superformulaPoint } from "../factories";
import { normalize, buildPath } from "../normalize";

const defaultD = buildPath(normalize(superformulaPoint(6, 1, 1, 1, 28), 480), 480, true);

const defaults: Partial<CurveAnimatedProps> = {
  progress: 0.3,
  duration: 5.0,
  trailWidth: 4.5,
  breatheDuration: 4.5,
};

interface SuperformulaProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ m: number; n1: number; n2: number; n3: number }>;
}

export function Superformula({ args, ...props }: SuperformulaProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { m: 6, n1: 1, n2: 1, n3: 1, ...args };
    return buildPath(normalize(superformulaPoint(merged.m, merged.n1, merged.n2, merged.n3, 28), 480), 480, true);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
