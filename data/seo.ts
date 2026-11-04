// Page copy and search metadata. Facts come from rangdecor.in, the client's code list and catalogues.
// "uses" and the FAQ answers are general guidance written for the site; the client should confirm them before launch.

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rangdecor.in";
// Indexing stays off until the new site replaces the old one on rangdecor.in (set NEXT_PUBLIC_INDEXABLE=true then).
export const INDEXABLE = process.env.NEXT_PUBLIC_INDEXABLE === "true";

export const org = {
  name: "Rang Décor",
  legal: "Bhandari Group",
  tagline: "Let’s live beautiful",
  email: "info@rangdecor.in",
  phone: "+91 8297 585 000",
  street: "14-1-395/1, New Aghapura Rd",
  city: "Hyderabad",
  region: "Telangana",
  postal: "500001",
  country: "IN",
  sameAs: [
    "https://www.instagram.com/rangdecor.in/",
    "https://www.facebook.com/rang.decor.9",
    "https://in.pinterest.com/rangdecor/boards/",
    "http://www.linkedin.com/in/bhandari-agencies-private-limited-9660842b7",
  ],
};

export type CollectionCopy = { overview: string[]; uses: string[]; facts: [string, string][]; metaTitle: string; metaDescription: string };

const louverUses = ["Feature and accent walls", "Ceilings and soffits", "Partitions and room dividers", "Reception areas, lobbies and retail interiors"];
const laminateUses = ["Wardrobes and kitchen shutters", "Wall panelling and headboards", "Tables, counters and furniture fronts", "Retail and office joinery"];

export const copy: Record<string, CollectionCopy> = {
  "groove-earth": {
    metaTitle: "Groove Earth louvers: earth-toned wall and ceiling slats",
    metaDescription: "Groove Earth interlocking louvers in 5 inch width and earth-toned finishes for walls, ceilings and partitions. See all codes and download the catalogue.",
    overview: [
      "Groove Earth brings warm, grounded colour to a room. The slats interlock to give a continuous surface, so a wall or ceiling reads as one calm, rhythmic plane instead of a row of separate strips.",
      "Pick from a range of earthy shades, from soft sand and clay to deep brown, and browse every code below. Each swatch can be opened and zoomed so you can judge the grain and tone before you ask for a sample.",
    ],
    uses: louverUses,
    facts: [["Family", "Groove louvers"], ["Width", "5 inch"], ["Height", "9 ft"], ["Fixing", "Interlocking, seamless joint"]],
  },
  "groove-forest": {
    metaTitle: "Groove Forest wood-shade louvers for walls and ceilings",
    metaDescription: "Groove Forest louvers give walls and ceilings a natural wood-shade look with a seamless interlocking finish. Browse codes and download the catalogue.",
    overview: [
      "Groove Forest is the wood-shade range of the Groove family. It gives a room the warmth of timber in a clean, linear profile, without the upkeep that real wood slats can need.",
      "The louvers lock together for a smooth finish and run 9 ft tall, which suits full-height feature walls as well as ceilings and partitions. Explore all Forest codes below and open any swatch to zoom in.",
    ],
    uses: louverUses,
    facts: [["Family", "Groove louvers"], ["Height", "9 ft"], ["Look", "Wood shades"], ["Fixing", "Interlocking, seamless joint"]],
  },
  "groove-pastel": {
    metaTitle: "Groove Pastel louvers in soft, soothing colours",
    metaDescription: "Groove Pastel offers interlocking louvers in gentle pastel shades for light, calm interiors. Explore every code and download the catalogue.",
    overview: [
      "Groove Pastel takes the same interlocking louver profile into a softer palette. The colours are quiet and airy, which makes them a good fit for bedrooms, nurseries, clinics and any space meant to feel light.",
      "Browse the full list of codes below. Open a swatch to see the colour at a larger size, and ask the team for a physical sample when you are close to a decision.",
    ],
    uses: louverUses,
    facts: [["Family", "Groove louvers"], ["Height", "9 ft"], ["Look", "Soft pastel shades"], ["Fixing", "Interlocking, seamless joint"]],
  },
  onit: {
    metaTitle: "ONIT charcoal louvers for modern feature walls",
    metaDescription: "ONIT charcoal louvers add strong linear depth to feature walls and contemporary interiors. View codes and download the catalogue.",
    overview: [
      "ONIT is a charcoal-toned louver range for walls that need a strong, modern line. The deep colour frames furniture and lighting and gives a space a confident, architectural feel.",
      "See the codes below and download the ONIT catalogue for the full range.",
    ],
    uses: louverUses,
    facts: [["Type", "Charcoal louvers"]],
  },
  wallmate: {
    metaTitle: "Wallmate designer wall louvers: all codes",
    metaDescription: "Wallmate designer wall louvers in two volumes of finishes, codes WM 3101 to WM 3183. Browse every code and download the catalogue.",
    overview: [
      "Wallmate is a designer wall-louver range listed in two volumes. Together they cover more than 80 finishes, from quiet neutrals to bold, characterful surfaces.",
      "Each tile below is a code you can open and zoom. Use the search box to jump straight to a code, then download the catalogue for installation details.",
    ],
    uses: louverUses,
    facts: [["Volumes", "Vol 1 and Vol 2"], ["Codes", "WM 3101 to WM 3183"]],
  },
  "art-by-one": {
    metaTitle: "Art by One seamless louvers for easy wall panelling",
    metaDescription: "Art by One louvers join seamlessly for fast, tidy wall panelling. See the full code list and download the catalogue.",
    overview: [
      "Art by One louvers are designed to fit together without visible joins, so panels go up quickly and the finished wall looks continuous. That keeps installation tidy on busy sites.",
      "The code list is below. Photographs for these codes are being added, and the full range is in the catalogue.",
    ],
    uses: louverUses,
    facts: [["Type", "Seamless-fit louvers"], ["Codes", "RA and RO series"]],
  },
  interlockit: {
    metaTitle: "Interlockit HDPC wall boards, louvers and trims",
    metaDescription: "Interlockit is a wall-cladding system of HDPC boards and louvers with matching J, I, T, P, L, LED and H trims. View codes and download the catalogue.",
    overview: [
      "Interlockit is a wall-cladding system built from HDPC boards and louvers that lock together. Fifteen board designs (HDB) and fifteen louver designs (HDL) let you mix flat and fluted surfaces in one scheme.",
      "A full family of trims finishes the job: J, I, T, P and L profiles, LED trims and LED skirting, and an H profile in silver. J, I, T and P are also available in black and gold.",
    ],
    uses: ["Feature walls and reception backdrops", "Hospitality and retail interiors", "Lift lobbies and corridors", "Cabinet and wardrobe fronts"],
    facts: [["Boards", "HDB 01 to 15"], ["Louvers", "HDL 01 to 15"], ["Trims", "J, I, T, P, L, LED, LED skirting, H"], ["Trim finishes", "Black and gold (J, I, T, P); silver (H)"]],
  },
  "charco-charm": {
    metaTitle: "Charco Charm decorative charcoal panels, 8 ft x 2 ft",
    metaDescription: "Charco Charm is an 8 ft by 2 ft decorative charcoal panel for living rooms, bedrooms and offices. Browse all codes and download the catalogue.",
    overview: [
      "Charco Charm is a decorative charcoal panel that adds texture and depth to a wall. Its slim 8 ft by 2 ft size makes it easy to plan, cut and fit, and the surface has a tactile, modern feel.",
      "Choose from the codes below, each shown as a tall swatch. Open any code to inspect the pattern up close.",
    ],
    uses: ["Living room and bedroom walls", "Offices and meeting rooms", "TV units and headboard walls", "Hospitality and retail interiors"],
    facts: [["Size", "8 ft x 2 ft"], ["Type", "Decorative charcoal panel"]],
  },
  nazrana: {
    metaTitle: "Nazrana engraved mirror panels",
    metaDescription: "Nazrana panels combine a mirror surface with engraved detail for decorative walls. Download the catalogue to see the full range.",
    overview: [
      "Nazrana panels pair a reflective mirror surface with fine engraved detail. They bounce light around a room and give walls an ornate, luxurious character.",
      "Download the Nazrana catalogue to see the designs.",
    ],
    uses: ["Statement walls", "Hotel and restaurant interiors", "Lobbies and lounges", "Dressing areas"],
    facts: [["Type", "Engraved mirror panels"]],
  },
  bern: {
    metaTitle: "Bern Thermo thermo-mica sheets, 8 ft x 4 ft",
    metaDescription: "Bern Thermo is a 1 mm thermo-mica sheet in 8 ft by 4 ft with gloss, matt, metallic, sparkle, textured, veneer and glass rustic finishes. Browse codes.",
    overview: [
      "Bern Thermo is a 1 mm thermo-mica sheet in the standard 8 ft by 4 ft size. It is made for furniture, wardrobes, wall panels and joinery where a smooth, consistent surface matters.",
      "The range spans solid gloss and matt, metallic matt and gloss, sparkle, textures, veneers and glass rustic finishes, so one family covers most schemes. The new RB code list is shown below, with images being added in stages.",
    ],
    uses: laminateUses,
    facts: [["Thickness", "1 mm"], ["Standard size", "8 ft x 4 ft"], ["Finishes", "Gloss, matt, metallic, sparkle, textures, veneers, glass rustic"]],
  },
  faded: {
    metaTitle: "Faded 2 mm acrylic laminates in suede, gloss and matt",
    metaDescription: "Faded is a range of 2 mm acrylic laminates in suede, glossy and matt surfaces. Browse every RF code and download the catalogue.",
    overview: [
      "Faded is a 2 mm acrylic laminate range with a soft, understated colour palette. Choose a suede, glossy or matt surface to suit wardrobes, kitchen shutters, wall panels and furniture.",
      "Every RF code is listed below. Open a swatch to look at the colour and surface up close.",
    ],
    uses: laminateUses,
    facts: [["Thickness", "2 mm"], ["Material", "Acrylic laminate"], ["Surfaces", "Suede, glossy, matt"]],
  },
  litia: {
    metaTitle: "Litia fluted acrylic laminates: ribble, frill and wavie",
    metaDescription: "Litia fluted acrylic laminates come in ribble, frill and wavie profiles in 8 x 2 ft and 8 x 4 ft sheets. See the code list and download the catalogue.",
    overview: [
      "Litia is a fluted acrylic laminate that adds relief and shadow to a surface. The ribble, frill and wavie profiles each give a different rhythm, from fine and regular to soft and flowing.",
      "Sheets are available in 8 x 2 ft and 8 x 4 ft. The code list below shows the colour name, profile and size for every Litia code.",
    ],
    uses: laminateUses,
    facts: [["Profiles", "Ribble, frill, wavie"], ["Sizes", "8 x 2 ft, 8 x 4 ft"], ["Material", "Acrylic, fluted"]],
  },
  maskara: {
    metaTitle: "Maskara acrylic laminates: 130+ colours and mirror finishes",
    metaDescription: "Maskara is Rang Décor's 100 percent acrylic laminate range with more than 130 colours, woods, stones and mirror finishes. Browse codes and names.",
    overview: [
      "Maskara is the acrylic laminate range at the heart of Rang Décor. It is made from 100 percent acrylic and is known for deep, even colour and a glossy, reflective finish that feels luxurious.",
      "The range runs from soft whites and pastels to rich woods, stones and metallics, plus gold, copper, bronze, grey, silver and rose mirror finishes. Every code carries a name, so you can search by colour as well as by number.",
    ],
    uses: laminateUses,
    facts: [["Material", "100% acrylic"], ["Finishes", "Solids, woods, stones, metallics, mirrors"], ["Codes", "130+"]],
  },
  "bella-ceilo": {
    metaTitle: "Bella Ceilo decorative soffit slats and trims",
    metaDescription: "Bella Ceilo soffit slats bring wood-look and neutral finishes to ceilings, with matching T, J and corner trims. See codes and download the catalogue.",
    overview: [
      "Bella Ceilo is a range of decorative soffit slats for ceilings. The finishes include golden oak, espresso wood, retro walnut, white oak and soft neutrals, so you can echo a timber look overhead without heavy installation.",
      "Each code has matching trims (T, J, outer corner and inner corner) for a clean edge. Selected shades are also available in 13 ft lengths. The codes and names are listed below in two volumes.",
    ],
    uses: ["Soffits and ceilings", "Corridors and lobbies", "Verandas and covered entrances", "Retail and hospitality interiors"],
    facts: [["Type", "Soffit slats"], ["Trims", "T, J, outer corner, inner corner"], ["Length", "Selected shades also in 13 ft"]],
  },
};

export const faqFor = (name: string) => [
  { q: `Can I get a sample of ${name}?`, a: `Yes. Choose the codes you like and send us an enquiry. The Rang team can arrange physical samples so you can check colour and texture in your own light.` },
  { q: `Where can I buy ${name}?`, a: "Rang products are sold through our distributor and dealer network across India. Contact the team and we will point you to the nearest stockist." },
  { q: `Is there a catalogue for ${name}?`, a: `Yes. Use the Catalogue PDF button on this page to download the latest ${name} catalogue.` },
];
