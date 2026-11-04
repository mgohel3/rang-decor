import Link from "next/link";
import { CollectionList, PageHead } from "@/components/rd/Pages";

export const metadata = { title: "Decorative laminates, louvers and wall panels", description: "Explore every Rang Décor collection: acrylic and thermo-mica laminates, Groove louvers, charcoal panels, wall cladding and ceiling slats. Search by material or code.", alternates: { canonical: "/collections" }, openGraph: { title: "Decorative laminates, louvers and wall panels", description: "Explore every Rang Décor collection: acrylic and thermo-mica laminates, Groove louvers, charcoal panels, wall cladding and ceiling slats. Search by material or code.", url: "/collections" } };

export default function Collections() {
  return <div className="rd-wrap rd-page">
    <PageHead eyebrow="Collections" lead="Louvers, panels, laminates and ceiling slats from Rang Décor. Choose a collection to see its finishes and codes.">Every surface,<br/><em className="grad">by material.</em></PageHead>
    <CollectionList/>
    <section className="rd-guide" aria-labelledby="guide">
      <h2 id="guide" className="rd-h3">Choosing the right material</h2>
      <div className="grid">
        <div><h3>Louvers and cladding</h3><p>Slatted and fluted surfaces that give a wall or ceiling rhythm. Start with <Link href="/product/groove-forest">Groove</Link> for seamless interlocking louvers, <Link href="/product/art-by-one">Art by One</Link> for fast fitting, or <Link href="/product/wallmate">Wallmate</Link> and <Link href="/product/onit">ONIT</Link> for designer and charcoal looks.</p></div>
        <div><h3>Panels and mirrors</h3><p><Link href="/product/charco-charm">Charco Charm</Link> brings charcoal texture in an 8 ft by 2 ft panel. <Link href="/product/interlockit">Interlockit</Link> is a full wall-cladding system with trims, and <Link href="/product/nazrana">Nazrana</Link> adds engraved mirror detail.</p></div>
        <div><h3>Laminates and acrylics</h3><p>For wardrobes, kitchens and furniture, pick <Link href="/product/bern">Bern Thermo</Link> (1 mm thermo-mica), <Link href="/product/faded">Faded</Link> (2 mm acrylic), <Link href="/product/maskara">Maskara</Link> (100 percent acrylic) or the fluted <Link href="/product/litia">Litia</Link>.</p></div>
        <div><h3>Ceilings</h3><p><Link href="/product/bella-ceilo">Bella Ceilo</Link> soffit slats carry wood-look and neutral finishes overhead, with matching trims for clean edges.</p></div>
      </div>
      <p className="rd-lead" style={{ marginTop: "1.75rem", maxWidth: "46rem" }}>Not sure where to begin? Try the <Link href="/visualizer/living-room" className="rd-textlink">visualizer</Link> to see finishes on a wall, or <Link href="/contact" className="rd-textlink">talk to the Rang team</Link> for samples.</p>
    </section>
  </div>;
}
