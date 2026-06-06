import { useState } from "react";

const entries = [
  {
    k: "x1",
    title: "Archived Pattern Alpha",
    summary: "Synthetic example retained only to demonstrate a selectable card layout.",
    details: ["Neutral item one", "Neutral item two", "Neutral item three"],
  },
  {
    k: "x2",
    title: "Archived Pattern Beta",
    summary: "Synthetic example retained only to demonstrate expandable content.",
    details: ["Neutral item four", "Neutral item five", "Neutral item six"],
  },
  {
    k: "x3",
    title: "Archived Pattern Gamma",
    summary: "Synthetic example with no relationship to any live offering or process.",
    details: ["Neutral item seven", "Neutral item eight", "Neutral item nine"],
  },
];

export default function ArchivedCatalogDemo() {
  const [open, setOpen] = useState("");

  return (
    <main className="min-h-screen bg-[#0b1110] px-5 py-12 text-white">
      <div className="mx-auto max-w-4xl space-y-7">
        <header className="text-center">
          <p className="text-sm uppercase tracking-[0.22em] text-emerald-200">Sanitized Archive</p>
          <h1 className="mt-3 text-4xl font-bold">Neutral Card Demonstration</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/60">
            Original labels, values, rules, tools, destinations, and operating details were removed.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-3">
          {entries.map((entry) => (
            <article key={entry.k} className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-xl font-bold">{entry.title}</h2>
              <p className="mt-3 text-sm leading-6 text-white/65">{entry.summary}</p>
              <button
                type="button"
                onClick={() => setOpen(open === entry.k ? "" : entry.k)}
                className="mt-5 rounded-full border border-white/15 px-4 py-2 text-sm"
              >
                {open === entry.k ? "Hide example" : "Show example"}
              </button>
              {open === entry.k ? (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-white/65">
                  {entry.details.map((detail) => <li key={detail}>{detail}</li>)}
                </ul>
              ) : null}
            </article>
          ))}
        </div>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm leading-7 text-white/65">
          This archive intentionally communicates only presentation behavior.
          It contains no original commercial terms, taxonomy, workflows,
          architecture notes, vendor choices, external links, or identifying copy.
        </section>
      </div>
    </main>
  );
}
