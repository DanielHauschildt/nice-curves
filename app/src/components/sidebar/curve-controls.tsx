"use client";
import { useGalleryStore, type CurveOverrides } from "@/lib/state/gallery-store";
import { curves } from "@/lib/curves/registry";
import { ParamSlider } from "./param-slider";
import { Button } from "@/components/ui/button";

const EMPTY: CurveOverrides = {};

export function CurveControls() {
  const { selectedIndex, overrides: allOverrides, updateArg, resetCurve } =
    useGalleryStore();
  const overrides = selectedIndex !== null ? (allOverrides[selectedIndex] ?? EMPTY) : EMPTY;
  const config = selectedIndex !== null ? curves[selectedIndex] : null;
  const args = overrides.args;

  if (selectedIndex === null || !config) {
    return (
      <div className="text-center text-[11px] text-muted-foreground">
        Click a curve to adjust
      </div>
    );
  }

  const hasParams = config.params && config.params.length > 0;

  if (!hasParams) {
    return (
      <div className="grid gap-3">
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{config.tag}</p>
        <Button variant="outline" size="sm" onClick={() => resetCurve(selectedIndex)}>
          Reset
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{config.tag}</p>
      {config.params!.map((p) => {
        const mergedArgs = { ...config.args, ...args };
        return (
          <ParamSlider
            key={p.key}
            label={p.label}
            value={mergedArgs[p.key] ?? 0}
            onChange={(v) => updateArg(selectedIndex, p.key, v)}
            min={p.min}
            max={p.max}
            step={p.step}
          />
        );
      })}
      <Button variant="outline" size="sm" onClick={() => resetCurve(selectedIndex)}>
        Reset
      </Button>
    </div>
  );
}
