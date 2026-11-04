"use client";

import Link from "next/link";
import { PdfLink } from "./Leads";
import { useState } from "react";
import { collections, groups, contact, type GroupKey } from "@/data/rang";

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
        <div className="ph" data-shine style={{ aspectRatio: "4/3" }}><img src={c.src} alt={c.name} loading="lazy"/></div>
        <div className="nm"><b style={{ fontSize: "2.1rem" }}>{c.name}</b><i>{c.kind}</i></div>
        <p style={{ marginTop: ".5rem", fontSize: ".9rem", lineHeight: 1.6, color: "var(--body)" }}>{c.desc}</p>
      </Link>)}
    </div>
    {!list.length && <p className="rd-lead">No collections match. Clear the search or choose another material.</p>}
  </>;
}

export function CatalogueSearch() {
  const [q, setQ] = useState("");
  const list = collections.filter(c => !q.trim() || c.name.toLowerCase().includes(q.trim().toLowerCase()));
  return <>
    <label className="rd-search" style={{ margin: "0 0 2.25rem" }}><span aria-hidden="true">⌕</span><input type="search" aria-label="Search catalogues" placeholder="Search catalogues" value={q} onChange={e => setQ(e.target.value)}/></label>
    <div className="rd-covers">
      {list.map(c => <PdfLink key={c.id} pdf={c.pdf} name={c.name} className={`rd-cover ${c.cover ? "" : "logo"}`}>
        <div className="bk" data-shine><img src={c.src} alt={`${c.name} catalogue`} loading="lazy"/></div>
        <div className="nm"><b>{c.name}</b><i>PDF ↓</i></div>
      </PdfLink>)}
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
