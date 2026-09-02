import Navbar from "../components/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const recommendations = [
  {
    feature: "TotalCharges",
    issue: "Missing values · 2.4%",
    recommendation: "Median imputation",
    reason:
      "The feature is numerical and moderately skewed, making the median more robust than the mean.",
    impact: "2.4% of values affected",
  },
  {
    feature: "Customer_ID",
    issue: "99.9% unique",
    recommendation: "Remove feature",
    reason:
      "This behaves like an identifier rather than a predictive feature and may introduce noise.",
    impact: "1 feature removed",
  },
  {
    feature: "Contract",
    issue: "Categorical · 3 values",
    recommendation: "One-hot encoding",
    reason:
      "Low-cardinality categorical values can be represented effectively using one-hot encoding.",
    impact: "3 encoded columns",
  },
  {
    feature: "Churn",
    issue: "Class imbalance · 73 / 27",
    recommendation: "Stratified split",
    reason:
      "Preserving the class distribution during train/test splitting provides more reliable evaluation.",
    impact: "Split strategy changed",
  },
];

export default function Preprocessing() {
  const navigate = useNavigate();
const [recommendationStatus, setRecommendationStatus] = useState<
  Record<string, "applied" | "skipped">
>({});
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
            <p className="mb-3 font-sans text-sm font-semibold uppercase tracking-[0.08em] text-[#6d8fdc]">
              Preprocessing
            </p>

            <div className="flex items-end justify-between gap-6 max-md:flex-col max-md:items-start">
              <div>
                <h1 className="font-sans text-[clamp(34px,4vw,52px)] font-medium leading-tight tracking-[-0.035em] text-[#1a1a1a]">
                  Recommended changes
                </h1>

                <p className="mt-3 max-w-[650px] text-base leading-relaxed text-[#767676]">
                  Review the preprocessing actions suggested from the dataset
                  analysis before preparing the data for model training.
                </p>
              </div>

              <div className="rounded-full border border-white bg-white/35 px-4 py-2 text-sm font-medium text-[#6d8fdc] backdrop-blur-md">
                4 recommendations
              </div>
            </div>
          </div>

          {/* Recommendation cards */}
          <div className="space-y-4">
            {recommendations.map((item, index) => (
              <div
                key={item.feature}
                className="rounded-[28px] border border-white/80 bg-white/30 p-6 backdrop-blur-[18px]"
              >
                <div className="flex items-start justify-between gap-6 max-md:flex-col">
                  {/* Left */}
                  <div className="flex gap-4">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-black text-sm font-medium text-white">
                      {index + 1}
                    </div>

                    <div>
                      <p className="text-xl font-semibold text-[#1a1a1a]">
                        {item.feature}
                      </p>

                      <p className="mt-1 text-sm text-[#8a8a8a]">
                        {item.issue}
                      </p>
                    </div>
                  </div>

                  {/* Recommendation */}
                  <div className="rounded-full bg-white/45 px-4 py-2 text-sm font-medium text-[#1a1a1a]">
                    {item.recommendation}
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-[1fr_1fr_auto] items-end gap-6 border-t border-black/5 pt-5 max-md:grid-cols-1">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.06em] text-[#8a8a8a]">
                      Why this recommendation
                    </p>

                    <p className="mt-2 max-w-[470px] text-sm leading-relaxed text-[#666]">
                      {item.reason}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.06em] text-[#8a8a8a]">
                      Expected impact
                    </p>

                    <p className="mt-2 text-sm font-medium text-[#1a1a1a]">
                      {item.impact}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
  onClick={() =>
    setRecommendationStatus((prev) => ({
      ...prev,
      [item.feature]: "skipped",
    }))
  }
  className={`
    rounded-full border px-5 py-2.5
    text-sm font-medium transition-all active:scale-95
    ${
      recommendationStatus[item.feature] === "skipped"
        ? "border-black bg-black text-white"
        : "border-black/10 bg-white/40 text-[#1a1a1a] hover:bg-white/70"
    }
  `}
>
  {recommendationStatus[item.feature] === "skipped" ? "Skipped" : "Skip"}
</button>

                    <button
  onClick={() =>
    setRecommendationStatus((prev) => ({
      ...prev,
      [item.feature]: "applied",
    }))
  }
  className={`
    rounded-full px-5 py-2.5
    text-sm font-medium transition-all active:scale-95
    ${
      recommendationStatus[item.feature] === "applied"
        ? "bg-[#3f7d68] text-white"
        : "bg-black text-white hover:bg-[#333]"
    }
  `}
>
  {recommendationStatus[item.feature] === "applied" ? "Applied" : "Apply"}
</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom action */}
          <div className="mt-7 flex items-center justify-between rounded-[26px] border border-white/80 bg-white/30 p-5 backdrop-blur-[18px] max-md:flex-col max-md:items-start max-md:gap-4">
            <div>
              <p className="font-medium text-[#1a1a1a]">
                Ready to prepare the dataset?
              </p>

              <p className="mt-1 text-sm text-[#767676]">
                Apply the selected recommendations before moving to model
                selection.
              </p>
            </div>

            <button
  onClick={() => navigate("/preprocessing-results")}
  className="
    rounded-full bg-black px-6 py-3
    text-sm font-medium uppercase
    tracking-[0.02em] text-white
    transition-all hover:bg-[#333]
    active:scale-95
  "
>
  Apply Selected
</button>
          </div>
        </section>
      </div>
    </main>
  );
}