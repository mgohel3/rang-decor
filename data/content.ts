// Single data layer for the new pages. When the CMS API is ready, replace the bodies of these
// loaders with fetch() calls; the page components keep working unchanged.
import visualizerData from "./visualizer.json";

export type Swatch = { code: string; image: string };
export type Family = { id: string; name: string; swatches: Swatch[] };
export type Room = { id: string; name: string; image: string };

export const getRooms = (): Room[] => visualizerData.areas;
export const getFamilies = (): Family[] => visualizerData.families.map(f => ({
  ...f,
  swatches: visualizerData.swatches.filter(s => s.family === f.id).map(s => ({ code: s.number, image: s.image })),
}));

export const HR_EMAIL = "hr@rangdecor.in";

// Mock content: replace with real roles from the client.
export const getRoles = (): { title: string; place: string; type: string; summary: string }[] => [];

// Mock content: replace with real quotes from the client.
export const getTestimonials = (): { quote: string; name: string; role: string; icon: "architect" | "designer" | "dealer" | "homeowner" }[] => [
  { quote: "The finishes photograph beautifully and hold up on site. Our clients keep asking which laminate we used.", name: "Placeholder name", role: "Architect, Hyderabad", icon: "architect" },
  { quote: "Choosing from the catalogue was simple, and the samples matched the catalogue closely.", name: "Placeholder name", role: "Interior designer, Mumbai", icon: "designer" },
  { quote: "Consistent supply and a team that answers quickly. That matters for our projects.", name: "Placeholder name", role: "Dealer partner, Bangalore", icon: "dealer" },
  { quote: "We changed our living room wall with one panel series and the room feels new.", name: "Placeholder name", role: "Homeowner, Hyderabad", icon: "homeowner" },
];

// Mock content: short blurbs shown on collection cards. Replace with client copy.
export const collectionInfo: Record<string, string> = {
  "Bern-Thermo": "Thermo-mica surfaces with a warm architectural character, made for feature walls and joinery.",
  "Faded": "Acrylic laminates with soft, washed-out colour and a gentle sheen.",
  "ONIT": "Charcoal louvers that add linear depth and rhythm to walls and ceilings.",
  "Charco-Charm": "Charcoal decorative panels with a tactile, hand-finished feel.",
  "Groove-Earth": "Decorative louvers in earthy tones for grounded, natural interiors.",
  "Groove-Forest": "Wood-shade louvers that bring natural character to any room.",
  "Groove-Pastel": "A softer pastel series for calm, light-filled spaces.",
  "Maskara": "An acrylic series with a play of light and reflection.",
};
