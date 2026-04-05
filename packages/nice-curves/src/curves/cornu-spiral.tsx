import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { cornuSpiralPoint } from "../factories";
import { normalize, buildPath } from "../normalize";

const defaultD = buildPath(normalize(cornuSpiralPoint(5, 12), 480), 480, false);

const defaults: Partial<CurveAnimatedProps> = {
  trailSpan: 0.2,
  duration: 8.0,
  trailWidth: 4.0,
  breatheDuration: 5.5,
};

interface CornuSpiralProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ maxT: number }>;
}

export function CornuSpiral({ args, ...props }: CornuSpiralProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { maxT: 5, ...args };
    return buildPath(normalize(cornuSpiralPoint(merged.maxT, 12), 480), 480, false);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
