"use client";
import { useGalleryStore } from "@/lib/state/gallery-store";
import { ParamSlider } from "./param-slider";
import { GradientColorPicker } from "./color-picker";

export function TrailControls() {
  const { globals, updateGlobal, updateGlobalStops } = useGalleryStore();
  const g = globals;
  const update = (key: string) => (value: number) => updateGlobal(key, value);

  return (
    <div className="grid gap-4">
      <GradientColorPicker label="Color" stops={g.trailStops} onChange={(s) => updateGlobalStops("trailStops", s)} />
      <ParamSlider label="Stroke" value={g.trailWidth ?? 4.5} onChange={update("trailWidth")} min={0.5} max={10} step={0.1} />
      <ParamSlider label="Opacity" value={g.trailOpacity ?? 0.9} onChange={update("trailOpacity")} min={0} max={1} step={0.01} />
      <ParamSlider label="Length" value={g.progress ?? 0.3} onChange={update("progress")} min={0} max={1} step={0.01} />
    </div>
  );
}

export function GhostControls() {
  const { globals, updateGlobal, updateGlobalStops } = useGalleryStore();
  const g = globals;
  const update = (key: string) => (value: number) => updateGlobal(key, value);

  return (
    <div className="grid gap-4">
      <GradientColorPicker label="Color" stops={g.ghostStops} onChange={(s) => updateGlobalStops("ghostStops", s)} />
      <ParamSlider label="Stroke" value={g.ghostWidth ?? 2.5} onChange={update("ghostWidth")} min={0.5} max={8} step={0.1} />
      <ParamSlider label="Opacity" value={g.ghostOpacity ?? 0.5} onChange={update("ghostOpacity")} min={0} max={1} step={0.01} />
    </div>
  );
}
