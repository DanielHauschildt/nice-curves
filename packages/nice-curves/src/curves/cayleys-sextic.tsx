import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { cayleySexticPoint } from "../factories";
import { normalize, buildPath } from "../normalize";

const defaultD = buildPath(normalize(cayleySexticPoint(2, 1), 720), 720, true);

const defaults: Partial<CurveAnimatedProps> = {
  progress: 0.3,
  duration: 6,
  trailWidth: 4.3,
  breatheDuration: 5,
};

interface CayleySexticProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ a: number }>;
}

export function CayleySextic({ args, ...props }: CayleySexticProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { a: 2, ...args };
    return buildPath(normalize(cayleySexticPoint(merged.a, 1), 720), 720, true);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
