import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Visualizer } from "@/components/Visualizer";
import { getFamilies, getRooms } from "@/data/content";


export function generateStaticParams() { return getRooms().map(r => ({ area: r.id })); }

export async function generateMetadata({ params }: { params: Promise<{ area: string }> }): Promise<Metadata> {
  const { area } = await params;
  const room = getRooms().find(r => r.id === area);
  if (!room) return {};
  const title = `${room.name} visualizer: try Rang finishes on the wall`;
  const description = `Preview Rang Décor louvers, laminates and acrylics in a ${room.name.toLowerCase()} setting. Pick a finish and see how it changes the room.`;
  return { title, description, alternates: { canonical: `/visualizer/${room.id}` }, openGraph: { title, description, url: `/visualizer/${room.id}` } };
}

export default async function VisualizerPage({ params }: { params: Promise<{ area: string }> }) {
  const { area } = await params;
  const rooms = getRooms();
  const room = rooms.find(r => r.id === area);
  if (!room) notFound();
  return <div className="rd-wrap rd-page">
    <Visualizer base="" room={room} rooms={rooms} families={getFamilies()}/>
    <section style={{ marginTop: "var(--sec)", maxWidth: "46rem" }}>
      <h2 className="rd-h3" style={{ marginBottom: "1rem" }}>How the visualizer works</h2>
      <p className="rd-lead">Choose a room, pick a product family, then click any finish to see it applied to the {room.name.toLowerCase()} wall. It is a quick way to compare louvers, laminates and acrylics before you order a physical sample. Screen colours can differ slightly from the real sheet.</p>
    </section>
  </div>;
}
