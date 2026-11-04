# Rang Décor: update plan (Next.js copy)

Working copy: `C:\Users\admin\Documents\ChatGPT\rangdecor-copy`
Old Django source (reference only, not edited): `F:\Client Data\2026\Kalpeshbhai - Karya Graphito\Rang Decor\rangdecor_handover (1)`

## What the old visualizer actually does
- `/visual-gallery/<area>/` shows a room PNG whose wall/surface is transparent, with the chosen swatch tiled behind it (CSS `background-size:150px`).
- Clicking a swatch swaps the tile, the "Selected option" name, the product-family name and the thumbnail. There is no canvas compositing in the live flow.
- Data: 4 areas (Living Room, Shopping Mall, Wardrobe, Kitchen) and 596 swatches across 8 families: Bern-Thermo, charco-charm, maskara, groove-earth, groove-forest, groove-pastel, ONIT, Faded. Swatch fields: number (e.g. TL 26), image, family.
- Page layout: top nav (Application Area / Explore More / Contact Us), the room image on the left, the "Envision your space" panel with the 1-2-3 instructions and selected option on the right, and the family tabs plus a swatch strip along the bottom.
- The old swatches live in `media/product/sheet/`. They are reusable for now. The client's newer product images come later.

## Phases
1. **Visualizer (largest item)**
   - Route `/demo/[direction]/visualizer/[area]`, replacing the current `/visual-gallery/living_room` placeholder. Link it from the nav and footer "Visualizer" links, which are `#` today.
   - Components: `Visualizer.tsx` (room, panel, family tabs, swatch strip), with the swatch size adjustable. Keyboard-usable, with a crossfade when the swatch changes (Motion, honouring reduced-motion).
   - Data in `data/visualizer.ts` (areas, families, swatches), shaped like the old Django models (area, family, swatch number, image) so the CMS copy from Sanish can replace it with a fetch and nothing else changes.
   - Area switcher for the 4 rooms (the old nav had "Application Area").
   - Swatch images copied into `public/images/swatches/<family>/`, then resized and converted to webp (the old ones are large).
   - Room images: generate with the ChatGPT prompts, then I convert the magenta area to transparent. Until then, use the old four room PNGs from `media/vsg`.
   - Mobile: stack the layout, with the swatch strip scrolling horizontally.
2. **Client feedback**
   - Larger icons: the arrow icons on collection tiles (35px, only visible on hover), catalogue cards and direction cards. Make them about 48px and always visible on touch screens. Also check the slide arrows and nav chevrons.
   - Information blocks (title plus paragraph) on the cards in the second screenshot ("Thermo-mica surfaces" is too small). I'll add a readable heading and 2 to 3 lines of text per collection, with placeholder copy until the client sends real text.
3. **Career page**: `/demo/[direction]/careers`. Intro, values, an "open roles" area (empty state until roles exist), and an apply button that opens a `mailto:hr@rangdecor.in` link with a prefilled subject. Link it from the nav and footer.
4. **Testimonials page**: `/demo/[direction]/testimonials`. A grid of cards with a quote icon and a role icon, with placeholder quotes marked as mock until the client sends real ones. Link it from the nav and footer.
5. **CMS readiness**: keep all content in typed data files with one loader function each (`getCollections`, `getSwatches`, `getTestimonials`, `getRoles`). When Sanish's CMS copy link arrives, only the loaders change. No admin panel is built here.
6. **QA and handoff**: `npm install`, production build, console errors, responsive check at desktop, tablet and mobile, then a push to a new branch (not `main`).

## Open questions
1. The "information" request: should the title plus paragraph go on every collection card, or is it for a specific section? I assumed every collection card.
2. Does the client want all four old areas, or more? The prompt file has 4 required and 4 optional rooms.
3. Which design direction (of the four) should the new pages follow? I would build them once and let all four directions share them.
4. The old swatch files: are they approved for use now, or should I wait for the new product images?
5. Should the real Rang brand-family names stay as in the old site, for example "Bern-Thermo" and "charco-charm"?

## Not done yet
Nothing is built. I have not run `npm install` or a build, and I have not opened the Vercel site.

## Update: surface-web-designer template (mgohel3/surface-web-designer)
- It is a Django 5 CMS + API (`backend/`) plus a Next.js 16 / Tailwind v4 site (`web/`) that reads everything from the API. It has apps for catalog, applications, gallery, blog, faq, testimonials, forms and leads.
- It has NO visualizer and NO careers page (I found neither in backend or web). Testimonials exist only as a backend app; I haven't checked whether the site shows them.
- Rule: use only the structure. Do not copy any Sanish names, photos, product data, domain, deploy files, passwords or keys. Start with an empty database.
- Open decision: keep the current Rang Décor prototype as the frontend and plug it into the template's API, or rebuild the pages inside the template's `web/`. Not decided.
