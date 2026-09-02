import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const models = [
  {
    name: "Logistic Regression",
    type: "Linear classifier",
    reason:
      "Good baseline for binary classification and provides interpretable feature coefficients.",
    suitability: "High",
  },
  {
    name: "Random Forest",
    type: "Ensemble",
    reason:
      "Handles mixed feature relationships well and is less sensitive to scaling and outliers.",
    suitability: "Very High",
  },
  {
    name: "XGBoost",
    type: "Gradient boosting",
    reason:
      "Strong candidate for tabular data with nonlinear relationships and interactions.",
    suitability: "Very High",
  },
  {
    name: "SVM",
    type: "Kernel classifier",
    reason:
      "Can perform well on structured datasets but may become expensive as dataset size increases.",
    suitability: "Medium",
  },
  {
  id: "decision-tree",
  name: "Decision Tree",
  type: "Tree-based classifier",
  suitability: "High suitability",
  reasoning:
    "Provides interpretable decision rules and can capture nonlinear relationships without requiring feature scaling.",
},
{
  id: "knn",
  name: "K-Nearest Neighbors",
  type: "Distance-based classifier",
  suitability: "Medium suitability",
  reasoning:
    "Can capture local patterns in the dataset, though performance may depend on feature scaling and dataset size.",
},
{
  id: "naive-bayes",
  name: "Naive Bayes",
  type: "Probabilistic classifier",
  suitability: "Medium suitability",
  reasoning:
    "Provides a fast probabilistic baseline and can perform effectively when feature relationships approximately satisfy its assumptions.",
},
{
  id: "gradient-boosting",
  name: "Gradient Boosting",
  type: "Ensemble classifier",
  suitability: "High suitability",
  reasoning:
    "Can model complex nonlinear relationships by combining multiple weak learners sequentially for improved predictive performance.",
},
{
  id: "mlp",
  name: "Neural Network",
  type: "Multi-layer Perceptron",
  suitability: "High suitability",
  reasoning:
    "Can learn complex feature interactions and nonlinear patterns, making it a useful candidate for comparison against traditional ML models.",
},
];

export default function ModelAdvisor() {
  const navigate = useNavigate();

  const [selectedModels, setSelectedModels] = useState<string[]>([
    "Random Forest",
    "XGBoost",
  ]);

  const toggleModel = (name: string) => {
    setSelectedModels((current) =>
      current.includes(name)
        ? current.filter((model) => model !== name)
        : [...current, name],
    );
  };

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
              Model Advisor
            </p>

            <h1 className="text-[clamp(34px,4vw,52px)] font-medium leading-tight tracking-[-0.035em] text-[#1a1a1a]">
              Which models should you train?
            </h1>

            <p className="mt-3 max-w-[700px] text-base leading-relaxed text-[#767676]">
              Based on the dataset characteristics and preprocessing decisions,
              these models are the strongest candidates for this problem.
            </p>
          </div>

          {/* Dataset reasoning */}
          <div className="mb-5 rounded-[28px] border border-white/80 bg-white/30 p-7 backdrop-blur-[18px]">
            <h2 className="text-xl font-semibold text-[#1a1a1a]">
              Why these models?
            </h2>

            <div className="mt-5 grid grid-cols-3 gap-4 max-md:grid-cols-1">
              <Reason label="Problem" value="Binary classification" />
              <Reason label="Dataset type" value="Structured tabular data" />
              <Reason label="Dataset size" value="10,000 × 21" />
            </div>
          </div>

          {/* Models */}
          <div className="space-y-4">
            {models.map((model, index) => {
              const selected = selectedModels.includes(model.name);

              return (
                <button
                  key={model.name}
                  type="button"
                  onClick={() => toggleModel(model.name)}
                  className={`
                    w-full cursor-pointer rounded-[26px]
                    border p-6 text-left
                    backdrop-blur-[18px]
                    transition-all
                    active:scale-[0.995]
                    ${
                      selected
                        ? "border-black/20 bg-white/55 shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
                        : "border-white/80 bg-white/30 hover:bg-white/45"
                    }
                  `}
                >
                  <div className="flex items-start justify-between gap-6 max-md:flex-col">
                    <div className="flex gap-4">
                      <div
                        className={`
                          flex h-9 w-9 flex-shrink-0 items-center
                          justify-center rounded-full text-sm font-medium
                          ${
                            selected
                              ? "bg-black text-white"
                              : "bg-black/10 text-[#1a1a1a]"
                          }
                        `}
                      >
                        {selected ? "✓" : index + 1}
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-[#1a1a1a]">
                          {model.name}
                        </h3>

                        <p className="mt-1 text-sm text-[#8a8a8a]">
                          {model.type}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-white/50 px-4 py-2 text-sm font-medium text-[#1a1a1a]">
                        {model.suitability} suitability
                      </div>

                      <div
                        className={`
                          rounded-full px-4 py-2 text-sm font-medium
                          ${
                            selected
                              ? "bg-black text-white"
                              : "bg-white/40 text-[#767676]"
                          }
                        `}
                      >
                        {selected ? "Selected ✓" : "Click to select"}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 border-t border-black/5 pt-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.06em] text-[#8a8a8a]">
                      Reasoning
                    </p>

                    <p className="mt-2 max-w-[800px] text-sm leading-relaxed text-[#666]">
                      {model.reason}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Bottom action */}
          <div className="mt-7 flex items-center justify-between rounded-[26px] border border-white/80 bg-white/30 p-5 backdrop-blur-[18px] max-md:flex-col max-md:items-start max-md:gap-4">
            <div>
              <p className="font-medium text-[#1a1a1a]">
                {selectedModels.length}{" "}
                {selectedModels.length === 1 ? "model" : "models"} selected
              </p>

              <p className="mt-1 text-sm text-[#767676]">
                Select the candidates you want to train and compare.
              </p>
            </div>

            <button
              type="button"
              disabled={selectedModels.length === 0}
              onClick={() => {
  localStorage.setItem(
    "selectedModels",
    JSON.stringify(selectedModels)
  );

  navigate("/model-comparison");
}}
              className="
                rounded-full bg-black px-6 py-3
                text-sm font-medium uppercase
                tracking-[0.02em] text-white
                transition-all hover:bg-[#333]
                active:scale-95
                disabled:cursor-not-allowed
                disabled:bg-black/30
              "
            >
              Train Selected
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

function Reason({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[18px] border border-white/70 bg-white/20 p-4">
      <p className="text-xs uppercase tracking-[0.05em] text-[#8a8a8a]">
        {label}
      </p>

      <p className="mt-2 font-medium text-[#1a1a1a]">{value}</p>
    </div>
  );
}