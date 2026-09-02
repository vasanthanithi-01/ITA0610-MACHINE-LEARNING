import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const allModels = [
  {
    name: "Random Forest",
    type: "Ensemble",
    accuracy: 86.4,
    precision: 84.9,
    recall: 81.7,
    f1: 83.3,
    roc: 89.1,
    cv: 85.9,
    training: "2.8s",
    before: {
      accuracy: 81.2,
      precision: 78.3,
      recall: 73.9,
      f1: 76.0,
      roc: 84.0,
    },
    importance: [
      ["Contract", 21],
      ["MonthlyCharges", 17],
      ["Tenure", 14],
      ["TotalCharges", 11],
      ["InternetService", 8],
    ],
  },

  {
    name: "XGBoost",
    type: "Gradient Boosting",
    accuracy: 85.8,
    precision: 84.1,
    recall: 80.9,
    f1: 82.5,
    roc: 88.4,
    cv: 85.3,
    training: "4.6s",
    before: {
      accuracy: 80.8,
      precision: 77.9,
      recall: 73.1,
      f1: 75.4,
      roc: 83.5,
    },
    importance: [
      ["Contract", 24],
      ["Tenure", 16],
      ["MonthlyCharges", 15],
      ["TotalCharges", 12],
      ["InternetService", 9],
    ],
  },

  {
    name: "Logistic Regression",
    type: "Linear Classifier",
    accuracy: 81.7,
    precision: 79.2,
    recall: 75.8,
    f1: 77.4,
    roc: 84.0,
    cv: 81.1,
    training: "0.8s",
    before: {
      accuracy: 77.1,
      precision: 74.0,
      recall: 69.8,
      f1: 71.8,
      roc: 79.5,
    },
    importance: [
      ["Contract", 19],
      ["Tenure", 14],
      ["MonthlyCharges", 12],
      ["TotalCharges", 9],
      ["InternetService", 7],
    ],
  },

  {
    name: "SVM",
    type: "Kernel Classifier",
    accuracy: 83.6,
    precision: 81.5,
    recall: 78.9,
    f1: 80.2,
    roc: 86.1,
    cv: 82.9,
    training: "5.2s",
    before: {
      accuracy: 78.9,
      precision: 75.4,
      recall: 71.2,
      f1: 73.2,
      roc: 81.0,
    },
    importance: [
      ["Contract", 18],
      ["MonthlyCharges", 15],
      ["Tenure", 13],
      ["TotalCharges", 10],
      ["InternetService", 8],
    ],
  },

  {
    name: "Decision Tree",
    type: "Tree-based Classifier",
    accuracy: 80.9,
    precision: 78.1,
    recall: 76.8,
    f1: 77.4,
    roc: 80.7,
    cv: 79.8,
    training: "0.5s",
    before: {
      accuracy: 76.4,
      precision: 72.8,
      recall: 70.3,
      f1: 71.5,
      roc: 76.9,
    },
    importance: [
      ["Contract", 25],
      ["Tenure", 18],
      ["MonthlyCharges", 14],
      ["TotalCharges", 10],
      ["InternetService", 7],
    ],
  },

  {
    name: "K-Nearest Neighbors",
    type: "Distance-based Classifier",
    accuracy: 79.8,
    precision: 76.9,
    recall: 75.1,
    f1: 76.0,
    roc: 81.3,
    cv: 79.1,
    training: "1.4s",
    before: {
      accuracy: 73.8,
      precision: 70.2,
      recall: 68.9,
      f1: 69.5,
      roc: 75.4,
    },
    importance: [
      ["MonthlyCharges", 18],
      ["Tenure", 17],
      ["Contract", 15],
      ["TotalCharges", 11],
      ["InternetService", 9],
    ],
  },

  {
    name: "Naive Bayes",
    type: "Probabilistic Classifier",
    accuracy: 77.6,
    precision: 73.8,
    recall: 74.5,
    f1: 74.1,
    roc: 78.8,
    cv: 76.9,
    training: "0.3s",
    before: {
      accuracy: 72.4,
      precision: 68.7,
      recall: 69.5,
      f1: 69.1,
      roc: 73.6,
    },
    importance: [
      ["MonthlyCharges", 17],
      ["Contract", 15],
      ["Tenure", 13],
      ["InternetService", 11],
      ["TotalCharges", 8],
    ],
  },

  {
    name: "Gradient Boosting",
    type: "Ensemble Classifier",
    accuracy: 84.7,
    precision: 82.9,
    recall: 80.4,
    f1: 81.6,
    roc: 87.3,
    cv: 84.1,
    training: "3.9s",
    before: {
      accuracy: 79.9,
      precision: 76.8,
      recall: 72.5,
      f1: 74.6,
      roc: 82.3,
    },
    importance: [
      ["Contract", 23],
      ["Tenure", 17],
      ["MonthlyCharges", 16],
      ["TotalCharges", 12],
      ["InternetService", 8],
    ],
  },

  {
    name: "Neural Network",
    type: "Multi-layer Perceptron",
    accuracy: 84.2,
    precision: 82.0,
    recall: 80.1,
    f1: 81.0,
    roc: 86.8,
    cv: 83.7,
    training: "6.1s",
    before: {
      accuracy: 78.1,
      precision: 74.2,
      recall: 71.5,
      f1: 72.8,
      roc: 80.4,
    },
    importance: [
      ["Contract", 20],
      ["MonthlyCharges", 17],
      ["Tenure", 15],
      ["TotalCharges", 12],
      ["InternetService", 9],
    ],
  },
];

const stages = [
  "Preprocessing",
  "Training",
  "Validation",
  "Evaluation",
];

export default function ModelComparison() {
  const navigate = useNavigate();

  const [models, setModels] = useState(allModels);

  const [progress, setProgress] = useState(
    allModels.map((_, index) => ({
      value: 10 + (index % 3) * 8,
      stage: 0,
    })),
  );

  const [trainingComplete, setTrainingComplete] = useState(false);
  const [activeModel, setActiveModel] = useState(0);

  useEffect(() => {
    const savedModels = JSON.parse(
      localStorage.getItem("selectedModels") || "[]",
    );

    if (savedModels.length > 0) {
      const filteredModels = allModels.filter((model) =>
        savedModels.includes(model.name),
      );

      if (filteredModels.length > 0) {
        setModels(filteredModels);

        setProgress(
          filteredModels.map((_, index) => ({
            value: 10 + (index % 3) * 8,
            stage: 0,
          })),
        );
      }
    }
  }, []);

  useEffect(() => {
    if (models.length === 0) return;

    setTrainingComplete(false);

    const timer = setInterval(() => {
      setProgress((current) => {
        const next = current.map((item, index) => {
          if (item.value >= 100) return item;

          const increment = 3 + (index % 4);

          const newValue = Math.min(
            item.value + increment,
            100,
          );

          return {
            value: newValue,
            stage:
              newValue >= 90
                ? 3
                : newValue >= 60
                  ? 2
                  : newValue >= 25
                    ? 1
                    : 0,
          };
        });

        if (next.every((item) => item.value >= 100)) {
          setTrainingComplete(true);
          clearInterval(timer);
        }

        return next;
      });
    }, 450);

    return () => clearInterval(timer);
  }, [models]);

  const selected = models[activeModel] || models[0];

  if (!selected) return null;

  const bestModel = [...models].sort(
    (a, b) => b.accuracy - a.accuracy,
  )[0];

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
          <div className="mb-9">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.08em] text-[#6d8fdc]">
              Model Comparison
            </p>

            <h1 className="text-[clamp(34px,4vw,52px)] font-medium leading-tight tracking-[-0.035em] text-[#1a1a1a]">
              Training & evaluation
            </h1>

            <p className="mt-3 max-w-[720px] text-base leading-relaxed text-[#767676]">
              Selected models are evaluated in parallel against the
              prepared dataset to identify the strongest candidate.
            </p>
          </div>

          {/* Parallel training */}
          <section className="mb-7">
            <div className="mb-4 flex items-end justify-between">
              <div>
                <h2 className="text-xl font-semibold text-[#1a1a1a]">
                  Parallel training
                </h2>

                <p className="mt-1 text-sm text-[#767676]">
                  Each selected model is independently evaluated through
                  the same pipeline.
                </p>
              </div>

              {trainingComplete && (
                <span className="rounded-full bg-white/50 px-4 py-2 text-sm font-medium text-[#23845d]">
                  Training complete
                </span>
              )}
            </div>

            <div className="space-y-3">
              {models.map((model, index) => {
                const item = progress[index];

                return (
                  <div
                    key={model.name}
                    className="rounded-[24px] border border-white/80 bg-white/30 px-6 py-5 backdrop-blur-[18px]"
                  >
                    <div className="flex items-center gap-6 max-md:flex-col max-md:items-start">
                      <div className="w-[190px] flex-shrink-0">
                        <h3 className="font-semibold text-[#1a1a1a]">
                          {model.name}
                        </h3>

                        <p className="mt-1 text-xs text-[#8a8a8a]">
                          {model.type}
                        </p>
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex justify-between text-xs">
                          <span className="text-[#767676]">
                            {stages[item.stage]}
                          </span>

                          <span className="font-medium text-[#1a1a1a]">
                            {item.value}%
                          </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-black/8">
                          <div
                            className="h-full rounded-full bg-[#6d8fdc] transition-all duration-500"
                            style={{
                              width: `${item.value}%`,
                            }}
                          />
                        </div>

                        <div className="mt-2 flex gap-4 text-[11px] text-[#999]">
                          {stages.map(
                            (stage, stageIndex) => (
                              <span
                                key={stage}
                                className={
                                  stageIndex <= item.stage
                                    ? "font-medium text-[#555]"
                                    : ""
                                }
                              >
                                {stageIndex <= item.stage
                                  ? "✓ "
                                  : ""}
                                {stage}
                              </span>
                            ),
                          )}
                        </div>
                      </div>

                      <div className="w-[75px] flex-shrink-0 text-right">
                        <p className="text-lg font-semibold text-[#1a1a1a]">
                          {item.value}%
                        </p>

                        <p className="text-[11px] text-[#8a8a8a]">
                          progress
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Results */}
          {trainingComplete && (
            <>
              {/* Before / After */}
              <section className="mb-7">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-[#1a1a1a]">
                    Preprocessing impact
                  </h2>

                  <p className="mt-1 text-sm text-[#767676]">
                    How preprocessing changed the selected model's
                    performance.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                  <ImpactCard
                    title="Before preprocessing"
                    accuracy={selected.before.accuracy}
                    f1={selected.before.f1}
                    roc={selected.before.roc}
                  />

                  <ImpactCard
                    title="After preprocessing"
                    accuracy={selected.accuracy}
                    f1={selected.f1}
                    roc={selected.roc}
                    improved
                  />
                </div>

                <div className="mt-4 rounded-[26px] border border-white/80 bg-white/30 p-6 backdrop-blur-[18px]">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-[#1a1a1a]">
                        {selected.name} — Before vs After
                      </h3>

                      <p className="mt-1 text-sm text-[#767676]">
                        Effect of preprocessing on model performance.
                      </p>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-[#767676]">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-black/25" />
                        Before
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#6d8fdc]" />
                        After
                      </div>
                    </div>
                  </div>

                  <div className="h-[320px] w-full">
                    <ResponsiveContainer
                      width="100%"
                      height="100%"
                    >
                      <BarChart
                        data={[
                          {
                            metric: "Accuracy",
                            Before: selected.before.accuracy,
                            After: selected.accuracy,
                          },
                          {
                            metric: "Precision",
                            Before: selected.before.precision,
                            After: selected.precision,
                          },
                          {
                            metric: "Recall",
                            Before: selected.before.recall,
                            After: selected.recall,
                          },
                          {
                            metric: "F1 Score",
                            Before: selected.before.f1,
                            After: selected.f1,
                          },
                          {
                            metric: "ROC-AUC",
                            Before: selected.before.roc,
                            After: selected.roc,
                          },
                        ]}
                        margin={{
                          top: 10,
                          right: 10,
                          left: 0,
                          bottom: 5,
                        }}
                        barGap={6}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          vertical={false}
                          stroke="rgba(0,0,0,0.08)"
                        />

                        <XAxis
                          dataKey="metric"
                          tick={{
                            fill: "#767676",
                            fontSize: 12,
                          }}
                          axisLine={false}
                          tickLine={false}
                        />

                        <YAxis
                          domain={[60, 100]}
                          tick={{
                            fill: "#8a8a8a",
                            fontSize: 11,
                          }}
                          axisLine={false}
                          tickLine={false}
                          tickFormatter={(value) =>
                            `${value}%`
                          }
                        />

                        <Tooltip
                          formatter={(value) =>
                            `${value}%`
                          }
                        />

                        <Bar
                          dataKey="Before"
                          fill="rgba(0,0,0,0.22)"
                          radius={[6, 6, 0, 0]}
                        />

                        <Bar
                          dataKey="After"
                          fill="#6d8fdc"
                          radius={[6, 6, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </section>

              {/* Model comparison */}
              <section className="mb-7">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-[#1a1a1a]">
                    Model performance
                  </h2>

                  <p className="mt-1 text-sm text-[#767676]">
                    Compare the most important evaluation metrics.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
                  {models.map((model, index) => (
                    <button
                      key={model.name}
                      onClick={() =>
                        setActiveModel(index)
                      }
                      className={`rounded-[24px] border p-6 text-left backdrop-blur-[18px] transition-all ${
                        activeModel === index
                          ? "border-black/15 bg-white/55 shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
                          : "border-white/80 bg-white/30 hover:bg-white/45"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-[#1a1a1a]">
                            {model.name}
                          </h3>

                          <p className="mt-1 text-xs text-[#8a8a8a]">
                            {model.type}
                          </p>
                        </div>

                        {model.name === bestModel.name && (
                          <span className="rounded-full bg-black px-3 py-1 text-[10px] font-medium text-white">
                            BEST
                          </span>
                        )}
                      </div>

                      <div className="mt-6">
                        <MetricBar
                          label="Accuracy"
                          value={model.accuracy}
                        />

                        <MetricBar
                          label="F1 Score"
                          value={model.f1}
                        />

                        <MetricBar
                          label="ROC-AUC"
                          value={model.roc}
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </section>

              {/* Detailed evaluation */}
              <section className="mb-7">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-[#1a1a1a]">
                    {selected.name} evaluation
                  </h2>

                  <p className="mt-1 text-sm text-[#767676]">
                    Detailed evaluation metrics for the selected model.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                  <div className="rounded-[26px] border border-white/80 bg-white/30 p-6 backdrop-blur-[18px]">
                    <h3 className="font-semibold text-[#1a1a1a]">
                      Evaluation metrics
                    </h3>

                    <div className="mt-5 grid grid-cols-2 gap-4">
                      <MetricBox
                        label="Accuracy"
                        value={`${selected.accuracy}%`}
                      />

                      <MetricBox
                        label="Precision"
                        value={`${selected.precision}%`}
                      />

                      <MetricBox
                        label="Recall"
                        value={`${selected.recall}%`}
                      />

                      <MetricBox
                        label="F1 Score"
                        value={`${selected.f1}%`}
                      />

                      <MetricBox
                        label="ROC-AUC"
                        value={`${selected.roc}%`}
                      />

                      <MetricBox
                        label="CV Score"
                        value={`${selected.cv}%`}
                      />
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-4 border-t border-black/5 pt-5">
                      <MetricBox
                        label="Training time"
                        value={selected.training}
                      />

                      <MetricBox
                        label="CV strategy"
                        value="5-fold"
                      />
                    </div>
                  </div>

                  <div className="rounded-[26px] border border-white/80 bg-white/30 p-6 backdrop-blur-[18px]">
                    <h3 className="font-semibold text-[#1a1a1a]">
                      Confusion matrix
                    </h3>

                    <p className="mt-1 text-xs text-[#8a8a8a]">
                      Validation-set predictions
                    </p>

                    <div className="mt-6 grid grid-cols-3 gap-1 text-center text-sm">
                      <div />

                      <div className="p-2 text-xs text-[#8a8a8a]">
                        Pred. No
                      </div>

                      <div className="p-2 text-xs text-[#8a8a8a]">
                        Pred. Yes
                      </div>

                      <div className="p-2 text-xs text-[#8a8a8a]">
                        Actual No
                      </div>

                      <MatrixCell
                        value="1540"
                        strong
                      />

                      <MatrixCell value="120" />

                      <div className="p-2 text-xs text-[#8a8a8a]">
                        Actual Yes
                      </div>

                      <MatrixCell value="150" />

                      <MatrixCell
                        value="190"
                        strong
                      />
                    </div>

                    <div className="mt-6 rounded-[18px] bg-white/30 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.05em] text-[#8a8a8a]">
                        Interpretation
                      </p>

                      <p className="mt-2 text-sm leading-relaxed text-[#666]">
                        The selected model identifies most non-churn
                        customers correctly, while the minority churn
                        class remains comparatively harder to detect.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Feature importance */}
              <section className="mb-7 rounded-[26px] border border-white/80 bg-white/30 p-6 backdrop-blur-[18px]">
                <div className="mb-5">
                  <h2 className="font-semibold text-[#1a1a1a]">
                    Feature importance
                  </h2>

                  <p className="mt-1 text-sm text-[#767676]">
                    Features contributing most strongly to the selected
                    model.
                  </p>
                </div>

                <div className="space-y-4">
                  {selected.importance.map(
                    ([feature, value]) => (
                      <div key={feature}>
                        <div className="mb-1 flex justify-between text-sm">
                          <span className="text-[#555]">
                            {feature}
                          </span>

                          <span className="font-medium text-[#1a1a1a]">
                            {value}%
                          </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-black/7">
                          <div
                            className="h-full rounded-full bg-[#6d8fdc]"
                            style={{
                              width: `${value * 4}%`,
                            }}
                          />
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </section>

              {/* Recommendation */}
              <section className="flex items-center justify-between rounded-[28px] border border-white/80 bg-white/35 p-6 backdrop-blur-[18px] max-md:flex-col max-md:items-start max-md:gap-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.06em] text-[#8a8a8a]">
                    Recommended model
                  </p>

                  <h2 className="mt-1 text-2xl font-semibold text-[#1a1a1a]">
                    {bestModel.name}
                  </h2>

                  <p className="mt-1 max-w-[650px] text-sm leading-relaxed text-[#666]">
                    Best overall result among the selected models based
                    on evaluation performance.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
  navigate("/report", {
    state: {
      models: models,
    },
  })
}
                  className="flex-shrink-0 rounded-full bg-black px-6 py-3 text-sm font-medium uppercase tracking-[0.02em] text-white transition-all hover:bg-[#333] active:scale-95"
                >
                  View Final Report →
                </button>
              </section>
            </>
          )}
        </section>
      </div>
    </main>
  );
}

function MetricBar({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="mb-1 flex justify-between text-xs">
        <span className="text-[#767676]">{label}</span>

        <span className="font-medium text-[#1a1a1a]">
          {value}%
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-black/7">
        <div
          className="h-full rounded-full bg-[#6d8fdc]"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function MetricBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[16px] bg-white/25 p-4">
      <p className="text-xs text-[#8a8a8a]">{label}</p>

      <p className="mt-1 text-lg font-semibold text-[#1a1a1a]">
        {value}
      </p>
    </div>
  );
}

function MatrixCell({
  value,
  strong = false,
}: {
  value: string;
  strong?: boolean;
}) {
  return (
    <div
      className={`flex h-20 items-center justify-center rounded-[12px] text-lg font-semibold ${
        strong
          ? "bg-[#6d8fdc]/20"
          : "bg-white/25"
      }`}
    >
      {value}
    </div>
  );
}

function ImpactCard({
  title,
  accuracy,
  f1,
  roc,
  improved = false,
}: {
  title: string;
  accuracy: number;
  f1: number;
  roc: number;
  improved?: boolean;
}) {
  return (
    <div
      className={`rounded-[26px] border p-6 backdrop-blur-[18px] ${
        improved
          ? "border-[#6d8fdc]/25 bg-[#6d8fdc]/10"
          : "border-white/80 bg-white/30"
      }`}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-[#1a1a1a]">
          {title}
        </h3>

        {improved && (
          <span className="rounded-full bg-white/50 px-3 py-1 text-xs font-medium text-[#23845d]">
            Improved
          </span>
        )}
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        <MetricBox
          label="Accuracy"
          value={`${accuracy}%`}
        />

        <MetricBox label="F1" value={`${f1}%`} />

        <MetricBox
          label="ROC-AUC"
          value={`${roc}%`}
        />
      </div>
    </div>
  );
}