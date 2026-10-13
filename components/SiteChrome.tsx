"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowDown, ArrowRight, ArrowUpRight, ChevronDown, Instagram, Facebook, Linkedin, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { directions, galleryCategories, products } from "@/data/site";
import { FooterWave } from "@/components/FooterWave";

export function Header({ direction = "01-editorial" }: { direction?: string }) {
  const [menu, setMenu] = useState<{ pathname: string; open: boolean; dropdown: string | null }>({ pathname: "", open: false, dropdown: null });
  const pathname = usePathname();
  const samePath = menu.pathname === pathname;
  const open = samePath && menu.open;
  const activeDropdown = samePath ? menu.dropdown : null;
  const base = `/demo/${direction}`;
  const updateMenu = (next: Partial<Pick<typeof menu, "open" | "dropdown">>) => setMenu(current => ({
    pathname,
    open: current.pathname === pathname ? current.open : false,
    dropdown: current.pathname === pathname ? current.dropdown : null,
    ...next,
  }));
  const closeMenu = () => updateMenu({ open: false, dropdown: null });
  const toggleDropdown = (name: string) => updateMenu({ dropdown: activeDropdown === name ? null : name });

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setMenu({ pathname: window.location.pathname, open: false, dropdown: null }); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return <header className="site-header" style={{ viewTransitionName: "site-header" }}>
    <Link href={`/demo/${direction}`} className="brand" aria-label="Rang Decor home"><Image src="/images/rang-header.svg" alt="Rang Decor, Let’s Live Beautiful" width={126} height={46} priority unoptimized /></Link>
    <nav id="rang-main-nav" className={`main-nav ${open ? "nav-open" : ""}`} aria-label="Main navigation">
      <Link href={`${base}/about`} onClick={closeMenu}>About</Link>
      <div className="nav-group">
        <button className="nav-trigger" aria-expanded={activeDropdown === "products"} aria-controls="products-menu" onClick={() => toggleDropdown("products")}>Products <ArrowDown size={12}/></button>
        <div id="products-menu" className={`nav-popover ${activeDropdown === "products" ? "nav-popover-open" : ""}`}>
          <Link href={`${base}/collections`} onClick={closeMenu}>All collections<ArrowRight size={12}/></Link>
          {products.map(product => <Link key={product.slug} href={`${base}/product/${product.slug}`} onClick={closeMenu}>{product.name}<ArrowRight size={12}/></Link>)}
        </div>
      </div>
      <div className="nav-group">
        <button className="nav-trigger" aria-expanded={activeDropdown === "catalogue"} aria-controls="catalogue-menu" onClick={() => toggleDropdown("catalogue")}>Catalogue <ArrowDown size={12}/></button>
        <div id="catalogue-menu" className={`nav-popover ${activeDropdown === "catalogue" ? "nav-popover-open" : ""}`}>
          <Link href={`${base}/catalogue`} onClick={closeMenu}>Browse catalogue library<ArrowRight size={12}/></Link>
          {["Bern Thermo Lam", "Faded", "ONIT", "Groove Forest", "Maskara"].map(name => <Link key={name} href={`${base}/catalogue`} onClick={closeMenu}>{name}<ArrowRight size={12}/></Link>)}
        </div>
      </div>
      <a href="#" onClick={closeMenu}>Visualizer</a>
      <div className="nav-group">
        <button className="nav-trigger" aria-expanded={activeDropdown === "gallery"} aria-controls="gallery-menu" onClick={() => toggleDropdown("gallery")}>Gallery <ArrowDown size={12}/></button>
        <div id="gallery-menu" className={`nav-popover ${activeDropdown === "gallery" ? "nav-popover-open" : ""}`}>
          {galleryCategories.map(category => <a key={category} href="#gallery" onClick={closeMenu}>{category.replaceAll("_", " ")}<ArrowRight size={12}/></a>)}
        </div>
      </div>
      <Link href={`${base}/about#approach`} onClick={closeMenu}>Our Approach</Link>
      <Link href={`${base}/about#network`} onClick={closeMenu}>Our Network</Link>
      <Link href={`${base}/contact`} className="nav-contact" onClick={closeMenu}>Contact <ArrowRight size={13}/></Link>
    </nav>
    <button className="menu-toggle" aria-label={open ? "Close menu" : "Open menu"} aria-controls="rang-main-nav" aria-expanded={open} onClick={() => updateMenu({ open: !open })}>{open ? <X/> : <Menu/>}</button>
  </header>;
}

export function DemoSelector() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const current = directions.find(direction => pathname?.includes(`/demo/${direction.id}`)) ?? directions[0];

  useEffect(() => {
    const footer = document.querySelector(".footer");
    if (!footer) return;
    const observer = new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting), { threshold: 0.08 });
    observer.observe(footer);
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setExpanded(false); };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return <aside className={`demo-rail ${expanded ? "is-expanded" : ""} ${footerVisible ? "footer-is-visible" : ""}`} aria-label="Design demo selector">
    <div className="demo-rail-pill">
      <span className="demo-current"><i>{String(directions.findIndex(item => item.id === current.id) + 1).padStart(2, "0")}</i>{current.name}</span>
      <button type="button" className="demo-rail-toggle" aria-expanded={expanded} aria-controls="demo-direction-panel" onClick={() => setExpanded(value => !value)}>
        Directions <ChevronDown size={14}/>
      </button>
    </div>
    <AnimatePresence>
      {expanded && <motion.nav id="demo-direction-panel" className="demo-direction-panel" aria-label="Choose a design direction"
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: .2 }}>
        <Link href="/directions" onClick={() => setExpanded(false)}>All directions <ArrowUpRight size={14}/></Link>
        {directions.map((direction, index) => <Link className={current.id === direction.id ? "is-current" : ""} href={`/demo/${direction.id}`} key={direction.id} onClick={() => setExpanded(false)}>
          <i>{String(index + 1).padStart(2, "0")}</i><span>{direction.name}</span>{current.id === direction.id && <span className="demo-current-mark">Current</span>}
        </Link>)}
      </motion.nav>}
    </AnimatePresence>
  </aside>;
}

export function Footer({ direction = "01-editorial" }: { direction?: string }) {
  const base = `/demo/${direction}`;
  return <footer className="footer">
    <FooterWave />
    <div className="footer-top">
      <div className="footer-brand-group">
        <Link href={`/demo/${direction}`} className="brand"><Image src="/images/rang-header.svg" alt="Rang Decor, Let’s Live Beautiful" width={126} height={46} unoptimized /></Link>
        <span className="footer-brand-divider" aria-hidden="true" />
        <Image className="footer-group-mark" src="/images/bhandari-group.svg" alt="A Bhandari Group initiative" width={48} height={48} unoptimized />
      </div>
      <p>Surfaces for spaces<br/>that feel like yours.</p>
      <Link className="footer-enquire" href={`${base}/contact`}>Begin a conversation <ArrowRight size={16}/></Link>
    </div>
    <div className="footer-bottom">
      <div><span>Explore</span><Link href={`${base}/collections`}>Collections</Link><Link href={`${base}/catalogue`}>Catalogue library</Link><a href="#">Visualizer</a></div>
      <div><span>Rang Décor</span><Link href={`${base}/about`}>About</Link><Link href={`${base}/about#network`}>Our Network</Link><Link href={`${base}/contact`}>Contact</Link></div>
      <div><span>Find us</span><a href="mailto:info@rangdecor.in">info@rangdecor.in</a><a href="tel:+918297585000">+91 8297 585 000</a><p>14-1-395/1, New Aghapura Rd,<br/>Hyderabad, Telangana, India</p><div className="footer-social"><a href="#" aria-label="Instagram"><Instagram size={17}/><span>Instagram</span></a><a href="#" aria-label="Facebook"><Facebook size={17}/><span>Facebook</span></a><a href="#" aria-label="LinkedIn"><Linkedin size={17}/><span>LinkedIn</span></a></div></div>
    </div>
    <div className="footer-legal"><span>© Rang Décor · Let’s Live Beautiful</span><div><a href="#">Privacy</a><a href="#">Terms</a></div><span>Designed &amp; developed by Karya Graphito</span></div>
    <a className="whatsapp-float" href="https://wa.me/918297585000" target="_blank" rel="noreferrer" aria-label="Chat with Rang Décor on WhatsApp">
      <span className="whatsapp-pulse" aria-hidden="true" />
      <svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16.03 3.2a12.65 12.65 0 0 0-10.8 19.23L3.5 28.8l6.52-1.71A12.65 12.65 0 1 0 16.03 3.2Zm0 23.02c-1.93 0-3.82-.52-5.47-1.51l-.39-.23-3.87 1.01 1.03-3.77-.25-.4a10.54 10.54 0 1 1 8.95 4.9Zm5.79-7.9c-.32-.16-1.91-.94-2.21-1.04-.3-.11-.51-.16-.72.16-.22.32-.83 1.04-1.02 1.25-.19.21-.37.24-.69.08-.32-.16-1.36-.5-2.59-1.58-.96-.85-1.61-1.91-1.8-2.23-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.73-.99-2.37-.26-.62-.53-.54-.72-.55h-.61c-.21 0-.56.08-.86.4-.3.32-1.12 1.1-1.12 2.67s1.15 3.1 1.31 3.31c.16.21 2.26 3.45 5.47 4.84.76.33 1.35.53 1.81.68.76.24 1.45.21 2 .13.61-.09 1.91-.78 2.18-1.53.27-.75.27-1.39.19-1.53-.08-.13-.29-.21-.61-.37Z"/></svg>
      <span className="whatsapp-label">Let’s talk</span>
    </a>
  </footer>;
}
