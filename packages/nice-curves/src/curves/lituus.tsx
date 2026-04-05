import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { lituusPoint } from "../factories";
import { normalize, buildPath } from "../normalize";

const defaultD = buildPath(normalize(lituusPoint(12, 0.3, 7 * Math.PI, 4.5), 480), 480, false);

const defaults: Partial<CurveAnimatedProps> = {
  trailSpan: 0.25,
  duration: 7.0,
  trailWidth: 4.0,
  breatheDuration: 5.5,
};

interface LituusProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ k: number }>;
}

export function Lituus({ args, ...props }: LituusProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { k: 12, ...args };
    return buildPath(normalize(lituusPoint(merged.k, 0.3, 7 * Math.PI, 4.5), 480), 480, false);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
