import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { lissajousPoint } from "../factories";
import { normalize, buildPath } from "../normalize";

const defaultD = buildPath(normalize(lissajousPoint(24, 6, 3, 4, 1.57, 0.92), 480), 480, true);

const defaults: Partial<CurveAnimatedProps> = {
  trailSpan: 0.34,
  duration: 6.0,
  trailWidth: 4.7,
  breatheDuration: 5.4,
};

interface LissajousDriftProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ amp: number; a: number; b: number; ph: number; yS: number }>;
}

export function LissajousDrift({ args, ...props }: LissajousDriftProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { amp: 24, a: 3, b: 4, ph: 1.57, yS: 0.92, ...args };
    return buildPath(normalize(lissajousPoint(merged.amp, 6, merged.a, merged.b, merged.ph, merged.yS), 480), 480, true);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
