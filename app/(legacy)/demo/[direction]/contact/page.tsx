import { ArrowUpRight } from "lucide-react";
import { DemoSelector, Footer, Header } from "@/components/SiteChrome";
import { ContactForm } from "@/components/ContactForm";

export default async function Contact({ params }: { params: Promise<{ direction: string }> }) {
  const { direction } = await params;
  return <main className="subpage site"><DemoSelector/><Header direction={direction}/><section className="contact-layout">
    <div className="contact-main"><span className="eyebrow">RANG DÉCOR / CONTACT</span><h1>Let’s get<br/><em>in touch.</em></h1>
      <p>For collection enquiries, project conversations and partnership questions, connect with the Rang Décor team.</p>
      <div className="contact-info"><div><span>EMAIL</span><a href="mailto:info@rangdecor.in">info@rangdecor.in <ArrowUpRight size={14}/></a></div>
        <div><span>PHONE</span><a href="tel:+918297585000">+91 8297 585 000 <ArrowUpRight size={14}/></a></div>
        <div><span>VISIT</span><p>14-1-395/1, New Aghapura Rd,<br/>Hyderabad-01, Telangana, India</p></div>
      </div>
    </div><ContactForm/>
  </section><Footer direction={direction}/></main>;
}
