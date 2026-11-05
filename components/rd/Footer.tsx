import Link from "next/link";
import Image from "next/image";
import { collections, contact } from "@/data/rang";
import { Smoke } from "./Smoke";
import { WhatsAppIcon, socialIcons, PinIcon, PhoneIcon, MailIcon } from "./Icons";

export function Footer() {
  return <>
    <div className="rd-stripe" aria-hidden="true"/>
    <div className="rd-band"><div className="rd-wrap rd-band-in">
      <a href={contact.map}><b>{contact.address[0]}</b><br/>{contact.address[1]}</a>
      <a href={contact.whatsapp}><b>{contact.phone}</b><br/>{contact.hours}</a>
      <a href={`mailto:${contact.email}`}><b>{contact.email}</b><br/>24 x 7 online support</a>
    </div></div>
    <footer className="rd-footer">
      <div className="wash" aria-hidden="true"/>
      <Smoke/>
      <div className="rd-wrap rd-rel">
        <div className="rd-footer-glass">
          <div className="rd-footer-cols">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "1.1rem" }}>
                <Image className="rd-footer-logo" src="/images/rang-footer.svg" alt="Rang Décor" width={170} height={84} unoptimized/>
                <Image src="/images/bhandari-group.svg" alt="A Bhandari Group initiative" width={48} height={48} unoptimized/>
              </div>
              <p className="tagline">Let’s live beautiful.</p>
              <div className="rd-social">{contact.social.map(([n, u]) => { const Ic = socialIcons[n]; return <a key={n} href={u} target="_blank" rel="noopener noreferrer" aria-label={`Rang Décor on ${n}`} title={n}><Ic/></a>; })}</div>
            </div>
            <div className="c"><h5>Products</h5>{collections.filter(c => c.cover).slice(0, 8).map(c => <Link key={c.id} href={`/product/${c.id}`}>{c.name}</Link>)}</div>
            <div className="c"><h5>Company</h5><Link href="/about">About</Link><Link href="/network">Our Network</Link><Link href="/visualizer/living-room">Visualizer</Link><Link href="/catalogue">Catalogues</Link><Link href="/testimonials">Testimonials</Link><Link href="/team">Our Team</Link><Link href="/careers">Careers</Link><Link href="/contact">Contact</Link></div>
            <div className="c"><h5>Visit &amp; write</h5><a className="ic" href={contact.map}><PinIcon/><span>{contact.address[0]}<br/>{contact.address[1]}</span></a><a className="ic" href={contact.whatsapp}><PhoneIcon/><span>{contact.phone}<br/><small className="rd-muted" style={{ fontSize: ".8rem" }}>{contact.hours}</small></span></a><a className="ic" href={`mailto:${contact.email}`}><MailIcon/><span>{contact.email}</span></a></div>
          </div>
          <div className="rd-legal">
            <div><span>© Rang Décor. All rights reserved.</span><span>A Bhandari Group initiative</span></div>
            <div><Link href="/policy/terms-of-service">Terms &amp; Conditions</Link><Link href="/policy/privacy">Privacy Policy</Link></div>
          </div>
        </div>
      </div>
    </footer>
    <a className="rd-wa" href={contact.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Chat with Rang Décor on WhatsApp">
      <span className="bub" aria-hidden="true"><b>Rang Décor</b>Hi there! How can we help you today?</span>
      <WhatsAppIcon size={30}/>
    </a>
  </>;
}
