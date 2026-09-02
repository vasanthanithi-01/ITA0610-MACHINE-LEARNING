import { useState } from "react";
import { useNavigate } from "react-router-dom";
const stats = [
  {
    label: "Dataset Size",
    value: "10,000 × 21",
    detail: "Rows × columns",
  },
  {
    label: "Missing Values",
    value: "3.2%",
    detail: "Across 4 features",
  },
  {
    label: "Duplicate Rows",
    value: "18",
    detail: "0.18% of dataset",
  },
  {
    label: "Target Balance",
    value: "73 / 27",
    detail: "Moderate imbalance",
  },
];

const observations = [
  {
    type: "warning",
    title: "Class imbalance detected",
    text: "The target distribution is 73% / 27%. Stratified splitting is recommended before model training.",
  },
  {
    type: "warning",
    title: "High-cardinality feature",
    text: "Customer_ID contains mostly unique values and should not be used as a predictive feature.",
  },
  {
    type: "info",
    title: "Feature correlation",
    text: "MonthlyCharges and TotalCharges show strong correlation. Check for redundancy before training linear models.",
  },
  {
    type: "success",
    title: "No obvious leakage detected",
    text: "No feature currently shows suspiciously direct access to the target variable.",
  },
];

const recommendations = [
  {
    feature: "TotalCharges",
    issue: "Missing values · 2.4%",
    action: "Median imputation",
    reason: "Numerical feature with moderate skew.",
  },
  {
    feature: "Contract",
    issue: "Categorical · 3 values",
    action: "One-hot encoding",
    reason: "Low-cardinality categorical feature.",
  },
  {
    feature: "Customer_ID",
    issue: "99.9% unique",
    action: "Remove feature",
    reason: "Identifier with little predictive value.",
  },
];

export default function DatasetAnalysis() {
  const navigate = useNavigate();
	  const [selectedRecommendations, setSelectedRecommendations] =
    useState<string[]>([]);
  const toggleRecommendation = (feature: string) => {
    setSelectedRecommendations((current) =>
      current.includes(feature)
        ? current.filter((item) => item !== feature)
        : [...current, feature]
    );
  };
    const datasetName =
    localStorage.getItem("datasetName") || "telecom_customer_churn.csv";
  return (
    <section className="mx-auto w-full max-w-[1120px] px-6 pb-32 pt-20">
      {/* Header */}
      <div className="mb-10">
        <p className="mb-3 font-sans text-sm font-semibold uppercase tracking-[0.08em] text-[#6d8fdc]">
          Dataset Analysis
        </p>

        <div className="flex items-end justify-between gap-6 max-md:flex-col max-md:items-start">
          <div>
            <h2 className="font-sans text-[clamp(32px,4vw,48px)] font-medium leading-tight tracking-[-0.035em] text-[#1a1a1a]">
              {datasetName}
            </h2>

            <p className="mt-3 text-base text-[#767676]">
              Automated dataset profiling and ML readiness assessment
            </p>
          </div>

          <div className="rounded-full border border-white bg-white/35 px-4 py-2 text-sm font-medium text-[#2f855a] backdrop-blur-md">
            Analysis Complete
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 max-md:grid-cols-2">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-[24px] border border-white/80 bg-white/30 p-5 backdrop-blur-[18px]"
          >
            <p className="text-sm font-medium text-[#767676]">
              {stat.label}
            </p>

            <p className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-[#1a1a1a]">
              {stat.value}
            </p>

            <p className="mt-1 text-xs text-[#8a8a8a]">{stat.detail}</p>
          </div>
        ))}
      </div>

      {/* Main analysis */}
      <div className="mt-5 grid grid-cols-[1.2fr_0.8fr] gap-5 max-lg:grid-cols-1">
        {/* ML observations */}
        <div className="rounded-[28px] border border-white/80 bg-white/30 p-7 backdrop-blur-[18px]">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-[#1a1a1a]">
              ML-specific observations
            </h3>

            <p className="mt-1 text-sm text-[#767676]">
              Issues that could affect model training or evaluation.
            </p>
          </div>

          <div className="space-y-3">
            {observations.map((item) => (
              <div
                key={item.title}
                className="rounded-[18px] border border-white/70 bg-white/25 p-4"
              >
                <div className="flex gap-3">
                  <div
                    className={`mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full ${
                      item.type === "warning"
                        ? "bg-[#d39b45]"
                        : item.type === "success"
                          ? "bg-[#4b9b72]"
                          : "bg-[#6d8fdc]"
                    }`}
                  />

                  <div>
                    <p className="font-medium text-[#1a1a1a]">
                      {item.title}
                    </p>

                    <p className="mt-1 text-sm leading-relaxed text-[#767676]">
                      {item.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature profile */}
        <div className="rounded-[28px] border border-white/80 bg-white/30 p-7 backdrop-blur-[18px]">
          <h3 className="text-xl font-semibold text-[#1a1a1a]">
            Feature profile
          </h3>

          <p className="mt-1 text-sm text-[#767676]">
            Detected feature composition
          </p>

          <div className="mt-7 space-y-5">
            <FeatureBar label="Numerical" value="9" percentage={43} />
            <FeatureBar label="Categorical" value="10" percentage={48} />
            <FeatureBar label="Binary" value="2" percentage={9} />
          </div>

          <div className="mt-8 border-t border-black/5 pt-6">
            <p className="text-sm font-medium text-[#1a1a1a]">
              Target candidate
            </p>

            <div className="mt-3 flex items-center justify-between rounded-[16px] bg-white/35 px-4 py-3">
              <span className="font-medium text-[#1a1a1a]">
                Churn
              </span>

              <span className="text-sm text-[#767676]">
                Binary classification
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="mt-5 rounded-[28px] border border-white/80 bg-white/30 p-7 backdrop-blur-[18px]">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-[#1a1a1a]">
              Recommended preprocessing
            </h3>

            <p className="mt-1 text-sm text-[#767676]">
              Actions suggested from the dataset's observed characteristics.
            </p>
          </div>

          <button
  onClick={() => navigate("/preprocessing")}
  className="
    rounded-full bg-black px-5 py-2.5
    text-sm font-medium text-white
    transition-all hover:bg-[#333]
    active:scale-95
  "
>
  Review Recommendations
</button>
        </div>

        <div className="space-y-3">
          {recommendations.map((item) => (
            <div
              key={item.feature}
              className="grid grid-cols-[1fr_1fr_1fr_1.4fr_auto] items-center gap-5 rounded-[18px] border border-white/70 bg-white/20 px-5 py-4 max-lg:grid-cols-2 max-md:grid-cols-1"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.05em] text-[#8a8a8a]">
                  Feature
                </p>
                <p className="mt-1 font-medium text-[#1a1a1a]">
                  {item.feature}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.05em] text-[#8a8a8a]">
                  Issue
                </p>
                <p className="mt-1 text-sm text-[#767676]">
                  {item.issue}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.05em] text-[#8a8a8a]">
                  Recommendation
                </p>
                <p className="mt-1 font-medium text-[#1a1a1a]">
                  {item.action}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.05em] text-[#8a8a8a]">
                  Why
                </p>
                <p className="mt-1 text-sm text-[#767676]">
                  {item.reason}
                </p>
              </div>

              <button
  onClick={() => toggleRecommendation(item.feature)}
  className={`rounded-full px-4 py-2 text-sm font-medium transition-all active:scale-95 ${
    selectedRecommendations.includes(item.feature)
      ? "bg-black text-white"
      : "border border-black/10 bg-white/40 text-[#1a1a1a] hover:bg-white/70"
  }`}
>
  {selectedRecommendations.includes(item.feature)
    ? "Selected ✓"
    : "Apply"}
</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureBar({
  label,
  value,
  percentage,
}: {
  label: string;
  value: string;
  percentage: number;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-[#767676]">{label}</span>
        <span className="font-medium text-[#1a1a1a]">{value}</span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-black/5">
        <div
          className="h-full rounded-full bg-[#6d8fdc]"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}