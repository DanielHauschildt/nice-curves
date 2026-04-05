import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { geronoLemniscatePoint } from "../factories";
import { normalize, buildPath } from "../normalize";

const defaultD = buildPath(normalize(geronoLemniscatePoint(28), 480), 480, true);

const defaults: Partial<CurveAnimatedProps> = {
  progress: 0.35,
  duration: 5.0,
  trailWidth: 4.8,
  breatheDuration: 5.0,
};

export function GeronoLemniscate(props: Partial<CurveAnimatedProps>) {
  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={defaultD} />
    </CurveAnimated>
  );
}
