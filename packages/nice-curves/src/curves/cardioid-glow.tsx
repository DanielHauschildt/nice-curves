import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { cardioidGlowPoint } from "../factories";
import { normalize, buildPath } from "../normalize";

const defaultD = buildPath(normalize(cardioidGlowPoint(8.4, 0.8, 2.15), 480), 480, true);

const defaults: Partial<CurveAnimatedProps> = {
  trailSpan: 0.36,
  duration: 6.2,
  trailWidth: 4.9,
  breatheDuration: 5.2,
};

interface CardioidGlowProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ a: number; pu: number; sc: number }>;
}

export function CardioidGlow({ args, ...props }: CardioidGlowProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { a: 8.4, pu: 0.8, sc: 2.15, ...args };
    return buildPath(normalize(cardioidGlowPoint(merged.a, merged.pu, merged.sc), 480), 480, true);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
