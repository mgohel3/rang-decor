import { notFound } from "next/navigation";
import { directions } from "@/data/site";
import { Homepage } from "@/components/Homepage";

export function generateStaticParams() { return directions.map(({ id }) => ({ direction: id })); }
export default async function DirectionPage({ params }: { params: Promise<{ direction: string }> }) {
  const { direction } = await params;
  if (!directions.some(d => d.id === direction)) notFound();
  return <Homepage direction={direction}/>;
}
