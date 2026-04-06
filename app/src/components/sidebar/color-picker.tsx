"use client";
import { useState, useRef, useCallback, useEffect } from "react";

// ── Color utils ───────────────────────────────────────

function hexToRgba(hex: string): [number, number, number, number] {
  const h = (hex || "#ffffff").replace("#", "");
  const r = parseInt(h.slice(0, 2) || "ff", 16) / 255;
  const g = parseInt(h.slice(2, 4) || "ff", 16) / 255;
  const b = parseInt(h.slice(4, 6) || "ff", 16) / 255;
  const a = h.length >= 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1;
  return [r, g, b, a];
}

function rgbaToHex(r: number, g: number, b: number, a: number): string {
  const c = (v: number) => Math.round(cl(v) * 255).toString(16).padStart(2, "0");
  return `#${c(r)}${c(g)}${c(b)}${a < 0.995 ? c(a) : ""}`;
}

function rgbToHsv(r: number, g: number, b: number): [number, number, number] {
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  const s = max === 0 ? 0 : d / max;
  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  return [h, s, max];
}

function hsvToRgb(h: number, s: number, v: number): [number, number, number] {
  const i = Math.floor(h * 6), f = h * 6 - i;
  const p = v * (1 - s), q = v * (1 - f * s), t = v * (1 - (1 - f) * s);
  const m = i % 6;
  return [[v,t,p],[q,v,p],[p,v,t],[p,q,v],[t,p,v],[v,p,q]][m] as [number, number, number];
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [h, s, l];
}

function cl(v: number, min = 0, max = 1) { return Math.max(min, Math.min(max, v)); }

type ColorFormat = "hex" | "rgba" | "hsl";

function formatColor(r: number, g: number, b: number, a: number, fmt: ColorFormat): string {
  switch (fmt) {
    case "hex": return rgbaToHex(r, g, b, a);
    case "rgba": return `rgba(${Math.round(r*255)}, ${Math.round(g*255)}, ${Math.round(b*255)}, ${a.toFixed(2)})`;
    case "hsl": { const [h,s,l] = rgbToHsl(r, g, b); return `hsla(${Math.round(h*360)}, ${Math.round(s*100)}%, ${Math.round(l*100)}%, ${a.toFixed(2)})`; }
  }
}

function useDrag(onDrag: (x: number, y: number) => void) {
  const ref = useRef<HTMLDivElement>(null);
  const handler = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const fire = (ev: { clientX: number; clientY: number }) =>
      onDrag(cl((ev.clientX - rect.left) / rect.width), cl((ev.clientY - rect.top) / rect.height));
    fire(e);
    const move = (ev: PointerEvent) => fire(ev);
    const up = () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  }, [onDrag]);
  return { ref, onPointerDown: handler };
}

const SWATCHES = [
  "#ffffff","#d4d4d4","#a3a3a3","#737373","#404040","#171717",
  "#ef4444","#f97316","#eab308","#22c55e","#06b6d4","#3b82f6",
  "#471aff","#8b5cf6","#d946ef","#ec4899","#f43f5e","#78716c",
];

type TabMode = "square" | "ring" | "swatches";

export interface GradientStop {
  color: string;
  position: number;
}

// ── Gradient Color Picker ─────────────────────────────

interface GradientColorPickerProps {
  label: string;
  stops: GradientStop[];
  onChange: (stops: GradientStop[]) => void;
}

export function GradientColorPicker({ label, stops, onChange }: GradientColorPickerProps) {
  const [open, setOpen] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [tab, setTab] = useState<TabMode>("square");
  const [colorFmt, setColorFmt] = useState<ColorFormat>("hex");

  const sorted = [...stops].sort((a, b) => a.position - b.position);
  const selected = sorted[cl(selectedIdx, 0, Math.max(0, sorted.length - 1))] ?? null;

  const gradientCSS = sorted.length === 0
    ? "transparent"
    : sorted.length === 1
    ? sorted[0].color
    : sorted.map((s) => `${s.color} ${(s.position * 100).toFixed(0)}%`).join(", ");

  const updateStop = (idx: number, patch: Partial<GradientStop>) => {
    onChange(sorted.map((s, i) => i === idx ? { ...s, ...patch } : s));
  };

  const addStop = (position: number) => {
    const color = selected?.color ?? "#ffffff";
    const next = [...sorted, { color, position }];
    const resorted = next.sort((a, b) => a.position - b.position);
    onChange(resorted);
    setSelectedIdx(resorted.findIndex((s) => s.position === position));
  };

  const removeStop = (idx: number) => {
    const next = sorted.filter((_, i) => i !== idx);
    onChange(next);
    setSelectedIdx(Math.min(selectedIdx, Math.max(0, next.length - 1)));
  };

  return (
    <div className="grid gap-1">
      {/* Label left, preview right (like other inputs) */}
      <div className="flex items-center justify-between gap-2 cursor-pointer" onClick={() => setOpen(!open)}>
        <span className="text-[11px] text-muted-foreground">{label}</span>
        <div className="h-5 w-16 rounded border border-border/30 overflow-hidden shrink-0"
          style={{
            background: sorted.length === 0
              ? `repeating-conic-gradient(#808080 0% 25%, #b0b0b0 0% 50%) 50% / 6px 6px`
              : `linear-gradient(to right, ${gradientCSS})`,
          }} />
      </div>

      {/* Expanded panel */}
      {open && (
        <div className="rounded-lg bg-muted/30 p-2 grid gap-2 mt-0.5">
          {/* Stop chips with editable position */}
          <div className="flex gap-1 flex-wrap items-center">
            {sorted.map((s, i) => (
              <div key={i} onClick={() => setSelectedIdx(i)}
                className={`flex items-center gap-0.5 rounded px-1 py-0.5 text-[9px] transition-colors group cursor-pointer ${
                  selectedIdx === i ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"
                }`}>
                <div className="h-2.5 w-2.5 rounded-sm border border-border/50 shrink-0" style={{ backgroundColor: s.color }} />
                <input type="number" min={0} max={100}
                  className="h-4 w-7 bg-transparent text-center text-[9px] tabular-nums text-inherit outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
                  defaultValue={Math.round(s.position * 100)}
                  key={`${i}-${Math.round(s.position * 100)}`}
                  onClick={(e) => e.stopPropagation()}
                  onBlur={(e) => updateStop(i, { position: cl(parseInt(e.target.value) || 0, 0, 100) / 100 })}
                  onKeyDown={(e) => { if (e.key === "Enter") e.currentTarget.blur(); }} />
                <span className="text-[8px] opacity-70">%</span>
                <span className="opacity-0 group-hover:opacity-100 text-destructive text-[8px] cursor-pointer"
                  onClick={(e) => { e.stopPropagation(); removeStop(i); }}
                  title="Delete stop">×</span>
              </div>
            ))}
            <button type="button" onClick={() => addStop(sorted.length >= 2 ? (sorted[sorted.length - 2].position + sorted[sorted.length - 1].position) / 2 : sorted.length === 1 ? 1 : 0.5)}
              className="flex h-5 w-5 items-center justify-center rounded text-[12px] text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              title="Add stop">+</button>
          </div>

          {/* Interactive gradient bar (only if stops exist) */}
          {sorted.length > 0 && (
            <div className="relative h-6"
              onDoubleClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                addStop(cl((e.clientX - rect.left) / rect.width));
              }}>
              <div className="absolute inset-x-1.5 top-1 h-4 rounded-full overflow-hidden pointer-events-none"
                style={{ background: sorted.length === 1 ? sorted[0].color : `linear-gradient(to right, ${gradientCSS})` }} />
              {sorted.map((s, i) => (
                <div key={i}
                  className={`absolute top-0 h-6 w-2.5 rounded-full border-2 shadow cursor-grab -translate-x-1/2 ${
                    selectedIdx === i ? "border-primary" : "border-white"
                  }`}
                  style={{ left: `${cl(s.position, 0.02, 0.98) * 100}%`, backgroundColor: s.color }}
                  onPointerDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedIdx(i);
                    const bar = e.currentTarget.parentElement!;
                    const rect = bar.getBoundingClientRect();
                    const move = (ev: PointerEvent) => {
                      updateStop(i, { position: cl((ev.clientX - rect.left) / rect.width) });
                    };
                    const up = () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); };
                    window.addEventListener("pointermove", move);
                    window.addEventListener("pointerup", up);
                  }}
                />
              ))}
            </div>
          )}

          {sorted.length === 0 && (
            <div className="text-[9px] text-muted-foreground/50 text-center py-2">No stops — transparent</div>
          )}

          {/* Picker for selected stop */}
          {selected && (
            <PickerPanel
              value={selected.color}
              onChange={(c) => updateStop(selectedIdx, { color: c })}
              tab={tab}
              onTabChange={setTab}
              editLabel={`Stop ${selectedIdx + 1}`}
              colorFmt={colorFmt}
              onColorFmtChange={setColorFmt}
            />
          )}

        </div>
      )}
    </div>
  );
}

// ── Legacy 2-stop wrapper ─────────────────────────────

interface SimplePairProps {
  label: string;
  startValue: string;
  endValue: string;
  onStartChange: (v: string) => void;
  onEndChange: (v: string) => void;
}

export function GradientColorPairPicker({ label, startValue, endValue, onStartChange, onEndChange }: SimplePairProps) {
  const stops: GradientStop[] = [
    { color: startValue, position: 0 },
    { color: endValue, position: 1 },
  ];
  return (
    <GradientColorPicker label={label} stops={stops}
      onChange={(next) => {
        const s = [...next].sort((a, b) => a.position - b.position);
        if (s.length >= 1) onStartChange(s[0].color);
        if (s.length >= 2) onEndChange(s[s.length - 1].color);
      }}
    />
  );
}

// ── Picker Panel ──────────────────────────────────────

function PickerPanel({
  value, onChange, tab, onTabChange, editLabel, colorFmt, onColorFmtChange,
}: {
  value: string;
  onChange: (v: string) => void;
  tab: TabMode;
  onTabChange: (t: TabMode) => void;
  editLabel: string;
  colorFmt: ColorFormat;
  onColorFmtChange: (f: ColorFormat) => void;
}) {
  const [r, g, b, alpha] = hexToRgba(value);
  const [h, s, v] = rgbToHsv(r, g, b);

  const emit = useCallback((nh: number, ns: number, nv: number, na: number) => {
    const [nr, ng, nb] = hsvToRgb(cl(nh), cl(ns), cl(nv));
    onChange(rgbaToHex(nr, ng, nb, cl(na)));
  }, [onChange]);

  const svDrag = useDrag(useCallback((x: number, y: number) => emit(h, x, 1 - y, alpha), [h, alpha, emit]));
  const hueDrag = useDrag(useCallback((x: number) => emit(x, s, v, alpha), [s, v, alpha, emit]));
  const alphaDrag = useDrag(useCallback((x: number) => emit(h, s, v, x), [h, s, v, emit]));

  // Ring: hue from angle, SV from inner square
  const ringRef = useRef<HTMLDivElement>(null);
  const ringHueHandler = useCallback((e: React.PointerEvent) => {
    const el = ringRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.width / 2, cy = rect.height / 2;
    // Only handle if click is on the ring band (not inside the SV square)
    const dx0 = e.clientX - rect.left - cx, dy0 = e.clientY - rect.top - cy;
    const dist = Math.sqrt(dx0 * dx0 + dy0 * dy0) / cx;
    if (dist < 0.55) return; // inside SV square area, let it handle
    e.preventDefault();
    e.stopPropagation();
    const update = (ev: { clientX: number; clientY: number }) => {
      const dx = ev.clientX - rect.left - cx, dy = ev.clientY - rect.top - cy;
      const angle = Math.atan2(dy, dx);
      emit(((angle / (Math.PI * 2)) + 1.25) % 1, s, v, alpha);
    };
    update(e);
    const move = (ev: PointerEvent) => update(ev);
    const up = () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  }, [s, v, alpha, emit]);

  const ringSvDrag = useDrag(useCallback((x: number, y: number) => emit(h, x, 1 - y, alpha), [h, alpha, emit]));

  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (tab !== "ring" || !canvasRef.current) return;
    const c = canvasRef.current, ctx = c.getContext("2d");
    if (!ctx) return;
    const sz = c.width, cx = sz / 2, cy = sz / 2;
    const outer = sz / 2 - 1, inner = outer - 14;
    ctx.clearRect(0, 0, sz, sz);
    // Draw each degree as a filled wedge to avoid overlap artifacts
    const deg = Math.PI / 180;
    for (let a = 0; a < 360; a++) {
      const a1 = (a - 90.5) * deg;
      const a2 = (a - 89.5) * deg;
      const [cr, cg, cb] = hsvToRgb(a / 360, 1, 1);
      ctx.fillStyle = `rgb(${cr * 255 | 0},${cg * 255 | 0},${cb * 255 | 0})`;
      ctx.beginPath();
      ctx.arc(cx, cy, outer, a1, a2);
      ctx.arc(cx, cy, inner, a2, a1, true);
      ctx.closePath();
      ctx.fill();
    }
  }, [tab]);

  const hueRgb = hsvToRgb(h, 1, 1);
  const hueColor = `rgb(${hueRgb[0] * 255 | 0},${hueRgb[1] * 255 | 0},${hueRgb[2] * 255 | 0})`;
  const displayColor = formatColor(r, g, b, alpha, colorFmt);

  return (
    <div className="grid gap-1.5">
      <div className="flex items-center gap-2">
        <span className="text-[9px] text-muted-foreground">{editLabel}</span>
        <div className="flex flex-1 rounded bg-muted/50 p-0.5">
          {(["square", "ring", "swatches"] as TabMode[]).map((m) => (
            <button key={m} type="button" onClick={() => onTabChange(m)}
              className={`flex-1 rounded px-1 py-px text-[8px] transition-colors ${tab === m ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
              {m === "square" ? "SV" : m === "ring" ? "Ring" : "Swatches"}
            </button>
          ))}
        </div>
      </div>

      {tab === "square" && (
        <>
          <div {...svDrag} ref={svDrag.ref} className="relative h-20 w-full rounded cursor-crosshair"
            style={{ background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, ${hueColor})` }}>
            <div className="absolute h-3 w-3 rounded-full border-2 border-white shadow -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ left: `${s * 100}%`, top: `${(1 - v) * 100}%` }} />
          </div>
          <div {...hueDrag} ref={hueDrag.ref} className="relative h-2 w-full rounded-full cursor-pointer"
            style={{ background: "linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)" }}>
            <div className="absolute top-0 h-2 w-1.5 rounded-full border border-white shadow -translate-x-1/2 pointer-events-none"
              style={{ left: `${h * 100}%`, backgroundColor: hueColor }} />
          </div>
        </>
      )}

      {tab === "ring" && (
        <div ref={ringRef} className="relative aspect-square w-full max-w-[140px] mx-auto" onPointerDown={ringHueHandler}>
          <canvas ref={canvasRef} width={140} height={140} className="w-full h-full pointer-events-none" />
          {/* Hue indicator on ring */}
          <div className="absolute h-3 w-3 rounded-full border-2 border-white shadow pointer-events-none"
            style={{
              left: `${50 + Math.cos(h * Math.PI * 2 - Math.PI / 2) * 42}%`,
              top: `${50 + Math.sin(h * Math.PI * 2 - Math.PI / 2) * 42}%`,
              transform: "translate(-50%, -50%)", backgroundColor: hueColor,
            }} />
          {/* Inner SV square */}
          <div {...ringSvDrag} ref={ringSvDrag.ref} className="absolute rounded cursor-crosshair"
            style={{ left: "27%", top: "27%", width: "46%", height: "46%",
              background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, ${hueColor})` }}>
            <div className="absolute h-2.5 w-2.5 rounded-full border-2 border-white shadow -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ left: `${s * 100}%`, top: `${(1 - v) * 100}%` }} />
          </div>
        </div>
      )}

      {tab === "swatches" && (
        <div className="grid grid-cols-6 gap-1">
          {SWATCHES.map((sw) => (
            <button key={sw} type="button"
              onClick={() => { const [sr, sg, sb] = hexToRgba(sw); onChange(rgbaToHex(sr, sg, sb, alpha)); }}
              className="h-4 rounded border border-border/30 cursor-pointer hover:scale-110 transition-transform"
              style={{ backgroundColor: sw }} />
          ))}
        </div>
      )}

      {/* Alpha */}
      <div {...alphaDrag} ref={alphaDrag.ref} className="relative h-2 w-full rounded-full cursor-pointer overflow-hidden"
        style={{ background: `repeating-conic-gradient(#808080 0% 25%, #b0b0b0 0% 50%) 50% / 6px 6px` }}>
        <div className="absolute inset-0 rounded-full"
          style={{ background: `linear-gradient(to right, transparent, ${rgbaToHex(r, g, b, 1)})` }} />
        <div className="absolute top-0 h-2 w-1.5 rounded-full border border-white shadow -translate-x-1/2 pointer-events-none"
          style={{ left: `${alpha * 100}%` }} />
      </div>

      {/* Format + value + alpha */}
      <div className="flex items-center gap-1">
        <select value={colorFmt} onChange={(e) => onColorFmtChange(e.target.value as ColorFormat)}
          className="h-4 rounded bg-transparent text-[8px] text-muted-foreground outline-none ring-1 ring-border focus:ring-ring cursor-pointer px-0.5">
          <option value="hex">#</option>
          <option value="rgba">RGB</option>
          <option value="hsl">HSL</option>
        </select>
        <input type="text"
          className="h-4 flex-1 rounded bg-transparent px-1 text-[9px] tabular-nums text-foreground outline-none ring-1 ring-border focus:ring-ring"
          value={colorFmt === "hex" ? displayColor.replace("#", "") : displayColor}
          onChange={(e) => {
            if (colorFmt === "hex") {
              const hex = e.target.value.replace(/[^0-9a-fA-F]/g, "").slice(0, 8);
              if (hex.length >= 6) { const [cr,cg,cb,ca] = hexToRgba(`#${hex}`); onChange(rgbaToHex(cr, cg, cb, hex.length >= 8 ? ca : alpha)); }
            }
          }} />
        <span className="text-[8px] text-muted-foreground">A</span>
        <input type="number" min={0} max={100}
          className="h-4 w-8 rounded bg-transparent px-0.5 text-right text-[9px] tabular-nums text-foreground outline-none ring-1 ring-border focus:ring-ring [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
          value={Math.round(alpha * 100)}
          onChange={(e) => emit(h, s, v, cl(parseInt(e.target.value) || 0, 0, 100) / 100)} />
        <span className="text-[7px] text-muted-foreground">%</span>
      </div>
    </div>
  );
}
