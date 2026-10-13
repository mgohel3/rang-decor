# Rang Décor — Materials in Motion

Next.js App Router design study with four creative directions. Each homepage now opens with a three-image carousel. The carousel and animated color-drop footer use Motion; the product-to-detail image morph uses React View Transitions where supported.

## Run locally

```sh
npm install
npm run dev
```

Open `http://localhost:3000` for the direction selector. Each direction includes collection, product detail, catalogue library, and contact routes. Contact uses a `mailto:` prototype and does not submit to a backend. Outbound Rang Décor website, social, visualizer, and catalogue links are placeholders (`#`) for client review.

## Design directions

- `/demo/01-editorial` — Editorial Surface Atelier
- `/demo/02-architectural` — Architectural Material Lab
- `/demo/03-contemporary` — Contemporary Indian Living
- `/demo/04-luxury` — Modern Luxury Surfaces

## Source and asset notes

Official Rang Décor marks and collection/catalogue imagery are stored locally in `public/images`. The catalogue directory contains 15 requested names; `Inner Laminate` has no verified catalogue file in the supplied source material, so it is labeled unavailable.

## Motion references

- [Motion for React](https://motion.dev/docs/react)
- [Next.js View Transitions](https://nextjs.org/docs/app/guides/view-transitions)
- [Next.js animation example repository](https://github.com/danielwuachin/nextjs-animations)
- [Animated website libraries for Next.js and React](https://snigdhachandrapaik.vercel.app/blogs/animated-website-libraries-nextjs-react)
