import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { fermatSpiralPoint } from "../factories";
import { normalize, buildPath } from "../normalize";

const defaultD = buildPath(normalize(fermatSpiralPoint(4, 36), 480), 480, false);

const defaults: Partial<CurveAnimatedProps> = {
  trailSpan: 0.22,
  duration: 7.0,
  trailWidth: 4.0,
  breatheDuration: 5.5,
};

interface FermatSpiralProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ turns: number }>;
}

export function FermatSpiral({ args, ...props }: FermatSpiralProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { turns: 4, ...args };
    return buildPath(normalize(fermatSpiralPoint(merged.turns, 36), 480), 480, false);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
