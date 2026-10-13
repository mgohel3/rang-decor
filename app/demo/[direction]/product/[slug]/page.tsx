import Link from "next/link";
import Image from "next/image";
import { ViewTransition } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { products } from "@/data/site";
import { DemoSelector, Footer, Header } from "@/components/SiteChrome";

export function generateStaticParams() {
  return ["01-editorial", "02-architectural", "03-contemporary", "04-luxury"].flatMap(direction => products.map(product => ({ direction, slug: product.slug })));
}

export default async function ProductDetail({ params }: { params: Promise<{ direction: string; slug: string }> }) {
  const { direction, slug } = await params;
  const product = products.find(item => item.slug.toLowerCase() === slug.toLowerCase());
  if (!product) notFound();
  const base = `/demo/${direction}`;

  return <main className="subpage site"><DemoSelector/><Header direction={direction}/>
    <section className="product-detail">
      <div className="product-detail-photo"><ViewTransition name={`rang-product-${product.slug}`}><Image src={product.image} alt={`${product.name} collection`} width={396} height={465} quality={90} sizes="(max-width:760px) 100vw, 50vw" priority /></ViewTransition><span className="product-image-caption">RANG DÉCOR · MATERIAL STUDY</span></div>
      <div className="product-detail-copy">
        <Link className="back-link" href={`${base}/collections`} transitionTypes={["nav-back"]}><ArrowLeft size={14}/> All collections</Link>
        <span className="eyebrow">RANG DÉCOR / SIGNATURE COLLECTION</span><span className="product-detail-number">01 / 08 · FINISHES WITH CHARACTER</span>
        <h1>{product.name.split("-").map((part, index) => <span key={index}>{index ? "-" : ""}{part}</span>)}</h1>
        <p>{product.caption}. Discover the tones, profiles and material character in this Rang Décor collection.</p>
        <div className="product-detail-actions"><Link className="button button-charcoal" href={`${base}/contact`}>Enquire about this finish <ArrowRight size={15}/></Link><Link className="text-link" href="/visual-gallery/living_room">View in a room <ArrowUpRight size={15}/></Link></div>
        <span className="detail-note">Collection details shown for client review.</span>
      </div>
    </section>
    <Footer direction={direction}/>
  </main>;
}
