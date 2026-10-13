"use client";

import { motion, useReducedMotion } from "motion/react";

const waves = [
  { id: "sand", color: "#d5ae8b", opacity: .62, start: "M0 46 C180 25 280 62 440 44 C600 26 730 62 900 45 C1060 28 1230 61 1440 37 V110 H0Z", end: "M0 39 C180 58 290 28 440 43 C600 61 730 29 900 44 C1080 61 1230 31 1440 48 V110 H0Z", duration: 16 },
  { id: "terracotta", color: "#c97962", opacity: .78, start: "M0 57 C190 38 300 77 465 55 C625 34 760 78 920 58 C1090 37 1240 76 1440 49 V110 H0Z", end: "M0 51 C185 73 300 42 465 56 C640 76 760 42 920 57 C1090 72 1260 42 1440 62 V110 H0Z", duration: 19 },
  { id: "rose", color: "#c54c7b", opacity: .94, start: "M0 70 C175 49 305 85 470 69 C635 52 770 84 935 67 C1100 50 1260 81 1440 61 V110 H0Z", end: "M0 64 C185 85 300 57 470 70 C635 86 775 56 935 69 C1100 84 1275 54 1440 73 V110 H0Z", duration: 14 },
];

export function FooterWave() {
  const reducedMotion = useReducedMotion();
  return <motion.div className="footer-wave" aria-hidden="true"
    initial={reducedMotion ? false : { opacity: 0, y: 8 }}
    whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .25 }}
    transition={{ duration: reducedMotion ? 0 : .8, ease: [.2, .7, .2, 1] }}>
    <svg viewBox="0 0 1440 110" preserveAspectRatio="none">
      {waves.map((wave, index) => <motion.path key={wave.id} d={wave.start} fill={wave.color} fillOpacity={wave.opacity}
        animate={reducedMotion ? undefined : { d: [wave.start, wave.end, wave.start] }}
        transition={{ duration: wave.duration, delay: index * .35, ease: "easeInOut", repeat: Infinity }} />)}
      {!reducedMotion && [
        { x: 238, color: "#c54c7b", delay: .5 }, { x: 716, color: "#c97962", delay: 1.6 }, { x: 1175, color: "#c54c7b", delay: .9 },
      ].map(drop => <g key={drop.x}>
        <motion.ellipse cx={drop.x} cy="65" rx="8" ry="2" fill="none" stroke={drop.color} strokeWidth="1.4"
          animate={{ opacity: [0, .48, 0], scaleX: [.5, 1.5, 2] }} style={{ transformBox: "fill-box", transformOrigin: "center" }}
          transition={{ duration: 4.5, delay: drop.delay, repeat: Infinity, ease: "easeOut" }} />
        <motion.circle cx={drop.x} cy="15" r="2.6" fill={drop.color}
          animate={{ cy: [15, 54, 63], opacity: [0, .9, 0], scale: [.6, 1, .5] }}
          transition={{ duration: 4.5, delay: drop.delay, repeat: Infinity, ease: "easeIn" }} />
      </g>)}
    </svg>
  </motion.div>;
}
