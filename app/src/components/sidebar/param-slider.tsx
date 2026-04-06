"use client";
import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";

export type AnimationMode = "loop" | "alternate";

export interface ParamAnimation {
  enabled: boolean;
  from: number;
  to: number;
  period: number;
  mode: AnimationMode;
}

interface ParamSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  animatable?: boolean;
  animation?: ParamAnimation;
  onAnimationChange?: (animation: ParamAnimation) => void;
}

const inputClass =
  "h-5 w-16 rounded border-0 bg-transparent px-1.5 text-right text-[11px] tabular-nums text-foreground outline-none ring-1 ring-border focus:ring-ring [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 10 10" fill="currentColor" className={className}>
      <polygon points="2,1 9,5 2,9" />
    </svg>
  );
}

function PauseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 10 10" fill="currentColor" className={className}>
      <rect x="1.5" y="1" width="2.5" height="8" rx="0.5" />
      <rect x="6" y="1" width="2.5" height="8" rx="0.5" />
    </svg>
  );
}

function LoopIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 3.5H4a2.5 2.5 0 0 0 0 5h1" />
      <path d="M7.5 2L9.5 3.5L7.5 5" />
      <path d="M3 8.5h5a2.5 2.5 0 0 0 0-5H7" />
      <path d="M4.5 10L2.5 8.5L4.5 7" />
    </svg>
  );
}

function AlternateIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 6h8" />
      <path d="M4 3.5L1.5 6L4 8.5" />
      <path d="M8 3.5L10.5 6L8 8.5" />
    </svg>
  );
}

export function ParamSlider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  animatable,
  animation,
  onAnimationChange,
}: ParamSliderProps) {
  const [inputValue, setInputValue] = useState(String(value));

  useEffect(() => {
    setInputValue(Number.isInteger(step) && step >= 1 ? String(Math.round(value)) : value.toFixed(2));
  }, [value, step]);

  const anim = animation ?? { enabled: false, from: min, to: max, period: 3, mode: "loop" as AnimationMode };
  const setAnim = (patch: Partial<ParamAnimation>) =>
    onAnimationChange?.({ ...anim, ...patch });

  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between gap-1">
        <span className="text-[11px] text-muted-foreground flex-1">{label}</span>
        {animatable && (
          <button
            type="button"
            onClick={() => setAnim({ enabled: !anim.enabled })}
            className={`flex h-4 w-4 items-center justify-center rounded transition-colors ${
              anim.enabled
                ? "text-primary"
                : "text-muted-foreground/40 hover:text-muted-foreground"
            }`}
            title={anim.enabled ? "Stop animation" : "Animate"}
          >
            {anim.enabled ? <PauseIcon className="h-2.5 w-2.5" /> : <PlayIcon className="h-2.5 w-2.5" />}
          </button>
        )}
        <input
          type="number"
          step="any"
          className={inputClass}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={() => {
            const parsed = parseFloat(inputValue);
            const v = Math.min(max, Math.max(min, isNaN(parsed) ? value : parsed));
            onChange(v);
          }}
          onKeyDown={(e) => { if (e.key === "Enter") e.currentTarget.blur(); }}
        />
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={(val: number | readonly number[]) => onChange(typeof val === "number" ? val : val[0])}
        disabled={anim.enabled}
      />
      {animatable && anim.enabled && (
        <div className="mt-0.5 rounded-md bg-muted/30 px-2 py-1.5 grid gap-1">
          <div className="flex items-center justify-between">
            <span className="text-[9px] text-muted-foreground/70">Range</span>
            <span className="text-[9px] tabular-nums text-muted-foreground/70">
              {anim.from.toFixed(2)} – {anim.to.toFixed(2)}
            </span>
          </div>
          <Slider
            min={min}
            max={max}
            step={step}
            value={[anim.from, anim.to]}
            onValueChange={(val: number | readonly number[]) => {
              if (Array.isArray(val) && val.length >= 2) {
                setAnim({ from: val[0], to: val[1] });
              }
            }}
          />
          <div className="flex items-center justify-between mt-0.5">
            <span className="text-[9px] text-muted-foreground/70">Period</span>
            <span className="text-[9px] tabular-nums text-muted-foreground/70">{anim.period.toFixed(1)}s</span>
          </div>
          <Slider
            min={0.1}
            max={20}
            step={0.1}
            value={[anim.period]}
            onValueChange={(val: number | readonly number[]) => {
              setAnim({ period: typeof val === "number" ? val : val[0] });
            }}
          />
          <div className="flex items-center gap-0.5 mt-0.5">
            <button
              type="button"
              onClick={() => setAnim({ mode: "loop" })}
              className={`flex h-5 w-5 items-center justify-center rounded transition-colors ${
                anim.mode === "loop" ? "bg-primary/20 text-primary" : "text-muted-foreground/50 hover:text-muted-foreground"
              }`}
              title="Loop"
            >
              <LoopIcon className="h-3 w-3" />
            </button>
            <button
              type="button"
              onClick={() => setAnim({ mode: "alternate" })}
              className={`flex h-5 w-5 items-center justify-center rounded transition-colors ${
                anim.mode === "alternate" ? "bg-primary/20 text-primary" : "text-muted-foreground/50 hover:text-muted-foreground"
              }`}
              title="Alternate"
            >
              <AlternateIcon className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
