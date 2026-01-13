import Scene from "@/components/canvas/Scene";
import Overlay from "@/components/ui/Overlay";

export default function Home() {
  return (
    <main className="h-full w-full relative">
      <Overlay />
      <Scene />
    </main>
  );
}
