import Link from "next/link";
import { contact } from "@/data/rang";
import { PageHead } from "./Pages";
import { PinIcon, PhoneIcon, MailIcon } from "./Icons";

export type LegalSection = { h: string; p: string[] };
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

// Shared layout for the terms and privacy pages: text on the left, contents list and contact card on the right.
export function Legal({ eyebrow, title, lead, sections, contactLine, other }: { eyebrow: string; title: React.ReactNode; lead: string; sections: LegalSection[]; contactLine: string; other: { href: string; label: string } }) {
  return <div className="rd-wrap rd-page">
    <PageHead eyebrow={eyebrow} lead={lead}>{title}</PageHead>
    <div className="rd-legalgrid">
      <div className="rd-legaldoc">
        {sections.map(s => <section key={s.h} id={slug(s.h)}><h2>{s.h}</h2>{s.p.map((t, i) => <p key={i}>{t}</p>)}</section>)}
        <section id="contact-us"><h2>Contact us</h2><p>{contactLine}</p></section>
      </div>
      <aside className="rd-legalside" aria-label="On this page">
        <nav><h3>On this page</h3><ol>{[...sections.map(s => s.h), "Contact us"].map(h => <li key={h}><a href={`#${slug(h)}`}>{h}</a></li>)}</ol></nav>
        <div className="card"><h3>Questions?</h3>
          <a href={contact.map}><PinIcon/><span>{contact.address[0]}, {contact.address[1]}</span></a>
          <a href={contact.whatsapp}><PhoneIcon/><span>{contact.phone}<small>{contact.hours}</small></span></a>
          <a href={`mailto:${contact.email}`}><MailIcon/><span>{contact.email}<small>24 x 7 online support</small></span></a>
          <Link href={other.href} className="rd-textlink">{other.label}</Link></div>
      </aside>
    </div>
  </div>;
}
