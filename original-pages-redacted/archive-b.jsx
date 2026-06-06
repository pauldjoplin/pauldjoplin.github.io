import { useMemo, useState } from "react";

const stages = [
  { k: "z1", label: "Choose a direction", items: ["Alpha", "Beta", "Gamma"] },
  { k: "z2", label: "Choose a band", items: ["Narrow", "Balanced", "Broad"] },
  { k: "z3", label: "Choose a mode", items: ["Mode One", "Mode Two", "Undecided"] },
];

export default function ArchivedFlowDemo() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const stage = stages[index];
  const complete = index === stages.length;
  const digest = useMemo(() => JSON.stringify(answers), [answers]);

  function reset() {
    setIndex(0);
    setAnswers({});
  }

  return (
    <main className="min-h-screen bg-[#0b1110] px-5 py-12 text-white">
      <div className="mx-auto max-w-3xl space-y-7">
        <header className="text-center">
          <p className="text-sm uppercase tracking-[0.22em] text-emerald-200">Sanitized Archive</p>
          <h1 className="mt-3 text-4xl font-bold">Neutral Step Demonstration</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/60">
            This copy has no outbound destination, identity fields, free-text inputs,
            original recommendations, or live operating rules.
          </p>
        </header>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
          {!complete ? (
            <>
              <p className="text-sm text-white/45">Step {index + 1} of {stages.length}</p>
              <h2 className="mt-2 text-2xl font-bold">{stage.label}</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {stage.items.map((item, itemIndex) => {
                  const key = `${stage.k}-${itemIndex + 1}`;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setAnswers((current) => ({ ...current, [stage.k]: key }))}
                      className={`rounded-2xl border p-4 text-left ${answers[stage.k] === key ? "border-emerald-300 bg-emerald-500/10" : "border-white/10 bg-black/20"}`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
              <div className="mt-6 flex justify-between">
                <button type="button" onClick={() => setIndex((value) => Math.max(0, value - 1))} className="rounded-full border border-white/15 px-5 py-2">
                  Back
                </button>
                <button type="button" disabled={!answers[stage.k]} onClick={() => setIndex((value) => value + 1)} className="rounded-full border border-emerald-300/30 bg-emerald-500/10 px-5 py-2">
                  Continue
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold">Synthetic Digest</h2>
              <pre className="mt-5 overflow-auto rounded-2xl border border-white/10 bg-black/25 p-4 text-sm text-white/65">{digest}</pre>
              <p className="mt-4 text-sm leading-7 text-white/60">
                Nothing is transmitted or persisted. The digest uses arbitrary keys only.
              </p>
              <button type="button" onClick={reset} className="mt-5 rounded-full border border-white/15 px-5 py-2">
                Start Over
              </button>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
