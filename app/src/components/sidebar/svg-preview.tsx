"use client";
import { useState } from "react";
import { generateStaticSVG, generateAnimatedSVG, generateReactCode, generatePathOnly, type SVGExportParams } from "@/lib/svg-export";

type ExportTab = "react" | "animated" | "static" | "path";

interface SVGPreviewProps {
  params: SVGExportParams;
}

export function SVGPreview({ params }: SVGPreviewProps) {
  const [tab, setTab] = useState<ExportTab>("react");
  const [copied, setCopied] = useState(false);

  const tabs: { key: ExportTab; label: string }[] = [
    { key: "react", label: "React" },
    { key: "animated", label: "SVG" },
    { key: "static", label: "Static" },
    { key: "path", label: "Path" },
  ];

  let code: string;
  switch (tab) {
    case "react": code = generateReactCode(params); break;
    case "animated": code = generateAnimatedSVG(params); break;
    case "static": code = generateStaticSVG(params); break;
    case "path": code = generatePathOnly(params); break;
  }

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="grid gap-2">
      <div className="flex items-center gap-1">
        <div className="flex flex-1 rounded-lg bg-muted/50 p-0.5">
          {tabs.map((t) => (
            <button key={t.key} type="button" onClick={() => setTab(t.key)}
              className={`flex-1 rounded-md px-1.5 py-0.5 text-[9px] transition-colors ${
                tab === t.key ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}>
              {t.label}
            </button>
          ))}
        </div>
        <button type="button" onClick={copy}
          className="rounded-md px-2 py-0.5 text-[9px] text-muted-foreground hover:text-foreground ring-1 ring-border/50 hover:ring-border transition-colors">
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="max-h-48 overflow-auto rounded-lg bg-muted/30 p-3 text-[9px] leading-relaxed text-muted-foreground">
        <code>{code}</code>
      </pre>
    </div>
  );
}
