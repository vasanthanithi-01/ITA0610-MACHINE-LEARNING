import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <main className="relative min-h-svh w-full overflow-hidden bg-white">
      {/* Background video */}
      <video
        className="fixed inset-0 z-0 h-full w-full object-cover"
        src="https://pollen-batch-41236914.figma.site/_components/v2/f0ee2dae7671c170c34f12e31c4cb41418976c98/769c564298c132f7919405cd9f17c1b1231f341d.769c5642.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Gradient */}
      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-[1] h-[687px]"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)",
        }}
      />

      <div className="relative z-[2] mx-auto max-w-[1360px]">
        <Navbar />
        <Hero />
      </div>
    </main>
  );
}