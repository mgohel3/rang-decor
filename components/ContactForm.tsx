"use client";

import { ArrowRight } from "lucide-react";
import type { FormEvent } from "react";
export function ContactForm() {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Rang Décor enquiry: ${data.get("topic")}`);
    const body = encodeURIComponent(`Name: ${data.get("name")}\nEmail: ${data.get("email")}\nEnquiry: ${data.get("topic")}\n\n${data.get("message")}`);
    window.location.href = `mailto:info@rangdecor.in?subject=${subject}&body=${body}`;
  }
  return <form className="enquiry-form" onSubmit={submit}>
    <label>Your name<input name="name" autoComplete="name" required placeholder="Name"/></label>
    <label>Email address<input name="email" type="email" autoComplete="email" required placeholder="you@example.com"/></label>
    <label>What are you exploring?<select name="topic" defaultValue="Collection enquiry"><option>Collection enquiry</option><option>Project discussion</option><option>Dealer partnership</option><option>Architect / designer enquiry</option><option>Other</option></select></label>
    <label>Your message<textarea name="message" rows={3} required placeholder="Tell us a little about what you have in mind"/></label>
    <button className="button button-pink" type="submit">Prepare an enquiry <ArrowRight size={15}/></button>
    <span className="contact-form-note">Your email app will open with these details addressed to Rang Décor.</span>
  </form>;
}
