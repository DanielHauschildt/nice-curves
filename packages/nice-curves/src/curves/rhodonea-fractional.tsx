import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { fractionalRosePoint } from "../factories";
import { normalize, buildPath } from "../normalize";

const defaultD = buildPath(normalize(fractionalRosePoint(2.333, 28), 720), 720, true);

const defaults: Partial<CurveAnimatedProps> = {
  trailSpan: 0.2,
  duration: 8.0,
  trailWidth: 4.0,
  breatheDuration: 5.5,
};

interface RhodoneaFractionalProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ k: number }>;
}

export function RhodoneaFractional({ args, ...props }: RhodoneaFractionalProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { k: 2.333, ...args };
    return buildPath(normalize(fractionalRosePoint(merged.k, 28), 720), 720, true);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
