"use client";
import { useMemo } from "react";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated } from "../curve-animated";
import { useGalleryStore, selectOverrides } from "@/lib/state/gallery-store";
import { curves } from "@/lib/curves/registry";
import { normalize, buildPath } from "@/lib/curves/normalize";
import { randomCurvePoint, generateRandomParams } from "@/lib/curves/factories";

export function CurveDetail() {
  const selectedIndex = useGalleryStore((s) => s.selectedIndex);
  const selectCurve = useGalleryStore((s) => s.selectCurve);
  const globals = useGalleryStore((s) => s.globals);
  const globalAnimations = useGalleryStore((s) => s.globalAnimations);
  const overrides = useGalleryStore(selectOverrides(selectedIndex ?? 0));
  const randomSeed = useGalleryStore((s) => s.randomSeed);
  const randomize = useGalleryStore((s) => s.randomize);

  const config = selectedIndex !== null ? curves[selectedIndex] : null;
  const isRandom = config?.name === "Random";

  const d = useMemo(() => {
    if (!config) return "";
    if (isRandom) {
      const fn = normalize(randomCurvePoint(generateRandomParams(randomSeed)), 480);
      return buildPath(fn, 480, true);
    }
    const steps = config.steps ?? 480;
    if (overrides.args && config.rebuild) {
      const merged = { ...config.args, ...overrides.args };
      const fn = normalize(config.rebuild(merged), steps);
      return buildPath(fn, steps, !config.open);
    }
    const fn = normalize(config.point, steps);
    return buildPath(fn, steps, !config.open);
  }, [config, overrides.args, isRandom, randomSeed]);

  if (selectedIndex === null || !config) return null;

  const g = globals;
  const o = overrides;
  const defaultRotateSpeed = config.rotate ? 30 / config.rotate : 0;

  return (
    <div className="flex flex-col h-full p-6 cursor-pointer" onClick={() => selectCurve(null)}>
      {/* Back button */}
      <div className="flex items-center justify-between mb-4" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={() => selectCurve(null)}
          className="flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70 transition-colors"
        >
          <svg viewBox="0 0 8 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
            <path d="M6 1L1 6L6 11" />
          </svg>
          Gallery
        </button>

        {isRandom && (
          <button
            type="button"
            onClick={randomize}
            className="flex items-center gap-1.5 rounded-lg bg-white/[0.06] px-3 py-1.5 text-[11px] text-white/60 hover:text-white hover:bg-white/[0.1] transition-colors"
          >
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
              <path d="M9 3.5H4a2.5 2.5 0 0 0 0 5h1" />
              <path d="M7.5 2L9.5 3.5L7.5 5" />
              <path d="M3 8.5h5a2.5 2.5 0 0 0 0-5H7" />
              <path d="M4.5 10L2.5 8.5L4.5 7" />
            </svg>
            Randomize
          </button>
        )}
      </div>

      {/* Large preview centered */}
      <div className="flex-1 flex items-center justify-center min-h-0">
        <div className="w-full max-w-[min(60vmin,500px)] aspect-square cursor-default" onClick={(e) => e.stopPropagation()}>
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
      </div>

      {/* Name + tag */}
      <div className="text-center mt-4" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-semibold text-white">{config.name}</h2>
        <p className="text-[11px] text-white/40 uppercase tracking-wider mt-1">{config.tag}</p>
      </div>
    </div>
  );
}
