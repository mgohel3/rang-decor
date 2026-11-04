"use client";

import { useEffect, useRef } from "react";
import { createFluid } from "./fluid";

const COL: [number, number, number][] = [[0.9, 0.06, 0.5], [0.97, 0.66, 0], [0, 0.72, 0.5], [1, 0.31, 0.66]];

// WebGL cursor smoke behind the content of its parent. Runs only while the pointer moves inside the
// canvas and for 4.5s after; off for reduced motion and touch screens. If WebGL2 is missing, nothing is drawn.
export function Smoke() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv || matchMedia("(prefers-reduced-motion: reduce), (hover: none)").matches) return;
    const f = createFluid(cv);
    if (!f) return;
    let raf = 0, last = 0, lx = -1, ly = -1, ci = 0, on = false;
    const tick = (t: number) => {
      if (document.hidden) { raf = requestAnimationFrame(tick); return; }
      if (t - last > 4500) { if (on) { on = false; f.clear(); } raf = 0; return; }
      on = true; f.step(); raf = requestAnimationFrame(tick);
    };
    const move = (e: MouseEvent) => {
      const r = cv.getBoundingClientRect();
      if (r.width < 10 || e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) { lx = -1; return; }
      const x = e.clientX - r.left, y = e.clientY - r.top;
      if (lx >= 0) {
        ci += 0.03;
        f.splat(x / r.width, 1 - y / r.height, (x - lx) / r.width, -(y - ly) / r.height, COL[Math.floor(ci) % 4]);
        last = performance.now();
        if (!raf) raf = requestAnimationFrame(tick);
      }
      lx = x; ly = y;
    };
    document.addEventListener("mousemove", move);
    return () => { document.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);
  return <canvas ref={ref} className="rd-smoke" aria-hidden="true" />;
}
