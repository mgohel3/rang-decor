"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import { collections, groups, nav, type GroupKey } from "@/data/rang";
import { Smoke } from "./Smoke";

const groupKeys = Object.keys(groups) as GroupKey[];

export function Header() {
  const pathname = usePathname();
  const [menu, setMenu] = useState<string | null>(null);
  const [mob, setMob] = useState(false);
  const [mobSub, setMobSub] = useState<string | null>(null);
  const [grp, setGrp] = useState<GroupKey>("louvers");
  const [hov, setHov] = useState("groove-earth");
  const [scrolled, setScrolled] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const headRef = useRef<HTMLElement>(null);
  const openT = useRef(0), closeT = useRef(0);

  // Close menus on navigation (state adjusted during render, as React recommends).
  if (lastPath !== pathname) { setLastPath(pathname); setMenu(null); setMob(false); }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setMenu(null); setMob(false); } };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("keydown", onKey); };
  }, []);

  // Hover intent: open after a short delay and close after a short grace period, so brushing past the
  // menu or moving towards the page content does not leave the panel covering what the visitor wants to click.
  const openMenu = (m: string) => { clearTimeout(closeT.current); clearTimeout(openT.current); openT.current = window.setTimeout(() => setMenu(m), menu ? 0 : 120); };
  const closeNow = () => { clearTimeout(openT.current); clearTimeout(closeT.current); setMenu(null); };
  const closeSoon = () => { clearTimeout(openT.current); clearTimeout(closeT.current); closeT.current = window.setTimeout(() => setMenu(null), 180); };
  useEffect(() => {
    if (!menu) return;
    const outside = (e: PointerEvent) => { if (headRef.current && !headRef.current.contains(e.target as Node)) setMenu(null); };
    const y0 = window.scrollY;
    const away = () => { if (Math.abs(window.scrollY - y0) > 24) setMenu(null); };
    document.addEventListener("pointerdown", outside);
    window.addEventListener("scroll", away, { passive: true });
    return () => { document.removeEventListener("pointerdown", outside); window.removeEventListener("scroll", away); };
  }, [menu]);

  const light = pathname !== "/" || scrolled || !!menu || mob;
  const hi = collections.findIndex(c => c.id === hov);
  const close = () => { setMenu(null); setMob(false); };

  const isHome = pathname === "/";
  // The page the visitor is on keeps its underline (Products also covers product pages).
  const active = (href: string) => href === "/" ? isHome : pathname.startsWith(href.split("/").slice(0, 2).join("/")) || (href === "/collections" && pathname.startsWith("/product"));

  return <header ref={headRef} className={`rd-header ${light ? "" : "over-hero"} ${isHome ? "" : "page"}`} onMouseLeave={closeSoon} onMouseEnter={() => clearTimeout(closeT.current)}>
    <div className="rd-header-in">
      <div className="rd-pill">
        <Link href="/" className="rd-logo" aria-label="Rang Décor home"><Image src="/images/rang-header.svg" alt="Rang Décor" width={126} height={46} priority unoptimized/></Link>
        <nav className="rd-nav" aria-label="Primary">
          {nav.map(n => n.menu
            ? <button key={n.label} className={menu === n.menu || active(n.href) ? "on" : ""} aria-haspopup="true" aria-expanded={menu === n.menu} onMouseEnter={() => openMenu(n.menu!)} onClick={() => { clearTimeout(openT.current); setMenu(menu === n.menu ? null : n.menu!); }}>{n.label}<ArrowDown size={13} aria-hidden="true"/><span className="bar"/></button>
            : <Link key={n.label} href={n.href} className={active(n.href) ? "on" : ""} aria-current={active(n.href) ? "page" : undefined} onMouseEnter={closeNow}>{n.label}<span className="bar"/></Link>)}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
          <Link href={isHome ? "/collections" : "/contact"} className="rd-cta" data-drop="btn">{isHome ? "Explore Collections" : "Enquire"}</Link>
          <button className="rd-burger" aria-label="Menu" aria-expanded={mob} onClick={() => { setMob(!mob); setMobSub(null); }}>{mob ? "CLOSE" : "MENU"}</button>
        </div>
      </div>

      {/* The colour smoke sits BEHIND the glass panel, so the panel's backdrop blur softens it and the text stays crisp (same as the footer). */}
      <div className={`rd-mega-pos ${menu ? "open" : ""}`} role="region" aria-label="Menu" inert={!menu}>
        <div className="rd-mega-under"><div className="rd-mega-wash"/><Smoke/></div>
      <div className="rd-mega">
        <div className="rd-mega-grid">
          <div className="rd-mega-tabs">
            <div className="rd-mega-label">{menu === "catalogues" ? "Catalogue library" : "Products by material"}</div>
            {groupKeys.map(k => <button key={k} className={`rd-mega-tab ${grp === k ? "on" : ""}`}
              onMouseEnter={() => { setGrp(k); setHov(collections.find(c => c.group === k)!.id); }} onFocus={() => setGrp(k)} onClick={() => { setGrp(k); setHov(collections.find(c => c.group === k)!.id); }}>
              <span>{groups[k]}</span><small>{collections.filter(c => c.group === k).length}</small></button>)}
            <Link className="rd-mega-all" href={menu === "catalogues" ? "/catalogue" : "/collections"} onClick={close}>{menu === "catalogues" ? "All catalogues →" : "All collections →"}</Link>
          </div>
          <div className="rd-mega-list" style={{ display: "grid" }}>
            {menu === "catalogues"
              ? collections.map(c => <a key={c.id} className={`rd-mega-item pdf ${hov === c.id ? "on" : ""}`} href={c.pdf} target="_blank" rel="noopener noreferrer" onMouseEnter={() => setHov(c.id)} onFocus={() => setHov(c.id)}><b>{c.name}</b><i>PDF ↓</i></a>)
              : collections.filter(c => c.group === grp).map(c => <Link key={c.id} className={`rd-mega-item ${hov === c.id ? "on" : ""}`} href={`/product/${c.id}`} onClick={close} onMouseEnter={() => setHov(c.id)} onFocus={() => setHov(c.id)}><b>{c.name}</b><span>{c.desc}</span></Link>)}
          </div>
          <div className="rd-mega-feat" aria-hidden="true">
            {collections.map((c, i) => <div key={c.id} className="rd-feat" style={{ opacity: i === hi ? 1 : 0, transform: i === hi ? "none" : i < hi ? "translateY(-28px)" : "translateY(28px)" }}>
              <img src={c.src} alt="" loading="lazy" style={{ objectFit: c.cover ? "cover" : "contain", padding: c.cover ? 0 : "18%" }}/>
              <div className="cap"><b>{c.name}</b><span>{c.kind}</span></div>
            </div>)}
          </div>
        </div>
      </div>
      </div>

      <div className={`rd-mobmenu ${mob ? "open" : ""}`}>
        {nav.map(n => {
          const subs = n.menu === "products" ? collections.map(c => ({ name: c.name, url: `/product/${c.id}` })) : n.menu === "catalogues" ? collections.map(c => ({ name: c.name, url: c.pdf })) : [];
          const on = mobSub === n.menu;
          return <div className="row" key={n.label}>
            {n.menu ? <button onClick={() => setMobSub(on ? null : n.menu!)} aria-expanded={on}>{n.label}<i>{on ? "–" : "+"}</i></button> : <Link href={n.href} onClick={close}>{n.label}</Link>}
            {n.menu && <div className={`subs ${on ? "open" : ""}`}>{subs.map(s => <a key={s.name} href={s.url} onClick={close}>{s.name}</a>)}</div>}
          </div>;
        })}
        <div className="row"><Link href="/careers" onClick={close}>Careers</Link></div>
        <div className="row"><Link href="/testimonials" onClick={close}>Testimonials</Link></div>
        <Link href="/collections" className="rd-btn dark" style={{ width: "100%", marginTop: "1.1rem" }} onClick={close}>Explore Collections</Link>
      </div>
    </div>
  </header>;
}
