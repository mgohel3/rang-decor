"use client";

import { useEffect } from "react";

const COLS = ["#E01080", "#00B080", "#F2A900"];
type Drop = HTMLElement & { __ov?: HTMLSpanElement; __ci?: number; __oc?: string };

// Page-wide behaviours from DESIGN.md: scroll reveal ([data-rv]) and the colour-drop hover ([data-drop]).
export function Effects() {
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canHover = matchMedia("(hover: hover)").matches;

    // Clip-path reveals ("top"/"bottom") start fully clipped, so they never intersect; watch their parent and reveal them together.
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (!e.isIntersecting) return;
      const t = e.target as HTMLElement;
      (t.dataset.rv === "top" || t.dataset.rv === "bottom" ? [t] : []).forEach(x => x.classList.add("in"));
      t.querySelectorAll(':scope > [data-rv="top"],:scope > [data-rv="bottom"]').forEach(x => x.classList.add("in"));
      t.classList.add("in"); io.unobserve(t);
    }), { threshold: 0.12 });
    const scan = () => document.querySelectorAll("[data-rv]:not(.in)").forEach(el => {
      const clip = (el as HTMLElement).dataset.rv === "top" || (el as HTMLElement).dataset.rv === "bottom";
      io.observe(clip && el.parentElement ? el.parentElement : el);
    });
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    const drop = (e: MouseEvent, enter: boolean) => {
      const el = (e.target as Element).closest?.("[data-drop]") as Drop | null;
      if (!el || el.contains(e.relatedTarget as Node)) return;
      const mode = el.dataset.drop, r = el.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
      let ov = el.__ov;
      if (!ov) {
        if (!enter) return;
        ov = el.__ov = document.createElement("span");
        ov.setAttribute("aria-hidden", "true");
        el.style.isolation = "isolate";
        if (mode === "btn") { el.style.position = "relative"; el.style.overflow = "hidden"; }
        Object.assign(ov.style, { position: "absolute", inset: "0", pointerEvents: "none", zIndex: mode === "btn" ? "-1" : "1", mixBlendMode: mode === "btn" ? "normal" : "multiply", opacity: mode === "btn" ? "1" : ".65" });
        el.appendChild(ov);
      }
      const T = "clip-path .8s cubic-bezier(.2,.7,.2,1)";
      if (enter) {
        el.__ci = ((el.__ci ?? 0) + 1) % 3;
        const col = COLS[(el.__ci + (Number(el.dataset.off) || 0)) % 3];
        ov.style.background = col; ov.style.transition = "none"; ov.style.clipPath = `circle(0px at ${x}px ${y}px)`; void ov.offsetWidth;
        ov.style.transition = T; ov.style.clipPath = `circle(${Math.hypot(Math.max(x, r.width - x), Math.max(y, r.height - y))}px at ${x}px ${y}px)`;
        if (mode === "btn") { if (el.__oc === undefined) el.__oc = el.style.color; el.style.color = col === "#F2A900" ? "#1C1B1A" : "#fff"; }
      } else {
        ov.style.transition = T; ov.style.clipPath = `circle(0px at ${x}px ${y}px)`;
        if (mode === "btn" && el.__oc !== undefined) { el.style.color = el.__oc; el.__oc = undefined; }
      }
    };
    const over = (e: MouseEvent) => drop(e, true), out = (e: MouseEvent) => drop(e, false);
    if (!reduce && canHover) { document.addEventListener("mouseover", over); document.addEventListener("mouseout", out); }

    return () => { io.disconnect(); mo.disconnect(); document.removeEventListener("mouseover", over); document.removeEventListener("mouseout", out); };
  }, []);
  return null;
}
