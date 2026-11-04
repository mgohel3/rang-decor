import "./rang.css";
import { Effects } from "@/components/rd/Effects";
import { Header } from "@/components/rd/Header";
import { Footer } from "@/components/rd/Footer";

export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="rd">
    <Effects/>
    <Header/>
    <main>{children}</main>
    <Footer/>
  </div>;
}
