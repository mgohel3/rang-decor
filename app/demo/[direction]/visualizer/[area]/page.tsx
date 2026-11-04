import { notFound } from "next/navigation";
import { DemoSelector, Footer, Header } from "@/components/SiteChrome";
import { Visualizer } from "@/components/Visualizer";
import { getFamilies, getRooms } from "@/data/content";

export default async function VisualizerPage({ params }: { params: Promise<{ direction: string; area: string }> }) {
  const { direction, area } = await params;
  const rooms = getRooms();
  const room = rooms.find(r => r.id === area);
  if (!room) notFound();
  return <main className="subpage site viz-page">
    <DemoSelector/><Header direction={direction}/>
    <Visualizer base={`/demo/${direction}`} room={room} rooms={rooms} families={getFamilies()} />
    <Footer direction={direction}/>
  </main>;
}
