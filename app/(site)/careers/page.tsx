import { PageHead } from "@/components/rd/Pages";
import { HR_EMAIL, getRoles } from "@/data/content";

export const metadata = { title: "Careers | Rang Décor" };

export default function Careers() {
  const roles = getRoles();
  const subject = encodeURIComponent("Application: Rang Décor careers");
  return <div className="rd-wrap rd-page">
    <PageHead eyebrow="Careers" lead="Join a team that designs and delivers louvers, panels, laminates and ceiling slats for homes and projects across India.">Build surfaces<br/><em className="grad">with us.</em></PageHead>
    <a className="rd-btn dark" data-drop="btn" href={`mailto:${HR_EMAIL}?subject=${subject}`}>Write to HR</a>
    <section style={{ marginTop: "var(--sec)" }}>
      <h2 className="rd-h3" style={{ marginBottom: "1.75rem" }}>Open positions</h2>
      {roles.length
        ? <ul className="rd-roles">{roles.map(r => <li key={r.title}><div><h3 style={{ fontSize: "1.9rem" }}>{r.title}</h3><p className="rd-muted">{r.place} · {r.type}</p><p style={{ marginTop: ".5rem" }}>{r.summary}</p></div><a className="rd-roundbtn" data-drop="btn" href={`mailto:${HR_EMAIL}?subject=${encodeURIComponent(`Application: ${r.title}`)}`} aria-label={`Apply for ${r.title}`}>↗</a></li>)}</ul>
        : <div className="rd-empty"><h3 style={{ fontSize: "1.75rem", marginBottom: ".5rem" }}>No open roles listed right now</h3>We are always glad to meet good people. Send your CV and a short note to <a href={`mailto:${HR_EMAIL}?subject=${subject}`}>{HR_EMAIL}</a>.</div>}
    </section>
  </div>;
}
