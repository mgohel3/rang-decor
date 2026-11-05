"use client";

import { useCallback, useEffect, useState } from "react";
import { albums } from "@/data/gallery";

// Event albums: filter chips, a photo grid and a keyboard-friendly lightbox.
export function GalleryGrid() {
  const [id, setId] = useState("all");
  const [open, setOpen] = useState<number | null>(null);
  const list = albums.filter(a => id === "all" || a.id === id).flatMap(a => a.photos.map(p => ({ f: p[0], w: p[1], h: p[2], ev: a.name })));
  const step = useCallback((d: number) => setOpen(o => o === null ? o : (o + d + list.length) % list.length), [list.length]);

  useEffect(() => {
    if (open === null) return;
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(null); if (e.key === "ArrowRight") step(1); if (e.key === "ArrowLeft") step(-1); };
    document.addEventListener("keydown", k); document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [open, step]);

  const cur = open === null ? null : list[open];
  return <>
    <div className="chips" role="group" aria-label="Filter by event" style={{ display: "flex", flexWrap: "wrap", gap: ".6rem", marginBottom: "2rem" }}>
      {[{ id: "all", name: "All events" }, ...albums].map(a => <button key={a.id} className="rd-chip" data-drop="btn" aria-pressed={id === a.id} onClick={() => { setId(a.id); setOpen(null); }}>{a.name}</button>)}
    </div>
    <div className="rd-gal">{list.map((p, i) => <button key={p.f} className="g" onClick={() => setOpen(i)} aria-label={`Open photo ${i + 1} from ${p.ev}`}>
      <img src={`/images/gallery/${p.f}`} alt={`${p.ev} photo ${i + 1}`} width={p.w} height={p.h} loading="lazy"/><span>{p.ev}</span>
    </button>)}</div>
    {cur && <div className="rd-lb" role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={() => setOpen(null)}>
      <img src={`/images/gallery/${cur.f}`} alt={cur.ev} onClick={e => e.stopPropagation()}/>
      <p>{cur.ev} · {(open ?? 0) + 1} / {list.length}</p>
      <button className="x" onClick={() => setOpen(null)} aria-label="Close">×</button>
      <button className="p" onClick={e => { e.stopPropagation(); step(-1); }} aria-label="Previous photo">‹</button>
      <button className="nx" onClick={e => { e.stopPropagation(); step(1); }} aria-label="Next photo">›</button>
    </div>}
  </>;
}
