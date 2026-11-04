import { ContactForm, PageHead } from "@/components/rd/Pages";
import { contact } from "@/data/rang";

export const metadata = { title: "Contact | Rang Décor" };

export default function Contact() {
  return <div className="rd-wrap rd-page">
    <PageHead eyebrow="Let’s work together" lead="Our experts are ready to cater to you. We reply within 24 hours.">Let’s get <em className="grad">in touch.</em></PageHead>
    <div className="rd-two">
      <ContactForm/>
      <div style={{ display: "grid", gap: ".9rem" }}>
        <a className="rd-tile" href={contact.map} style={{ background: "var(--stone)" }}><small>Address</small><b style={{ fontWeight: 500, fontSize: "1rem", lineHeight: 1.6 }}>{contact.address.join(", ")}, India</b></a>
        <a className="rd-tile" href={contact.whatsapp} style={{ background: "var(--teal)", color: "#fff" }}><small>Phone / WhatsApp</small><b>{contact.phone}</b></a>
        <a className="rd-tile" href={`mailto:${contact.email}`} style={{ background: "var(--magenta)", color: "#fff" }}><small>Email</small><b>{contact.email}</b></a>
        <iframe title="Rang Décor on Google Maps" loading="lazy" src="https://www.google.com/maps?q=14-1-395%2F1+New+Aghapura+Rd+Hyderabad&output=embed" style={{ width: "100%", height: "17.5rem", border: 0, borderRadius: 18 }}/>
      </div>
    </div>
  </div>;
}
