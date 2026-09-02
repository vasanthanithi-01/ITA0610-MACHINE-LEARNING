import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

const applied = [
  {
    feature: "TotalCharges",
    method: "Median imputation",
    result: "240 missing values → 0",
  },
  {
    feature: "Contract",
    method: "One-hot encoding",
    result: "1 categorical feature → 3 encoded features",
  },
  {
    feature: "Churn",
    method: "Stratified split",
    result: "Class ratio preserved at 73 / 27",
  },
];

const skipped = [
  {
    feature: "Customer_ID",
    recommendation: "Remove feature",
    reason: "Skipped by user",
  },
];

export default function PreprocessingResults() {
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(true);
const [stage, setStage] = useState(0);

const stages = [
  "Checking dataset structure",
  "Handling missing values",
  "Encoding categorical features",
  "Cleaning duplicate rows",
  "Validating transformed dataset",
];

useEffect(() => {
  const timer = setInterval(() => {
    setStage((current) => {
      if (current >= stages.length - 1) {
        clearInterval(timer);

        setTimeout(() => {
          setProcessing(false);
        }, 600);

        return current;
      }

      return current + 1;
    });
  }, 600);

  return () => clearInterval(timer);
}, []);

if (processing) {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-white">
      <video
        className="fixed inset-0 z-0 h-full w-full object-cover"
        src="https://pollen-batch-41236914.figma.site/_components/v2/f0ee2dae7671c170c34f12e31c4cb41418976c98/769c564298c132f7919405cd9f17c1b1231f341d.769c5642.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      <div className="fixed inset-0 z-[1] bg-white/65" />

      <div className="relative z-[2] mx-auto max-w-[1360px]">
        <Navbar />

        <section className="mx-auto w-full max-w-[900px] px-6 pb-32 pt-24">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.08em] text-[#6d8fdc]">
            PREPROCESSING
          </p>

          <h1 className="text-[clamp(36px,5vw,56px)] font-medium tracking-[-0.035em] text-[#1a1a1a]">
            Preparing your dataset.
          </h1>

          <p className="mt-3 max-w-[650px] text-base leading-relaxed text-[#767676]">
            Applying the selected transformations and validating the prepared
            dataset.
          </p>

          <div className="mt-10 rounded-[28px] border border-white/80 bg-white/35 p-7 backdrop-blur-[18px]">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.06em] text-[#8a8a8a]">
                  Current step
                </p>

                <p className="mt-1 text-lg font-medium text-[#1a1a1a]">
                  {stages[stage]}
                </p>
              </div>

              <span className="text-sm font-medium text-[#6d8fdc]">
                {Math.round(((stage + 1) / stages.length) * 100)}%
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-black/7">
              <div
                className="h-full rounded-full bg-[#6d8fdc] transition-all duration-500"
                style={{
                  width: `${((stage + 1) / stages.length) * 100}%`,
                }}
              />
            </div>

            <div className="mt-7 space-y-3">
              {stages.map((item, index) => {
                const completed = index < stage;
                const active = index === stage;

                return (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm"
                  >
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full text-xs ${
                        completed
                          ? "bg-black text-white"
                          : active
                            ? "border border-[#6d8fdc] text-[#6d8fdc]"
                            : "bg-black/5 text-[#999]"
                      }`}
                    >
                      {completed ? "✓" : index + 1}
                    </span>

                    <span
                      className={
                        completed || active
                          ? "text-[#333]"
                          : "text-[#999]"
                      }
                    >
                      {item}
                    </span>

                    {active && (
                      <span className="ml-auto text-xs text-[#8a8a8a]">
                        Processing...
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-white">
      <video
        className="fixed inset-0 z-0 h-full w-full object-cover"
        src="https://pollen-batch-41236914.figma.site/_components/v2/f0ee2dae7671c170c34f12e31c4cb41418976c98/769c564298c132f7919405cd9f17c1b1231f341d.769c5642.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      <div className="fixed inset-0 z-[1] bg-white/65" />

      <div className="relative z-[2] mx-auto max-w-[1360px]">
        <Navbar />

        <section className="mx-auto w-full max-w-[1120px] px-6 pb-32 pt-14">
          {/* Header */}
          <div className="mb-10">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.08em] text-[#6d8fdc]">
              Preprocessing Complete
            </p>

            <h1 className="text-[clamp(34px,4vw,52px)] font-medium leading-tight tracking-[-0.035em] text-[#1a1a1a]">
              Your dataset is ready.
            </h1>

            <p className="mt-3 max-w-[700px] text-base leading-relaxed text-[#767676]">
              Review the transformations applied to your dataset before moving
              on to model selection.
            </p>
          </div>

          {/* Before / After */}
          <div className="mb-5 grid grid-cols-2 gap-4 max-md:grid-cols-1">
            <Stat
              label="Before preprocessing"
              values={[
                ["Dataset", "10,000 × 21"],
                ["Missing values", "3.2%"],
                ["Categorical features", "10"],
              ]}
            />

            <Stat
              label="After preprocessing"
              values={[
                ["Dataset", "10,000 × 23"],
                ["Missing values", "0%"],
                ["Encoded features", "13"],
              ]}
            />
          </div>

          {/* Applied */}
          <div className="mb-5 rounded-[28px] border border-white/80 bg-white/30 p-7 backdrop-blur-[18px]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-[#1a1a1a]">
                  Applied transformations
                </h2>

                <p className="mt-1 text-sm text-[#767676]">
                  Changes selected during preprocessing.
                </p>
              </div>

              <span className="rounded-full bg-white/45 px-4 py-2 text-sm font-medium text-[#23845d]">
                {applied.length} applied
              </span>
            </div>

            <div className="mt-6 space-y-3">
              {applied.map((item) => (
                <div
                  key={item.feature}
                  className="rounded-[20px] border border-white/70 bg-white/25 p-5"
                >
                  <div className="flex items-start justify-between gap-5 max-md:flex-col">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-xs text-white">
                          ✓
                        </span>

                        <h3 className="font-semibold text-[#1a1a1a]">
                          {item.feature}
                        </h3>
                      </div>

                      <p className="mt-2 ml-10 text-sm text-[#767676]">
                        {item.method}
                      </p>
                    </div>

                    <div className="rounded-full bg-white/50 px-4 py-2 text-sm font-medium text-[#1a1a1a]">
                      {item.result}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skipped */}
          <div className="rounded-[28px] border border-white/80 bg-white/30 p-7 backdrop-blur-[18px]">
            <h2 className="text-xl font-semibold text-[#1a1a1a]">
              Skipped recommendations
            </h2>

            <p className="mt-1 text-sm text-[#767676]">
              Recommendations you chose not to apply.
            </p>

            <div className="mt-5 space-y-3">
              {skipped.map((item) => (
                <div
                  key={item.feature}
                  className="flex items-center justify-between gap-5 rounded-[20px] border border-white/70 bg-white/20 p-5 max-md:flex-col max-md:items-start"
                >
                  <div>
                    <p className="font-semibold text-[#1a1a1a]">
                      {item.feature}
                    </p>

                    <p className="mt-1 text-sm text-[#767676]">
                      {item.recommendation}
                    </p>
                  </div>

                  <span className="rounded-full bg-white/50 px-4 py-2 text-sm text-[#767676]">
                    {item.reason}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-7 flex items-center justify-between rounded-[26px] border border-white/80 bg-white/30 p-5 backdrop-blur-[18px] max-md:flex-col max-md:items-start max-md:gap-4">
            <button
              type="button"
              onClick={() => navigate("/preprocessing")}
              className="rounded-full border border-black/10 bg-white/35 px-6 py-3 text-sm font-medium text-[#1a1a1a] transition-all hover:bg-white/60 active:scale-95"
            >
              ← Change Preprocessing
            </button>

            <button
              type="button"
              onClick={() => navigate("/model-advisor")}
              className="rounded-full bg-black px-6 py-3 text-sm font-medium uppercase tracking-[0.02em] text-white transition-all hover:bg-[#333] active:scale-95"
            >
              Continue to Model Advisor →
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

function Stat({
  label,
  values,
}: {
  label: string;
  values: string[][];
}) {
  return (
    <div className="rounded-[26px] border border-white/80 bg-white/30 p-6 backdrop-blur-[18px]">
      <p className="text-sm font-semibold uppercase tracking-[0.05em] text-[#8a8a8a]">
        {label}
      </p>

      <div className="mt-5 space-y-4">
        {values.map(([name, value]) => (
          <div key={name} className="flex justify-between gap-4">
            <span className="text-sm text-[#767676]">{name}</span>
            <span className="text-sm font-semibold text-[#1a1a1a]">
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}