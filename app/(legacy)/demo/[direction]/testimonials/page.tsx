import { Building2, Home, PenTool, Quote, Store } from "lucide-react";
import { DemoSelector, Footer, Header } from "@/components/SiteChrome";
import { getTestimonials } from "@/data/content";

const icons = { architect: Building2, designer: PenTool, dealer: Store, homeowner: Home };

export default async function Testimonials({ params }: { params: Promise<{ direction: string }> }) {
  const { direction } = await params;
  return <main className="subpage site info-page">
    <DemoSelector/><Header direction={direction}/>
    <section className="info-hero"><span className="eyebrow">RANG DÉCOR / TESTIMONIALS</span><h1>Words from<br/><em>our people.</em></h1>
      <p>Placeholder quotes for review. The real testimonials will come from the client.</p></section>
    <section className="info-section"><div className="testimonial-grid">
      {getTestimonials().map((t, i) => { const Icon = icons[t.icon]; return <figure key={i} className="testimonial-card">
        <Quote className="testimonial-quote" size={36} aria-hidden="true"/>
        <blockquote>{t.quote}</blockquote>
        <figcaption><span className="testimonial-icon"><Icon size={26} aria-hidden="true"/></span><div><strong>{t.name}</strong><span>{t.role}</span></div></figcaption>
      </figure>; })}
    </div></section>
    <Footer direction={direction}/>
  </main>;
}
