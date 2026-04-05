import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { ranunculoidPoint } from "../factories";
import { normalize, buildPath } from "../normalize";

const defaultD = buildPath(normalize(ranunculoidPoint(5, 1, 3), 480), 480, true);

const defaults: Partial<CurveAnimatedProps> = {
  trailSpan: 0.3,
  duration: 5.0,
  trailWidth: 4.4,
  breatheDuration: 4.5,
  rotateSpeed: 30 / 20,
};

interface RanunculoidProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ R: number; r: number }>;
}

export function Ranunculoid({ args, ...props }: RanunculoidProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { R: 5, r: 1, ...args };
    return buildPath(normalize(ranunculoidPoint(merged.R, merged.r, 3), 480), 480, true);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
