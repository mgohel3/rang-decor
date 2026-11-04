// Content for the redesigned site. Facts (names, descriptions, catalogue files, contact) come from
// DESIGN.md / rangdecor.in. When the CMS is ready, replace these exports with loaders; pages stay the same.

const PDF = "https://rangdecor.in/static/front/catalogues/";

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
  { id: "groove-earth", name: "Groove Earth", group: "louvers", kind: "Decorative louvers", desc: "Decorative 5 inch width louvers crafted for premium spaces.", src: photo("groove-earth.png"), cover: true, pdf: PDF + "groove_earth.pdf", family: "groove-earth" },
  { id: "groove-forest", name: "Groove Forest", group: "louvers", kind: "Wooden shade louvers", desc: "Modern textures bringing classic finish to everyday living space.", long: "Groove is the latest and an exotic product line from Rang Décor. The highlighter product line ensures strength and beauty to be lasting and bring a zestful induce of global standards in your space decor.", src: photo("groove-forest.png"), cover: true, pdf: PDF + "groove_forest.pdf", family: "groove-forest" },
  { id: "groove-pastel", name: "Groove Pastel", group: "louvers", kind: "Pastel louvers", desc: "Soft elegant shades crafted for modern soothing interiors.", src: photo("groove-pastel.png"), cover: true, pdf: PDF + "groove_pastel.pdf", family: "groove-pastel" },
  { id: "onit", name: "ONIT", group: "louvers", kind: "Charcoal louvers", desc: "Contemporary charcoal textures for premium wall applications.", src: logo("onit"), cover: false, pdf: PDF + "onit.pdf", family: "onit" },
  { id: "wallmate", name: "Wallmate", group: "louvers", kind: "Designer wall louvers", desc: "Innovative wall surfaces for elegant modern interiors.", src: logo("wallmate"), cover: false, pdf: PDF + "wallmate.pdf" },
  { id: "art-by-one", name: "Art by One", group: "louvers", kind: "Seamlessfit louvers", desc: "Stylish seamless louvers with hassle free panel fitting.", src: photo("art-by-one.png"), cover: true, pdf: PDF + "art_by_one.pdf" },
  { id: "interlockit", name: "Interlockit", group: "panels", kind: "Luxury wall clads", desc: "Designer wall solutions for sophisticated interior spaces.", src: logo("interlockit"), cover: false, pdf: PDF + "interlockit.pdf" },
  { id: "charco-charm", name: "Charco Charm", group: "panels", kind: "Charcoal interior panels", desc: "Stylish panel collections for elegant interior environments.", long: "Charcocharm is a premium 8 ft x 2 ft decorative charcoal panel designed to elevate interior aesthetics. Perfect for living rooms, bedrooms, and office settings.", src: photo("charco.png"), cover: true, pdf: PDF + "charco_charm.pdf", family: "charco-charm" },
  { id: "nazrana", name: "Nazrana", group: "panels", kind: "Engraved mirror panels", desc: "Reflective designer surfaces with elegant engraved detailing.", src: logo("nazrana"), cover: false, pdf: PDF + "nazrana.pdf" },
  { id: "bern", name: "Bern Thermo", group: "laminates", kind: "Meta thermo mica", desc: "Premium thermo mica series for refined modern interiors.", long: "Bern Thermo Mica is a premium 1 mm thick thermo-mica sheet, available in a standard size of 8 ft x 4 ft, in solid glossy, matt, metallic, sparkle, texture, veneer and glass rustic finishes.", src: photo("bern.png"), cover: true, pdf: PDF + "bern_thermo.pdf", family: "bern-thermo" },
  { id: "faded", name: "Faded", group: "laminates", kind: "Acrylic laminates", desc: "Exclusive 2mm acrylic laminates in suede, glossy and matt surfaces.", src: photo("faded.png"), cover: true, pdf: PDF + "faded_.pdf", family: "faded" },
  { id: "litia", name: "Litia", group: "laminates", kind: "Acrylic fluted laminates", desc: "Luxury acrylic fluted laminates with sophisticated visual appeal.", src: logo("litia"), cover: false, pdf: PDF + "litia.pdf" },
  { id: "maskara", name: "Maskara", group: "laminates", kind: "Acrylic series", desc: "Designer acrylic panels for aesthetically best interiors.", src: logo("maskara"), cover: false, pdf: PDF + "maskara.pdf", family: "maskara" },
  { id: "bella-ceilo", name: "Bella Ceilo", group: "ceilings", kind: "Ceiling slat solutions", desc: "Decorative soffit slats with ultimate architectural appeal.", src: photo("bella-ceilo.png"), cover: true, pdf: PDF + "bella_ceilo.pdf" },
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
  ["Range of Products", "Explore an extensive range of products at Rang. With a wide variety of designs and finishes available, you can bring your dream spaces to life with plenty of beautiful choices."],
  ["Our Service", "Our timely services ensure a seamless experience. We believe that even the best creations lose their value if not delivered on time, so we thrive to be punctual."],
  ["Credibility", "Rang stands for trust and reliability. We are committed to delivering excellence, always on time, without compromising on quality."],
  ["Our Commitment", "We are dedicated to transforming your space into something truly remarkable, something that reflects your personality and makes a lasting impression, every time."],
  ["Product Quality", "At Rang, we believe in continuous improvement and innovation. Our designs are unique, modern, and crafted to stand out in the market."],
  ["Exhibit Aesthetic", "Rang promises to design for you what you could flaunt. Aesthetic concepts lead to trend-setting decor."],
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
  { label: "Our Network", href: "/network" },
  { label: "Contact", href: "/contact" },
];
