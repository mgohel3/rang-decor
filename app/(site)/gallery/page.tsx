import { PageHead } from "@/components/rd/Pages";
import { events } from "@/data/rang";

export const metadata = { title: "Gallery: Rang Décor at events and exhibitions", description: "See Rang Décor at exhibitions and events in Mumbai, Bangalore, Indiawood and IIID Hyderabad.", alternates: { canonical: "/gallery" }, openGraph: { title: "Gallery: Rang Décor at events and exhibitions", description: "See Rang Décor at exhibitions and events in Mumbai, Bangalore, Indiawood and IIID Hyderabad.", url: "/gallery" } };
const bg = ["var(--magenta)", "var(--teal)", "#B47A2E", "var(--ink)"];

export default function Gallery() {
  return <div className="rd-wrap rd-page">
    <PageHead eyebrow="Gallery">Meet us <em className="grad">there.</em></PageHead>
    <div className="rd-grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,20rem),1fr))", gap: "1.25rem" }}>
      {events.map(([n, u], i) => <a key={n} href={u} target="_blank" rel="noopener noreferrer" data-drop="tint" data-off={i} style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "18.75rem", padding: "1.75rem", background: bg[i], color: "#fff", overflow: "hidden" }}>
        <span style={{ fontSize: ".8rem", letterSpacing: ".2em" }}>0{i + 1}</span>
        <span><span style={{ display: "block", font: "500 2.5rem/1 var(--display)" }}>{n}</span><span style={{ display: "block", marginTop: ".9rem", fontSize: ".85rem", fontWeight: 600 }}>Open event photos →</span></span>
      </a>)}
    </div>
    <p className="rd-lead" style={{ maxWidth: "40rem", marginBottom: "2rem" }}>We meet architects, designers and dealers at trade events across India, from Mumbai and Bangalore to Indiawood and the IIID exhibition in Hyderabad. Browse each event album for photographs of the stands and the products on show.</p>
    <p className="rd-muted" style={{ marginTop: "1.75rem", fontSize: ".85rem", maxWidth: "32.5rem", lineHeight: 1.6 }}>Event photographs open in the Rang gallery on rangdecor.in. Add event images to this project to show them here as a grid with lightbox.</p>
  </div>;
}
