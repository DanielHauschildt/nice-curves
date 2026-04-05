import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { catenaryPoint } from "../factories";
import { normalize, buildPath } from "../normalize";

const defaultD = buildPath(normalize(catenaryPoint(5, 3), 480), 480, false);

const defaults: Partial<CurveAnimatedProps> = {
  progress: 0.25,
  duration: 6,
  trailWidth: 4.2,
  breatheDuration: 5.5,
};

interface CatenaryProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ a: number; range: number }>;
}

export function Catenary({ args, ...props }: CatenaryProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { a: 5, range: 3, ...args };
    return buildPath(normalize(catenaryPoint(merged.a, merged.range), 480), 480, false);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
