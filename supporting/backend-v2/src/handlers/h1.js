import x from "../data/f1.js";

export function h1(req, res) {
  res.set("Cache-Control", "no-store");
  return res.json({ x });
}
