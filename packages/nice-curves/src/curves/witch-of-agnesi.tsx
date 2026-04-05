import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { witchOfAgnesiPoint } from "../factories";
import { normalize, buildPath } from "../normalize";

const defaultD = buildPath(normalize(witchOfAgnesiPoint(4, 6), 480), 480, false);

const defaults: Partial<CurveAnimatedProps> = {
  progress: 0.2,
  duration: 7.0,
  trailWidth: 4.2,
  breatheDuration: 5.5,
};

interface WitchOfAgnesiProps extends Partial<CurveAnimatedProps> {
  args?: Partial<{ a: number; range: number }>;
}

export function WitchOfAgnesi({ args, ...props }: WitchOfAgnesiProps) {
  const d = useMemo(() => {
    if (!args) return defaultD;
    const merged = { a: 4, range: 6, ...args };
    return buildPath(normalize(witchOfAgnesiPoint(merged.a, merged.range), 480), 480, false);
  }, [args]);

  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={d} />
    </CurveAnimated>
  );
}
