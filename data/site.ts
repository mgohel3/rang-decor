export const directions = [
  { id: "01-editorial", name: "Editorial Surface Atelier", note: "Magazine inspired · Warm · Image led", mood: "A measured, tactile story told through light, material and composition." },
  { id: "02-architectural", name: "Architectural Material Lab", note: "Precise · Structured · Product focused", mood: "A considered system for architects to compare surfaces and applications." },
  { id: "03-contemporary", name: "Contemporary Indian Living", note: "Lived in · Warm · Expressive", mood: "Modern Indian interiors, grounded in natural tones and everyday rituals." },
  { id: "04-luxury", name: "Modern Luxury Surfaces", note: "Cinematic · Dramatic · Restrained", mood: "Deep contrast, sculptural forms and quiet confidence." },
] as const;

export const products = [
  { name: "Bern-Thermo", slug: "Bern-Thermo", image: "/images/bern.png", caption: "Thermo mica · Architectural warmth" },
  { name: "Faded", slug: "Faded", image: "/images/faded.png", caption: "Acrylic laminates · Soft light" },
  { name: "ONIT", slug: "ONIT", image: "/images/onit.png", caption: "Charcoal louvers · Linear depth" },
  { name: "Charco-Charm", slug: "charco-charm", image: "/images/charco.png", caption: "Charcoal panels · Tactile rhythm" },
  { name: "Groove-Earth", slug: "groove-earth", image: "/images/groove-earth.png", caption: "Decorative louvers · Earth tones" },
  { name: "Groove-Forest", slug: "groove-forest", image: "/images/groove-forest.png", caption: "Wood shade louvers · Natural character" },
  { name: "Groove-Pastel", slug: "groove-pastel", image: "/images/groove-pastel.png", caption: "Pastel series · A softer expression" },
  { name: "Maskara", slug: "maskara", image: "/images/maskara.png", caption: "Acrylic series · A play of reflection" },
] as const;

export const catalogues = [
  ["Charco-Charm", "charco_charm.pdf", "/images/charco.png"], ["Groove Pastel", "groove_pastel.pdf", "/images/groove-pastel.png"],
  ["Groove Earth", "groove_earth.pdf", "/images/groove-earth.png"], ["Groove Forest", "groove_forest.pdf", "/images/groove-forest.png"],
  ["Maskara", "maskara.pdf", "/images/maskara.png"], ["Interlockit", "interlockit.pdf", "/images/interlockit-catalog.png"],
  ["Nazrana", "nazrana.pdf", "/images/nazrana-catalog.png"], ["Art By One", "art_by_one.pdf", "/images/art-by-one.png"],
  ["Litia", "litia.pdf", "/images/litia-catalog.png"], ["Onit", "onit.pdf", "/images/onit.png"],
  ["Inner Laminate", "", ""], ["Wallmate", "wallmate.pdf", "/images/wallmate.png"],
  ["Faded", "faded_.pdf", "/images/faded.png"], ["Bern Thermo Lam", "bern_thermo.pdf", "/images/bern.png"],
  ["Bella Ceilo", "bella_ceilo.pdf", "/images/bella-ceilo.png"],
] as const;

export const galleryCategories = ["Mumbai_Event", "Bangalore_Event", "Indiawood_Exhibition", "IIID_Exhibition_Hyderabad"];

