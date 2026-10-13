"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { catalogues } from "@/data/site";

export function CatalogueGrid({ direction }: { direction: string }) {
  const [active, setActive] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();
  const selected = active === null ? null : catalogues[active];

  useEffect(() => {
    if (active === null) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setActive(null); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  return <>
    <div className="catalogue-grid">
      {catalogues.map(([name, , image], index) => <motion.button type="button" className="catalogue-card" key={name}
        onClick={() => setActive(index)} whileHover={reducedMotion ? undefined : { y: -6 }} transition={{ duration: .25 }}>
        <span className="catalogue-card-image">{image ? <Image src={image} alt={`${name} collection cover`} fill sizes="(max-width:760px) 100vw, (max-width:1100px) 50vw, 33vw" quality={88} loading={index < 3 ? "eager" : "lazy"}/> : <span className="catalogue-no-image">Preview coming soon</span>}</span>
        <span className="catalogue-card-shade"/>
        <span className="catalogue-card-index">{String(index + 1).padStart(2,"0")} / {String(catalogues.length).padStart(2,"0")}</span>
        <span className="catalogue-card-caption">RANG DÉCOR · CATALOGUE</span>
        <span className="catalogue-card-title">{name}<i><ArrowUpRight size={16}/></i></span>
      </motion.button>)}
    </div>
    <p className="catalogue-review-note">Cover previews are available here. Full catalogue downloads will be connected after the client selects a design direction.</p>
    <AnimatePresence>
      {selected && active !== null && <motion.div className="catalogue-modal" role="presentation" onClick={() => setActive(null)}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : .2 }}>
        <motion.div className="catalogue-modal-card" role="dialog" aria-modal="true" aria-labelledby="catalogue-modal-title" onClick={event => event.stopPropagation()}
          initial={reducedMotion ? false : { opacity: 0, y: 18, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reducedMotion ? undefined : { opacity: 0, y: 12, scale: .98 }} transition={{ duration: reducedMotion ? 0 : .24 }}>
          <button type="button" className="catalogue-modal-close" aria-label="Close catalogue preview" onClick={() => setActive(null)}><X size={19}/></button>
          <div className="catalogue-modal-image">{selected[2] && <Image src={selected[2]} alt={`${selected[0]} catalogue cover preview`} fill sizes="(max-width:760px) 80vw, 36vw" quality={90}/>}</div>
          <div className="catalogue-modal-copy"><span className="eyebrow">RANG DÉCOR / COVER PREVIEW</span><h2 id="catalogue-modal-title">{selected[0]}</h2><p>This preview shows the collection artwork. Ask the Rang Décor team about the complete catalogue.</p><Link className="button button-pink" href={`/demo/${direction}/contact`} onClick={() => setActive(null)}>Ask about this collection <ArrowUpRight size={15}/></Link></div>
        </motion.div>
      </motion.div>}
    </AnimatePresence>
  </>;
}
