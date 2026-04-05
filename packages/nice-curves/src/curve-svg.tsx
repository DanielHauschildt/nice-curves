import { useId } from "react";

interface CurveSVGProps {
  d: string;
  className?: string;
}

/**
 * Pure SVG structure — paths + CSS variable references.
 * Gradient stop-colors read CSS vars from the parent wrapper.
 * Each instance gets unique gradient IDs via useId().
 */
export function CurveSVG({ d, className }: CurveSVGProps) {
  const id = useId();
  const trailGradId = `tg${id}`;
  const ghostGradId = `gg${id}`;

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      className={`curve-svg ${className ?? ""}`.trim()}
    >
      <defs>
        <linearGradient id={trailGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "var(--trail-color-start, var(--trail-color, currentColor))" }} />
          <stop offset="100%" style={{ stopColor: "var(--trail-color-end, var(--trail-color, currentColor))" }} />
        </linearGradient>
        <linearGradient id={ghostGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "var(--ghost-color-start, var(--ghost-color, currentColor))" }} />
          <stop offset="100%" style={{ stopColor: "var(--ghost-color-end, var(--ghost-color, currentColor))" }} />
        </linearGradient>
      </defs>
      <g className="curve-rotate">
        <g className="curve-breathe">
          <path className="curve-ghost" d={d} pathLength={1} stroke={`url(#${ghostGradId})`} />
          <path className="curve-trail" d={d} pathLength={1} stroke={`url(#${trailGradId})`} />
        </g>
      </g>
    </svg>
  );
}
