import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { petalSpiralPoint } from "../factories";
import { normalize, buildPath } from "../normalize";

const defaultD = buildPath(normalize(petalSpiralPoint(4, 1, 3, 2.2, 0.45), 480), 480, true);

const defaults: Partial<CurveAnimatedProps> = {
  progress: 0.34,
  duration: 4.6,
  trailWidth: 4.4,
  breatheDuration: 4.2,
  rotateSpeed: 30 / 28,
};

interface FourPetalSpiralProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ R: number; r: number; d: number }>;
}

export function FourPetalSpiral({ args, ...props }: FourPetalSpiralProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { R: 4, r: 1, d: 3, ...args };
    return buildPath(normalize(petalSpiralPoint(merged.R, merged.r, merged.d, 2.2, 0.45), 480), 480, true);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
