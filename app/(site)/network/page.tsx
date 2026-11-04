import Link from "next/link";
import { PageHead } from "@/components/rd/Pages";

export const metadata = { title: "Our network: Rang Décor distributors and dealers across India", description: "Rang Décor products reach customers in more than 24 cities through distributors, dealers, architects and business partners, with 3 company stock points.", alternates: { canonical: "/network" }, openGraph: { title: "Our network: Rang Décor distributors and dealers across India", description: "Rang Décor products reach customers in more than 24 cities through distributors, dealers, architects and business partners, with 3 company stock points.", url: "/network" } };

export default function Network() {
  return <div className="rd-wrap rd-page">
    <PageHead eyebrow="Pan-India presence">Our distribution <em className="grad">network.</em></PageHead>
    <div className="rd-two" style={{ alignItems: "center", marginTop: "3rem" }}>
      <div>
        <p className="rd-lead" style={{ fontSize: "1.0625rem", marginBottom: "2rem" }}>Our network across India is built on trust and long-term partnerships. Through distributors, dealers, architects and business associates, customers can reach us easily for products, support and clear communication.</p>
        <div style={{ display: "flex", gap: "2.5rem", marginBottom: "2rem" }}>
          <div><div style={{ font: "500 4.5rem/1 var(--display)", color: "var(--magenta)" }}>24+</div><div className="rd-muted" style={{ fontSize: ".8rem", letterSpacing: ".1em", textTransform: "uppercase", marginTop: ".4rem" }}>Cities covered</div></div>
          <div><div style={{ font: "500 4.5rem/1 var(--display)", color: "var(--teal)" }}>3</div><div className="rd-muted" style={{ fontSize: ".8rem", letterSpacing: ".1em", textTransform: "uppercase", marginTop: ".4rem" }}>Company stock points</div></div>
        </div>
        <Link href="/contact" className="rd-btn dark" data-drop="btn">Become a dealer or partner</Link>
      </div>
      <img src="https://rangdecor.in/static/front/images/Map.png" alt="Rang Décor stock points map" style={{ width: "100%", height: "auto" }}/>
    </div>
  </div>;
}
