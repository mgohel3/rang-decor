import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SwatchGrid } from "@/components/rd/SwatchGrid";
import { PdfLink } from "@/components/rd/Leads";
import { JsonLd } from "@/components/rd/JsonLd";
import { Stack } from "@/components/rd/Stack";
import { byId, collections, groups, resolveId } from "@/data/rang";
import { seriesFor } from "@/data/catalog";
import { SITE_URL, copy, faqFor } from "@/data/seo";

export function generateStaticParams() { return collections.map(c => ({ id: c.id })); }

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const c = byId(resolveId((await params).id));
  if (!c) return {};
  const t = copy[c.id];
  const title = t?.metaTitle ?? `${c.name}: ${c.kind}`;
  const description = t?.metaDescription ?? `${c.desc} Browse ${c.name} codes and download the catalogue from Rang Décor.`;
  const url = `/product/${c.id}`;
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url, images: c.cover ? [{ url: c.src, alt: `${c.name} by Rang Décor` }] : undefined } };
}

export default async function Product({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const c = byId(resolveId(id));
  if (!c) notFound();
  const t = copy[c.id];
  const sets = seriesFor(c.id);
  const related = [...collections.filter(x => x.group === c.group && x.id !== c.id), ...collections.filter(x => x.group !== c.group)].slice(0, 4);
  const total = sets.reduce((n, s) => n + s.items.length + s.pending.length, 0);
  const faq = faqFor(c.name);
  const url = `${SITE_URL}/product/${c.id}`;
  const ld = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Collections", item: `${SITE_URL}/collections` },
      { "@type": "ListItem", position: 3, name: c.name, item: url },
    ] },
    { "@context": "https://schema.org", "@type": "Product", name: c.name, description: c.long ?? c.desc, category: groups[c.group], url, brand: { "@type": "Brand", name: "Rang Décor" }, manufacturer: { "@id": `${SITE_URL}/#org` }, ...(c.cover ? { image: `${SITE_URL}${c.src}` } : {}) },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ];
  return <>
    <JsonLd data={ld}/>
    <Stack>
      {/* Card 1: the product. Card 2 slides over it, then card 3 slides over card 2 and carries the rest of the page. */}
      <section className="cs c1 sticky" aria-label={c.name}>
        <div className="rd-wrap">
          <nav aria-label="Breadcrumb" style={{ fontSize: ".85rem", fontWeight: 600 }}><Link href="/collections">← All collections</Link></nav>
          <div className="rd-prod">
            <div>
              <div className="rd-eyebrow">{c.kind}</div>
              <h1 className="rd-h1">{c.name}</h1>
              <p className="rd-lead" style={{ maxWidth: "30rem", marginTop: "1.6rem" }}>{c.long ?? c.desc}</p>
              {total > 0 && <p className="rd-muted" style={{ marginTop: "1rem", fontSize: ".9rem" }}>{total} codes in this range</p>}
              <div style={{ display: "flex", flexWrap: "wrap", gap: ".75rem", marginTop: "2.1rem" }}>
                <Link href="/contact" className="rd-btn dark" data-drop="btn">Enquire about {c.name}</Link>
                <PdfLink pdf={c.pdf} name={c.name} className="rd-btn outline" data-drop="btn" data-off="1">Catalogue PDF ↓</PdfLink>
              </div>
            </div>
            <div className="ph" data-drop="tint"><img src={c.src} alt={`${c.name}: ${c.kind} by Rang Décor`} style={c.cover ? undefined : { objectFit: "contain", padding: "12%" }}/></div>
          </div>
        </div>
      </section>

      {t && <section className="cs c2 sticky" aria-labelledby="ov">
        <div className="rd-wrap">
          <div className="rd-about-prod">
            <div>
              <h2 id="ov" className="rd-h3">About {c.name}</h2>
              {t.overview.map((p, i) => <p key={i} className="rd-lead">{p}</p>)}
            </div>
            <div className="side">
              <h3>At a glance</h3>
              <dl>{t.facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
              <h3>Where it works</h3>
              <ul>{t.uses.map(u => <li key={u}>{u}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>}

      <section className="cs c3" aria-label={`${c.name} finishes and more`}>
        <div className="rd-wrap">
          {sets.length > 0
            ? sets.map((s, i) => <div key={s.id} className="blk">
                <SwatchGrid c={c} title={sets.length > 1 ? s.name : undefined} note={s.note} items={s.items} pending={s.pending}/>
                {i === sets.length - 1 && <p className="rd-muted" style={{ marginTop: "1.75rem", fontSize: ".85rem", lineHeight: 1.6 }}>Colours on screen can differ slightly from the printed sheet. Ask for a physical sample before you order.</p>}
              </div>)
            : <div className="blk">
                <h2 className="rd-h3" style={{ marginBottom: "1rem" }}>Finishes &amp; codes</h2>
                <p className="rd-lead" style={{ maxWidth: "32.5rem" }}>Finishes and codes for {c.name} are listed in its catalogue.</p>
                <PdfLink pdf={c.pdf} name={c.name} className="rd-textlink" style={{ marginTop: "1rem" }}>Download the {c.name} catalogue →</PdfLink>
              </div>}

          <div className="rd-faq blk" aria-labelledby="faq">
            <h2 id="faq" className="rd-h3" style={{ marginBottom: "1.25rem" }}>Questions about {c.name}</h2>
            {faq.map(f => <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}
          </div>

          <div className="blk">
            <h2 className="rd-h3" style={{ marginBottom: "1.75rem" }}>Related materials</h2>
            <div className="rd-grid">{related.map(r => <Link key={r.id} href={`/product/${r.id}`} className={`rd-card ${r.cover ? "" : "logo"}`}><div className="ph" data-drop="tint" style={{ aspectRatio: "4/3" }}><img src={r.src} alt={`${r.name}: ${r.kind}`} loading="lazy"/></div><div className="nm"><b style={{ fontSize: "1.75rem" }}>{r.name}</b></div></Link>)}</div>
          </div>
        </div>
      </section>
    </Stack>
  </>;
}
