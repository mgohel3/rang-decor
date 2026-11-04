"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X, ArrowUpRight } from "lucide-react";
import { catalog } from "@/data/catalog";
import { byId, collections } from "@/data/rang";

type Hit = { id: string; title: string; sub?: string; href: string; img?: string; group: "Pages" | "Collections" | "Product codes" };

const pages: Hit[] = [
  ["About Rang Décor", "/about"], ["Catalogue library", "/catalogue"], ["Visualizer", "/visualizer/living-room"], ["Gallery", "/gallery"], ["Our network", "/network"], ["Testimonials", "/testimonials"], ["Careers", "/careers"], ["Contact", "/contact"],
].map(([title, href]) => ({ id: href, title, href, group: "Pages" as const }));

const colHits: Hit[] = collections.map(c => ({ id: c.id, title: c.name, sub: c.kind, href: `/product/${c.id}`, img: c.cover ? c.src : undefined, group: "Collections" as const }));

const codeHits: Hit[] = catalog.flatMap(s => {
  const col = byId(s.collection)?.name ?? s.name;
  const sub = (code: string, name?: string | null) => `${col}${name ? ` · ${name}` : ""}`;
  return [
    ...s.items.map(i => ({ id: `${s.id}-${i.code}`, title: i.code, sub: sub(i.code, i.name), href: `/product/${s.collection}`, img: i.thumb, group: "Product codes" as const })),
    ...s.pending.map(i => ({ id: `${s.id}-${i.code}-p`, title: i.code, sub: sub(i.code, i.name), href: `/product/${s.collection}`, group: "Product codes" as const })),
  ];
});

export default function SearchModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [at, setAt] = useState(0);
  const input = useRef<HTMLInputElement>(null);

  const hits = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [...colHits.slice(0, 6), ...pages.slice(0, 4)];
    const has = (h: Hit) => `${h.title} ${h.sub ?? ""}`.toLowerCase().includes(s);
    const rank = (h: Hit) => (h.title.toLowerCase().startsWith(s) ? 0 : 1);
    const pick = (list: Hit[], n: number) => list.filter(has).sort((a, b) => rank(a) - rank(b)).slice(0, n);
    return [...pick(colHits, 6), ...pick(pages, 4), ...pick(codeHits, 14)];
  }, [q]);

  useEffect(() => {
    input.current?.focus();
    const prev = document.body.style.overflow; document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  const go = (h: Hit) => { onClose(); router.push(h.href); };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    else if (e.key === "ArrowDown") { e.preventDefault(); setAt(i => Math.min(hits.length - 1, i + 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setAt(i => Math.max(0, i - 1)); }
    else if (e.key === "Enter" && hits[at]) go(hits[at]);
  };

  let lastGroup = "";
  return <div className="rd-search-wrap" role="dialog" aria-modal="true" aria-label="Search" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }} onKeyDown={onKey}>
    <div className="rd-search-box">
      <div className="top">
        <Search size={20} aria-hidden="true"/>
        <input ref={input} value={q} onChange={e => { setQ(e.target.value); setAt(0); }} placeholder="Search collections, codes or pages" aria-label="Search the site" autoComplete="off" role="combobox" aria-expanded="true" aria-controls="rd-search-list"/>
        <button onClick={onClose} aria-label="Close search"><X size={18}/></button>
      </div>
      <ul id="rd-search-list" role="listbox">
        {hits.map((h, i) => {
          const head = h.group !== lastGroup ? (lastGroup = h.group) : null;
          return <li key={h.id} role="presentation">
            {head && <div className="grp">{head}</div>}
            <button role="option" aria-selected={i === at} className={i === at ? "on" : ""} onMouseEnter={() => setAt(i)} onClick={() => go(h)}>
              {h.img ? <img src={h.img} alt="" width={40} height={40}/> : <span className="ic"><ArrowUpRight size={16}/></span>}
              <span className="t"><b>{h.title}</b>{h.sub ? <small>{h.sub}</small> : null}</span>
            </button>
          </li>;
        })}
        {!hits.length && <li className="none">Nothing matches “{q}”. Try a code such as RG 5005, or a collection name.</li>}
      </ul>
      <div className="foot"><span><kbd>↑</kbd><kbd>↓</kbd> to move</span><span><kbd>Enter</kbd> to open</span><span><kbd>Esc</kbd> to close</span></div>
    </div>
  </div>;
}
