export interface SVGExportParams {
  d: string;
  color?: string;
  trailWidth?: number;
  trailOpacity?: number;
  progress?: number;
  ghostWidth?: number;
  ghostOpacity?: number;
  duration?: number;
  rotateDuration?: number;
  breatheMin?: number;
  breatheMax?: number;
  breatheDuration?: number;
}

/** Generates a static SVG string (no animation). */
export function generateStaticSVG({
  d,
  color = "#f0f0f0",
  trailWidth = 4.5,
  trailOpacity = 0.9,
  progress = 0.3,
  ghostWidth = 2.5,
  ghostOpacity = 0.5,
}: SVGExportParams): string {
  const gap = (1 - progress).toFixed(4);
  return `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="${d}" pathLength="1" stroke="${color}" stroke-width="${ghostWidth}" opacity="${ghostOpacity}" stroke-linecap="round" fill="none"/>
  <path d="${d}" pathLength="1" stroke="${color}" stroke-width="${trailWidth}" opacity="${trailOpacity}" stroke-linecap="round" fill="none" stroke-dasharray="${progress} ${gap}"/>
</svg>`;
}

/** Generates a self-contained animated SVG string with inline styles. */
export function generateAnimatedSVG({
  d,
  color = "#f0f0f0",
  trailWidth = 4.5,
  trailOpacity = 0.9,
  progress = 0.3,
  ghostWidth = 2.5,
  ghostOpacity = 0.5,
  duration = 5,
  rotateDuration,
  breatheMin = 0.95,
  breatheMax = 1.05,
  breatheDuration = 5,
}: SVGExportParams): string {
  const gap = (1 - progress).toFixed(4);
  const hasRotate = rotateDuration && rotateDuration > 0;
  const hasBreathe = breatheMin !== 1 || breatheMax !== 1;

  let style = `.g{stroke:${color};stroke-width:${ghostWidth};opacity:${ghostOpacity};fill:none;stroke-linecap:round}`;
  style += `.t{stroke:${color};stroke-width:${trailWidth};opacity:${trailOpacity};fill:none;stroke-linecap:round;stroke-dasharray:${progress} ${gap};animation:t ${duration}s linear infinite}`;
  style += `@keyframes t{to{stroke-dashoffset:-1}}`;

  if (hasBreathe) {
    style += `.b{transform-origin:50px 50px;animation:b ${breatheDuration}s ease-in-out infinite}`;
    style += `@keyframes b{0%,100%{transform:scale(${breatheMin})}50%{transform:scale(${breatheMax})}}`;
  }
  if (hasRotate) {
    style += `.r{transform-origin:50px 50px;animation:r ${rotateDuration}s linear infinite}`;
    style += `@keyframes r{to{transform:rotate(-360deg)}}`;
  }

  const openRotate = hasRotate ? `<g class="r">` : "";
  const closeRotate = hasRotate ? `</g>` : "";
  const openBreathe = hasBreathe ? `<g class="b">` : "";
  const closeBreathe = hasBreathe ? `</g>` : "";

  return `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>${style}</style>
  ${openRotate}${openBreathe}<path class="g" d="${d}" pathLength="1"/>
  <path class="t" d="${d}" pathLength="1"/>${closeBreathe}${closeRotate}
</svg>`;
}
