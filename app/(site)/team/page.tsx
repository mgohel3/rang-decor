import { PageHead } from "@/components/rd/Pages";
import { team } from "@/data/team";

const description = "Meet the directors of Rang Décor, the team behind louvers, panels, laminates and ceiling slats from Hyderabad.";
export const metadata = { title: "Our team: the directors of Rang Décor", description, alternates: { canonical: "/team" }, openGraph: { title: "Meet the Rang Décor directors", description, url: "/team" } };

export default function Team() {
  return <>
    <section className="rd-teamhero" aria-label="Our team">
      <video src="/images/about-earth.mp4" poster="/images/about-earth.jpg" autoPlay muted loop playsInline preload="metadata" aria-hidden="true"/>
      <div className="fade"/>
      <div className="rd-wrap in"><div className="rd-eyebrow">Our team</div><h1 className="rd-h1">Built on trust, <em className="grad">growing together.</em></h1></div>
    </section>
    <div className="rd-wrap rd-teamintro" data-rv="1">
      <p>At Rang, our team is built on trust, dedication and a shared vision for growth. Every member of our organization contributes with passion, creativity and commitment towards excellence.</p>
      <p>We believe in teamwork, strong relationships and continuous improvement in every aspect of our journey. Our experienced professionals work together with responsibility, discipline and innovative thinking to drive the company forward. With a positive work culture and a future-focused mindset, we continue growing stronger together as one team.</p>
    </div>
    <div className="rd-wrap rd-teamdir">
      <PageHead eyebrow="Leadership" lead="The visionaries behind Rang Décor.">Meet our <em className="grad">directors.</em></PageHead>
      <ul className="rd-team">{team.map((t, i) => <li key={t.name} data-rv="1" style={{ transitionDelay: `${i * 0.07}s` }}>
        <div className="ph" data-shine><img src={t.img} alt={`${t.name}, ${t.role} at Rang Décor`} width={560} height={700} loading="lazy"/><span className="n">0{i + 1}</span></div>
        <div className="cap"><h2>{t.name}</h2><p>{t.role}</p></div>
      </li>)}</ul>
    </div>
  </>;
}
