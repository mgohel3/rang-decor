// Rang depot and channel-partner cities, taken from the client's "Our stock points" map.
// Coordinates are approximate city centres. When the CMS is ready, replace this list with a loader.
export type NodeKind = "hq" | "company" | "distribution";
export type Place = { city: string; region: string; kind: NodeKind; lat: number; lng: number };

export const kinds: Record<NodeKind, { label: string; color: string }> = {
  hq: { label: "Head office and manufacturing", color: "#E01080" },
  company: { label: "Company stock point", color: "#D5361E" },
  distribution: { label: "Distribution stock point", color: "#6D6862" },
};

export const places: Place[] = [
  { city: "Hyderabad", region: "Telangana", kind: "hq", lat: 17.385, lng: 78.4867 },
  { city: "Ahmedabad", region: "Gujarat", kind: "company", lat: 23.0225, lng: 72.5714 },
  { city: "New Delhi", region: "Delhi", kind: "company", lat: 28.6139, lng: 77.209 },
  { city: "Raipur", region: "Chhattisgarh", kind: "company", lat: 21.2514, lng: 81.6296 },
  { city: "Jaipur", region: "Rajasthan", kind: "distribution", lat: 26.9124, lng: 75.7873 },
  { city: "Indore", region: "Madhya Pradesh", kind: "distribution", lat: 22.7196, lng: 75.8577 },
  { city: "Pune", region: "Maharashtra", kind: "distribution", lat: 18.5204, lng: 73.8567 },
  { city: "Bengaluru", region: "Karnataka", kind: "distribution", lat: 12.9716, lng: 77.5946 },
  { city: "Vijayawada", region: "Andhra Pradesh", kind: "distribution", lat: 16.5062, lng: 80.648 },
  { city: "Bhubaneswar", region: "Odisha", kind: "distribution", lat: 20.2961, lng: 85.8245 },
  { city: "Jabalpur", region: "Madhya Pradesh", kind: "distribution", lat: 23.1815, lng: 79.9864 },
  { city: "Lucknow", region: "Uttar Pradesh", kind: "distribution", lat: 26.8467, lng: 80.9462 },
  { city: "Coimbatore", region: "Tamil Nadu", kind: "distribution", lat: 11.0168, lng: 76.9558 },
  { city: "Mumbai", region: "Maharashtra", kind: "distribution", lat: 19.076, lng: 72.8777 },
  { city: "Hubballi", region: "Karnataka", kind: "distribution", lat: 15.3647, lng: 75.124 },
  { city: "Haryana", region: "Haryana", kind: "distribution", lat: 29.0588, lng: 76.0856 },
  { city: "Ranchi", region: "Jharkhand", kind: "distribution", lat: 23.3441, lng: 85.3096 },
  { city: "Mohali", region: "Punjab", kind: "distribution", lat: 30.7046, lng: 76.7179 },
  { city: "Rajkot", region: "Gujarat", kind: "distribution", lat: 22.3039, lng: 70.8022 },
  { city: "Chennai", region: "Tamil Nadu", kind: "distribution", lat: 13.0827, lng: 80.2707 },
  { city: "Visakhapatnam", region: "Andhra Pradesh", kind: "distribution", lat: 17.6868, lng: 83.2185 },
  { city: "Kolkata", region: "West Bengal", kind: "distribution", lat: 22.5726, lng: 88.3639 },
  { city: "Guwahati", region: "Assam", kind: "distribution", lat: 26.1445, lng: 91.7362 },
  { city: "Ernakulam", region: "Kerala", kind: "distribution", lat: 9.9816, lng: 76.2999 },
];
