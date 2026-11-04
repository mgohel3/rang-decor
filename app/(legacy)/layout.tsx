import "../globals.css";
import "../prototype-polish.css";
import "../new-pages.css";
import type { Metadata } from "next";
import { PageTransition } from "@/components/PageTransition";

export const metadata: Metadata = { robots: { index: false, follow: false } };

// The four earlier design directions (/demo/*, /directions) keep their own styles.
export default function LegacyLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <PageTransition>{children}</PageTransition>;
}
