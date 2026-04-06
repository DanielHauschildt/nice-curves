"use client";
import { useEffect, useRef } from "react";
import type { ParamAnimation } from "@/components/sidebar/param-slider";

/**
 * Drives animated parameters by setting CSS variables directly on a DOM element.
 * Uses a single requestAnimationFrame loop for all active animations.
 * No React re-renders during animation.
 */
export function useParamAnimations(
  ref: React.RefObject<HTMLDivElement | null>,
  animations: Record<string, ParamAnimation>,
  varMap: Record<string, string>,
) {
  // Store latest animations in a ref so the rAF loop always reads current values
  // without restarting the loop on every state change
  const animRef = useRef(animations);
  animRef.current = animations;

  const varMapRef = useRef(varMap);
  varMapRef.current = varMap;

  const frameRef = useRef<number>(0);
  const runningRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check if any animation is enabled
    const hasActive = Object.entries(animations).some(
      ([key, anim]) => anim?.enabled && varMap[key]
    );

    if (!hasActive) {
      if (runningRef.current) {
        cancelAnimationFrame(frameRef.current);
        runningRef.current = false;
      }
      return;
    }

    // Only start if not already running
    if (runningRef.current) return;
    runningRef.current = true;

    const animate = (now: number) => {
      if (!runningRef.current) return;

      const currentAnims = animRef.current;
      const currentMap = varMapRef.current;

      for (const [key, anim] of Object.entries(currentAnims)) {
        if (!anim?.enabled || !currentMap[key]) continue;

        const { from, to, period, mode } = anim;
        const elapsed = now / 1000;
        let t: number;

        if (mode === "alternate") {
          const phase = (elapsed / period) * Math.PI * 2;
          t = (Math.sin(phase) + 1) / 2;
        } else {
          t = (elapsed / period) % 1;
        }

        const value = from + t * (to - from);
        el.style.setProperty(currentMap[key], String(value));
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameRef.current);
      runningRef.current = false;
    };
  // Only restart the loop when animations are toggled on/off, not on every param change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, JSON.stringify(Object.fromEntries(
    Object.entries(animations).map(([k, v]) => [k, v?.enabled])
  ))]);
}
