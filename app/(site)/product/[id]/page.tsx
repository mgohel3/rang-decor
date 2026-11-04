import Link from "next/link";
import { notFound } from "next/navigation";
import { SwatchGrid } from "@/components/rd/Pages";
import { byId, collections, resolveId } from "@/data/rang";
import { getFamilies } from "@/data/content";

export function generateStaticParams() { return collections.map(c => ({ id: c.id })); }

export default async function Product({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const c = byId(resolveId(id));
  if (!c) notFound();
  const fam = c.family ? getFamilies().find(f => f.id === c.family) : undefined;
  const swatches = (fam?.swatches ?? []).map(s => ({ number: s.code, image: s.image }));
  const related = [...collections.filter(x => x.group === c.group && x.id !== c.id), ...collections.filter(x => x.group !== c.group)].slice(0, 4);
  return <div className="rd-wrap rd-page">
    <Link href="/collections" style={{ fontSize: ".85rem", fontWeight: 600 }}>← All collections</Link>
    <div className="rd-prod">
      <div>
        <div className="rd-eyebrow">{c.kind}</div>
        <h1 className="rd-h1">{c.name}</h1>
        <p className="rd-lead" style={{ maxWidth: "30rem", marginTop: "1.6rem" }}>{c.long ?? c.desc}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: ".75rem", marginTop: "2.1rem" }}>
          <Link href="/contact" className="rd-btn dark" data-drop="btn">Enquire about {c.name}</Link>
          <a href={c.pdf} target="_blank" rel="noopener noreferrer" className="rd-btn outline" data-drop="btn" data-off="1">Catalogue PDF ↓</a>
        </div>
      </div>
      <div className="ph" data-drop="tint"><img src={c.src} alt={c.name} style={c.cover ? undefined : { objectFit: "contain", padding: "12%" }}/></div>
    </div>
    <section style={{ marginTop: "var(--sec)" }}>
      {swatches.length
        ? <><SwatchGrid c={c} swatches={swatches}/><p className="rd-muted" style={{ marginTop: "1.75rem", fontSize: ".85rem", lineHeight: 1.6 }}>Codes and images come from the Rang library. Colours on screen can differ from the real sheet.</p></>
        : <><h2 className="rd-h3" style={{ marginBottom: "1rem" }}>Finishes &amp; codes</h2><p className="rd-lead" style={{ maxWidth: "32.5rem" }}>Finishes and codes for {c.name} are listed in its catalogue.</p><a href={c.pdf} target="_blank" rel="noopener noreferrer" className="rd-textlink" style={{ marginTop: "1rem" }}>Open the {c.name} catalogue →</a></>}
    </section>
    <section style={{ marginTop: "var(--sec)" }}>
      <h2 className="rd-h3" style={{ marginBottom: "1.75rem" }}>Related materials</h2>
      <div className="rd-grid">{related.map(r => <Link key={r.id} href={`/product/${r.id}`} className={`rd-card ${r.cover ? "" : "logo"}`}><div className="ph" data-drop="tint" style={{ aspectRatio: "4/3" }}><img src={r.src} alt={r.name} loading="lazy"/></div><div className="nm"><b style={{ fontSize: "1.75rem" }}>{r.name}</b></div></Link>)}</div>
    </section>
  </div>;
}
