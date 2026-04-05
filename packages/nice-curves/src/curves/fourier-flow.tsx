import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { fourierFlowPoint } from "../factories";
import { normalize, buildPath } from "../normalize";

const defaultD = buildPath(normalize(fourierFlowPoint(17, 7.5, 3.2, 15, 8.2, 4.2, 1, 0.16), 480), 480, true);

const defaults: Partial<CurveAnimatedProps> = {
  trailSpan: 0.31,
  duration: 8.4,
  trailWidth: 4.2,
  breatheDuration: 6.8,
};

interface FourierFlowProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ x1: number; x3: number; x5: number; y1: number; y2: number; y4: number }>;
}

export function FourierFlow({ args, ...props }: FourierFlowProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { x1: 17, x3: 7.5, x5: 3.2, y1: 15, y2: 8.2, y4: 4.2, ...args };
    return buildPath(normalize(fourierFlowPoint(merged.x1, merged.x3, merged.x5, merged.y1, merged.y2, merged.y4, 1, 0.16), 480), 480, true);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
