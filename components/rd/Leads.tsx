"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

type Mode = { kind: "popup" } | { kind: "catalogue"; name: string; pdf: string };
type Ctx = { openCatalogue: (name: string, pdf: string) => void; openLead: () => void };
const LeadCtx = createContext<Ctx>({ openCatalogue: () => {}, openLead: () => {} });
export const useLeads = () => useContext(LeadCtx);

const KEY = "rd_lead"; // saved details (prefill) + whether the popup was handled
const SEEN = "rd_lead_popup";
const roles = ["Homeowner", "Architect / Interior designer", "Dealer / Distributor", "Contractor", "Other"];

type Saved = { name?: string; email?: string; phone?: string; role?: string };
const read = (): Saved => { try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch { return {}; } };

function startDownload(pdf: string) {
  const a = document.createElement("a");
  a.href = pdf; a.target = "_blank"; a.rel = "noopener noreferrer";
  document.body.appendChild(a); a.click(); a.remove();
}

export function LeadProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mode, setMode] = useState<Mode | null>(null);
  const modeRef = useRef<Mode | null>(null);
  useEffect(() => { modeRef.current = mode; }, [mode]);

  const openCatalogue = useCallback((name: string, pdf: string) => setMode({ kind: "catalogue", name, pdf }), []);
  const openLead = useCallback(() => setMode({ kind: "popup" }), []);

  // Lead popup: once per visitor, after a short stay or when the pointer heads for the browser bar.
  useEffect(() => {
    if (pathname === "/contact") return;
    try { if (localStorage.getItem(SEEN)) return; } catch { return; }
    let done = false;
    const show = () => { if (done || modeRef.current) return; done = true; setMode({ kind: "popup" }); };
    const t = window.setTimeout(show, 25000);
    const leave = (e: MouseEvent) => { if (e.clientY <= 0 && window.scrollY > 400) show(); };
    document.addEventListener("mouseout", leave);
    return () => { window.clearTimeout(t); document.removeEventListener("mouseout", leave); };
  }, [pathname]);

  const value = useMemo(() => ({ openCatalogue, openLead }), [openCatalogue, openLead]);
  return <LeadCtx.Provider value={value}>
    {children}
    {mode && <LeadModal mode={mode} onClose={() => { if (mode.kind === "popup") { try { localStorage.setItem(SEEN, String(Date.now())); } catch {} } setMode(null); }}/>}
  </LeadCtx.Provider>;
}

// A PDF link that asks for the visitor's details first. Without JavaScript it is a normal link.
export function PdfLink({ pdf, name, children, onClick, ...rest }: { pdf: string; name: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  const { openCatalogue } = useLeads();
  return <a {...rest} href={pdf} target="_blank" rel="noopener noreferrer" onClick={e => { onClick?.(e); if (e.defaultPrevented || e.metaKey || e.ctrlKey) return; e.preventDefault(); openCatalogue(name, pdf); }}>{children}</a>;
}

function LeadModal({ mode, onClose }: { mode: Mode; onClose: () => void }) {
  const pathname = usePathname();
  const catalogue = mode.kind === "catalogue";
  // The modal only mounts in the browser after a click or timer, so saved details can be read up front.
  const [f, setF] = useState(() => { const v = read(); return { name: v.name ?? "", email: v.email ?? "", phone: v.phone ?? "", role: v.role ?? roles[0], company: "" }; }); // company = honeypot
  const [err, setErr] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const first = useRef<HTMLInputElement>(null);

  useEffect(() => {
    first.current?.focus();
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", k);
    const prev = document.body.style.overflow; document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = prev; };
  }, [onClose]);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setF(v => ({ ...v, [k]: e.target.value }));
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (f.name.trim().length < 2) er.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) er.email = "Please enter a valid email address.";
    if (f.phone.replace(/\D/g, "").length < 8) er.phone = "Please enter a phone number we can reach.";
    setErr(er);
    if (Object.keys(er).length) return;
    setBusy(true);
    try { localStorage.setItem(KEY, JSON.stringify({ name: f.name, email: f.email, phone: f.phone, role: f.role })); localStorage.setItem(SEEN, "done"); } catch {}
    try {
      await fetch("/api/leads", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...f, source: catalogue ? "catalogue-download" : "popup", catalogue: catalogue ? mode.name : undefined, page: pathname }) });
    } catch { /* the visitor still gets the catalogue */ }
    setBusy(false); setDone(true);
    if (catalogue) startDownload(mode.pdf);
  };

  return <div className="rd-lead-wrap" role="dialog" aria-modal="true" aria-labelledby="lead-title" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
    <div className="rd-lead">
      <button className="rd-lead-x" onClick={onClose} aria-label="Close"><X size={20}/></button>
      {done ? <div className="done">
        <div className="rd-eyebrow" style={{ color: "var(--glow)" }}>Thank you</div>
        <h2 id="lead-title">{catalogue ? <>Your {mode.name} catalogue is <em>on its way.</em></> : <>We will be <em>in touch.</em></>}</h2>
        <p>{catalogue ? "If the download did not start, use the button below." : "A member of the Rang team will reach out soon."}</p>
        <div style={{ display: "flex", gap: ".6rem", flexWrap: "wrap", marginTop: "1.4rem" }}>
          {catalogue && <a className="rd-btn light" href={mode.pdf} target="_blank" rel="noopener noreferrer">Open the PDF</a>}
          <button className="rd-btn glass" onClick={onClose}>Close</button>
        </div>
      </div> : <>
        <div className="rd-eyebrow" style={{ color: "var(--glow)" }}>{catalogue ? "Catalogue download" : "Stay in touch"}</div>
        <h2 id="lead-title">{catalogue ? <>Get the {mode.name} <em>catalogue.</em></> : <>Let’s plan your <em>space.</em></>}</h2>
        <p>{catalogue ? "Tell us who you are and the PDF opens right away." : "Share your details and the Rang team will help you choose finishes, samples and a catalogue."}</p>
        <form onSubmit={submit} noValidate>
          <label className="rd-field">Name<input ref={first} value={f.name} onChange={set("name")} autoComplete="name" aria-invalid={!!err.name}/><span className="err">{err.name}</span></label>
          <label className="rd-field">Email<input type="email" value={f.email} onChange={set("email")} autoComplete="email" aria-invalid={!!err.email}/><span className="err">{err.email}</span></label>
          <label className="rd-field">Phone<input type="tel" value={f.phone} onChange={set("phone")} autoComplete="tel" aria-invalid={!!err.phone}/><span className="err">{err.phone}</span></label>
          <label className="rd-field">I am a<select value={f.role} onChange={set("role")}>{roles.map(r => <option key={r}>{r}</option>)}</select></label>
          <input className="rd-hp" tabIndex={-1} autoComplete="off" aria-hidden="true" value={f.company} onChange={set("company")}/>
          <button type="submit" className="rd-btn light" disabled={busy} data-drop="btn" style={{ width: "100%", minHeight: "3.4rem" }}>{busy ? "Sending…" : catalogue ? "Download catalogue" : "Send my details"}</button>
          <p className="fine">We use your details only to reply to you and share Rang updates.</p>
        </form>
      </>}
    </div>
  </div>;
}
