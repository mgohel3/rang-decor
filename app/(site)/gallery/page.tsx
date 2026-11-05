import { PageHead } from "@/components/rd/Pages";
import { GalleryGrid } from "@/components/rd/GalleryGrid";

const description = "Photographs of Rang Décor stands at exhibitions and events in Mumbai, Bangalore, Indiawood and IIID Hyderabad.";
export const metadata = { title: "Gallery: Rang Décor at events and exhibitions", description, alternates: { canonical: "/gallery" }, openGraph: { title: "Gallery: Rang Décor at events and exhibitions", description, url: "/gallery" } };

export default function Gallery() {
  return <div className="rd-wrap rd-page">
    <PageHead eyebrow="Gallery" lead="We meet architects, designers and dealers at trade events across India. Browse photographs of our stands and the products on show.">Meet us <em className="grad">there.</em></PageHead>
    <GalleryGrid/>
  </div>;
}
