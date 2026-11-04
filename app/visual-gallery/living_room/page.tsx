import { redirect } from "next/navigation";

// Old live-site address; keep it working.
export default function OldVisualizerUrl() {
  redirect("/demo/01-editorial/visualizer/living-room");
}
