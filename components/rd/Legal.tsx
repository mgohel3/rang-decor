import { contact } from "@/data/rang";
import { PageHead } from "./Pages";

export type LegalSection = { h: string; p: string[] };

// Shared layout for the terms and privacy pages.
export function Legal({ eyebrow, title, lead, sections, contactLine }: { eyebrow: string; title: React.ReactNode; lead: string; sections: LegalSection[]; contactLine: string }) {
  return <div className="rd-wrap rd-page">
    <PageHead eyebrow={eyebrow} lead={lead}>{title}</PageHead>
    <div className="rd-legaldoc">
      {sections.map(s => <section key={s.h}><h2>{s.h}</h2>{s.p.map((t, i) => <p key={i}>{t}</p>)}</section>)}
      <section><h2>Contact us</h2><p>{contactLine}</p>
        <ul><li>{contact.address[0]}, {contact.address[1]}</li><li>{contact.phone}, {contact.hours}</li><li>{contact.email}, 24 x 7 online support</li></ul></section>
    </div>
  </div>;
}
