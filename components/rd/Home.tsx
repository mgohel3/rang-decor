"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { applications, byId, collections, events, featuredLayout, featuredOrder, groups, materials, rooms, why, type GroupKey } from "@/data/rang";
import { Smoke } from "./Smoke";
import { PdfLink } from "./Leads";

const G = ({ children }: { children: React.ReactNode }) => <em className="grad">{children}</em>;
const Eyebrow = ({ children }: { children: React.ReactNode }) => <div className="rd-eyebrow">{children}</div>;

export function Home() {
  const [loaded, setLoaded] = useState(false);
  const [mat, setMat] = useState(0);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | GroupKey>("all");
  const [room, setRoom] = useState("living-room");
  const [app, setApp] = useState(0);
  const [tilt, setTilt] = useState<Record<string, [number, number]>>({});
  const [heroY, setHeroY] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    const onScroll = () => setHeroY(Math.min(window.scrollY, 800) * 0.12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { clearTimeout(t); window.removeEventListener("scroll", onScroll); };
  }, []);

  const track = useRef<HTMLDivElement>(null);
  const slide = (d: number) => track.current?.scrollBy({ left: d * track.current.clientWidth * 0.8, behavior: "smooth" });
  const q = query.trim().toLowerCase();
  const results = collections.filter(c => (filter === "all" || c.group === filter) && (!q || `${c.name} ${c.kind} ${c.desc}`.toLowerCase().includes(q)));
  const feat = featuredOrder.map(id => byId(id)!);
  const others = collections.filter(c => !featuredOrder.includes(c.id));
  const cur = materials[mat], curC = byId(cur.id)!;

  return <>
    {/* 01 HERO */}
    <section className={`rd-hero ${loaded ? "in" : ""}`} aria-label="Hero">
      <img src="/images/rang-hero-walnut.webp" alt="Interior with walnut-toned Rang Décor wall surfaces" style={{ marginTop: -heroY }}/>
      <div className="scrim"/>
      <div className="rd-hero-body">
        <div>
          <div className="tag fade">Decorative surfaces · Hyderabad</div>
          <h1><span className="ln"><span>Surfaces that inspire.</span></span><span className="ln"><span>Spaces that express.</span></span></h1>
          <div className="rd-hero-actions fade">
            <Link href="/collections" className="rd-btn light" data-drop="btn">Explore Collections</Link>
            <Link href="/about" className="rd-btn glass" data-drop="btn">Discover Rang</Link>
          </div>
        </div>
        <Link href="/product/groove-forest" className="rd-hero-card fade">
          <small>Featured collection</small><b>Groove Forest</b>
          <p>Modern textures bringing classic finish to everyday living space.</p><span>View collection →</span>
        </Link>
      </div>
      <div className="rd-scroll">Scroll</div>
    </section>

    {/* 02 INTRO */}
    <section className="rd-wrap rd-sec" id="about">
      <div className="rd-intro">
        <div data-rv="1">
          <Eyebrow>01 — About Rang Décor</Eyebrow>
          <h2 className="rd-h2">A wide range of surfaces <G>made for interiors.</G></h2>
          <p className="rd-lead" style={{ maxWidth: "32.5rem", marginTop: "2rem" }}>Rang Décor brings together laminates, louvers, panels and ceiling slats in a broad spread of designs, textures and finishes. Each one is chosen with comfort, style and your own taste in mind.</p>
          <Link href="/about" className="rd-textlink" style={{ marginTop: "2rem" }}>Learn more about us</Link>
        </div>
        <div className="rd-intro-art">
          <div className="a" data-rv="top"><img src="/images/rang-hero-sage.webp" alt="Living room with green and cream Rang Décor louver walls" loading="lazy" style={{ objectPosition: "72% 50%" }}/></div>
          <div className="b" data-rv="bottom"><img src="/images/rang-hero-charcoal.webp" alt="Interior with charcoal Rang Décor wall surfaces" loading="lazy"/></div>
          <div className="sig">Let’s live beautiful.</div>
        </div>
      </div>
    </section>

    {/* 03 COLLECTIONS */}
    <section className="rd-wrap" id="collections" style={{ paddingBottom: "var(--sec)" }}>
      <div className="rd-head" data-rv="1">
        <div><Eyebrow>02 — Signature collections</Eyebrow><h2 className="rd-h2">Meet your next <G>point of view.</G></h2></div>
        <p>Eight collections of louvers, panels, laminates and ceiling slats, each with its own character, texture and way of shaping a room.</p>
      </div>
      <div className="rd-showcase">
        {feat.map((c, i) => <Link key={c.id} href={`/product/${c.id}`} data-rv="1" className={`rd-card ${c.cover ? "" : "logo"}`}
          style={{ gridColumn: featuredLayout[i][0], marginTop: featuredLayout[i][2], transitionDelay: `${(i % 2) * 0.12}s` }}>
          <div className="ph" data-shine style={{ aspectRatio: featuredLayout[i][1] }}>
            <img src={c.src} alt={`${c.name} collection`} loading="lazy"/>
            <div className="ov"><p>{c.desc}</p><span>View collection →</span></div>
          </div>
          <div className="nm"><b>{c.name}</b><i>{c.kind}</i></div>
        </Link>)}
      </div>
      <div className="rd-also"><h4>Also from Rang</h4><div>{others.map(o => <Link key={o.id} href={`/product/${o.id}`}>{o.name}</Link>)}</div></div>
    </section>

    {/* 04 MATERIALS IN MOTION */}
    <section className="rd-materials" id="materials" aria-label="Materials in motion" style={{ background: cur.tone }}>
      <div className="rd-wrap">
        <div className="rd-eyebrow" style={{ color: "var(--glow)" }}>03 — Materials in motion</div>
        <div className="rd-mat-grid">
          <div className="rd-mat-left">
            <h2 className="rd-h2">One language,<br/><G>many materials.</G></h2>
            <div role="tablist" aria-label="Materials">
              {materials.map((m, i) => <button key={m.id} role="tab" aria-selected={mat === i} className={`rd-mat-tab ${mat === i ? "on" : ""}`} onClick={() => setMat(i)} onMouseEnter={() => setMat(i)}><small>0{i + 1}</small><b>{byId(m.id)!.name}</b></button>)}
            </div>
          </div>
          <div className="rd-mat-stage">
            <div className="rd-mat-imgs">{materials.map((m, i) => <img key={m.id} src={byId(m.id)!.src} alt={byId(m.id)!.name} loading="lazy" className={mat === i ? "on" : ""}/>)}</div>
            <div className="rd-mat-card">
              <small>{cur.kind}</small><b>{curC.name}</b><p>{curC.desc}</p><div className="fin">{cur.finish}</div>
              <Link href={`/product/${curC.id}`} className="rd-textlink" style={{ marginTop: "1.1rem", color: "#fff", fontSize: ".8rem" }}>View {curC.name} →</Link>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* 05 EXPLORER */}
    <section className="rd-explore rd-sec" id="explore">
      <div className="rd-wrap">
        <div className="rd-head" data-rv="1" style={{ marginBottom: "2.5rem" }}>
          <div><Eyebrow>04 — Find a surface</Eyebrow><h2 className="rd-h2">Explore by <G>material.</G></h2></div>
          <label className="rd-search"><span aria-hidden="true">⌕</span><input type="search" placeholder="Search collections" aria-label="Search collections" value={query} onChange={e => setQuery(e.target.value)}/></label>
        </div>
        <div role="group" aria-label="Filter by material" style={{ display: "flex", flexWrap: "wrap", gap: ".5rem", marginBottom: "2.25rem" }}>
          {[["all", "All"], ...Object.entries(groups)].map(([k, l]) => <button key={k} className="rd-chip" data-drop="btn" aria-pressed={filter === k} onClick={() => setFilter(k as "all" | GroupKey)}>{l}</button>)}
        </div>
        <div className="rd-slider-bar"><span>{results.length} collections</span><div><button aria-label="Previous" onClick={() => slide(-1)}>←</button><button aria-label="Next" onClick={() => slide(1)}>→</button></div></div>
        <div className="rd-slider" ref={track} tabIndex={0} aria-label="Collections">
          {results.map(c => <article key={c.id} className={`rd-result ${c.cover ? "" : "logo"}`}>
            <div className="ph"><img src={c.src} alt={c.name} loading="lazy"/></div>
            <div className="tx"><small>{c.kind}</small><b>{c.name}</b><p>{c.desc}</p>
              <div className="ln"><Link href={`/product/${c.id}`}>View</Link><PdfLink pdf={c.pdf} name={c.name}>Catalogue PDF</PdfLink></div></div>
          </article>)}
        </div>
        {!results.length && <p className="rd-lead">No collections match. Clear the search or choose another material.</p>}
      </div>
    </section>

    {/* 06 VISUALIZER */}
    <section className="rd-viz" id="visualizer">
      <img src="/images/visualizer.jpg" alt="Interior room used in the Rang visualizer" loading="lazy"/>
      <div className="scrim"/>
      <div className="rd-wrap rd-sec rd-viz-in">
        <div>
          <div className="rd-eyebrow" style={{ color: "var(--glow)" }}>05 — Envision your space</div>
          <h2 className="rd-h2">See a surface in <G>your space.</G></h2>
          <p style={{ fontSize: "1rem", lineHeight: 1.7, maxWidth: "28.75rem", marginTop: "1.6rem", color: "#ece6dd" }}>Choose a room, then try Rang finishes on its walls and see how each one changes the space.</p>
        </div>
        <div className="rd-glass-dark">
          <div style={{ fontSize: ".72rem", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: ".9rem" }}>Room</div>
          <div className="rd-rooms" role="group" aria-label="Room">{rooms.map(([l, id]) => <button key={id} aria-pressed={room === id} onClick={() => setRoom(id)} data-drop="btn">{l}</button>)}</div>
          <Link href={`/visualizer/${room}`} className="rd-btn light" data-drop="btn" style={{ width: "100%", justifyContent: "space-between", marginTop: "1.25rem" }}>Open the visualizer <span>→</span></Link>
        </div>
      </div>
    </section>

    {/* 07 APPLICATIONS */}
    <section className="rd-wrap rd-sec" id="applications">
      <div data-rv="1" style={{ marginBottom: "3rem" }}><Eyebrow>06 — Applications</Eyebrow><h2 className="rd-h2">Find a finish for <G>everywhere.</G></h2></div>
      <div className="rd-apps">
        {applications.map((a, i) => <Link key={a.n} href={`/product/${a.id}`} className={`rd-app ${app === i ? "on" : ""}`} onMouseEnter={() => setApp(i)} onFocus={() => setApp(i)}>
          <img src={byId(a.id)!.src} alt={a.title} loading="lazy" style={byId(a.id)!.cover ? undefined : { objectFit: "contain", padding: "18%", background: "#E8E5DF" }}/>
          <div className="sh"/><div className="tx"><small>{a.n}</small><b>{a.title}</b><p>{a.sub}</p></div>
        </Link>)}
      </div>
    </section>

    {/* 08 WHY */}
    <section className="rd-wrap" id="why" style={{ paddingBottom: "var(--sec)" }}>
      <div className="rd-why">
        <div className="stick" data-rv="1"><Eyebrow>07 — Why Rang</Eyebrow><h2 className="rd-h2">What makes <G>Rang</G> the best choice.</h2></div>
        <div>{why.map(([t, d], i) => <div key={t} className="rd-why-row" data-rv="1"><span>0{i + 1}</span><div><b>{t}</b><p>{d}</p></div></div>)}</div>
      </div>
    </section>

    {/* 09 CATALOGUES */}
    <section className="rd-explore rd-sec" id="catalogues" style={{ overflow: "hidden" }}>
      <div className="rd-wrap">
        <div className="rd-head"><div><Eyebrow>08 — Catalogue library</Eyebrow><h2 className="rd-h2">Ideas, in <G>good company.</G></h2></div><p>{collections.length - 1} catalogues, each a PDF from the Rang library.</p></div>
        <div className="rd-covers">
          {collections.map(c => <PdfLink key={c.id} pdf={c.pdf} name={c.name} className={`rd-cover ${c.cover ? "" : "logo"}`}
            onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); setTilt({ [c.id]: [-((e.clientY - r.top) / r.height - 0.5) * 10, ((e.clientX - r.left) / r.width - 0.5) * 12] }); }} onMouseLeave={() => setTilt({})}>
            <div className="bk" style={tilt[c.id] ? { transform: `rotateX(${tilt[c.id][0].toFixed(1)}deg) rotateY(${tilt[c.id][1].toFixed(1)}deg) translateY(-6px)`, boxShadow: "0 28px 50px rgba(28,27,26,.28)" } : undefined}><img src={c.src} alt={`${c.name} catalogue`} loading="lazy"/></div>
            <div className="nm"><b>{c.name}</b><i>PDF ↓</i></div>
          </PdfLink>)}
        </div>
      </div>
    </section>

    {/* 10 GALLERY */}
    <section className="rd-wrap rd-sec" id="gallery">
      <div data-rv="1" style={{ marginBottom: "2.5rem" }}><Eyebrow>09 — Out in the world</Eyebrow><h2 className="rd-h2">Meet us <G>there.</G></h2></div>
      <div>{events.map(([n, u], i) => <a key={n} href={u} target="_blank" rel="noopener noreferrer" className="rd-event"><span className="l"><small>0{i + 1}</small><b>{n}</b></span><em>Gallery →</em></a>)}<div style={{ borderTop: "1px solid var(--line)" }}/></div>
    </section>

    {/* 11 CTA */}
    <section className="rd-cta-sec" id="contact">
      <div className="wash" aria-hidden="true"/><Smoke/>
      <div className="rd-wrap rd-rel" style={{ maxWidth: "70rem" }}>
        <div className="rd-eyebrow" style={{ color: "#fff", marginBottom: "1.9rem" }}>10 — For architects, designers, dealers and customers</div>
        <h2>Let’s create something <em>beautiful.</em></h2>
        <p style={{ fontSize: "1.0625rem", lineHeight: 1.7, maxWidth: "32.5rem", margin: "1.9rem auto 0" }}>Explore the collections, download a catalogue, or talk to the Rang team about your next space.</p>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: ".75rem", marginTop: "2.75rem" }}>
          <Link href="/collections" className="rd-btn light" data-drop="btn">Explore Collections</Link>
          <Link href="/contact" className="rd-btn teal" data-drop="btn">Contact Rang</Link>
          <Link href="/catalogue" className="rd-btn white-outline" data-drop="btn">Download Catalogues</Link>
        </div>
        <a href="https://wa.me/918297585000" className="rd-textlink" style={{ marginTop: "1.6rem" }}>or message us on WhatsApp</a>
      </div>
    </section>
  </>;
}
