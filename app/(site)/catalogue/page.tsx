import { CatalogueSearch, PageHead } from "@/components/rd/Pages";

export const metadata = { title: "Catalogue library | Rang Décor" };

export default function Catalogue() {
  return <div className="rd-wrap rd-page">
    <PageHead eyebrow="Catalogue library">Ideas, in <em className="grad">good company.</em></PageHead>
    <CatalogueSearch/>
  </div>;
}
