import { notFound } from "next/navigation";
import { Visualizer } from "@/components/Visualizer";
import { getFamilies, getRooms } from "@/data/content";

export const metadata = { title: "Visualizer | Rang Décor" };

export function generateStaticParams() { return getRooms().map(r => ({ area: r.id })); }

export default async function VisualizerPage({ params }: { params: Promise<{ area: string }> }) {
  const { area } = await params;
  const rooms = getRooms();
  const room = rooms.find(r => r.id === area);
  if (!room) notFound();
  return <div className="rd-wrap rd-page"><Visualizer base="" room={room} rooms={rooms} families={getFamilies()}/></div>;
}
