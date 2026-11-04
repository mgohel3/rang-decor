"use client";

import { useEffect, useRef } from "react";

// Wraps the stacked cards of a product page. Cards marked .sticky pin to the top while the next card slides over them.
// A card taller than the screen scrolls until its bottom edge reaches the bottom of the screen, then pins.
export function Stack({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const cards = Array.from(root.querySelectorAll<HTMLElement>(".sticky"));
    const apply = () => cards.forEach(el => { el.style.top = `${Math.min(0, window.innerHeight - el.offsetHeight)}px`; });
    apply();
    const ro = new ResizeObserver(apply);
    cards.forEach(el => ro.observe(el));
    window.addEventListener("resize", apply);
    return () => { ro.disconnect(); window.removeEventListener("resize", apply); };
  }, []);
  return <div ref={ref} className="rd-stack">{children}</div>;
}
