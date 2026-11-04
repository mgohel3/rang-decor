import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { INDEXABLE, SITE_URL } from "@/data/seo";

const display = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-display", display: "swap" });
const sans = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-sans", display: "swap" });

const description = "Rang Décor, a Bhandari Group initiative in Hyderabad, offers decorative laminates, acrylic sheets, louvers, wall panels and ceiling slats. Browse collections, codes and catalogues.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Rang Décor | Decorative laminates, louvers and wall panels in Hyderabad", template: "%s | Rang Décor" },
  description,
  applicationName: "Rang Décor",
  alternates: { canonical: "/" },
  robots: INDEXABLE ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: { type: "website", siteName: "Rang Décor", locale: "en_IN", url: "/", title: "Rang Décor | Let’s live beautiful", description, images: [{ url: "/images/og-rang.jpg", width: 1200, height: 630, alt: "Rang Décor walnut louver wall in a living room" }] },
  twitter: { card: "summary_large_image", title: "Rang Décor | Let’s live beautiful", description, images: ["/images/og-rang.jpg"] },
  icons: { icon: "/images/bhandari-group.svg", shortcut: "/images/bhandari-group.svg", apple: "/images/bhandari-group.svg" },
};

export const viewport: Viewport = { themeColor: "#FFFFFF", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-IN" className={`${display.variable} ${sans.variable}`}><body>{children}</body></html>;
}
