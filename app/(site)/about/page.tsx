import { PageHead } from "@/components/rd/Pages";

export const metadata = { title: "About | Rang Décor" };
const R = "https://rangdecor.in/media/";
const products = [
  ["Bern Series", R + "looper/about_slide-1-compressed.jpg", "Bern Thermo Mica is a premium 1 mm thick thermo-mica sheet, available in a standard size of 8 ft x 4 ft. Offered in Solid Glossy, Matt, Metallic Matt, Sparkle Gloss, Metallic Gloss, Various Textures, Veneers, and Glass Rustic finishes."],
  ["Charco Charm", R + "looper/about_slide-2-compressed.jpg", "Charcocharm is a premium 8 ft x 2 ft decorative charcoal panel designed to elevate interior aesthetics. Perfect for living rooms, bedrooms, and office settings."],
  ["Groove", R + "looper/about_slide-4-compressed.jpg", "Groove is a premium collection of seamless louvers, available in 9 ft height and 5\"–8\" width. Its interlocking design ensures a smooth, flawless finish for walls, ceilings, and partitions."],
  ["WPC Foam Board", R + "looper/about_slide-3-compressed.jpg", "Wood plastic composite board, also known as WPC Foam board, is the new generation product replacing plywood, MDF and even acrylic surface for various applications."],
];
const features = ["Fire Retardant", "Bacteria Resistant", "No Shrinking-Swelling", "Toxic Free", "Light Weight", "Water Resistant"];
const apps = [["Residential", "residential"], ["Offices", "office"], ["Hospitality", "hotel"], ["Healthcare", "healthcare"]];
const bg = ["var(--magenta)", "var(--teal)", "var(--amber)"];
const values: [string, string, string][] = [
  ["Our Company", "var(--magenta)", "Rang believes in working for betterment, be it for our employees or for the society as a whole. We promise to make the world a better place!"],
  ["Our Vision", "var(--teal-ink)", "To become the home to better working environment, employment satisfaction and reach new heights of growth and progress."],
  ["Our Mission", "#9A5F27", "To harness the power of self-improvement and reach to new heights of technology, design and consumer relations."],
];

export default function About() {
  return <div className="rd-wrap rd-page">
    <PageHead eyebrow="Who we are and what we do">Get to know <em className="grad">us better.</em></PageHead>
    <div className="rd-two" style={{ marginTop: "3.5rem" }}>
      <img src={R + "informative/About-uspsd.webp"} alt="Rang Décor" style={{ width: "100%", borderRadius: 4 }}/>
      <div className="rd-lead" style={{ display: "grid", gap: "1.25rem", fontSize: "1.0625rem" }}>
        <p>Rang Decor, an initiative of the Bhandari Group, was established in 2016 with a vision to express luxury through innovative design. Since its inception, the brand has been dedicated to creating premium interior décor products that capture attention and admiration.</p>
        <p>At Rang, customer satisfaction is the helm of everything we do. Our mission is to craft designs that combine elegance with flawless execution.</p>
        <p>We take pride in our team of creative experts who continuously strive to deliver high-quality, trend setting yet cost-effective solutions. Our goal is to make luxurious designs accessible, turning what once felt like a dream into reality for our customers.</p>
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
      <div><h2 className="rd-h3" style={{ marginBottom: "1.5rem" }}>Features</h2><div className="rd-pillrow">{features.map((f, i) => <span key={f} style={{ background: bg[i % 3], color: i % 3 === 2 ? "var(--ink)" : "#fff" }}>{f}</span>)}</div></div>
      <div id="network"><h2 className="rd-h3" style={{ marginBottom: "1.5rem" }}>Applications</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: ".75rem" }}>{apps.map(([t, f]) => <div key={t} style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}><img src={`${R}looper/${f}.jpg`} alt={t} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }}/><span style={{ position: "absolute", left: ".7rem", bottom: ".7rem", padding: ".5rem .9rem", borderRadius: 999, background: "rgba(247,245,240,.8)", backdropFilter: "blur(10px)", fontSize: ".85rem", fontWeight: 600 }}>{t}</span></div>)}</div></div>
    </section>
  </div>;
}
