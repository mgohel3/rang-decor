"use client";

import { useEffect, useRef } from "react";

const COLS = ["224,16,128", "242,169,0", "0,176,128", "255,111,181"];

// Soft coloured smoke that follows the pointer inside its parent element.
// This is a light 2D canvas version of the DESIGN.md "cursor smoke"; it is off for reduced motion and touch screens.
export function Smoke() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current, host = c?.parentElement;
    if (!c || !host || matchMedia("(prefers-reduced-motion: reduce), (hover: none)").matches) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    type Puff = { x: number; y: number; r: number; a: number; col: string; vx: number; vy: number };
    let puffs: Puff[] = [], raf = 0, last = 0, ci = 0;
    const size = () => { const r = host.getBoundingClientRect(); c.width = r.width; c.height = r.height; };
    size();
    const ro = new ResizeObserver(size); ro.observe(host);
    const loop = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      puffs = puffs.filter(p => p.a > 0.01);
      for (const p of puffs) {
        p.x += p.vx; p.y += p.vy; p.r += 1.1; p.a *= 0.96;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        g.addColorStop(0, `rgba(${p.col},${p.a})`); g.addColorStop(1, `rgba(${p.col},0)`);
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fill();
      }
      raf = puffs.length ? requestAnimationFrame(loop) : 0;
    };
    const move = (e: PointerEvent) => {
      const now = performance.now();
      if (now - last < 40) return;
      last = now;
      const r = host.getBoundingClientRect();
      ci = (ci + 1) % COLS.length;
      puffs.push({ x: e.clientX - r.left, y: e.clientY - r.top, r: 30, a: 0.38, col: COLS[ci], vx: (Math.random() - 0.5) * 1.2, vy: (Math.random() - 0.5) * 1.2 });
      if (puffs.length > 60) puffs.shift();
      if (!raf) raf = requestAnimationFrame(loop);
    };
    host.addEventListener("pointermove", move);
    return () => { host.removeEventListener("pointermove", move); ro.disconnect(); cancelAnimationFrame(raf); };
  }, []);
  return <canvas ref={ref} className="rd-smoke" aria-hidden="true" />;
}
