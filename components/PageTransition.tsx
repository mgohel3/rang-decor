"use client";

import Image from "next/image";
import { ViewTransition } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const firstLoad = useRef(true);
  const [dismissedPath, setDismissedPath] = useState<string | null>(null);
  const loading = !reducedMotion && dismissedPath !== pathname;

  useEffect(() => {
    if (reducedMotion) { firstLoad.current = false; return; }
    const delay = firstLoad.current ? 680 : 420;
    firstLoad.current = false;
    const timer = window.setTimeout(() => setDismissedPath(pathname), delay);
    return () => window.clearTimeout(timer);
  }, [pathname, reducedMotion]);

  return <>
    <ViewTransition key={pathname} enter="page-enter" exit="page-exit" default="none">
      <div className="page-transition-content">{children}</div>
    </ViewTransition>
    <AnimatePresence>
      {loading && <motion.div className="page-preloader" key={pathname} role="status" aria-label="Loading Rang Décor"
        initial={false} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : .32, ease: "easeOut" }}>
        <motion.div className="preloader-mark" initial={reducedMotion ? false : { opacity: 0, y: 8, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: reducedMotion ? 0 : .38, ease: [.2,.7,.2,1] }}>
          <Image src="/images/rang-header.svg" alt="Rang Décor" width={146} height={54} priority unoptimized/>
          <span className="preloader-line"><i/></span>
        </motion.div>
      </motion.div>}
    </AnimatePresence>
  </>;
}
