import "./rang.css";
import { Effects } from "@/components/rd/Effects";
import { Header } from "@/components/rd/Header";
import { Footer } from "@/components/rd/Footer";
import { LeadProvider } from "@/components/rd/Leads";
import { JsonLd } from "@/components/rd/JsonLd";
import { SITE_URL, org } from "@/data/seo";

const orgLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization", "@id": `${SITE_URL}/#org`, name: org.name, url: SITE_URL, logo: `${SITE_URL}/images/rang-header.svg`,
      slogan: org.tagline, email: org.email, telephone: org.phone, parentOrganization: { "@type": "Organization", name: org.legal }, sameAs: org.sameAs,
      address: { "@type": "PostalAddress", streetAddress: org.street, addressLocality: org.city, addressRegion: org.region, postalCode: org.postal, addressCountry: org.country },
      contactPoint: { "@type": "ContactPoint", telephone: org.phone, email: org.email, contactType: "customer service", areaServed: "IN", availableLanguage: ["en", "hi"] },
    },
    { "@type": "WebSite", "@id": `${SITE_URL}/#site`, url: SITE_URL, name: org.name, publisher: { "@id": `${SITE_URL}/#org` }, inLanguage: "en-IN" },
  ],
};

export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="rd">
    <JsonLd data={orgLd}/>
    <LeadProvider>
      <Effects/>
      <Header/>
      <main id="main">{children}</main>
      <Footer/>
    </LeadProvider>
  </div>;
}
