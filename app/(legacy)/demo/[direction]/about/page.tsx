import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { DemoSelector, Footer, Header } from "@/components/SiteChrome";

const collections = [
  { name: "Bern Thermo", detail: "Thermo-mica surfaces", image: "/images/bern.png", slug: "Bern-Thermo" },
  { name: "Charco Charm", detail: "Decorative charcoal panels", image: "/images/charco.png", slug: "charco-charm" },
  { name: "Groove", detail: "Seamless decorative louvers", image: "/images/groove-forest.png", slug: "groove-forest" },
];

export default async function About({ params }: { params: Promise<{ direction: string }> }) {
  const { direction } = await params;
  const base = `/demo/${direction}`;

  return <main className="site subpage about-page">
    <DemoSelector/><Header direction={direction}/>

    <section className="about-story-hero">
      <div className="about-story-copy">
        <span className="eyebrow">AN INITIATIVE OF BHANDARI GROUP <i/> HYDERABAD, INDIA</span>
        <h1>Good design<br/>changes how<br/><em>a space feels.</em></h1>
        <p>Since 2016, Rang Décor has brought expressive surfaces and thoughtful design together—helping make beautiful interiors feel a little more within reach.</p>
        <div className="about-story-actions">
          <Link className="button button-pink" href={`${base}/collections`}>Discover our collections <ArrowRight size={15}/></Link>
          <a className="about-scroll-link" href="#our-story">Our story <ArrowDown size={14}/></a>
        </div>
        <span className="about-established"><strong>2016</strong><small>ESTABLISHED<br/>IN HYDERABAD</small></span>
      </div>
      <figure className="about-story-visual">
        <Image src="/images/rang-hero-walnut.webp" alt="Warm contemporary living room with a rich walnut decorative surface" fill priority sizes="(max-width: 760px) 100vw, 52vw"/>
        <figcaption><span>RANG DÉCOR</span><span>SURFACES, WITH A POINT OF VIEW</span></figcaption>
        <span className="about-image-stamp">MATERIAL<br/>MEETS<br/><i>meaning.</i></span>
      </figure>
      <span className="about-hero-index">01 <i/> OUR STORY</span>
    </section>

    <section className="about-story-intro" id="our-story">
      <div className="section-index">01 <i/> WHO WE ARE</div>
      <div className="about-intro-content">
        <h2>More than a finish.<br/><em>A feeling that stays.</em></h2>
        <div className="about-intro-copy">
          <p>Rang Décor began with a simple belief: the surfaces around us can make everyday spaces feel more personal. An initiative of the Bhandari Group, we bring together a creative team to shape decorative products with character, care and a clear point of view.</p>
          <p>From expressive laminates to architectural louvers and wall panels, our collections pair considered design with dependable quality—helping homeowners and professionals create interiors that feel like their own.</p>
          <Link className="text-link" href={`${base}/contact`}>Get to know the team <ArrowUpRight size={15}/></Link>
        </div>
      </div>
      <div className="about-proof-row" aria-label="Rang Décor at a glance">
        <div><strong>2016</strong><span>Established in Hyderabad</span></div>
        <div><strong>Design</strong><span>Made for real spaces</span></div>
        <div><strong>Many ways</strong><span>To make a space your own</span></div>
      </div>
    </section>

    <section className="about-beliefs">
      <div className="about-beliefs-heading">
        <div className="section-index">02 <i/> WHAT GUIDES US</div>
        <h2>Beautiful is<br/><em>better when it works.</em></h2>
        <p>Our work is guided by the people who live with these materials—and the people who bring each project to life.</p>
      </div>
      <div className="about-belief-list">
        <article><span>01</span><div><h3>A point of view</h3><p>Distinctive colour, texture and detail that give a room its own character.</p></div><ArrowUpRight size={18}/></article>
        <article><span>02</span><div><h3>Care in the making</h3><p>A creative team focused on thoughtful design and high-quality execution.</p></div><ArrowUpRight size={18}/></article>
        <article><span>03</span><div><h3>Luxury, made accessible</h3><p>Trend-aware surfaces with a considered balance of design, quality and value.</p></div><ArrowUpRight size={18}/></article>
      </div>
    </section>

    <section className="about-collections">
      <div className="about-collections-head">
        <div><div className="section-index">03 <i/> MADE TO BE LIVED WITH</div><h2>A material for<br/><em>every point of view.</em></h2></div>
        <Link className="text-link" href={`${base}/collections`}>Explore all collections <ArrowUpRight size={15}/></Link>
      </div>
      <div className="about-collection-grid">
        {collections.map((collection, index) => <Link className="about-collection-card" href={`${base}/product/${collection.slug}`} key={collection.name}>
          <div className="about-collection-photo"><Image src={collection.image} alt={`${collection.name} decorative surface collection`} fill sizes="(max-width: 760px) 88vw, 31vw"/><span>0{index + 1}</span><i><ArrowUpRight size={17}/></i></div>
          <div className="about-collection-caption"><div><h3>{collection.name}</h3><p>{collection.detail}</p></div><ArrowRight size={16}/></div>
        </Link>)}
      </div>
    </section>

    <section className="about-purpose" id="approach">
      <div className="section-index">04 <i/> LOOKING AHEAD</div>
      <div className="about-purpose-heading"><span className="eyebrow">A SHARED DIRECTION</span><h2>Keep learning.<br/><em>Keep making better.</em></h2></div>
      <div className="about-purpose-cards">
        <article><span>OUR VISION</span><h3>A place to grow.</h3><p>To build a better working environment, support employee satisfaction and reach new heights of growth together.</p></article>
        <article><span>OUR MISSION</span><h3>Progress with purpose.</h3><p>To keep improving across technology and design, while building meaningful relationships with the people we serve.</p></article>
      </div>
    </section>

    <section className="about-connect" id="network">
      <div className="about-connect-image"><Image src="/images/groove-earth.png" alt="Warm interior featuring Rang Décor Groove Earth decorative louvers" fill sizes="(max-width: 760px) 100vw, 48vw"/></div>
      <div className="about-connect-copy"><span className="eyebrow">ROOTED IN HYDERABAD · OPEN TO THE WORLD</span><h2>Let’s make room<br/>for <em>good ideas.</em></h2><p>For homes, workspaces and everything in between, we’d love to hear what you’re imagining.</p><Link className="button button-charcoal" href={`${base}/contact`}>Start a conversation <ArrowRight size={15}/></Link></div>
    </section>
    <Footer direction={direction}/>
  </main>;
}
