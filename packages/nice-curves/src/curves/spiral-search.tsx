import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { spiralSearchPoint } from "../factories";
import { normalize, buildPath } from "../normalize";

const defaultD = buildPath(normalize(spiralSearchPoint(4, 8, 8.5, 2.4, 1), 480), 480, true);

const defaults: Partial<CurveAnimatedProps> = {
  progress: 0.28,
  duration: 7.8,
  trailWidth: 4.3,
  breatheDuration: 6.8,
};

interface SpiralSearchProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ turns: number; base: number; rA: number }>;
}

export function SpiralSearch({ args, ...props }: SpiralSearchProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { turns: 4, base: 8, rA: 8.5, ...args };
    return buildPath(normalize(spiralSearchPoint(merged.turns, merged.base, merged.rA, 2.4, 1), 480), 480, true);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
