import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { nephroidPoint } from "../factories";
import { normalize, buildPath } from "../normalize";

const defaultD = buildPath(normalize(nephroidPoint(7.5), 480), 480, true);

const defaults: Partial<CurveAnimatedProps> = {
  trailSpan: 0.34,
  duration: 5.2,
  trailWidth: 4.7,
  breatheDuration: 5.0,
};

export function Nephroid(props: Partial<CurveAnimatedProps>) {
  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={defaultD} />
    </CurveAnimated>
  );
}
