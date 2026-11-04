"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Family, Room } from "@/data/content";

export function Visualizer({ base, room, rooms, families }: { base: string; room: Room; rooms: Room[]; families: Family[] }) {
  const [familySlug, setFamilySlug] = useState(families[0].id);
  const family = families.find(f => f.id === familySlug) ?? families[0];
  const [selected, setSelected] = useState({ family: families[0], swatch: families[0].swatches[0] });

  return <section className="viz">
    <nav className="viz-areas" aria-label="Application area">
      {rooms.map(r => <Link key={r.id} href={`${base}/visualizer/${r.id}`} aria-current={r.id === room.id ? "page" : undefined} className={r.id === room.id ? "is-current" : ""}>{r.name}</Link>)}
    </nav>
    <div className="viz-main">
      <div className="viz-stage" style={{ backgroundImage: `url(${selected.swatch.image})` }}>
        {/* the room image has a transparent wall; the chosen swatch is tiled behind it */}
        <img src={room.image} alt={`${room.name} with the selected surface applied`} />
      </div>
      <aside className="viz-panel">
        <span className="eyebrow">RANG DÉCOR / VISUALIZER</span>
        <h1>Envision your space</h1>
        <p>See how our surfaces look in your space. This is a preview, so colours on screen can differ from the real sheet.</p>
        <ol className="viz-steps"><li>Choose an application area.</li><li>Select any of our products.</li><li>Witness the magic.</li></ol>
        <div className="viz-selected" aria-live="polite">
          <span>SELECTED OPTION</span>
          <strong>{selected.family.name}</strong>
          <Image src={selected.swatch.image} alt="" width={100} height={100} unoptimized />
          <em>{selected.swatch.code}</em>
        </div>
      </aside>
    </div>
    <div className="viz-picker">
      <div className="viz-tabs" role="tablist" aria-label="Product family">
        {families.map(f => <button key={f.id} role="tab" aria-selected={f.id === family.id} className={f.id === family.id ? "is-current" : ""} onClick={() => setFamilySlug(f.id)}>{f.name}</button>)}
      </div>
      <div className="viz-swatches">
        {family.swatches.map(s => <button key={s.code} className={selected.swatch.image === s.image ? "is-current" : ""} aria-label={`${family.name} ${s.code}`} onClick={() => setSelected({ family, swatch: s })}>
          <Image src={s.image} alt="" width={90} height={90} unoptimized loading="lazy" /><span>{s.code}</span>
        </button>)}
      </div>
    </div>
  </section>;
}
