import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { scarabaeusPoint } from "../factories";
import { normalize, buildPath } from "../normalize";

const defaultD = buildPath(normalize(scarabaeusPoint(1.5, 2, 12), 480), 480, true);

const defaults: Partial<CurveAnimatedProps> = {
  trailSpan: 0.3,
  duration: 5.5,
  trailWidth: 4.5,
  breatheDuration: 5.0,
};

interface ScarabaeusProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ a: number; b: number }>;
}

export function Scarabaeus({ args, ...props }: ScarabaeusProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { a: 1.5, b: 2, ...args };
    return buildPath(normalize(scarabaeusPoint(merged.a, merged.b, 12), 480), 480, true);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
