import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const fallbackModels = [
  {
    name: "Random Forest",
    accuracy: 86.4,
    f1: 83.3,
    roc: 89.1,
    training: "2.8s",
  },
  {
    name: "XGBoost",
    accuracy: 85.8,
    f1: 82.5,
    roc: 88.4,
    training: "4.6s",
  },
];

const features = [
  ["Contract", 21],
  ["MonthlyCharges", 17],
  ["Tenure", 14],
  ["TotalCharges", 11],
  ["InternetService", 8],
];

export default function FinalReport() {
  const navigate = useNavigate();
  const location = useLocation();

  const receivedModels = location.state?.models;

  const models =
    Array.isArray(receivedModels) && receivedModels.length > 0
      ? [...receivedModels].sort(
          (a, b) => b.accuracy - a.accuracy,
        )
      : fallbackModels;

  const recommendedModel = models[0];

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

          {/* HEADER */}
          <div className="mb-10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#6d8fdc]">
              FINAL ML REPORT
            </p>

            <h1 className="max-w-[800px] text-[clamp(40px,6vw,64px)] font-medium leading-[1.05] tracking-[-0.04em] text-[#1a1a1a]">
              Your model evaluation is complete.
            </h1>

            <p className="mt-5 max-w-[700px] text-base leading-relaxed text-[#767676]">
              A consolidated summary of dataset preparation, model performance,
              feature importance, and the final model recommendation.
            </p>
          </div>

          {/* RECOMMENDED MODEL */}
          <section className="mb-12 overflow-hidden rounded-[30px] border border-white/80 bg-white/45 p-8 backdrop-blur-[18px]">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start">

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6d8fdc]">
                  Recommended model
                </p>

                <h2 className="mt-3 text-4xl font-medium tracking-[-0.03em] text-[#1a1a1a]">
                  {recommendedModel.name}
                </h2>

                <p className="mt-4 max-w-[560px] text-sm leading-relaxed text-[#767676]">
                  {recommendedModel.name} achieved the strongest overall
                  performance among the evaluated models based on predictive
                  accuracy and comparative evaluation metrics.
                </p>
              </div>

              <div className="rounded-[22px] border border-[#6d8fdc]/20 bg-[#6d8fdc]/10 px-7 py-5 text-left md:min-w-[180px]">
                <p className="text-xs uppercase tracking-[0.1em] text-[#767676]">
                  Validation accuracy
                </p>

                <p className="mt-2 text-4xl font-semibold tracking-[-0.04em] text-[#1a1a1a]">
                  {recommendedModel.accuracy}%
                </p>
              </div>

            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-black/5 pt-7 md:grid-cols-4">

              <div>
                <p className="text-xs text-[#8a8a8a]">
                  F1 Score
                </p>

                <p className="mt-1 text-xl font-semibold text-[#1a1a1a]">
                  {recommendedModel.f1}%
                </p>
              </div>

              <div>
                <p className="text-xs text-[#8a8a8a]">
                  ROC-AUC
                </p>

                <p className="mt-1 text-xl font-semibold text-[#1a1a1a]">
                  {recommendedModel.roc}%
                </p>
              </div>

              <div>
                <p className="text-xs text-[#8a8a8a]">
                  Training Time
                </p>

                <p className="mt-1 text-xl font-semibold text-[#1a1a1a]">
                  {recommendedModel.training}
                </p>
              </div>

              <div>
                <p className="text-xs text-[#8a8a8a]">
                  Models Evaluated
                </p>

                <p className="mt-1 text-xl font-semibold text-[#1a1a1a]">
                  {models.length}
                </p>
              </div>

            </div>
          </section>

          {/* DATASET JOURNEY */}
          <section className="mb-12">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6d8fdc]">
                Dataset transformation
              </p>

              <h2 className="mt-2 text-2xl font-medium tracking-[-0.025em] text-[#1a1a1a]">
                From raw data to training-ready dataset.
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">

              <div className="rounded-[24px] border border-white/80 bg-white/40 p-6 backdrop-blur-[14px]">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#8a8a8a]">
                  Original dataset
                </p>

                <div className="mt-5 space-y-3 text-sm">

                  <div className="flex justify-between">
                    <span className="text-[#767676]">Records</span>
                    <span className="font-medium text-[#1a1a1a]">
                      10,000
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#767676]">Features</span>
                    <span className="font-medium text-[#1a1a1a]">
                      21
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#767676]">
                      Missing values
                    </span>
                    <span className="font-medium text-[#1a1a1a]">
                      3.2%
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#767676]">
                      Duplicate rows
                    </span>
                    <span className="font-medium text-[#1a1a1a]">
                      18
                    </span>
                  </div>

                </div>
              </div>

              <div className="hidden text-2xl text-[#6d8fdc] md:block">
                →
              </div>

              <div className="rounded-[24px] border border-[#6d8fdc]/20 bg-[#6d8fdc]/8 p-6 backdrop-blur-[14px]">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#6d8fdc]">
                  Processed dataset
                </p>

                <div className="mt-5 space-y-3 text-sm">

                  <div className="flex justify-between">
                    <span className="text-[#767676]">Records</span>
                    <span className="font-medium text-[#1a1a1a]">
                      9,982
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#767676]">Features</span>
                    <span className="font-medium text-[#1a1a1a]">
                      23
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#767676]">
                      Missing values
                    </span>
                    <span className="font-medium text-[#1a1a1a]">
                      0%
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#767676]">
                      Dataset status
                    </span>
                    <span className="font-medium text-[#1a1a1a]">
                      Training ready
                    </span>
                  </div>

                </div>
              </div>

            </div>
          </section>

          {/* MODEL COMPARISON */}
          <section className="mb-12">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6d8fdc]">
                Model comparison
              </p>

              <h2 className="mt-2 text-2xl font-medium tracking-[-0.025em] text-[#1a1a1a]">
                Performance across evaluated models.
              </h2>
            </div>

            <div className="overflow-hidden rounded-[26px] border border-white/80 bg-white/40 backdrop-blur-[16px]">
              <div className="overflow-x-auto">

                <table className="w-full min-w-[720px] text-left text-sm">
                  <thead className="border-b border-black/5 text-xs uppercase tracking-[0.08em] text-[#8a8a8a]">
                    <tr>
                      <th className="px-6 py-5 font-medium">
                        Model
                      </th>

                      <th className="px-5 py-5 font-medium">
                        Accuracy
                      </th>

                      <th className="px-5 py-5 font-medium">
                        F1 Score
                      </th>

                      <th className="px-5 py-5 font-medium">
                        ROC-AUC
                      </th>

                      <th className="px-5 py-5 font-medium">
                        Training
                      </th>

                      <th className="px-6 py-5 text-right font-medium">
                        Rank
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {models.map((model, index) => (
                      <tr
                        key={model.name}
                        className={`border-b border-black/5 last:border-0 ${
                          index === 0
                            ? "bg-[#6d8fdc]/6"
                            : ""
                        }`}
                      >
                        <td className="px-6 py-5 font-medium text-[#1a1a1a]">
                          {model.name}
                        </td>

                        <td className="px-5 py-5 text-[#555]">
                          {model.accuracy}%
                        </td>

                        <td className="px-5 py-5 text-[#555]">
                          {model.f1}%
                        </td>

                        <td className="px-5 py-5 text-[#555]">
                          {model.roc}%
                        </td>

                        <td className="px-5 py-5 text-[#555]">
                          {model.training}
                        </td>

                        <td className="px-6 py-5 text-right font-medium text-[#1a1a1a]">
                          #{index + 1}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

              </div>
            </div>
          </section>

          {/* WHY THE MODEL */}
          <section className="mb-12">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6d8fdc]">
                Selection reasoning
              </p>

              <h2 className="mt-2 text-2xl font-medium tracking-[-0.025em] text-[#1a1a1a]">
                Why {recommendedModel.name} was selected.
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">

              {[
                [
                  "Strongest overall performance",
                  `Achieved the highest validation accuracy among the ${models.length} evaluated models.`,
                ],
                [
                  "High predictive separation",
                  `Achieved a ROC-AUC score of ${recommendedModel.roc}%, demonstrating strong ability to distinguish between target classes.`,
                ],
                [
                  "Balanced training efficiency",
                  `Delivered strong predictive performance with a training time of ${recommendedModel.training}.`,
                ],
                [
                  "Best comparative result",
                  "Ranked first among the selected candidate models based on overall evaluation performance.",
                ],
              ].map(([title, description]) => (
                <div
                  key={title}
                  className="rounded-[24px] border border-white/80 bg-white/35 p-6 backdrop-blur-[14px]"
                >
                  <div className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#6d8fdc]/12 text-sm text-[#6d8fdc]">
                      ✓
                    </span>

                    <div>
                      <h3 className="font-medium text-[#1a1a1a]">
                        {title}
                      </h3>

                      <p className="mt-2 text-sm leading-relaxed text-[#767676]">
                        {description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

            </div>
          </section>

          {/* FEATURE IMPORTANCE */}
          <section className="mb-12">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6d8fdc]">
                Feature importance
              </p>

              <h2 className="mt-2 text-2xl font-medium tracking-[-0.025em] text-[#1a1a1a]">
                Features with the strongest influence.
              </h2>

              <p className="mt-3 max-w-[700px] text-sm leading-relaxed text-[#767676]">
                Contract type, monthly charges, and customer tenure emerged as the
                most influential features in the final model evaluation.
              </p>
            </div>

            <div className="rounded-[26px] border border-white/80 bg-white/40 p-7 backdrop-blur-[16px]">

              <div className="space-y-6">
                {features.map(([feature, value]) => (
                  <div key={feature}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="font-medium text-[#1a1a1a]">
                        {feature}
                      </span>

                      <span className="text-[#767676]">
                        {value}%
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-black/6">
                      <div
                        className="h-full rounded-full bg-[#6d8fdc]"
                        style={{
                          width: `${Number(value) * 4}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </section>

          {/* FINAL RECOMMENDATION */}
          <section className="rounded-[30px] border border-[#6d8fdc]/20 bg-[#6d8fdc]/8 p-8 backdrop-blur-[18px]">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6d8fdc]">
              Final recommendation
            </p>

            <h2 className="mt-3 max-w-[800px] text-3xl font-medium tracking-[-0.03em] text-[#1a1a1a]">
              {recommendedModel.name} is recommended as the primary model
              for this dataset.
            </h2>

            <p className="mt-5 max-w-[780px] text-sm leading-relaxed text-[#676767]">
              Based on the comparative evaluation, {recommendedModel.name}
              provides the strongest overall result among the selected
              models, with {recommendedModel.accuracy}% validation accuracy,
              an F1 score of {recommendedModel.f1}%, and a ROC-AUC score of{" "}
              {recommendedModel.roc}%.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">

              <button
                onClick={() => navigate("/model-comparison")}
                className="rounded-full border border-black/10 bg-white/60 px-5 py-3 text-sm font-medium text-[#1a1a1a] transition hover:bg-white"
              >
                Back to Comparison
              </button>

              <button
                onClick={() => window.print()}
                className="rounded-full bg-[#1a1a1a] px-5 py-3 text-sm font-medium text-white transition hover:opacity-85"
              >
                Export Report
              </button>

            </div>
          </section>

        </section>
      </div>
    </main>
  );
}