import type { Metadata } from "next";
import { Home } from "@/components/rd/Home";

export const metadata: Metadata = {
  title: { absolute: "Rang Décor | Decorative laminates, louvers and wall panels in Hyderabad" },
  description: "Rang Décor, a Bhandari Group initiative, offers acrylic and thermo-mica laminates, Groove louvers, charcoal panels, wall cladding and ceiling slats. Explore collections and download catalogues.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return <Home/>;
}
