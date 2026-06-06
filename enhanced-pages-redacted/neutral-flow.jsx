import { useEffect, useMemo, useState } from "react";
import Gate from "../Comps/Gate.jsx";

const join = (...values) => values.filter(Boolean).join(" ");

export default function NeutralWorkflowDemo() {
  const [fixture, setFixture] = useState(null);
  const [trackKey, setTrackKey] = useState("");
  const [stageIndex, setStageIndex] = useState(-1);
  const [answers, setAnswers] = useState({});
  const [gate, setGate] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    fetch("/r/a7", { headers: { Accept: "application/json" } })
      .then((response) => {
        if (!response.ok) throw new Error("load");
        return response.json();
      })
      .then((result) => {
        if (active && result?.x?.v === 1 && Array.isArray(result.x.tracks)) {
          setFixture(result.x);
        } else if (active) {
          setError("Synthetic fixture unavailable.");
        }
      })
      .catch(() => active && setError("Synthetic fixture unavailable."));

    return () => {
      active = false;
    };
  }, []);

  const track = fixture?.tracks.find((item) => item.k === trackKey);
  const currentStage = track?.stages[stageIndex];
  const selections = useMemo(
    () =>
      track?.stages
        .map((stage) => stage.items.find((item) => item.k === answers[stage.k]))
        .filter(Boolean) || [],
    [answers, track],
  );
  const total = selections.reduce((sum, item) => sum + item.weight, 0);
  const digest = JSON.stringify({ t: trackKey, a: answers, u: total });

  function reset() {
    setTrackKey("");
    setStageIndex(-1);
    setAnswers({});
    setGate(false);
  }

  if (error) {
    return <main className="p-8 text-white">{error}</main>;
  }

  if (!fixture) {
    return <main className="p-8 text-white/70">Loading isolated fixture...</main>;
  }

  if (gate) {
    return (
      <main className="mx-auto max-w-3xl p-6">
        <Gate digest={digest} onBack={() => setGate(false)} />
      </main>
    );
  }

  return (
    <main className="app-gradient-bg min-h-screen px-4 py-10 text-white">
      <div className="mx-auto max-w-4xl space-y-7">
        <header className="text-center">
          <p className="text-sm uppercase tracking-[0.24em] text-emerald-200">Isolated Fixture</p>
          <h1 className="mt-3 text-4xl font-bold">{fixture.title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/65">{fixture.intro}</p>
        </header>

        {!track ? (
          <Panel title="Select a synthetic path">
            <div className="grid gap-3 sm:grid-cols-3">
              {fixture.tracks.map((item) => (
                <Choice key={item.k} selected={false} onClick={() => { setTrackKey(item.k); setStageIndex(0); }}>
                  {item.label}
                </Choice>
              ))}
            </div>
          </Panel>
        ) : stageIndex < track.stages.length ? (
          <Panel title={currentStage.label}>
            <div className="grid gap-3 sm:grid-cols-3">
              {currentStage.items.map((item) => (
                <Choice
                  key={item.k}
                  selected={answers[currentStage.k] === item.k}
                  onClick={() => setAnswers((current) => ({ ...current, [currentStage.k]: item.k }))}
                >
                  {item.label}
                </Choice>
              ))}
            </div>
            <Controls
              back={() => stageIndex === 0 ? reset() : setStageIndex((value) => value - 1)}
              next={() => setStageIndex((value) => value + 1)}
              disabled={!answers[currentStage.k]}
            />
          </Panel>
        ) : (
          <Panel title="Synthetic result">
            <div className="space-y-3">
              {selections.map((item) => (
                <div key={item.k} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  {item.label}: {item.weight} demo units
                </div>
              ))}
            </div>
            <p className="mt-5 text-2xl font-bold">Total: {total} demo units</p>
            <div className="mt-5 space-y-2 text-sm text-white/60">
              {fixture.notices.map((notice) => <p key={notice}>{notice}</p>)}
            </div>
            <div className="mt-6 flex justify-between gap-3">
              <button type="button" onClick={() => setStageIndex(track.stages.length - 1)} className="builder-glass-secondary rounded-xl px-5 py-3">Back</button>
              <button type="button" onClick={() => setGate(true)} className="gold-glass-cta">Validate Shape</button>
            </div>
          </Panel>
        )}
      </div>
    </main>
  );
}

function Panel({ title, children }) {
  return <section className="glass-card p-6"><h2 className="mb-5 text-2xl font-bold">{title}</h2>{children}</section>;
}

function Choice({ selected, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={join("rounded-2xl border p-5 text-left transition", selected ? "border-emerald-300 bg-emerald-500/10" : "border-white/10 bg-white/5")}
    >
      {children}
    </button>
  );
}

function Controls({ back, next, disabled }) {
  return (
    <div className="mt-6 flex justify-between gap-3">
      <button type="button" onClick={back} className="builder-glass-secondary rounded-xl px-5 py-3">Back</button>
      <button type="button" onClick={next} disabled={disabled} className="gold-glass-cta">Continue</button>
    </div>
  );
}
