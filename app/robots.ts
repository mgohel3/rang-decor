import type { MetadataRoute } from "next";
import { INDEXABLE, SITE_URL } from "@/data/seo";

export default function robots(): MetadataRoute.Robots {
  // While this site is a preview, keep every search engine out; flip NEXT_PUBLIC_INDEXABLE=true at launch.
  if (!INDEXABLE) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/demo/", "/directions"] }, sitemap: `${SITE_URL}/sitemap.xml`, host: SITE_URL };
}
