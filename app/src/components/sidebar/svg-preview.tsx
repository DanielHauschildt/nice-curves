"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { generateStaticSVG, generateAnimatedSVG, type SVGExportParams } from "@/lib/svg-export";

interface SVGPreviewProps {
  params: SVGExportParams;
}

export function SVGPreview({ params }: SVGPreviewProps) {
  const [tab, setTab] = useState<"static" | "animated">("animated");
  const [copied, setCopied] = useState(false);

  const svg = tab === "static" ? generateStaticSVG(params) : generateAnimatedSVG(params);

  const copy = async () => {
    await navigator.clipboard.writeText(svg);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="grid gap-2">
      <div className="flex gap-1">
        <Button size="sm" variant={tab === "animated" ? "default" : "outline"} onClick={() => setTab("animated")} className="h-7 text-xs">Animated</Button>
        <Button size="sm" variant={tab === "static" ? "default" : "outline"} onClick={() => setTab("static")} className="h-7 text-xs">Static</Button>
        <Button size="sm" variant="outline" onClick={copy} className="ml-auto h-7 text-xs">{copied ? "Copied!" : "Copy"}</Button>
      </div>
      <pre className="max-h-48 overflow-auto rounded-md border bg-muted/50 p-3 text-[10px] leading-relaxed">
        <code>{svg}</code>
      </pre>
    </div>
  );
}
