import { ArrowUpRight } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-20 pt-6 pb-4 max-md:px-6 max-md:pt-5">
      {/* Logo */}
      <button className="select-none border-none bg-transparent p-0 font-display text-[40px] leading-none text-black max-md:text-[32px]">
        ML Studio
      </button>

      {/* Center navigation */}
      <div className="absolute left-1/2 flex -translate-x-1/2 gap-8 max-md:hidden">
        <button className="border-none bg-transparent font-sans text-[15px] font-medium uppercase tracking-[0.04em] text-[#1a1a1a] transition-opacity hover:opacity-55">
          Workflow
        </button>

        <button className="border-none bg-transparent font-sans text-[15px] font-medium uppercase tracking-[0.04em] text-[#1a1a1a] transition-opacity hover:opacity-55">
          Knowledge Base
        </button>

        <button className="border-none bg-transparent font-sans text-[15px] font-medium uppercase tracking-[0.04em] text-[#1a1a1a] transition-opacity hover:opacity-55">
          Docs
        </button>
      </div>

      {/* Right side */}
      <button className="flex items-center gap-1.5 rounded-full border-none bg-[#0a0a0a] px-5 py-3.5 font-sans text-[15px] font-medium uppercase tracking-[0.04em] text-white transition-all hover:bg-[#333] active:scale-95">
        Get Started
        <ArrowUpRight className="h-4 w-4" />
      </button>
    </nav>
  );
}