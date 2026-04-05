import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { foliumPoint } from "../factories";
import { normalize, buildPath } from "../normalize";

const defaultD = buildPath(normalize(foliumPoint(3, 2), 480), 480, false);

const defaults: Partial<CurveAnimatedProps> = {
  trailSpan: 0.2,
  duration: 8.0,
  trailWidth: 4.0,
  breatheDuration: 5.5,
};

interface FoliumOfDescartesProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ a: number; scale: number }>;
}

export function FoliumOfDescartes({ args, ...props }: FoliumOfDescartesProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { a: 3, scale: 2, ...args };
    return buildPath(normalize(foliumPoint(merged.a, merged.scale), 480), 480, false);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
