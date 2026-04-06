"use client";
import { TrailControls, GhostControls } from "./global-shape-controls";
import { ParamSlider } from "./param-slider";
import { GlobalMotionControls } from "./global-motion-controls";
import { CurveControls } from "./curve-controls";
import { SVGPreview } from "./svg-preview";
import { CollapsibleSection } from "./collapsible-card";
import { useGalleryStore, type CurveOverrides } from "@/lib/state/gallery-store";
import { curves } from "@/lib/curves/registry";
import { normalize, buildPath } from "@/lib/curves/normalize";
import { useMemo, useState, useCallback } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const EMPTY: CurveOverrides = {};

function ThemeSwitcher() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const toggle = useCallback((t: "dark" | "light") => {
    setTheme(t);
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(t);
  }, []);
  return (
    <div className="flex items-center justify-between">
      <span className="text-[11px] text-muted-foreground">Theme</span>
      <div className="flex gap-0.5 rounded-lg bg-foreground/[0.06] p-0.5">
        <button type="button" onClick={() => toggle("dark")}
          className={`rounded-md px-2 py-0.5 text-[9px] transition-colors ${theme === "dark" ? "bg-foreground/10 text-foreground" : "text-muted-foreground"}`}>Dark</button>
        <button type="button" onClick={() => toggle("light")}
          className={`rounded-md px-2 py-0.5 text-[9px] transition-colors ${theme === "light" ? "bg-foreground/10 text-foreground" : "text-muted-foreground"}`}>Light</button>
      </div>
    </div>
  );
}

// ── Icons ─────────────────────────────────────────────

function UIIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
      <rect x="1" y="1" width="14" height="14" rx="2" />
      <path d="M1 5h14M5 5v10" />
    </svg>
  );
}

function TrailIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="h-3.5 w-3.5">
      <path d="M2 14c2-6 5-12 6-6s4 6 6-2" />
    </svg>
  );
}

function GhostIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" className="h-3.5 w-3.5" opacity="0.5">
      <path d="M2 14c2-6 5-12 6-6s4 6 6-2" strokeDasharray="2 2" />
    </svg>
  );
}

function MotionIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" className="h-3.5 w-3.5">
      <path d="M1 8h3M6 8h4M12 8h3" />
      <path d="M4 5l-3 3 3 3" />
      <path d="M12 5l3 3-3 3" />
    </svg>
  );
}

function PathIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
      <circle cx="4" cy="4" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <path d="M5.5 5.5C7 7 9 6 10.5 10.5" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
      <path d="M5 3L1 8l4 5M11 3l4 5-4 5" />
    </svg>
  );
}

// ── Section definitions ───────────────────────────────

interface SectionDef {
  key: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  visible: boolean;
}

function useSections() {
  const selectedIndex = useGalleryStore((s) => s.selectedIndex);
  const globals = useGalleryStore((s) => s.globals);
  const overrides = useGalleryStore((s) => selectedIndex !== null ? (s.overrides[selectedIndex] ?? EMPTY) : EMPTY);
  const config = selectedIndex !== null ? curves[selectedIndex] : null;

  const svgParams = useMemo(() => {
    if (!config) return null;
    const o = overrides;
    const g = globals;
    const steps = config.steps ?? 480;
    let fn;
    if (o.args && config.rebuild) {
      fn = normalize(config.rebuild({ ...config.args, ...o.args }), steps);
    } else {
      fn = normalize(config.point, steps);
    }
    const d = buildPath(fn, steps, !config.open);
    const speed = o.speed ?? g.speed ?? 1;
    return {
      d,
      color: o.trailColor ?? g.trailStops[0]?.color ?? "#f0f0f0",
      trailWidth: o.trailWidth ?? g.trailWidth ?? config.strokeWidth,
      trailOpacity: o.trailOpacity ?? g.trailOpacity ?? 0.9,
      progress: o.progress ?? g.progress ?? config.progress,
      ghostWidth: o.ghostWidth ?? g.ghostWidth ?? 2.5,
      ghostOpacity: o.ghostOpacity ?? g.ghostOpacity ?? 0.5,
      duration: config.duration / (Math.abs(speed) || 0.01),
      rotateDuration: (o.rotateSpeed ?? g.rotateSpeed ?? (config.rotate ? 30 / config.rotate : 0)) !== 0
        ? 30 / Math.abs(o.rotateSpeed ?? g.rotateSpeed ?? (config.rotate ? 30 / config.rotate : 0))
        : undefined,
      breatheMin: 1 - (o.breatheIntensity ?? g.breatheIntensity ?? 0.05),
      breatheMax: 1 + (o.breatheIntensity ?? g.breatheIntensity ?? 0.05),
      breatheDuration: config.breathe,
    };
  }, [config, overrides, globals]);

  const sections: SectionDef[] = [
    {
      key: "ui", title: "UI", icon: <UIIcon />, visible: true,
      content: (
        <div className="grid gap-4">
          <ParamSlider label="Card Size" value={useGalleryStore((s) => s.cardSize)} onChange={useGalleryStore((s) => s.setCardSize)} min={32} max={1024} step={32} />
          <ThemeSwitcher />
        </div>
      ),
    },
    { key: "trail", title: "Trail", icon: <TrailIcon />, visible: true, content: <TrailControls /> },
    { key: "ghost", title: "Ghost", icon: <GhostIcon />, visible: true, content: <GhostControls /> },
    { key: "motion", title: "Motion", icon: <MotionIcon />, visible: true, content: <GlobalMotionControls /> },
    { key: "path", title: config?.name ?? "Path", icon: <PathIcon />, visible: !!config, content: <CurveControls /> },
    { key: "code", title: "Export", icon: <CodeIcon />, visible: !!(config && svgParams), content: svgParams ? <SVGPreview params={{ ...svgParams, curveName: config?.name }} /> : null },
  ];

  return sections.filter((s) => s.visible);
}

// ── Desktop Sidebar ───────────────────────────────────

function DesktopSidebar({ sections }: { sections: SectionDef[] }) {
  const [openSection, setOpenSection] = useState<string | null>("trail");
  const toggle = (key: string) => setOpenSection((prev) => prev === key ? null : key);

  return (
    <>
      <div className="shrink-0 w-76" />
      <div className="fixed right-0 top-0 bottom-0 z-20 w-76 pl-4 pr-3 flex flex-col gap-1.5 overflow-y-auto overscroll-contain py-3">
        {sections.map((s) => (
          <CollapsibleSection key={s.key} title={s.title} icon={s.icon} open={openSection === s.key} onToggle={() => toggle(s.key)}>
            {s.content}
          </CollapsibleSection>
        ))}
      </div>
    </>
  );
}

// ── Mobile Tab Bar ────────────────────────────────────

function MobileTabBar({ sections }: { sections: SectionDef[] }) {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const toggle = (key: string) => setActiveTab((prev) => prev === key ? null : key);
  const activeSection = sections.find((s) => s.key === activeTab);

  return (
    <>
      {/* Panel that slides up when a tab is active */}
      {activeSection && (
        <div className="fixed left-0 right-0 bottom-12 z-20 max-h-[50vh] overflow-y-auto overscroll-contain bg-card/95 backdrop-blur-xl border-t border-border/30 rounded-t-2xl shadow-lg shadow-black/20">
          <div className="px-4 pt-3 pb-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            {activeSection.title}
          </div>
          <div className="px-4 py-3">
            {activeSection.content}
          </div>
        </div>
      )}

      {/* Tab bar at bottom */}
      <div className="fixed left-0 right-0 bottom-0 z-30 flex items-center justify-around h-12 bg-card/90 backdrop-blur-xl border-t border-border/30">
        {sections.map((s) => (
          <button
            key={s.key}
            type="button"
            onClick={() => toggle(s.key)}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors ${
              activeTab === s.key
                ? "text-primary"
                : "text-muted-foreground/50 hover:text-muted-foreground"
            }`}
          >
            {s.icon}
            <span className="text-[8px] uppercase tracking-wider">{s.title}</span>
          </button>
        ))}
      </div>
    </>
  );
}

// ── Main Component ────────────────────────────────────

export function AppSidebar() {
  const isMobile = useIsMobile();
  const sections = useSections();

  if (isMobile) {
    return <MobileTabBar sections={sections} />;
  }

  return <DesktopSidebar sections={sections} />;
}
