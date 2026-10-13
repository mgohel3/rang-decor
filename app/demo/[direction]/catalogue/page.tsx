import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { DemoSelector, Footer, Header } from "@/components/SiteChrome";
import { CatalogueGrid } from "@/components/CatalogueGrid";

export default async function CatalogueLibrary({ params }: { params: Promise<{ direction: string }> }) {
  const { direction } = await params;
  return <main className="subpage site"><DemoSelector/><Header direction={direction}/><section className="subpage-hero catalogue-page-hero">
    <span className="eyebrow">RANG DÉCOR / CATALOGUE LIBRARY</span><h1>A closer look at<br/><em>the collection.</em></h1>
    <p>Explore Rang Décor collection covers and find the surface story that feels right for your space.</p>
    <Link className="text-link" href={`/demo/${direction}`}><ArrowLeft size={14}/> Back to the story</Link>
  </section>
  <section className="catalogue-library-wrap"><CatalogueGrid direction={direction}/></section><Footer direction={direction}/></main>;
}
