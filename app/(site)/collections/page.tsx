import { CollectionList, PageHead } from "@/components/rd/Pages";

export const metadata = { title: "Collections | Rang Décor", description: "Louvers, panels, laminates and ceiling slats from Rang Décor." };

export default function Collections() {
  return <div className="rd-wrap rd-page">
    <PageHead eyebrow="Collections" lead="Louvers, panels, laminates and ceiling slats from Rang Décor. Choose a collection to see its finishes and codes.">Every surface,<br/><em className="grad">by material.</em></PageHead>
    <CollectionList/>
  </div>;
}
