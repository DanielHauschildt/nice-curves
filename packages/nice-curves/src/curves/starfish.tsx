import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { starfishPoint } from "../factories";
import { normalize, buildPath } from "../normalize";

const defaultD = buildPath(normalize(starfishPoint(5, 0.3, 28), 480), 480, true);

const defaults: Partial<CurveAnimatedProps> = {
  progress: 0.3,
  duration: 5.0,
  trailWidth: 4.5,
  breatheDuration: 4.5,
  rotateSpeed: 30 / 18,
};

interface StarfishProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ m: number; n1: number }>;
}

export function Starfish({ args, ...props }: StarfishProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { m: 5, n1: 0.3, ...args };
    return buildPath(normalize(starfishPoint(merged.m, merged.n1, 28), 480), 480, true);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
