import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { heartWavePoint } from "../factories";
import { normalize, buildPath } from "../normalize";

const defaultD = buildPath(normalize(heartWavePoint(6.4, 3.3, 0.9, 23.2, 24.5), 480), 480, false);

const defaults: Partial<CurveAnimatedProps> = {
  trailSpan: 0.18,
  duration: 8.4,
  trailWidth: 3.9,
  breatheDuration: 5.6,
};

interface HeartWaveProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ b: number; root: number; amp: number }>;
}

export function HeartWave({ args, ...props }: HeartWaveProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { b: 6.4, root: 3.3, amp: 0.9, ...args };
    return buildPath(normalize(heartWavePoint(merged.b, merged.root, merged.amp, 23.2, 24.5), 480), 480, false);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
