const item = (k, label, weight = 0) => ({ k, label, weight });

const x = Object.freeze({
  v: 1,
  title: "Neutral Workflow Demonstration",
  intro: "All labels, values, and branches in this isolated copy are synthetic.",
  tracks: [
    {
      k: "t1",
      label: "Path Alpha",
      stages: [
        {
          k: "a1",
          label: "Choose a starting mode",
          items: [item("a", "Mode One", 1), item("b", "Mode Two", 2), item("c", "Undecided")],
        },
        {
          k: "a2",
          label: "Choose a complexity band",
          items: [item("d", "Narrow", 1), item("e", "Balanced", 2), item("f", "Broad", 3)],
        },
        {
          k: "a3",
          label: "Choose an operating preference",
          items: [item("g", "Self-directed"), item("h", "Assisted", 1), item("i", "Undecided")],
        },
      ],
    },
    {
      k: "t2",
      label: "Path Beta",
      stages: [
        {
          k: "b1",
          label: "Choose a revision band",
          items: [item("j", "Focused", 1), item("k", "Expanded", 3), item("l", "Undecided")],
        },
        {
          k: "b2",
          label: "Choose a follow-up mode",
          items: [item("m", "Self-directed"), item("n", "Assisted", 1), item("o", "Undecided")],
        },
      ],
    },
    {
      k: "t3",
      label: "Path Gamma",
      stages: [
        {
          k: "c1",
          label: "Choose an output band",
          items: [item("p", "Single", 1), item("q", "Set", 2), item("r", "Undecided")],
        },
        {
          k: "c2",
          label: "Choose a delivery mode",
          items: [item("s", "Standard"), item("u", "Expanded", 2), item("w", "Undecided")],
        },
      ],
    },
  ],
  notices: [
    "This fixture is synthetic and intentionally unrelated to any production catalog.",
    "Demo units are arbitrary and do not represent money, time, effort, or commitments.",
  ],
});

export default x;
