import type { CSSProperties, ReactNode } from "react";

export interface CurveAnimatedProps {
  children: ReactNode;
  /** Trail color (solid or gradient start) */
  trailColor?: string;
  /** Trail gradient end color (if different from trailColor, creates gradient) */
  trailColorEnd?: string;
  /** Ghost color (solid or gradient start) */
  ghostColor?: string;
  /** Ghost gradient end color */
  ghostColorEnd?: string;
  trailSpan?: number;
  trailWidth?: number;
  trailOpacity?: number;
  ghostWidth?: number;
  ghostOpacity?: number;
  /** Base trail loop duration in seconds */
  duration?: number;
  /** Speed multiplier: negative = reverse, 0 = paused */
  speed?: number;
  /** Rotation speed: negative = reverse, 0 = off */
  rotateSpeed?: number;
  /** Breathe cycle duration in seconds */
  breatheDuration?: number;
  /** Breathe intensity: 0 = none, 0.25 = dramatic */
  breatheIntensity?: number;
  /** Whether to animate (default true) */
  animate?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function CurveAnimated({
  children,
  trailColor,
  trailColorEnd,
  ghostColor,
  ghostColorEnd,
  trailSpan = 0.3,
  trailWidth = 4.5,
  trailOpacity = 0.9,
  ghostWidth = 2.5,
  ghostOpacity = 0.07,
  duration = 5,
  speed = 1,
  rotateSpeed = 0,
  breatheDuration = 5,
  breatheIntensity = 0.05,
  animate = true,
  className,
  style,
}: CurveAnimatedProps) {
  const absSpeed = Math.abs(speed) || 0.01;
  const absRotate = Math.abs(rotateSpeed) || 0.01;

  const cssVars: Record<string, string | number> = {
    "--trail-span": trailSpan,
    "--trail-width": trailWidth,
    "--trail-opacity": trailOpacity,
    "--ghost-width": ghostWidth,
    "--ghost-opacity": ghostOpacity,
    "--duration": `${duration / absSpeed}s`,
    "--rotate-duration": rotateSpeed !== 0 ? `${30 / absRotate}s` : "0s",
    "--breathe-duration": `${breatheDuration}s`,
    "--breathe-min": 1 - breatheIntensity,
    "--breathe-max": 1 + breatheIntensity,
  };

  // Trail colors
  if (trailColor) cssVars["--trail-color"] = trailColor;
  if (trailColorEnd) cssVars["--trail-color-end"] = trailColorEnd;
  if (trailColor) cssVars["--trail-color-start"] = trailColor;

  // Ghost colors
  if (ghostColor) cssVars["--ghost-color"] = ghostColor;
  if (ghostColorEnd) cssVars["--ghost-color-end"] = ghostColorEnd;
  if (ghostColor) cssVars["--ghost-color-start"] = ghostColor;

  const classes = [
    animate ? "curve-animated" : "",
    speed < 0 ? "reverse-trail" : "",
    rotateSpeed < 0 ? "reverse-rotate" : "",
    speed === 0 ? "paused" : "",
    className ?? "",
  ].filter(Boolean).join(" ");

  return (
    <div
      className={classes || undefined}
      style={{ ...cssVars, ...style } as CSSProperties}
    >
      {children}
    </div>
  );
}
