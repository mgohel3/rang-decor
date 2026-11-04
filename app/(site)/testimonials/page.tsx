import { Building2, Home, PenTool, Store } from "lucide-react";
import { PageHead } from "@/components/rd/Pages";
import { getTestimonials } from "@/data/content";

export const metadata = { title: "Testimonials from Rang Décor customers", description: "Read what architects, designers, dealers and homeowners say about working with Rang Décor.", alternates: { canonical: "/testimonials" }, openGraph: { title: "Testimonials from Rang Décor customers", description: "Read what architects, designers, dealers and homeowners say about working with Rang Décor.", url: "/testimonials" } };
const icons = { architect: Building2, designer: PenTool, dealer: Store, homeowner: Home };

export default function Testimonials() {
  return <div className="rd-wrap rd-page">
    <PageHead eyebrow="Testimonials" lead="Sample layout. These are placeholder quotes and will be replaced with real words from Rang customers.">Words from<br/><em className="grad">our people.</em></PageHead>
    <div className="rd-quotes">
      {getTestimonials().map((t, i) => { const Icon = icons[t.icon]; return <figure key={i} className="rd-quote">
        <span className="mark" aria-hidden="true">“</span><blockquote>{t.quote}</blockquote>
        <figcaption><span className="ic"><Icon size={24} aria-hidden="true"/></span><div><b>{t.name}</b><span>{t.role}</span></div></figcaption>
      </figure>; })}
    </div>
  </div>;
}
