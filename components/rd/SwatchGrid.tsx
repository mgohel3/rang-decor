"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Collection } from "@/data/rang";
import type { CatItem, CatPending } from "@/data/catalog";

const MAX = 5;

export function SwatchGrid({ c, title, note, items, pending }: { c: Collection; title?: string; note?: string | null; items: CatItem[]; pending?: CatPending[] }) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState<number | null>(null);
  const s = q.trim().toLowerCase();
  const match = (x: { code: string; name?: string | null }) => !s || x.code.toLowerCase().includes(s) || (x.name ?? "").toLowerCase().includes(s);
  const list = items.filter(match);
  const waiting = (pending ?? []).filter(match);
  const cur = sel === null ? null : list[sel];

  // Lightbox view state: zoom z, pan (x, y) in px from the centre, and the sheet's tilt (degrees).
  const [view, setView] = useState({ z: 1, x: 0, y: 0 });
  const [tilt, setTilt] = useState({ rx: 8, ry: -14 });
  const [dragging, setDragging] = useState(false);
  const [fast, setFast] = useState(false); // short transition while the wheel is turning
  const box = useRef<HTMLDivElement>(null);
  const sheet = useRef<HTMLDivElement>(null);
  const drag = useRef<{ px: number; py: number; x: number; y: number } | null>(null);
  const fastTimer = useRef<number>(0);

  const clamp = useCallback((z: number, x: number, y: number) => {
    const b = box.current, sh = sheet.current;
    if (!b || !sh || z <= 1) return { z: 1, x: 0, y: 0 };
    const mx = Math.max(0, (sh.offsetWidth * z - b.clientWidth) / 2), my = Math.max(0, (sh.offsetHeight * z - b.clientHeight) / 2);
    return { z, x: Math.min(mx, Math.max(-mx, x)), y: Math.min(my, Math.max(-my, y)) };
  }, []);

  // Zoom by `factor`, keeping the point under (px, py) (relative to the box centre) fixed.
  const zoomAt = useCallback((factor: number, px = 0, py = 0) => {
    setView(v => {
      const z = Math.min(MAX, Math.max(1, v.z * factor));
      const k = z / v.z;
      return clamp(z, px - (px - v.x) * k, py - (py - v.y) * k);
    });
  }, [clamp]);
  const reset = () => setView({ z: 1, x: 0, y: 0 });
  const closeBox = () => { setSel(null); reset(); };
  const step = (d: number) => { setSel(i => (i === null ? i : (i + d + list.length) % list.length)); reset(); };

  useEffect(() => {
    if (sel === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeBox();
      else if (e.key === "+" || e.key === "=") zoomAt(1.4);
      else if (e.key === "-") zoomAt(1 / 1.4);
      else if (e.key === "0") reset();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sel, list.length, zoomAt]);

  // Wheel zoom needs a non-passive listener so the page behind does not scroll.
  useEffect(() => {
    const b = box.current;
    if (!b || sel === null) return;
    const wheel = (e: WheelEvent) => {
      e.preventDefault();
      const r = b.getBoundingClientRect();
      setFast(true); window.clearTimeout(fastTimer.current); fastTimer.current = window.setTimeout(() => setFast(false), 160);
      zoomAt(Math.exp(-e.deltaY * 0.0022), e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
    };
    b.addEventListener("wheel", wheel, { passive: false });
    return () => b.removeEventListener("wheel", wheel);
  }, [sel, zoomAt]);

  const onMove = (e: React.PointerEvent) => {
    const b = box.current;
    if (!b) return;
    if (drag.current) {
      const d = drag.current;
      setView(v => clamp(v.z, d.x + e.clientX - d.px, d.y + e.clientY - d.py));
      return;
    }
    const r = b.getBoundingClientRect();
    setTilt({ rx: -((e.clientY - r.top) / r.height - 0.5) * 22 + 6, ry: ((e.clientX - r.left) / r.width - 0.5) * 30 });
  };
  const onDown = (e: React.PointerEvent) => {
    if (view.z <= 1) return;
    drag.current = { px: e.clientX, py: e.clientY, x: view.x, y: view.y };
    setDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onUp = () => { drag.current = null; setDragging(false); };
  const onDouble = (e: React.MouseEvent) => {
    const r = box.current!.getBoundingClientRect();
    if (view.z > 1) reset(); else zoomAt(2.5, e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
  };

  const zoomed = view.z > 1;
  const rx = zoomed ? 0 : tilt.rx, ry = zoomed ? 0 : tilt.ry;
  const sheen = 50 + ry * 2.2;

  return <>
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "1.25rem", marginBottom: note ? ".75rem" : "1.75rem" }}>
      <h2 className="rd-h3">{title ?? "Finishes & codes"}</h2>
      <label className="rd-search" style={{ width: "min(100%,17.5rem)" }}><span aria-hidden="true">⌕</span><input type="search" aria-label="Search by code or name" placeholder="Search by code" value={q} onChange={e => { setQ(e.target.value); setSel(null); }}/></label>
    </div>
    {note && <p className="rd-muted" style={{ marginBottom: "1.75rem", maxWidth: "42rem", lineHeight: 1.7, fontSize: ".9rem" }}>{note}</p>}
    <div className="rd-swatches">
      {list.map((x, i) => <button key={`${x.thumb}-${i}`} className="rd-sw" aria-label={`Open ${c.name} ${x.code}${x.name ? ` ${x.name}` : ""}`} onClick={() => { setSel(i); reset(); }}>
        <div className="ph" data-shine><img src={x.thumb} alt={`${c.name} ${x.code}`} loading="lazy"/><b className="lab">{x.code}{x.name ? <small>{x.name}</small> : null}</b></div>
      </button>)}
      {waiting.map(x => <div key={x.code} className="rd-sw missing" role="img" aria-label={`${c.name} ${x.code}${x.name ? ` ${x.name}` : ""}: image coming soon`}>
        <div className="ph">
          <img className="mark" src="/images/rang-header.svg" alt="" width={120} height={44}/>
          <span className="soon">Image coming soon</span>
          <b className="lab">{x.code}{x.name ? <small>{x.name}</small> : null}</b>
        </div>
      </div>)}
    </div>
    {!list.length && !waiting.length && <p className="rd-lead">No code matches “{q}”.</p>}
    {waiting.length > 0 && <p className="rd-muted" style={{ marginTop: "1.25rem", fontSize: ".85rem" }}>Tiles marked “Image coming soon” are codes in the range whose photographs are being added.</p>}

    <div role="dialog" aria-modal="true" aria-label="Swatch preview" className={`rd-lightbox ${cur ? "open" : ""}`} onClick={closeBox}>
      <div className="box" onClick={e => e.stopPropagation()}>
        <div ref={box} className={`im3d ${zoomed ? "z" : ""} ${dragging ? "drag" : ""}`} onPointerMove={onMove} onPointerDown={onDown} onPointerUp={onUp} onPointerCancel={onUp} onDoubleClick={onDouble}
          onPointerLeave={() => { if (!drag.current) setTilt({ rx: 8, ry: -14 }); }}>
          <div className="floor" aria-hidden="true" style={{ opacity: zoomed ? 0 : 1 }}/>
          <div className="pan" style={{ transform: `translate3d(${view.x}px,${view.y}px,0) scale(${view.z})`, transition: dragging ? "none" : `transform ${fast ? ".12s" : ".45s"} cubic-bezier(.2,.7,.2,1)` }}>
            <div className="sheet" ref={sheet} style={{ transform: `rotateX(${rx}deg) rotateY(${ry}deg)`, ["--sheen" as string]: `${sheen}%` }}>
              {cur && <img className="face" src={cur.view} alt={`${c.name} ${cur.code}`} draggable={false}/>}
              <span className="sheen" aria-hidden="true"/>
              <i className="edge e-r" aria-hidden="true"/><i className="edge e-l" aria-hidden="true"/><i className="edge e-t" aria-hidden="true"/><i className="edge e-b" aria-hidden="true"/><i className="back" aria-hidden="true"/>
            </div>
          </div>
        </div>
        <div className="bar">
          <div><b>{c.name}</b><span style={{ fontSize: ".8rem" }}>{cur?.code}{cur?.name ? ` · ${cur.name}` : ""} · {Math.round(view.z * 100)}% · scroll or pinch to zoom, drag to move</span></div>
          <div className="ctl" role="group" aria-label="Zoom and navigation">
            <button className="rd-btn glass" onClick={() => step(-1)} aria-label="Previous swatch">←</button>
            <button className="rd-btn glass" onClick={() => zoomAt(1 / 1.5)} disabled={view.z <= 1} aria-label="Zoom out">−</button>
            <button className="rd-btn glass" onClick={reset} disabled={view.z === 1} aria-label="Reset zoom">Fit</button>
            <button className="rd-btn glass" onClick={() => zoomAt(1.5)} disabled={view.z >= MAX} aria-label="Zoom in">+</button>
            <button className="rd-btn glass" onClick={() => step(1)} aria-label="Next swatch">→</button>
            <button className="rd-btn glass" onClick={closeBox}>Close</button>
          </div>
        </div>
      </div>
    </div>
  </>;
}
