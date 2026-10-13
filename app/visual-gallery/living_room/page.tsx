import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export default function VisualizerPreview() {
  return <main className="visualizer-hold">
    <span className="eyebrow">RANG DÉCOR / VISUALIZER PREVIEW</span>
    <h1>Imagine a surface<br/><em>in your space.</em></h1>
    <p>The live room visualizer is intentionally left as a placeholder for this client review prototype.</p>
    <div><Link href="/demo/01-editorial"><ArrowLeft size={15}/> Return to the homepage</Link><a href="#">Visualizer preview <ArrowUpRight size={15}/></a></div>
  </main>;
}
