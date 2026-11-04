import { ArrowUpRight } from "lucide-react";
import { ContactForm } from "@/components/rd/Pages";
import { contact } from "@/data/rang";

export const metadata = { title: "Contact Rang Décor in Hyderabad", description: "Talk to the Rang Décor team about collections, samples, projects and partnerships. Call +91 8297 585 000 or write to info@rangdecor.in. We reply within 24 hours.", alternates: { canonical: "/contact" }, openGraph: { title: "Contact Rang Décor in Hyderabad", description: "Talk to the Rang Décor team about collections, samples, projects and partnerships. Call +91 8297 585 000 or write to info@rangdecor.in. We reply within 24 hours.", url: "/contact" } };

export default function Contact() {
  return <div className="rd-wrap rd-page">
    <section className="rd-contact-stage" aria-label="Contact Rang Décor">
      <img src="/images/rang-hero-walnut.webp" alt="" className="bg"/>
      <div className="rd-contact-card">
        <div className="info">
          <div className="rd-eyebrow" style={{ color: "var(--glow)" }}>Let’s work together</div>
          <h1 className="rd-h1">Let’s get <em className="grad">in touch.</em></h1>
          <p>For collection enquiries, project conversations and partnership questions, connect with the Rang Décor team. We reply within 24 hours.</p>
          <ul>
            <li><small>Email</small><a href={`mailto:${contact.email}`}>{contact.email}<ArrowUpRight size={16} aria-hidden="true"/></a></li>
            <li><small>Phone / WhatsApp</small><a href={contact.whatsapp}>{contact.phone}<ArrowUpRight size={16} aria-hidden="true"/></a><span>{contact.hours}</span></li>
            <li><small>Visit</small><a href={contact.map}>{contact.address[0]},<br/>{contact.address[1]}, India</a></li>
          </ul>
        </div>
        <div className="form"><ContactForm/></div>
      </div>
    </section>
    <section className="rd-contact-map" aria-label="Map">
      <iframe title="Rang Décor on Google Maps" loading="lazy" src="https://www.google.com/maps?q=14-1-395%2F1+New+Aghapura+Rd+Hyderabad&output=embed"/>
      <a href={contact.map} className="rd-textlink" style={{ marginTop: "1rem" }}>Open in Google Maps →</a>
    </section>
  </div>;
}
