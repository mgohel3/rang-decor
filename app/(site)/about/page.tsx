import { PageHead } from "@/components/rd/Pages";

export const metadata = { title: "About Rang Décor", description: "Rang Décor is a Bhandari Group initiative founded in 2016 in Hyderabad. Learn about our approach, products, vision and the applications we serve.", alternates: { canonical: "/about" }, openGraph: { title: "About Rang Décor", description: "Rang Décor is a Bhandari Group initiative founded in 2016 in Hyderabad. Learn about our approach, products, vision and the applications we serve.", url: "/about" } };
const R = "https://rangdecor.in/media/";
const products = [
  ["Bern Series", R + "looper/about_slide-1-compressed.jpg", "Bern Thermo is a 1 mm thermo-mica sheet in the standard 8 ft by 4 ft size. Choose from solid gloss and matt, metallic, sparkle, textured, veneer and glass rustic finishes."],
  ["Charco Charm", R + "looper/about_slide-2-compressed.jpg", "Charco Charm is an 8 ft by 2 ft decorative charcoal panel that adds texture and depth to living rooms, bedrooms and offices."],
  ["Groove", R + "looper/about_slide-4-compressed.jpg", "Groove is a collection of seamless louvers, 9 ft tall and 5 to 8 inches wide. The slats interlock for a smooth finish on walls, ceilings and partitions."],
  ["WPC Foam Board", R + "looper/about_slide-3-compressed.jpg", "WPC foam board is a wood plastic composite sheet, a modern alternative to plywood, MDF and acrylic surfaces for many uses."],
];
const features = ["Fire Retardant", "Bacteria Resistant", "No Shrinking-Swelling", "Toxic Free", "Light Weight", "Water Resistant"];
const apps = [["Residential", "residential"], ["Offices", "office"], ["Hospitality", "hotel"], ["Healthcare", "healthcare"]];
const bg = ["var(--magenta)", "var(--teal)", "var(--amber)"];
const values: [string, string, string][] = [
  ["Our Company", "var(--magenta)", "We believe in doing better by our people and by the communities around us, and we want our work to leave things better than we found them."],
  ["Our Vision", "var(--teal-ink)", "To be a workplace people are glad to join and a brand that keeps growing, with satisfied employees and steady progress."],
  ["Our Mission", "#9A5F27", "To keep improving in design, technology and the way we serve our customers."],
];

export default function About() {
  return <div className="rd-wrap rd-page">
    <PageHead eyebrow="Who we are and what we do">Get to know <em className="grad">us better.</em></PageHead>
    <div className="rd-two" style={{ marginTop: "3.5rem" }}>
      <img src={R + "informative/About-uspsd.webp"} alt="Rang Décor" style={{ width: "100%", borderRadius: 4 }}/>
      <div className="rd-lead" style={{ display: "grid", gap: "1.25rem", fontSize: "1.0625rem" }}>
        <p>Rang Décor is an initiative of the Bhandari Group. It began in 2016 with a simple idea: luxury should come from good design. We create interior décor products that people notice and keep choosing.</p>
        <p>Customers come first in everything we do. We pair elegant design with careful execution, from the first sample to the finished wall.</p>
        <p>Our designers focus on trend-led, well-made and sensibly priced solutions, so a look that once felt out of reach can become part of your home or project.</p>
      </div>
    </div>
    <div className="rd-three" id="approach" style={{ marginTop: "var(--sec)", borderTop: "1px solid var(--line)", paddingTop: "2.5rem" }}>
      {values.map(([t, c, d]) => <div key={t}><h3 style={{ fontSize: "2.1rem", color: c }}>{t}</h3><p className="rd-lead" style={{ marginTop: ".9rem", fontSize: ".95rem" }}>{d}</p></div>)}
    </div>
    <section style={{ marginTop: "var(--sec)" }}>
      <h2 className="rd-h3" style={{ marginBottom: "2.25rem" }}>Our products</h2>
      <div className="rd-grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,18.75rem),1fr))", gap: "2.25rem 1.75rem" }}>
        {products.map(([t, img, d]) => <div key={t}><img src={img} alt={t} loading="lazy" style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover" }}/><h3 style={{ fontSize: "1.9rem", margin: "1rem 0 .6rem" }}>{t}</h3><p style={{ fontSize: ".9rem", lineHeight: 1.7, color: "var(--body)" }}>{d}</p></div>)}
      </div>
    </section>
    <section className="rd-two" style={{ marginTop: "var(--sec)" }}>
      <div><h2 className="rd-h3" style={{ marginBottom: "1.5rem" }}>WPC foam board features</h2><div className="rd-pillrow">{features.map((f, i) => <span key={f} style={{ background: bg[i % 3], color: i % 3 === 2 ? "var(--ink)" : "#fff" }}>{f}</span>)}</div></div>
      <div id="network"><h2 className="rd-h3" style={{ marginBottom: "1.5rem" }}>Applications</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: ".75rem" }}>{apps.map(([t, f]) => <div key={t} style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}><img src={`${R}looper/${f}.jpg`} alt={t} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }}/><span style={{ position: "absolute", left: ".7rem", bottom: ".7rem", padding: ".5rem .9rem", borderRadius: 999, background: "rgba(247,245,240,.8)", backdropFilter: "blur(10px)", fontSize: ".85rem", fontWeight: 600 }}>{t}</span></div>)}</div></div>
    </section>
  </div>;
}
