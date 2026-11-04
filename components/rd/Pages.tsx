"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { collections, groups, contact, type Collection, type GroupKey } from "@/data/rang";

export function PageHead({ eyebrow, children, lead }: { eyebrow: string; children: React.ReactNode; lead?: string }) {
  return <div style={{ marginBottom: "2.5rem" }}>
    <div className="rd-eyebrow">{eyebrow}</div>
    <h1 className="rd-h1">{children}</h1>
    {lead && <p className="rd-lead" style={{ maxWidth: "32.5rem", marginTop: "1.75rem" }}>{lead}</p>}
  </div>;
}

export function CollectionList() {
  const [q, setQ] = useState("");
  const [grp, setGrp] = useState<"all" | GroupKey>("all");
  const s = q.trim().toLowerCase();
  const list = collections.filter(c => (grp === "all" || c.group === grp) && (!s || `${c.name} ${c.kind} ${c.desc}`.toLowerCase().includes(s)));
  return <>
    <div style={{ display: "flex", flexWrap: "wrap", gap: ".75rem", alignItems: "center", marginBottom: "2.25rem" }}>
      <label className="rd-search"><span aria-hidden="true">⌕</span><input type="search" aria-label="Search collections" placeholder="Search collections" value={q} onChange={e => setQ(e.target.value)}/></label>
      {[["all", "All"], ...Object.entries(groups)].map(([k, l]) => <button key={k} className="rd-chip" data-drop="btn" aria-pressed={grp === k} onClick={() => setGrp(k as "all" | GroupKey)}>{l}</button>)}
    </div>
    <div className="rd-grid" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,18.75rem),1fr))", gap: "1.75rem" }}>
      {list.map(c => <Link key={c.id} href={`/product/${c.id}`} className={`rd-card ${c.cover ? "" : "logo"}`} style={{ animation: "rdIn .6s both" }}>
        <div className="ph" data-drop="tint" style={{ aspectRatio: "4/3" }}><img src={c.src} alt={c.name} loading="lazy"/></div>
        <div className="nm"><b style={{ fontSize: "2.1rem" }}>{c.name}</b><i>{c.kind}</i></div>
        <p style={{ marginTop: ".5rem", fontSize: ".9rem", lineHeight: 1.6, color: "var(--body)" }}>{c.desc}</p>
      </Link>)}
    </div>
    {!list.length && <p className="rd-lead">No collections match. Clear the search or choose another material.</p>}
  </>;
}

export function SwatchGrid({ c, swatches }: { c: Collection; swatches: { number: string; image: string }[] }) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1); // 1 = fit, up to 4x
  const s = q.trim().toLowerCase();
  const list = swatches.filter(x => !s || x.number.toLowerCase().includes(s));
  const cur = sel === null ? null : list[sel];
  const zoomBy = (d: number) => setZoom(z => Math.min(4, Math.max(1, Math.round((z + d) * 100) / 100)));
  const step = (d: number) => { setSel(i => (i === null ? i : (i + d + list.length) % list.length)); setZoom(1); };
  const closeBox = () => { setSel(null); setZoom(1); };
  useEffect(() => {
    if (sel === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeBox();
      else if (e.key === "+" || e.key === "=") zoomBy(0.5);
      else if (e.key === "-") zoomBy(-0.5);
      else if (e.key === "0") setZoom(1);
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sel, list.length]);
  return <>
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "1.25rem", marginBottom: "1.75rem" }}>
      <h2 className="rd-h3">Finishes &amp; codes</h2>
      <label className="rd-search" style={{ width: "min(100%,17.5rem)" }}><span aria-hidden="true">⌕</span><input type="search" aria-label="Search by product code" placeholder="Search by code" value={q} onChange={e => { setQ(e.target.value); setSel(null); }}/></label>
    </div>
    <div className="rd-swatches">
      {list.map((x, i) => <button key={x.image} className="rd-sw" aria-label={`Open ${c.name} ${x.number}`} onClick={() => { setSel(i); setZoom(1); }}>
        <div className="ph" data-drop="tint"><img src={x.image} alt={`${c.name} ${x.number}`} loading="lazy"/></div><b>{x.number}</b>
      </button>)}
    </div>
    {!list.length && <p className="rd-lead">No code matches “{q}”.</p>}
    <div role="dialog" aria-modal="true" aria-label="Swatch preview" className={`rd-lightbox ${cur ? "open" : ""}`} onClick={closeBox}>
      <div className="box" onClick={e => e.stopPropagation()}>
        <div className={`im ${zoom > 1 ? "z" : ""}`} onDoubleClick={() => setZoom(zoom > 1 ? 1 : 2.5)} onWheel={e => { if (e.ctrlKey || e.metaKey) { e.preventDefault(); zoomBy(e.deltaY < 0 ? 0.25 : -0.25); } }}>
          {cur && <img src={cur.image} alt={`${c.name} ${cur.number}`} style={{ width: `${zoom * 100}%`, maxWidth: "none" }}/>}
        </div>
        <div className="bar">
          <div><b>{c.name}</b><span style={{ fontSize: ".8rem" }}>{cur?.number} · {Math.round(zoom * 100)}%</span></div>
          <div className="ctl" role="group" aria-label="Zoom and navigation">
            <button className="rd-btn glass" onClick={() => step(-1)} aria-label="Previous swatch">←</button>
            <button className="rd-btn glass" onClick={() => zoomBy(-0.5)} disabled={zoom <= 1} aria-label="Zoom out">−</button>
            <button className="rd-btn glass" onClick={() => setZoom(1)} disabled={zoom === 1} aria-label="Reset zoom">Fit</button>
            <button className="rd-btn glass" onClick={() => zoomBy(0.5)} disabled={zoom >= 4} aria-label="Zoom in">+</button>
            <button className="rd-btn glass" onClick={() => step(1)} aria-label="Next swatch">→</button>
            <button className="rd-btn glass" onClick={closeBox}>Close</button>
          </div>
        </div>
      </div>
    </div>
  </>;
}

export function CatalogueSearch() {
  const [q, setQ] = useState("");
  const list = collections.filter(c => !q.trim() || c.name.toLowerCase().includes(q.trim().toLowerCase()));
  return <>
    <label className="rd-search" style={{ margin: "0 0 2.25rem" }}><span aria-hidden="true">⌕</span><input type="search" aria-label="Search catalogues" placeholder="Search catalogues" value={q} onChange={e => setQ(e.target.value)}/></label>
    <div className="rd-covers">
      {list.map(c => <a key={c.id} href={c.pdf} target="_blank" rel="noopener noreferrer" className={`rd-cover ${c.cover ? "" : "logo"}`}>
        <div className="bk" data-drop="tint"><img src={c.src} alt={`${c.name} catalogue`} loading="lazy"/></div>
        <div className="nm"><b>{c.name}</b><i>PDF ↓</i></div>
      </a>)}
    </div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: ".75rem 2rem", marginTop: "2.75rem", fontWeight: 600, fontSize: ".9rem" }}>
      <a href="https://products.rangdecor.in/extra/interlockit.mp4">Interlockit video →</a><a href="https://rangdecor.in/public/Bella_ceilo.mp4">Bella Ceilo video →</a>
    </div>
  </>;
}

export function ContactForm() {
  const [f, setF] = useState({ name: "", email: "", phone: "", message: "" });
  const [err, setErr] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("");
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (f.name.trim().length < 2) er.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) er.email = "Please enter a valid email address.";
    if (f.message.trim().length < 10) er.message = "Please write at least 10 characters.";
    setErr(er);
    if (Object.keys(er).length) { setStatus(""); return; }
    const body = encodeURIComponent(`Name: ${f.name}\nPhone: ${f.phone}\n\n${f.message}`);
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(`Enquiry from ${f.name}`)}&body=${body}`;
    setStatus(`Thank you. Your email app has opened with your message addressed to ${contact.email}.`);
  };
  return <form onSubmit={submit} noValidate style={{ display: "grid", gap: "1.1rem" }}>
    <label className="rd-field">Name<input value={f.name} onChange={set("name")} autoComplete="name" aria-invalid={!!err.name}/><span className="err">{err.name}</span></label>
    <label className="rd-field">Email<input type="email" value={f.email} onChange={set("email")} autoComplete="email" aria-invalid={!!err.email}/><span className="err">{err.email}</span></label>
    <label className="rd-field">Phone (optional)<input type="tel" value={f.phone} onChange={set("phone")} autoComplete="tel"/></label>
    <label className="rd-field">Message<textarea rows={5} value={f.message} onChange={set("message")} aria-invalid={!!err.message}/><span className="err">{err.message}</span></label>
    <button type="submit" className="rd-btn dark" data-drop="btn" style={{ minHeight: "3.5rem" }}>Send your message</button>
    <div role="status" style={{ color: "var(--teal-ink)", fontWeight: 600, lineHeight: 1.6 }}>{status}</div>
  </form>;
}
