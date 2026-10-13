"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { products } from "@/data/site";

type Category = "Laminates" | "Louvers" | "Panels";
const productCategories: Record<string, Category> = {
  "Bern-Thermo": "Laminates",
  Faded: "Laminates",
  Maskara: "Laminates",
  ONIT: "Louvers",
  "charco-charm": "Panels",
  "groove-earth": "Louvers",
  "groove-forest": "Louvers",
  "groove-pastel": "Louvers",
};
const filters = ["All collections", "Laminates", "Louvers", "Panels"] as const;

export function CollectionShop({ base }: { base: string }) {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All collections");
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("featured");

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    const result = products.filter(product => {
      const category = productCategories[product.slug];
      const matchesCategory = activeFilter === "All collections" || category === activeFilter;
      const matchesQuery = !normalizedQuery || `${product.name} ${product.caption} ${category}`.toLocaleLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
    if (sortOrder === "az") result.sort((a, b) => a.name.localeCompare(b.name));
    if (sortOrder === "za") result.sort((a, b) => b.name.localeCompare(a.name));
    return result;
  }, [activeFilter, query, sortOrder]);

  return <section className="collection-shop" id="shop-collections" aria-label="Browse Rang Décor collections">
    <div className="collection-shop-controls">
      <div className="shop-filter-list" role="group" aria-label="Filter collections by category">
        {filters.map(filter => <button type="button" key={filter} className={activeFilter === filter ? "is-active" : ""} aria-pressed={activeFilter === filter} onClick={() => setActiveFilter(filter)}>{filter}</button>)}
      </div>
      <div className="shop-tools">
        <label className="shop-search"><Search size={16}/><span className="sr-only">Search collections</span><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search surfaces" type="search" /></label>
        <label className="shop-sort"><SlidersHorizontal size={15}/><span className="sr-only">Sort collections</span><select value={sortOrder} onChange={event => setSortOrder(event.target.value)}><option value="featured">Featured</option><option value="az">Name: A to Z</option><option value="za">Name: Z to A</option></select></label>
      </div>
    </div>

    <div className="collection-shop-summary" aria-live="polite"><span>{visibleProducts.length} {visibleProducts.length === 1 ? "collection" : "collections"}</span><span>DESIGNED FOR THE WAY YOU LIVE</span></div>

    {visibleProducts.length ? <div className="collection-shop-grid">
      {visibleProducts.map((product, index) => <Link className="shop-product-card" href={`${base}/product/${product.slug}`} key={product.slug}>
        <div className="shop-product-image"><Image src={product.image} alt={`${product.name} decorative surface collection`} fill sizes="(max-width: 620px) 88vw, (max-width: 980px) 45vw, 30vw"/><span className="shop-product-number">{String(index + 1).padStart(2, "0")}</span><span className="shop-product-badge">{productCategories[product.slug]}</span><span className="shop-product-action" aria-hidden="true"><ArrowUpRight size={18}/></span></div>
        <div className="shop-product-info"><div><span className="shop-product-kicker">RANG DÉCOR · SIGNATURE COLLECTION</span><h2>{product.name}</h2><p>{product.caption}</p></div><ArrowRight className="shop-product-arrow" size={17}/></div>
      </Link>)}
    </div> : <div className="shop-empty-state"><span>No matching surfaces</span><p>Try another name or choose a different category.</p><button type="button" onClick={() => { setQuery(""); setActiveFilter("All collections"); }}>Clear filters</button></div>}
  </section>;
}
