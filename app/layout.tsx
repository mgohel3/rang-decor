import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";

const display = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-display", display: "swap" });
const sans = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  title: "Rang Décor | Let’s live beautiful",
  description: "Louvers, panels, laminates and ceiling slats from Rang Décor, an initiative of the Bhandari Group. Explore collections, catalogues and the visualizer.",
  icons: { icon: "/images/bhandari-group.svg", shortcut: "/images/bhandari-group.svg", apple: "/images/bhandari-group.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${display.variable} ${sans.variable}`}><body>{children}</body></html>;
}
