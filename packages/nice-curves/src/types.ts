export interface Point {
  x: number;
  y: number;
}

export type PointFunction = (progress: number) => Point;

export interface ParamDef {
  key: string;
  label: string;
  min: number;
  max: number;
  step: number;
}

export interface CurveConfig {
  name: string;
  tag: string;
  point: PointFunction;
  progress: number;
  duration: number;
  strokeWidth: number;
  rotate: number;
  breathe: number;
  open?: boolean;
  alternate?: boolean;
  steps?: number;
  rebuild?: (args: Record<string, number>) => PointFunction;
  args?: Record<string, number>;
  params?: ParamDef[];
}
