import "./about.css";
import Link from "next/link";
import { collections } from "@/data/rang";
import { places } from "@/data/network";

const description = "Rang Décor is a Bhandari Group initiative founded in 2016 in Hyderabad. Learn about our approach, products, vision and the applications we serve.";
export const metadata = { title: "About Rang Décor", description, alternates: { canonical: "/about" }, openGraph: { title: "About Rang Décor", description, url: "/about" } };

const I = "/images/about/";
const products = [
  ["01", "Bern Series", "bern", "Bern Thermo Mica is a premium 1 mm thick thermo-mica sheet, available in a standard size of 8 ft x 4 ft. Offered in Solid Glossy, Matt, Metallic Matt, Sparkle Gloss, Metallic Gloss, Various Textures, Veneers and Glass Rustic finishes, it delivers exceptional depth, refined shine and lasting sophistication.", "/product/bern"],
  ["02", "Charco Charm", "charco", "Charco Charm is a premium 8 ft x 2 ft decorative charcoal panel designed to elevate interior aesthetics. Perfect for living rooms, bedrooms and office settings, it adds elegance to walls and complements both contemporary and classic décor styles.", "/product/charco-charm"],
  ["03", "Groove", "groove", "Groove is a premium collection of seamless louvers, available in 9 ft height and 5 to 8 inch width. Its interlocking design ensures a smooth, flawless finish on walls, ceilings and partitions. Durable and elegant, it suits both residential and commercial interiors.", "/product/groove-earth"],
  ["04", "WPC Foam Board", "wpc", "Wood plastic composite board, also known as WPC foam board, is the new generation product replacing plywood, MDF and even acrylic surfaces for various applications, based on its durability, cost, quality and flexibility.", "/collections"],
];
const features = ["Fire Retardant", "Bacteria Resistant", "No Shrinking-Swelling", "Toxic Free", "Light Weight", "Water Resistant"];
const apps = [["Residential", "residential"], ["Offices", "office"], ["Hospitality", "hospitality"], ["Healthcare", "healthcare"]];
const pillars = [
  ["Our company", "Rang believes in working for betterment, be it for our employees or for society as a whole. We promise to make the world a better place."],
  ["Our vision", "To become the home to a better working environment, employment satisfaction, and to reach new heights of growth and progress."],
  ["Our mission", "To harness the power of self-improvement and reach new heights of technology, design and consumer relations."],
];
const stats = [["2016", "Year founded"], [String(places.length), "Cities served"], [String(collections.length - 1), "Catalogues"], ["1", "Group behind us"]];

export default function About() {
  return <>
    <section className="ab-hero" aria-label="About Rang Décor">
      <img src="/images/rang-hero-charcoal.webp" alt="" fetchPriority="high"/>
      <div className="scrim"/>
      <div className="rd-wrap in">
        <div className="rd-eyebrow">Who we are and what we do</div>
        <h1 className="rd-h1">Luxury, expressed <em className="grad">through design.</em></h1>
        <p>An initiative of the Bhandari Group, Rang Décor has been creating premium interior surfaces from Hyderabad since 2016.</p>
      </div>
    </section>

    <section className="rd-wrap ab-story">
      <div className="head" data-rv="1">
        <div className="rd-eyebrow">Get to know us better</div>
        <h2 className="rd-h2">Designs that turn a dream into <em className="grad">a finished wall.</em></h2>
      </div>
      <div className="body" data-rv="1">
        <p className="big">Rang Décor, an initiative of the Bhandari Group, was established in 2016 with a vision to express luxury through innovative design.</p>
        <p>Since its inception, the brand has been dedicated to creating premium interior décor products that capture attention and admiration. At Rang, customer satisfaction is at the helm of everything we do. Our mission is to craft designs that combine elegance with flawless execution.</p>
        <p>We take pride in our team of creative experts who continuously strive to deliver high-quality, trend-setting yet cost-effective solutions. Our goal is to make luxurious designs accessible, turning what once felt like a dream into reality for our customers. We promise to deliver the best interior trends at affordable prices.</p>
        <Link href="/team" className="rd-textlink">Meet our directors</Link>
      </div>
    </section>

    <section className="ab-stats" aria-label="Rang in numbers"><div className="rd-wrap">
      {stats.map(([n, l]) => <div key={l} data-rv="1"><b>{n}</b><span>{l}</span></div>)}
    </div></section>

    <section className="rd-wrap ab-pillars">
      {pillars.map(([t, d], i) => <article key={t} data-rv="1" style={{ transitionDelay: `${i * 0.08}s` }}><small>0{i + 1}</small><h3>{t}</h3><p>{d}</p></article>)}
    </section>

    <section className="rd-wrap ab-prod" id="products">
      <div className="rd-head" data-rv="1"><div><div className="rd-eyebrow">Our products</div><h2 className="rd-h2">Surfaces for <em className="grad">every room.</em></h2></div><p>From thermo-mica sheets to seamless louvers, each range is made to fit the way people live and work.</p></div>
      {products.map(([n, t, img, d, href], i) => <article key={t} className={`row ${i % 2 ? "flip" : ""}`} style={{ "--i": i } as React.CSSProperties}>
        <div className="ph" data-shine><img src={`${I}${img}.webp`} alt={`${t} by Rang Décor`} loading="lazy"/></div>
        <div className="tx"><small>{n}</small><h3>{t}</h3><p>{d}</p><Link href={href} className="rd-textlink">Explore {t}</Link></div>
      </article>)}
    </section>

    <section className="ab-wpc"><div className="rd-wrap">
      <div data-rv="1"><div className="rd-eyebrow" style={{ color: "#fff" }}>WPC foam board</div><h2 className="rd-h2">Built to last, <em>made to perform.</em></h2></div>
      <ul>{features.map(f => <li key={f} data-rv="1">{f}</li>)}</ul>
    </div></section>

    <section className="rd-wrap ab-apps">
      <div className="rd-head" data-rv="1"><div><div className="rd-eyebrow">Applications</div><h2 className="rd-h2">Where Rang <em className="grad">goes to work.</em></h2></div></div>
      <div className="grid">{apps.map(([t, f]) => <figure key={t} data-rv="1"><img src={`${I}${f}.webp`} alt={`${t} interior`} loading="lazy"/><figcaption>{t}</figcaption></figure>)}</div>
    </section>

    <section className="rd-wrap ab-cta" data-rv="1">
      <h2 className="rd-h2">See Rang <em className="grad">in person.</em></h2>
      <p>Visit our Hyderabad showroom or talk to the team about your next space.</p>
      <div><Link href="/collections" className="rd-btn dark" data-drop="btn">Explore Collections</Link><Link href="/contact" className="rd-btn outline" data-drop="btn" data-off="1">Contact Rang</Link></div>
    </section>
  </>;
}
