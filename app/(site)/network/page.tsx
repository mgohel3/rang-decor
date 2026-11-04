import Link from "next/link";
import { PageHead } from "@/components/rd/Pages";
import { NetworkMap } from "@/components/rd/NetworkMap";
import { kinds, places } from "@/data/network";

const title = "Our network: Rang Décor distributors and dealers across India";
const description = "Rang Décor reaches customers in 24 cities through company stock points, distributors and dealers. Find the depot or channel partner nearest to you.";
export const metadata = { title, description, alternates: { canonical: "/network" }, openGraph: { title, description, url: "/network" } };

export default function Network() {
  return <div className="rd-wrap rd-page">
    <PageHead eyebrow="Pan-India presence">Our distribution <em className="grad">network.</em></PageHead>
    <div className="rd-two" style={{ alignItems: "end", marginBottom: "2.5rem" }}>
      <p className="rd-lead" style={{ fontSize: "1.0625rem" }}>Our network across India is built on trust and long-term partnerships. Through distributors, dealers, architects and business associates, customers can reach us easily for products, support and clear communication.</p>
      <div style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap", alignItems: "flex-end" }}>
        <div><div style={{ font: "500 4rem/1 var(--display)", color: "var(--magenta)" }}>{places.length}+</div><div className="rd-muted" style={{ fontSize: ".78rem", letterSpacing: ".1em", textTransform: "uppercase", marginTop: ".4rem" }}>Cities covered</div></div>
        <div><div style={{ font: "500 4rem/1 var(--display)", color: "var(--teal)" }}>{places.filter(p => p.kind === "company").length}</div><div className="rd-muted" style={{ fontSize: ".78rem", letterSpacing: ".1em", textTransform: "uppercase", marginTop: ".4rem" }}>Company stock points</div></div>
        <Link href="/contact" className="rd-btn dark" data-drop="btn">Become a dealer or partner</Link>
      </div>
    </div>
    <NetworkMap/>
    <section style={{ marginTop: "var(--gap)" }} aria-labelledby="depots">
      <h2 id="depots" className="rd-h3">Rang depot and channel partner list</h2>
      <ul className="rd-citylist">{places.map(p => <li key={p.city}><b>{p.city}</b> <span className="rd-muted">· {p.region}{p.kind !== "distribution" ? ` · ${kinds[p.kind].label}` : ""}</span></li>)}</ul>
    </section>
  </div>;
}
