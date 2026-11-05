// Content for the redesigned site. Facts (names, descriptions, catalogue files, contact) come from
// DESIGN.md / rangdecor.in. When the CMS is ready, replace these exports with loaders; pages stay the same.

// Catalogue PDFs are large (about 380 MB in total), so they are served from storage, not the repository.
// After launch, upload them to your storage and set NEXT_PUBLIC_CATALOGUE_BASE (with a trailing slash).
const PDF = process.env.NEXT_PUBLIC_CATALOGUE_BASE ?? "https://rangdecor.in/static/front/catalogues/";

export const groups = {
  louvers: "Louvers & Cladding",
  panels: "Panels & Mirrors",
  laminates: "Laminates & Acrylic",
  ceilings: "Ceilings",
} as const;
export type GroupKey = keyof typeof groups;

export type Collection = {
  id: string; name: string; group: GroupKey; kind: string; desc: string; long?: string;
  src: string; cover: boolean; pdf: string; family?: string; // family = key in visualizer.json
};

const photo = (f: string) => `/images/${f}`;
const logo = (f: string) => `/images/brands/${f}.svg`;

export const collections: Collection[] = [
  { id: "groove-earth", name: "Groove Earth", group: "louvers", kind: "Decorative louvers", desc: "Slim 5 inch louvers in earthy tones, made for warm and grounded interiors.", long: "Groove Earth belongs to the Groove louver family: seamless, interlocking slats that come in a 9 ft height and fit walls, ceilings and partitions. This series uses a 5 inch width in earth-toned finishes.", src: photo("groove-earth.png"), cover: true, pdf: PDF + "groove_earth.pdf", family: "groove-earth" },
  { id: "groove-forest", name: "Groove Forest", group: "louvers", kind: "Wooden shade louvers", desc: "Wood-shade louvers that bring a natural, calm texture to a room.", long: "Groove Forest is the wood-shade range of the Groove louver family. The slats interlock for a clean, seamless finish and run 9 ft tall, so they suit feature walls, ceilings and partitions.", src: photo("groove-forest.png"), cover: true, pdf: PDF + "groove_forest.pdf", family: "groove-forest" },
  { id: "groove-pastel", name: "Groove Pastel", group: "louvers", kind: "Pastel louvers", desc: "Soft pastel louvers for light, soothing interiors.", long: "Groove Pastel offers the same interlocking Groove louvers in gentler colours. Use them where you want a quiet, airy backdrop on walls, ceilings or room dividers.", src: photo("groove-pastel.png"), cover: true, pdf: PDF + "groove_pastel.pdf", family: "groove-pastel" },
  { id: "onit", name: "ONIT", group: "louvers", kind: "Charcoal louvers", desc: "Charcoal louvers that add linear depth to feature walls.", long: "ONIT is a charcoal-toned louver range for wall applications that need a strong, modern line.", src: logo("onit"), cover: false, pdf: PDF + "onit.pdf", family: "onit" },
  { id: "wallmate", name: "Wallmate", group: "louvers", kind: "Designer wall louvers", desc: "Designer wall louvers for refined, modern interiors.", long: "Wallmate is a range of designer wall louvers, listed in two volumes of finishes.", src: logo("wallmate"), cover: false, pdf: PDF + "wallmate.pdf" },
  { id: "art-by-one", name: "Art by One", group: "louvers", kind: "Seamlessfit louvers", desc: "Seamless louvers that fit together without fuss.", long: "Art by One louvers are made to join seamlessly, so panels go up quickly and the finished wall looks continuous.", src: photo("art-by-one.png"), cover: true, pdf: PDF + "art_by_one.pdf" },
  { id: "interlockit", name: "Interlockit", group: "panels", kind: "Luxury wall clads", desc: "Wall cladding boards and louvers with a full set of trims.", long: "Interlockit is a wall-cladding system of HDPC boards and louvers. A matching trim family (J, I, T, P, L, LED, LED skirting and H) finishes edges, corners and lighting lines.", src: logo("interlockit"), cover: false, pdf: PDF + "interlockit.pdf" },
  { id: "charco-charm", name: "Charco Charm", group: "panels", kind: "Charcoal interior panels", desc: "Charcoal decorative panels with a tactile, modern character.", long: "Charco Charm is a decorative charcoal panel measuring 8 ft by 2 ft. It lifts living rooms, bedrooms and offices with texture and depth.", src: photo("charco.png"), cover: true, pdf: PDF + "charco_charm.pdf", family: "charco-charm" },
  { id: "nazrana", name: "Nazrana", group: "panels", kind: "Engraved mirror panels", desc: "Engraved mirror panels with a reflective, decorative finish.", long: "Nazrana panels combine a mirror surface with engraved detail, for walls that catch and move the light.", src: logo("nazrana"), cover: false, pdf: PDF + "nazrana.pdf" },
  { id: "bern", name: "Bern Thermo", group: "laminates", kind: "Meta thermo mica", desc: "Thermo-mica sheets in a wide spread of finishes.", long: "Bern Thermo is a 1 mm thermo-mica sheet in the standard 8 ft by 4 ft size. Finishes include solid gloss and matt, metallic, sparkle, textures, veneers and glass rustic.", src: photo("bern.png"), cover: true, pdf: PDF + "bern_thermo.pdf", family: "bern-thermo" },
  { id: "faded", name: "Faded", group: "laminates", kind: "Acrylic laminates", desc: "2 mm acrylic laminates in suede, gloss and matt.", long: "Faded is a range of 2 mm acrylic laminates. Pick a suede, glossy or matt surface to suit furniture, wardrobes and wall panels.", src: photo("faded.png"), cover: true, pdf: PDF + "faded_.pdf", family: "faded" },
  { id: "litia", name: "Litia", group: "laminates", kind: "Acrylic fluted laminates", desc: "Fluted acrylic laminates with ribble, frill and wavie profiles.", long: "Litia is a fluted acrylic laminate. It comes in three profiles (ribble, frill and wavie) and in 8 x 2 ft and 8 x 4 ft sheets.", src: logo("litia"), cover: false, pdf: PDF + "litia.pdf" },
  { id: "maskara", name: "Maskara", group: "laminates", kind: "Acrylic series", desc: "Acrylic laminates for a polished, luxurious look.", long: "Maskara is the 100 percent acrylic laminate range at the heart of Rang Décor, known for deep colour, reflective gloss and a luxurious finish.", src: logo("maskara"), cover: false, pdf: PDF + "maskara.pdf", family: "maskara" },
  { id: "bella-ceilo", name: "Bella Ceilo", group: "ceilings", kind: "Ceiling slat solutions", desc: "Decorative soffit slats for ceilings with presence.", long: "Bella Ceilo is a range of soffit slats for ceilings, offered in wood-look and neutral colours with matching T, J, outer-corner and inner-corner trims. Selected shades are also available in 13 ft lengths.", src: photo("bella-ceilo.png"), cover: true, pdf: PDF + "bella_ceilo.pdf" },
];

export const byId = (id: string) => collections.find(c => c.id === id);
// Old prototype slugs ("Bern-Thermo", "charco-charm") resolve to the new ids.
export const resolveId = (slug: string) => {
  const s = slug.toLowerCase();
  const alias: Record<string, string> = { "bern-thermo": "bern" };
  return alias[s] ?? s;
};

export const featuredOrder = ["groove-forest", "bern", "faded", "groove-earth", "charco-charm", "bella-ceilo", "art-by-one", "groove-pastel"];
// 12-column layout: [column, aspect ratio, top offset]
export const featuredLayout: [string, string, string][] = [["1 / span 7", "4/3", "0"], ["9 / span 4", "3/4", "80px"], ["1 / span 4", "3/4", "0"], ["5 / span 8", "16/10", "60px"], ["1 / span 6", "4/3", "0"], ["7 / span 6", "4/3", "80px"], ["1 / span 5", "4/5", "0"], ["7 / span 6", "3/2", "90px"]];

export const materials = [
  { id: "groove-forest", tone: "#4A2E14", kind: "Louvers · Wooden shade", finish: "Wooden shade" },
  { id: "bern", tone: "#5A1442", kind: "Laminates · Thermo mica", finish: "Meta thermo mica" },
  { id: "faded", tone: "#0E4A47", kind: "Laminates · Acrylic", finish: "Suede, glossy and matt surfaces" },
  { id: "groove-earth", tone: "#6B3414", kind: "Louvers · Earth tones", finish: "5 inch width" },
  { id: "bella-ceilo", tone: "#1F3F5A", kind: "Ceilings · Soffit slats", finish: "Soffit slats" },
];

export const applications = [
  { n: "01 / Living spaces", title: "Walls with presence", id: "bella-ceilo", sub: "Ceiling slats and wall surfaces for living areas." },
  { n: "02 / Louvers & cladding", title: "Give texture a place", id: "groove-forest", sub: "Louvers that bring rhythm to a wall." },
  { n: "03 / Decorative details", title: "The finer things", id: "faded", sub: "Acrylic laminates in suede, glossy and matt." },
];

export const why = [
  ["A wide range", "From laminates and acrylics to louvers, panels and ceiling slats, Rang covers many designs and finishes, so one supplier can serve a whole project."],
  ["Reliable delivery", "A great product only helps if it arrives when you need it. We plan our service around keeping delivery dates."],
  ["Trust you can build on", "We stand behind quality and timing, and we keep our promises to dealers, designers and customers alike."],
  ["Care for your space", "We want your room to feel like you. Our team helps you choose finishes that suit the space and its purpose."],
  ["Steady quality", "We keep refining our ranges, so new designs arrive modern, distinctive and consistent with what you already know."],
  ["Design with a point of view", "Every collection is developed to look good and stand apart, so your space has something worth showing off."],
];

export const events = [
  ["Mumbai Event", "https://rangdecor.in/gallery/11/"], ["Bangalore Event", "https://rangdecor.in/gallery/12/"],
  ["Indiawood Exhibition", "https://rangdecor.in/gallery/14/"], ["IIID Exhibition Hyderabad", "https://rangdecor.in/gallery/15/"],
];

export const contact = {
  address: ["14-1-395/1, New Aghapura Rd", "Hyderabad-01, Telangana 500001"],
  phone: "+91 8297 585 000", whatsapp: "https://wa.me/918297585000", hours: "Mon–Sat 9:30am–6:30pm",
  email: "info@rangdecor.in", hr: "hr@rangdecor.in",
  map: "https://www.google.com/maps/search/?api=1&query=14-1-395%20Aghapura%20Rd%20Hyderabad%20Telangana%20500001",
  social: [["Instagram", "https://www.instagram.com/rangdecor.in/"], ["Facebook", "https://www.facebook.com/rang.decor.9"], ["Pinterest", "https://in.pinterest.com/rangdecor/boards/"], ["LinkedIn", "http://www.linkedin.com/in/bhandari-agencies-private-limited-9660842b7"]],
};

export const rooms = [["Living Room", "living-room"], ["Kitchen", "kitchen"], ["Wardrobe", "wardrobe"], ["Shopping Mall", "shopping-mall"]];

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/collections", menu: "products" },
  { label: "Catalogues", href: "/catalogue", menu: "catalogues" },
  { label: "Visualizer", href: "/visualizer/living-room" },
  { label: "Gallery", href: "/gallery" },
  { label: "Our Team", href: "/team" },
  { label: "Our Network", href: "/network" },
  { label: "Contact", href: "/contact" },
];
