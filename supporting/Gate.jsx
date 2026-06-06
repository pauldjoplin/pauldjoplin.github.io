import { useState } from "react";

export default function Gate({ digest, onBack }) {
  const [ready, setReady] = useState(false);
  const [state, setState] = useState("idle");
  const [message, setMessage] = useState("");

  async function validate(event) {
    event.preventDefault();
    if (!ready) return;

    setState("working");
    setMessage("");

    try {
      const response = await fetch("/r/b4", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ a: true, d: digest }),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok || result?.ok !== true) {
        setState("idle");
        setMessage("The isolated validator rejected the demo shape.");
        return;
      }

      setState("done");
      setMessage(`Validated ${new Date(result.at).toLocaleString()}`);
    } catch {
      setState("idle");
      setMessage("The isolated validator is unavailable.");
    }
  }

  if (state === "done") {
    return (
      <section className="glass-card w-full p-7 text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-emerald-200">Complete</p>
        <h2 className="mt-3 text-3xl font-bold text-white">Demo Shape Accepted</h2>
        <p className="mt-4 text-white/65">{message}</p>
      </section>
    );
  }

  return (
    <form className="glass-card w-full space-y-5 p-6" onSubmit={validate}>
      <h2 className="text-3xl font-bold text-white">Local Validation</h2>
      <p className="text-sm leading-7 text-white/68">
        This step sends only opaque demo keys and a generated synthetic digest.
        It has no free-text or identity fields.
      </p>
      <pre className="max-h-56 overflow-auto rounded-2xl border border-white/10 bg-black/25 p-4 text-xs text-white/65">
        {digest}
      </pre>
      <label className="flex items-start gap-3 rounded-2xl border border-white/10 p-4 text-sm text-white/72">
        <input
          type="checkbox"
          checked={ready}
          onChange={(event) => setReady(event.target.checked)}
          className="mt-1"
        />
        <span>I understand this fixture is synthetic and non-production.</span>
      </label>
      {message ? <p className="text-sm text-red-300">{message}</p> : null}
      <div className="flex justify-between gap-3">
        <button type="button" onClick={onBack} className="builder-glass-secondary rounded-xl px-5 py-3">
          Back
        </button>
        <button type="submit" disabled={!ready || state === "working"} className="gold-glass-cta">
          {state === "working" ? "Validating..." : "Validate"}
        </button>
      </div>
    </form>
  );
}
