import { redirect } from "next/navigation";

// Old live-site address; keep it working.
export default function OldVisualizerUrl() {
  redirect("/visualizer/living-room");
}
