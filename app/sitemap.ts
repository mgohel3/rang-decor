import type { MetadataRoute } from "next";
import { collections, rooms } from "@/data/rang";
import { SITE_URL } from "@/data/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" = "monthly") => ({ url: `${SITE_URL}${path}`, lastModified: now, changeFrequency, priority });
  return [
    page("/", 1, "weekly"), page("/collections", 0.9, "weekly"), page("/catalogue", 0.8), page("/about", 0.7), page("/network", 0.6), page("/gallery", 0.5),
    page("/contact", 0.8), page("/careers", 0.4), page("/testimonials", 0.4),
    ...rooms.map(([, id]) => page(`/visualizer/${id}`, 0.6)),
    ...collections.map(c => page(`/product/${c.id}`, 0.8)),
  ];
}
