import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { superellipsePoint } from "../factories";
import { normalize, buildPath } from "../normalize";

const defaultD = buildPath(normalize(superellipsePoint(4, 30, 30), 480), 480, true);

const defaults: Partial<CurveAnimatedProps> = {
  trailSpan: 0.30,
  duration: 4.5,
  trailWidth: 5.0,
  breatheDuration: 4.0,
  rotateSpeed: 30 / 20,
};

interface SquircleProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ n: number }>;
}

export function Squircle({ args, ...props }: SquircleProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { n: 4, ...args };
    return buildPath(normalize(superellipsePoint(merged.n, 30, 30), 480), 480, true);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
