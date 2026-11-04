import { CatalogueSearch, PageHead } from "@/components/rd/Pages";

export const metadata = { title: "Catalogue library: download Rang Décor catalogues", description: "Download Rang Décor catalogues for Groove louvers, Maskara, Faded, Bern Thermo, Charco Charm, Interlockit, Wallmate, Bella Ceilo, Litia and more.", alternates: { canonical: "/catalogue" }, openGraph: { title: "Catalogue library: download Rang Décor catalogues", description: "Download Rang Décor catalogues for Groove louvers, Maskara, Faded, Bern Thermo, Charco Charm, Interlockit, Wallmate, Bella Ceilo, Litia and more.", url: "/catalogue" } };

export default function Catalogue() {
  return <div className="rd-wrap rd-page">
    <PageHead eyebrow="Catalogue library">Ideas, in <em className="grad">good company.</em></PageHead>
    <p className="rd-lead" style={{ maxWidth: "40rem", marginBottom: "2rem" }}>Every Rang collection has its own catalogue with designs, codes and fitting details. Tell us a little about yourself and the PDF opens straight away. Prefer a printed copy? <a className="rd-textlink" href="/contact">Ask the team</a>.</p>
    <CatalogueSearch/>
  </div>;
}
