"use client";
import { useGalleryStore } from "@/lib/state/gallery-store";
import { ParamSlider } from "./param-slider";
import { GradientColorPicker } from "./color-picker";
import { Button } from "@/components/ui/button";

export function GlobalControls() {
  const { globals, globalAnimations, cardSize, setCardSize, updateGlobal, updateGlobalStops, updateGlobalAnimation, resetGlobals } = useGalleryStore();
  const g = globals;
  const a = globalAnimations;
  const update = (key: string) => (value: number) => updateGlobal(key, value);
  const animUpdate = (key: string) => (anim: import("./param-slider").ParamAnimation) => updateGlobalAnimation(key, anim);

  return (
    <div className="grid gap-4">
      <ParamSlider label="Breathe" value={g.breatheIntensity ?? 0.05} onChange={update("breatheIntensity")} min={0} max={0.25} step={0.005} animatable animation={a.breatheIntensity} onAnimationChange={animUpdate("breatheIntensity")} />
      <ParamSlider label="Card Size" value={cardSize} onChange={setCardSize} min={32} max={1024} step={32} />
      <GradientColorPicker label="Ghost" stops={g.ghostStops} onChange={(s) => updateGlobalStops("ghostStops", s)} />
      <ParamSlider label="Ghost Opacity" value={g.ghostOpacity ?? 0.5} onChange={update("ghostOpacity")} min={0} max={1} step={0.01} animatable animation={a.ghostOpacity} onAnimationChange={animUpdate("ghostOpacity")} />
      <ParamSlider label="Ghost Width" value={g.ghostWidth ?? 2.5} onChange={update("ghostWidth")} min={0.5} max={8} step={0.1} animatable animation={a.ghostWidth} onAnimationChange={animUpdate("ghostWidth")} />
      <ParamSlider label="Offset" value={g.offset ?? 0} onChange={update("offset")} min={0} max={1} step={0.01} animatable animation={a.offset} onAnimationChange={animUpdate("offset")} />
      <ParamSlider label="Progress" value={g.progress ?? 0.3} onChange={update("progress")} min={0} max={1} step={0.01} animatable animation={a.progress} onAnimationChange={animUpdate("progress")} />
      <ParamSlider label="Rotation" value={g.rotateSpeed ?? 0} onChange={update("rotateSpeed")} min={-10} max={10} step={0.1} />
      <ParamSlider label="Speed" value={g.speed ?? 1} onChange={update("speed")} min={-10} max={10} step={0.1} />
      <GradientColorPicker label="Trail" stops={g.trailStops} onChange={(s) => updateGlobalStops("trailStops", s)} />
      <ParamSlider label="Trail Opacity" value={g.trailOpacity ?? 0.9} onChange={update("trailOpacity")} min={0} max={1} step={0.01} animatable animation={a.trailOpacity} onAnimationChange={animUpdate("trailOpacity")} />
      <ParamSlider label="Trail Width" value={g.trailWidth ?? 4.5} onChange={update("trailWidth")} min={0.5} max={10} step={0.1} animatable animation={a.trailWidth} onAnimationChange={animUpdate("trailWidth")} />
      <Button variant="outline" size="sm" onClick={resetGlobals} className="mt-1">Reset globals</Button>
    </div>
  );
}
