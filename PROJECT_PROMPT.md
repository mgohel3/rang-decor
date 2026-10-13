# Rang Décor frontend prototype — single project prompt

Build and refine a client-review-ready frontend prototype for Rang Décor, a premium Indian architectural surfaces and decorative materials brand. The immediate goal is to present homepage design directions to the client, gather feedback, and receive approval. Do not start full production development before approval.

## Existing project and routes

- Preserve the existing Next.js App Router project, components, content, assets, and working functionality. Make focused changes; do not replace the project with a new scaffold.
- `/` must open the primary Editorial homepage at `/demo/01-editorial`.
- `/directions` is the design-direction selection page. From it, a visitor can enter any of the four concepts. Keep an always-accessible, compact concept switcher on the concept pages.
- Concept routes:
  - `/demo/01-editorial` — Editorial Surface Atelier: warm, magazine-like, tactile and image-led.
  - `/demo/02-architectural` — Architectural Material Lab: precise, structured and product-focused.
  - `/demo/03-contemporary` — Contemporary Indian Living: expressive, lived-in and grounded in natural tones.
  - `/demo/04-luxury` — Modern Luxury Surfaces: cinematic, dramatic and restrained.
- Each concept must have its own layout composition, visual identity, typography, product presentation and motion character while retaining Rang Décor brand recognition.

## Homepage experience

- Build a complete, responsive homepage with a three-image hero carousel, clear headline and CTAs, a useful navigation menu with working dropdowns and mobile menu, brand introduction, collections, product/application stories, visualizer preview placeholder, catalogue preview, brand marks, network/contact CTA, gallery/event categories, and a considered footer.
- Make carousel controls, navigation, dropdowns, cards, internal links, CTAs, mobile menu and demo selector keyboard-usable and visibly interactive. Use local prototype routes or in-page anchors where available. For unfinished outbound destinations use `#`; do not link to pages on the existing Rang Décor website. Email and telephone links may use `mailto:` and `tel:`.
- Use the supplied official Rang Décor header and footer logos, verified Rang product imagery, catalogue cover assets, and all supplied official product-family logo SVGs. Prefer local project assets; do not hotlink official website media.
- Use existing verified content and links where applicable. Clearly identify mock content or future functionality, and do not claim that unfinished features work.

## Visual design and motion

- Make all sections polished and presentable at desktop, tablet and mobile sizes. Keep image crops, text hierarchy, spacing, focus states, hover states and responsive navigation intentional and consistent.
- Use Motion (`motion/react`) for restrained carousel transitions, scroll reveals, menu/card feedback, and a refined footer color-drop/ripple wave. Motion should feel premium, fluid and performance-conscious; honor `prefers-reduced-motion` and avoid distracting continuous effects.
- Give the footer a cohesive Rang palette, readable type, clear columns, logo and CTA, a subtle animated rose/earth-toned wave, and enough clearance that the fixed design selector never obscures footer content.
- Use Next.js view transitions where compatible with the existing app and user experience; do not add animation dependencies when Motion already meets the need.

## Scope and constraints

- This is a frontend-only client approval prototype. Use static/mock data and the existing local routes.
- Do not implement backend APIs, authentication, admin tools, a database, a real visualizer, payments, or production integrations.
- Keep existing useful code and project structure. Avoid unrelated rewrites or external Rang Décor links.

## Completion checks and handoff

- Verify every supplied/local image path, responsive behavior, primary navigation and demo switching. Fix broken images, layout collisions, dead controls and browser console errors found during review.
- Run a production build before handoff.
- Provide the local development command (`npm run dev`), the root URL (`http://localhost:3000/`), the direction selector (`http://localhost:3000/directions`), and all four exact concept URLs.
- Summarize anything still incomplete. Wait for the client to choose and approve a design direction before beginning full production development.
