import { create } from "zustand";
import type { ParamAnimation } from "@/components/sidebar/param-slider";
import type { GradientStop } from "@/components/sidebar/color-picker";

export interface CurveOverrides {
  trailColor?: string;
  trailColorEnd?: string;
  ghostColor?: string;
  ghostColorEnd?: string;
  trailWidth?: number;
  trailOpacity?: number;
  ghostWidth?: number;
  ghostOpacity?: number;
  progress?: number;
  offset?: number;
  speed?: number;
  rotateSpeed?: number;
  breatheIntensity?: number;
  args?: Record<string, number>;
}

const EMPTY: CurveOverrides = {};

export interface GlobalOverrides {
  trailStops: GradientStop[];
  ghostStops: GradientStop[];
  trailWidth?: number;
  trailOpacity?: number;
  ghostWidth?: number;
  ghostOpacity?: number;
  progress?: number;
  offset?: number;
  speed?: number;
  rotateSpeed?: number;
  breatheIntensity?: number;
}

const GLOBAL_DEFAULTS: GlobalOverrides = {
  trailStops: [{ color: "#471aff", position: 0 }, { color: "#471aff", position: 1 }],
  ghostStops: [{ color: "#f0f0f0", position: 0 }, { color: "#f0f0f0", position: 1 }],
  trailWidth: 4.5,
  trailOpacity: 0.9,
  ghostWidth: 2.5,
  ghostOpacity: 0.5,
  progress: 0.3,
  offset: 0,
  speed: 1,
  rotateSpeed: 0,
  breatheIntensity: 0.05,
};

export type ParamAnimations = Record<string, ParamAnimation>;

interface GalleryState {
  selectedIndex: number | null;
  cardSize: number;
  globals: GlobalOverrides;
  globalAnimations: ParamAnimations;
  overrides: Record<number, CurveOverrides>;
  randomSeed: number;

  selectCurve: (index: number | null) => void;
  setCardSize: (size: number) => void;
  updateGlobal: (key: string, value: number | string) => void;
  updateGlobalStops: (key: "trailStops" | "ghostStops", stops: GradientStop[]) => void;
  updateGlobalAnimation: (key: string, animation: ParamAnimation) => void;
  updateOverride: (index: number, key: string, value: number | string) => void;
  updateArg: (index: number, key: string, value: number) => void;
  resetCurve: (index: number) => void;
  resetGlobals: () => void;
  randomize: () => void;
}

export const useGalleryStore = create<GalleryState>((set) => ({
  selectedIndex: null,
  cardSize: 128,
  globals: { ...GLOBAL_DEFAULTS },
  globalAnimations: {},
  overrides: {},
  randomSeed: 42,

  selectCurve: (index) =>
    set((s) => ({ selectedIndex: s.selectedIndex === index ? null : index })),

  setCardSize: (size) => set({ cardSize: size }),

  updateGlobal: (key, value) =>
    set((s) => ({ globals: { ...s.globals, [key]: value } })),

  updateGlobalStops: (key, stops) =>
    set((s) => ({ globals: { ...s.globals, [key]: stops } })),

  updateGlobalAnimation: (key, animation) =>
    set((s) => ({ globalAnimations: { ...s.globalAnimations, [key]: animation } })),

  updateOverride: (index, key, value) =>
    set((s) => {
      const cur = s.overrides[index] ?? {};
      return { overrides: { ...s.overrides, [index]: { ...cur, [key]: value } } };
    }),

  updateArg: (index, key, value) =>
    set((s) => {
      const cur = s.overrides[index] ?? {};
      const args = { ...cur.args, [key]: value };
      return { overrides: { ...s.overrides, [index]: { ...cur, args } } };
    }),

  resetCurve: (index) =>
    set((s) => {
      const { [index]: _, ...rest } = s.overrides;
      return { overrides: rest };
    }),

  resetGlobals: () => set({ globals: { ...GLOBAL_DEFAULTS, trailStops: [...GLOBAL_DEFAULTS.trailStops], ghostStops: [...GLOBAL_DEFAULTS.ghostStops] }, globalAnimations: {} }),

  randomize: () => set({ randomSeed: Math.floor(Math.random() * 999999) }),
}));

export function selectOverrides(index: number) {
  return (s: GalleryState) => s.overrides[index] ?? EMPTY;
}
