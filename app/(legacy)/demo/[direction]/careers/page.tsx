import { ArrowUpRight, Mail } from "lucide-react";
import { DemoSelector, Footer, Header } from "@/components/SiteChrome";
import { HR_EMAIL, getRoles } from "@/data/content";

export default async function Careers({ params }: { params: Promise<{ direction: string }> }) {
  const { direction } = await params;
  const roles = getRoles();
  const subject = encodeURIComponent("Application: Rang Décor careers");
  return <main className="subpage site info-page">
    <DemoSelector/><Header direction={direction}/>
    <section className="info-hero"><span className="eyebrow">RANG DÉCOR / CAREERS</span><h1>Build surfaces<br/><em>with us.</em></h1>
      <p>Join a team that designs and delivers decorative laminates, louvers and panels for homes and projects across India.</p>
      <a className="button button-pink" href={`mailto:${HR_EMAIL}?subject=${subject}`}>Write to HR <Mail size={16}/></a></section>
    <section className="info-section"><h2>Open positions</h2>
      {roles.length ? <ul className="role-list">{roles.map(role => <li key={role.title}><div><h3>{role.title}</h3><p>{role.place} · {role.type}</p><p>{role.summary}</p></div>
        <a href={`mailto:${HR_EMAIL}?subject=${encodeURIComponent(`Application: ${role.title}`)}`} aria-label={`Apply for ${role.title}`}><ArrowUpRight size={24}/></a></li>)}</ul>
        : <div className="info-empty"><h3>No open roles listed right now</h3><p>We are always glad to meet good people. Send your CV and a short note about yourself to <a href={`mailto:${HR_EMAIL}?subject=${subject}`}>{HR_EMAIL}</a>.</p></div>}
    </section>
    <Footer direction={direction}/>
  </main>;
}
