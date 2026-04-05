import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { teardropPoint } from "../factories";
import { normalize, buildPath } from "../normalize";

const defaultD = buildPath(normalize(teardropPoint(1, 1, 10), 480), 480, true);

const defaults: Partial<CurveAnimatedProps> = {
  trailSpan: 0.3,
  duration: 5.5,
  trailWidth: 4.4,
  breatheDuration: 5,
};

interface TeardropProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ n: number }>;
}

export function Teardrop({ args, ...props }: TeardropProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { n: 1, ...args };
    return buildPath(normalize(teardropPoint(1, merged.n, 10), 480), 480, true);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
