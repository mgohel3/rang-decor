import { redirect } from "next/navigation";

export default async function VisualizerIndex({ params }: { params: Promise<{ direction: string }> }) {
  const { direction } = await params;
  redirect(`/demo/${direction}/visualizer/living-room`);
}
