import "../globals.css";
import "../prototype-polish.css";
import "../new-pages.css";
import { PageTransition } from "@/components/PageTransition";

// The four earlier design directions (/demo/*, /directions) keep their own styles.
export default function LegacyLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <PageTransition>{children}</PageTransition>;
}
