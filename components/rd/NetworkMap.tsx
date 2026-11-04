"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { Map as MapLibreMap, Marker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { kinds, places, type NodeKind } from "@/data/network";

// Interactive map of Rang depots and channel partners (MapLibre GL with the free OpenFreeMap "positron" style).
// The list beside it and the markers stay in sync; if WebGL is not available the list still works.
const STYLE = "https://tiles.openfreemap.org/styles/positron";

export function NetworkMap() {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<MapLibreMap | null>(null);
  const markers = useRef<Record<string, { m: Marker; node: HTMLElement }>>({});
  const [filter, setFilter] = useState<"all" | NodeKind>("all");
  const [active, setActive] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const shown = useMemo(() => places.filter(p => filter === "all" || p.kind === filter), [filter]);

  useEffect(() => {
    let dead = false;
    (async () => {
      try {
        const ml = await import("maplibre-gl");
        if (dead || !el.current) return;
        // The worker is served from /public (copied from node_modules/maplibre-gl/dist). Update it when maplibre-gl is upgraded.
        ml.setWorkerUrl("/vendor/maplibre-gl-worker.mjs");
        const m = new ml.Map({ container: el.current, style: STYLE, bounds: [[67.5, 6], [98.5, 37.5]], fitBoundsOptions: { padding: 24 }, cooperativeGestures: true, attributionControl: { compact: true }, minZoom: 3.2, maxZoom: 9 });
        map.current = m;
        m.addControl(new ml.NavigationControl({ showCompass: false }), "top-right");
        places.forEach(p => {
          const node = document.createElement("button");
          node.type = "button";
          node.className = `rd-pin ${p.kind}`;
          node.setAttribute("aria-label", `${p.city}, ${p.region}: ${kinds[p.kind].label}`);
          node.innerHTML = p.kind === "distribution" ? "<i></i>" : "<i></i><b></b>";
          const popup = new ml.Popup({ offset: 16, closeButton: false, className: "rd-pop" }).setHTML(`<strong>${p.city}</strong><span>${p.region}</span><em>${kinds[p.kind].label}</em>`);
          const marker = new ml.Marker({ element: node }).setLngLat([p.lng, p.lat]).setPopup(popup).addTo(m);
          node.addEventListener("click", () => setActive(p.city));
          markers.current[p.city] = { m: marker, node };
        });
      } catch { setFailed(true); }
    })();
    return () => { dead = true; map.current?.remove(); map.current = null; markers.current = {}; };
  }, []);

  // Filter: show only the chosen kind of marker.
  useEffect(() => {
    Object.entries(markers.current).forEach(([city, { node }]) => {
      const p = places.find(x => x.city === city)!;
      node.style.display = filter === "all" || p.kind === filter ? "" : "none";
    });
  }, [filter]);

  // Selecting a city flies to it and opens its popup.
  useEffect(() => {
    if (!active || !map.current) return;
    const p = places.find(x => x.city === active);
    const mk = markers.current[active];
    if (!p || !mk) return;
    map.current.flyTo({ center: [p.lng, p.lat], zoom: Math.max(map.current.getZoom(), 5.6), speed: 0.9, essential: true });
    Object.values(markers.current).forEach(x => x.m.getPopup()?.isOpen() && x.m.togglePopup());
    if (!mk.m.getPopup()?.isOpen()) mk.m.togglePopup();
  }, [active]);

  return <div className="rd-netmap">
    <div className="chips" role="group" aria-label="Filter locations">
      {([["all", "All locations"], ["hq", "Head office"], ["company", "Company stock points"], ["distribution", "Distribution"]] as const).map(([k, l]) =>
        <button key={k} className="rd-chip" data-drop="btn" aria-pressed={filter === k} onClick={() => setFilter(k)}>{l}</button>)}
    </div>
    <div className="frame">
      <div className="canvas" ref={el} role="region" aria-label="Map of Rang depots and channel partners across India">
        {failed && <p className="fallback">The interactive map could not load. The full list of cities is shown beside it.</p>}
      </div>
      <aside className="side" aria-label="Rang depot and channel partner cities">
        <ul>{shown.map(p => <li key={p.city}>
          <button className={active === p.city ? "on" : ""} onClick={() => setActive(p.city)}>
            <span className={`dot ${p.kind}`} aria-hidden="true"/>
            <span className="t"><b>{p.city}</b><small>{p.region}</small></span>
            <span className="k">{p.kind === "hq" ? "Head office" : p.kind === "company" ? "Company stock" : ""}</span>
          </button>
        </li>)}</ul>
      </aside>
    </div>
    <div className="legend">{(Object.keys(kinds) as NodeKind[]).map(k => <span key={k}><i className={`dot ${k}`}/>{kinds[k].label}</span>)}</div>
    <p className="rd-muted" style={{ marginTop: ".9rem", fontSize: ".85rem" }}>Looking for a stockist in another city? <Link href="/contact" className="rd-textlink">Ask the Rang team</Link>.</p>
  </div>;
}
