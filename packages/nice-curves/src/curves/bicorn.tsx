import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { bicornPoint } from "../factories";
import { normalize, buildPath } from "../normalize";

const defaultD = buildPath(normalize(bicornPoint(15), 480), 480, true);

const defaults: Partial<CurveAnimatedProps> = {
  progress: 0.3,
  duration: 5,
  trailWidth: 4.5,
  breatheDuration: 5,
};

interface BicornProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ a: number }>;
}

export function Bicorn({ args, ...props }: BicornProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { a: 15, ...args };
    return buildPath(normalize(bicornPoint(merged.a), 480), 480, true);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
