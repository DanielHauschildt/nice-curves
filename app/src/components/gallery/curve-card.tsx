"use client";
import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CurveSVG } from "../curve-svg";
import { CurveAnimated } from "../curve-animated";
import { useGalleryStore, selectOverrides } from "@/lib/state/gallery-store";
import { curves } from "@/lib/curves/registry";
import { normalize, buildPath } from "@/lib/curves/normalize";
import { randomCurvePoint, generateRandomParams } from "@/lib/curves/factories";
import { cn } from "@/lib/utils";

interface CurveCardProps {
  index: number;
}

export function CurveCard({ index }: CurveCardProps) {
  const config = curves[index];
  const selectedIndex = useGalleryStore((s) => s.selectedIndex);
  const selectCurve = useGalleryStore((s) => s.selectCurve);
  const globals = useGalleryStore((s) => s.globals);
  const globalAnimations = useGalleryStore((s) => s.globalAnimations);
  const overrides = useGalleryStore(selectOverrides(index));
  const randomSeed = useGalleryStore((s) => s.randomSeed);

  const isSelected = selectedIndex === index;
  const isRandom = config.name === "Random";

  const d = useMemo(() => {
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

  const defaultRotateSpeed = config.rotate ? 30 / config.rotate : 0;
  const g = globals;
  const o = overrides;

  return (
    <Card
      className={cn(
        "cursor-pointer transition-colors hover:border-foreground/20",
        isSelected && "border-foreground/40 bg-accent",
      )}
      onClick={() => selectCurve(index)}
    >
      <CardContent className="grid gap-2 justify-items-center p-3">
        <div className="w-full aspect-square">
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
        <div className="text-center">
          <div className="text-sm font-medium">{config.name}</div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{config.tag}</div>
        </div>
      </CardContent>
    </Card>
  );
}
