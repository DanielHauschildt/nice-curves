import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { maurerRosePoint } from "../factories";
import { normalize, buildPath } from "../normalize";

const defaultD = buildPath(normalize(maurerRosePoint(2, 1, 28), 360), 360, true);

const defaults: Partial<CurveAnimatedProps> = {
  progress: 0.08,
  duration: 12,
  trailWidth: 3.2,
  breatheDuration: 6.5,
};

interface MaurerRoseProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ n: number; d: number }>;
}

export function MaurerRose({ args, ...props }: MaurerRoseProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { n: 2, d: 1, ...args };
    return buildPath(normalize(maurerRosePoint(merged.n, merged.d, 28), 360), 360, true);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
