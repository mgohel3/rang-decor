"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

const brands = [
  ["Maskara", "maskara"], ["Bern", "bern"], ["Bella Ceilo", "bella-ceilo"], ["Interlockit", "interlockit"],
  ["Groove Forest", "groove-forest"], ["Groove Earth", "groove-earth"], ["Groove Pastel", "groove-pastel"], ["Wallmate", "wallmate"],
  ["Art by One", "art-by-one"], ["ONIT", "onit"], ["Charco Charm", "charco-charm"], ["Faded", "faded"],
  ["Litia", "litia"], ["Power Board", "power-board"], ["ECO Board", "eco-board"], ["HYBRID Board", "hybrid-board"],
  ["Nazrana", "nazrana"], ["MDF", "mdf"], ["Chipkao", "chipkao"],
] as const;

export function BrandWall() {
  const reducedMotion = useReducedMotion();
  return <section className="brand-strip section-pad" aria-labelledby="brand-wall-title">
    <div className="brand-wall-heading">
      <div className="section-index">08 <i/> A WORLD OF SURFACES</div>
      <p>ONE POINT OF VIEW, MANY EXPRESSIONS</p>
    </div>
    <h2 id="brand-wall-title">Meet the <em className="brand-shimmer">Rang family.</em></h2>
    <p className="brand-wall-lede">Discover the specialist collections that bring colour, texture and character to every kind of space.</p>
    <div className="brand-wall-grid">
      {brands.map(([name, slug], index) => <motion.div className="brand-logo" key={slug}
        initial={reducedMotion ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .25 }}
        transition={{ duration: .45, delay: reducedMotion ? 0 : (index % 5) * .045, ease: [.2, .7, .2, 1] }}>
        <Image src={`/images/brands/${slug}.svg`} alt={name} width={280} height={88} unoptimized loading="lazy" />
      </motion.div>)}
    </div>
    <p className="brand-wall-note">A collection of ideas, united by a love of detail.</p>
  </section>;
}
