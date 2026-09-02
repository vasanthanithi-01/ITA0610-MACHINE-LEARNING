import Navbar from "../components/Navbar";
import DatasetAnalysis from "../components/DatasetAnalysis";

export default function Analysis() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Same background as the home page */}
      <video
        className="fixed inset-0 z-0 h-full w-full object-cover"
        src="https://pollen-batch-41236914.figma.site/_components/v2/f0ee2dae7671c170c34f12e31c4cb41418976c98/769c564298c132f7919405cd9f17c1b1231f341d.769c5642.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Soft overlay */}
      <div className="fixed inset-0 z-[1] bg-white/55" />

      {/* Page content */}
      <div className="relative z-[2] mx-auto max-w-[1360px]">
        <Navbar />

        <DatasetAnalysis />
      </div>
    </main>
  );
}