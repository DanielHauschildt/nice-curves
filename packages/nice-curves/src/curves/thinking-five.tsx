import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { customRosePoint } from "../factories";
import { normalize, buildPath } from "../normalize";

const defaultD = buildPath(normalize(customRosePoint(7, 3, 5, 3.9), 480), 480, true);

const defaults: Partial<CurveAnimatedProps> = {
  progress: 0.38,
  duration: 4.6,
  trailWidth: 5.5,
  breatheDuration: 4.2,
  rotateSpeed: 30 / 28,
};

interface ThinkingFiveProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ R: number; A: number; k: number; sc: number }>;
}

export function ThinkingFive({ args, ...props }: ThinkingFiveProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { R: 7, A: 3, k: 5, sc: 3.9, ...args };
    return buildPath(normalize(customRosePoint(merged.R, merged.A, merged.k, merged.sc), 480), 480, true);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
