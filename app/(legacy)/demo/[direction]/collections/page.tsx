import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { DemoSelector, Footer, Header } from "@/components/SiteChrome";
import { CollectionShop } from "@/components/CollectionShop";

export default async function Collections({ params }: { params: Promise<{ direction: string }> }) {
  const { direction } = await params;
  const base = `/demo/${direction}`;

  return <main className="subpage site collection-shop-page">
    <DemoSelector/><Header direction={direction}/>
    <section className="collection-shop-hero">
      <div className="shop-breadcrumb"><Link href={base}>Home</Link><span>/</span><span>Collections</span></div>
      <span className="eyebrow">RANG DÉCOR · SURFACES FOR LIVING</span>
      <h1>Find a finish<br/>that feels <em>like you.</em></h1>
      <p>Explore expressive laminates, decorative louvers and tactile panels—each with its own point of view.</p>
      <a className="button button-pink" href="#shop-collections">Shop all collections <ArrowDown size={15}/></a>
      <div className="shop-hero-note"><strong>08</strong><span>SIGNATURE<br/>COLLECTIONS</span><i/><ArrowRight size={15}/></div>
    </section>
    <CollectionShop base={base}/>
    <Footer direction={direction}/>
  </main>;
}
