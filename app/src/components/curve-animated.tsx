"use client";

import { useRef, useMemo } from "react";
import { cn } from "@/lib/utils";
import { useParamAnimations } from "@/hooks/use-param-animations";
import type { ParamAnimation } from "@/components/sidebar/param-slider";
import type { CSSProperties, ReactNode } from "react";

/** Maps param store keys to CSS variable names */
const CSS_VAR_MAP: Record<string, string> = {
  progress: "--progress",
  offset: "--offset",
  trailWidth: "--trail-width",
  trailOpacity: "--trail-opacity",
  ghostWidth: "--ghost-width",
  ghostOpacity: "--ghost-opacity",
  breatheIntensity: "--breathe-intensity",
};

export interface CurveAnimatedProps {
  children: ReactNode;
  trailColor?: string;
  trailColorEnd?: string;
  ghostColor?: string;
  ghostColorEnd?: string;
  /** Trail length as fraction of path (0 = none, 1 = full path) */
  progress?: number;
  /** Trail start position along path (0–1, wraps) */
  offset?: number;
  trailWidth?: number;
  trailOpacity?: number;
  ghostWidth?: number;
  ghostOpacity?: number;
  duration?: number;
  speed?: number;
  rotateSpeed?: number;
  breatheDuration?: number;
  breatheIntensity?: number;
  animate?: boolean;
  /** Per-parameter animation configs (keyed by param name) */
  paramAnimations?: Record<string, ParamAnimation>;
  className?: string;
  style?: CSSProperties;
}

export function CurveAnimated({
  children,
  trailColor,
  trailColorEnd,
  ghostColor,
  ghostColorEnd,
  progress = 0.3,
  offset = 0,
  trailWidth = 4.5,
  trailOpacity = 0.9,
  ghostWidth = 2.5,
  ghostOpacity = 0.5,
  duration = 5,
  speed = 1,
  rotateSpeed = 0,
  breatheDuration = 5,
  breatheIntensity = 0.05,
  animate = true,
  paramAnimations = {},
  className,
  style,
}: CurveAnimatedProps) {
  const ref = useRef<HTMLDivElement>(null);
  const absSpeed = Math.abs(speed) || 0.01;
  const absRotate = Math.abs(rotateSpeed) || 0.01;

  const cssVars: Record<string, string | number> = {
    "--progress": progress,
    "--offset": offset,
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

  if (trailColor) cssVars["--trail-color"] = trailColor;
  if (trailColorEnd) cssVars["--trail-color-end"] = trailColorEnd;
  if (trailColor) cssVars["--trail-color-start"] = trailColor;
  if (ghostColor) cssVars["--ghost-color"] = ghostColor;
  if (ghostColorEnd) cssVars["--ghost-color-end"] = ghostColorEnd;
  if (ghostColor) cssVars["--ghost-color-start"] = ghostColor;

  // Stable reference for the animation hook
  const stableAnimations = useMemo(() => paramAnimations, [JSON.stringify(paramAnimations)]);
  useParamAnimations(ref, stableAnimations, CSS_VAR_MAP);

  return (
    <div
      ref={ref}
      className={cn(
        animate && "curve-animated",
        speed < 0 && "reverse-trail",
        rotateSpeed < 0 && "reverse-rotate",
        speed === 0 && "paused",
        className,
      )}
      style={{ ...cssVars, ...style } as CSSProperties}
    >
      {children}
    </div>
  );
}
