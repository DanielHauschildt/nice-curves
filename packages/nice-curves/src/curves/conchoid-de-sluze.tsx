import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { conchoidDeSluzePoint } from "../factories";
import { normalize, buildPath } from "../normalize";

const defaultD = buildPath(normalize(conchoidDeSluzePoint(-0.5, 10), 480), 480, false);

const defaults: Partial<CurveAnimatedProps> = {
  progress: 0.25,
  duration: 7,
  trailWidth: 4.2,
  breatheDuration: 5.5,
};

interface ConchoidDeSluzeProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ a: number }>;
}

export function ConchoidDeSluze({ args, ...props }: ConchoidDeSluzeProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { a: -0.5, ...args };
    return buildPath(normalize(conchoidDeSluzePoint(merged.a, 10), 480), 480, false);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
