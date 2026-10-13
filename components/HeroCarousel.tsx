"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const heroImages = ["/images/rang-hero-walnut.webp", "/images/rang-hero-sage.webp", "/images/rang-hero-charcoal.webp"];

const heroTitles = [
  [<>Surfaces that<br />shape how <em>we live.</em></>, <>A softer rhythm<br /><em>for living.</em></>, <>Colour with<br /><em>character.</em></>],
  [<>A language<br />of <em>surfaces.</em></>, <>Structure with<br /><em>softness.</em></>, <>Form follows<br /><em>feeling.</em></>],
  [<>Make room<br />for <em>feeling.</em></>, <>A little more<br /><em>you.</em></>, <>Colour that feels<br /><em>like home.</em></>],
  [<>Quiet forms.<br /><em>Lasting presence.</em></>, <>A study in<br /><em>contrast.</em></>, <>Details with<br /><em>depth.</em></>],
];

const slides = [
  { label: "A considered point of view", copy: "Decorative surfaces for spaces that feel like you." },
  { label: "Designed to be lived with", copy: "Thoughtful textures and finishes for everyday living." },
  { label: "Make every detail matter", copy: "Bring warmth, rhythm and personality to your room." },
];

export function HeroCarousel({ direction, index, base }: { direction: string; index: number; base: string }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();
  const titles = heroTitles[index] ?? heroTitles[0];
  const move = (amount: number) => setActive(current => (current + amount + slides.length) % slides.length);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const timer = window.setInterval(() => setActive(current => (current + 1) % slides.length), 6500);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion]);

  return <div
    className="hero-carousel"
    onMouseEnter={() => setPaused(true)}
    onMouseLeave={() => setPaused(false)}
    onFocusCapture={() => setPaused(true)}
    onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false); }}
    onTouchStart={event => { touchStart.current = event.touches[0]?.clientX ?? null; }}
    onTouchEnd={event => {
      if (touchStart.current === null) return;
      const delta = event.changedTouches[0].clientX - touchStart.current;
      if (Math.abs(delta) > 45) move(delta < 0 ? 1 : -1);
      touchStart.current = null;
    }}
    aria-roledescription="carousel"
    aria-label="Rang Décor featured surfaces"
  >
    <div className="hero-visual" aria-hidden="true">
      <AnimatePresence initial={false}>
        <motion.div
          className="hero-image"
          key={`${direction}-${active}`}
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 1.045 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 1.015 }}
          transition={{ duration: reducedMotion ? 0 : 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image src={heroImages[active]} alt="" fill sizes="100vw" quality={90} priority={active === 0} className="hero-cover-image" />
        </motion.div>
      </AnimatePresence>
      <div className="hero-shade" />
    </div>

    <div className="hero-meta"><span>DECORATIVE SURFACES · HYDERABAD</span><span>0{active + 1} / 03 · {slides[active].label}</span></div>

    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        className="hero-content"
        key={`${direction}-copy-${active}`}
        initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -12 }}
        transition={{ duration: reducedMotion ? 0 : 0.4, ease: "easeOut" }}
      >
        <p className="eyebrow">RANG DÉCOR · MATERIALS IN MOTION</p>
        <h1>{active === 0 ? titles[0] : titles[active]}</h1>
        <p className="hero-lede">{slides[active].copy}</p>
        <div className="hero-actions">
          <Link className="button button-pink" href={`${base}/collections`}>Explore collections <ArrowRight size={16} /></Link>
          <a className="button button-ghost" href="#">Visualize your space <ArrowUpRight size={15} /></a>
        </div>
      </motion.div>
    </AnimatePresence>

    <div className="hero-slider-controls" aria-label="Hero image controls">
      <button type="button" className="hero-slide-arrow" onClick={() => move(-1)} aria-label="Previous slide"><ArrowLeft size={15} /></button>
      <div className="hero-slide-dots" role="group" aria-label="Choose a slide">
        {slides.map((slide, slideIndex) => <button
          type="button"
          key={slide.label}
          className={`hero-slide-dot ${active === slideIndex ? "is-active" : ""}`}
          aria-label={`Show slide ${slideIndex + 1}: ${slide.label}`}
          aria-pressed={active === slideIndex}
          onClick={() => setActive(slideIndex)}
        />)}
      </div>
      <span className="hero-slide-count">0{active + 1}<i />03</span>
      <button type="button" className="hero-slide-arrow" onClick={() => move(1)} aria-label="Next slide"><ArrowRight size={15} /></button>
    </div>
  </div>;
}
