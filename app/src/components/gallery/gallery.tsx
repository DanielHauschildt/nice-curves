"use client";
import { useGalleryStore } from "@/lib/state/gallery-store";
import { curves } from "@/lib/curves/registry";
import { CurveCard } from "./curve-card";

export function Gallery() {
  const cardSize = useGalleryStore((s) => s.cardSize);

  return (
    <div
      className="grid gap-3 p-4"
      style={{ gridTemplateColumns: `repeat(auto-fill, minmax(${cardSize}px, 1fr))` }}
    >
      {curves.map((_, i) => (
        <CurveCard key={i} index={i} />
      ))}
    </div>
  );
}
