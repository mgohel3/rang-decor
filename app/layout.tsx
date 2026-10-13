import type { Metadata } from "next";
import "./globals.css";
import "./prototype-polish.css";
import { PageTransition } from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "Rang Décor | Materials in Motion",
  description: "Discover decorative laminates, louvers and architectural surfaces from Rang Décor. Explore four new digital design directions.",
  icons: { icon: "/images/bhandari-group.svg", shortcut: "/images/bhandari-group.svg", apple: "/images/bhandari-group.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><PageTransition>{children}</PageTransition></body></html>;
}
