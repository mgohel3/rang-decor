import { redirect } from "next/navigation";
import { products } from "@/data/site";
export default async function CanonicalProduct({ params }: { params: Promise<{slug:string}> }) { const {slug}=await params; const product=products.find(p=>p.slug.toLowerCase()===slug.toLowerCase()); if(!product) redirect("/demo/01-editorial/collections"); redirect(`/demo/01-editorial/product/${product.slug}`); }
