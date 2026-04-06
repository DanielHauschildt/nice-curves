"use client";
import { useEffect, useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated } from "../curve-animated";
import { useGalleryStore, selectOverrides } from "@/lib/state/gallery-store";
import { curves } from "@/lib/curves/registry";
import { normalize, buildPath } from "@/lib/curves/normalize";

export function CurveModal() {
  const selectedIndex = useGalleryStore((s) => s.selectedIndex);
  const selectCurve = useGalleryStore((s) => s.selectCurve);
  const globals = useGalleryStore((s) => s.globals);
  const globalAnimations = useGalleryStore((s) => s.globalAnimations);
  const overrides = useGalleryStore(selectOverrides(selectedIndex ?? 0));

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") selectCurve(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selectCurve]);

  const config = selectedIndex !== null ? curves[selectedIndex] : null;

  const d = useMemo(() => {
    if (!config) return "";
    const steps = config.steps ?? 480;
    if (overrides.args && config.rebuild) {
      const merged = { ...config.args, ...overrides.args };
      const fn = normalize(config.rebuild(merged), steps);
      return buildPath(fn, steps, !config.open);
    }
    const fn = normalize(config.point, steps);
    return buildPath(fn, steps, !config.open);
  }, [config, overrides.args]);

  if (selectedIndex === null || !config) return null;

  const g = globals;
  const o = overrides;
  const defaultRotateSpeed = config.rotate ? 30 / config.rotate : 0;

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center" onClick={() => selectCurve(null)}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

      {/* Modal card */}
      <div
        className="relative z-10 w-[min(70vmin,560px)] rounded-3xl bg-black/50 backdrop-blur-xl ring-1 ring-white/[0.08] shadow-2xl shadow-black/50 p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={() => selectCurve(null)}
          className="absolute top-4 right-4 flex h-7 w-7 items-center justify-center rounded-full text-white/30 hover:text-white/70 hover:bg-white/[0.08] transition-colors"
          title="Close"
        >
          <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="h-3 w-3">
            <path d="M1 1L9 9M9 1L1 9" />
          </svg>
        </button>

        {/* Curve preview */}
        <div className="aspect-square w-full">
          <CurveAnimated
            trailColor={o.trailColor ?? g.trailStops[0]?.color}
            trailColorEnd={o.trailColorEnd ?? g.trailStops[g.trailStops.length - 1]?.color}
            ghostColor={o.ghostColor ?? g.ghostStops[0]?.color}
            ghostColorEnd={o.ghostColorEnd ?? g.ghostStops[g.ghostStops.length - 1]?.color}
            progress={o.progress ?? g.progress ?? config.progress}
            offset={o.offset ?? g.offset}
            trailWidth={o.trailWidth ?? g.trailWidth ?? config.strokeWidth}
            trailOpacity={o.trailOpacity ?? g.trailOpacity}
            ghostWidth={o.ghostWidth ?? g.ghostWidth}
            ghostOpacity={o.ghostOpacity ?? g.ghostOpacity}
            duration={config.duration}
            speed={o.speed ?? g.speed ?? 1}
            rotateSpeed={o.rotateSpeed ?? g.rotateSpeed ?? defaultRotateSpeed}
            breatheDuration={config.breathe}
            breatheIntensity={o.breatheIntensity ?? g.breatheIntensity ?? 0.05}
            paramAnimations={globalAnimations}
          >
            <CurveSVG d={d} />
          </CurveAnimated>
        </div>

        {/* Name + tag */}
        <div className="mt-4 text-center">
          <h2 className="text-lg font-semibold text-white">{config.name}</h2>
          <p className="text-[11px] text-white/40 uppercase tracking-wider mt-1">{config.tag}</p>
        </div>
      </div>
    </div>
  );
}
