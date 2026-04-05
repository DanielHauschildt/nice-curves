import { CurveSVG } from "../curve-svg";
import { CurveAnimated, type CurveAnimatedProps } from "../curve-animated";
import { deltoidPoint } from "../factories";
import { normalize, buildPath } from "../normalize";

const defaultD = buildPath(normalize(deltoidPoint(11), 480), 480, true);

const defaults: Partial<CurveAnimatedProps> = {
  trailSpan: 0.34,
  duration: 5.0,
  trailWidth: 4.6,
  breatheDuration: 4.5,
  rotateSpeed: 30 / 24,
};

export function Deltoid(props: Partial<CurveAnimatedProps>) {
  return (
    <CurveAnimated {...defaults} {...props}>
      <CurveSVG d={defaultD} />
    </CurveAnimated>
  );
}
