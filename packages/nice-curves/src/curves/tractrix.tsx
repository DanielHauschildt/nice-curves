import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { tractrixPoint } from "../factories";
import { normalize, buildPath } from "../normalize";

const defaultD = buildPath(normalize(tractrixPoint(5, 4, 3), 480), 480, false);

const defaults: Partial<CurveAnimatedProps> = {
  progress: 0.25,
  duration: 7,
  trailWidth: 4.2,
  breatheDuration: 5.5,
};

interface TractrixProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ a: number }>;
}

export function Tractrix({ args, ...props }: TractrixProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { a: 5, ...args };
    return buildPath(normalize(tractrixPoint(merged.a, 4, 3), 480), 480, false);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
