import { PageHead } from "@/components/rd/Pages";
import { team } from "@/data/team";

const description = "Meet the directors of Rang Décor, the team behind louvers, panels, laminates and ceiling slats from Hyderabad.";
export const metadata = { title: "Our team: the directors of Rang Décor", description, alternates: { canonical: "/team" }, openGraph: { title: "Meet the Rang Décor directors", description, url: "/team" } };

export default function Team() {
  return <div className="rd-wrap rd-page">
    <PageHead eyebrow="Our team" lead="The visionaries behind Rang Décor.">Meet our <em className="grad">directors.</em></PageHead>
    <ul className="rd-team">{team.map(t => <li key={t.name} data-rv="1">
      <div className="ph"><img src={t.img} alt={`${t.name}, ${t.role} at Rang Décor`} width={560} height={560} loading="lazy"/></div>
      <h2>{t.name}</h2><p>{t.role}</p>
    </li>)}</ul>
  </div>;
}
