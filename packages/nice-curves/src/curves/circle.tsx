import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { circlePoint } from "../factories";
import { normalize, buildPath } from "../normalize";

const defaultD = buildPath(normalize(circlePoint(30), 480), 480, true);

const defaults: Partial<CurveAnimatedProps> = {
  trailSpan: 0.30,
  duration: 3.5,
  trailWidth: 5.0,
  breatheDuration: 4.0,
};

export function Circle(props: Partial<CurveAnimatedProps>) {
  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={defaultD} />
    </CurveAnimated>
  );
}
