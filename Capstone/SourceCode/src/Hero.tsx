import UploadCard from "./UploadCard";

export default function Hero() {
  return (
    <section className="flex min-h-[calc(100svh-90px)] flex-col items-center px-6 pb-24 pt-16 text-center">
      <h1
        className="
          mb-5 max-w-[820px]
          font-sans text-[clamp(40px,6vw,68px)]
          font-medium leading-[1.05]
          tracking-[-0.04em]
          text-[#1a1a1a]
        "
      >
        Train smarter. Not harder.
      </h1>

      <p
        className="
          mb-10 max-w-[560px]
          font-sans text-xl font-medium
          leading-relaxed
          text-[#767676]
        "
      >
        Upload your dataset and let AI analyze its characteristics,
        recommend preprocessing, and help you choose the right model.
      </p>

      <UploadCard />
    </section>
  );
}