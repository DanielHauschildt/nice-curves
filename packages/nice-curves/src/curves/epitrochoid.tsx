import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { epitrochoidPoint } from "../factories";
import { normalize, buildPath } from "../normalize";

const defaultD = buildPath(normalize(epitrochoidPoint(5, 2, 3.5, 3), 480), 480, true);

const defaults: Partial<CurveAnimatedProps> = {
  progress: 0.35,
  duration: 5.5,
  trailWidth: 4.4,
  breatheDuration: 4.5,
  rotateSpeed: 30 / 24,
};

interface EpitrochoidProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ R: number; r: number; d: number; sc: number }>;
}

export function Epitrochoid({ args, ...props }: EpitrochoidProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { R: 5, r: 2, d: 3.5, sc: 3, ...args };
    return buildPath(normalize(epitrochoidPoint(merged.R, merged.r, merged.d, merged.sc), 480), 480, true);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
