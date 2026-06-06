import x from "../data/f1.js";

const allowedKeys = new Set(["a", "d"]);

function exactKeys(value, expected) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const keys = Object.keys(value);
  return keys.length === expected.length && keys.every((key) => expected.includes(key));
}

function validDigest(value) {
  if (typeof value !== "string" || value.length === 0 || value.length > 4000) return false;

  try {
    const parsed = JSON.parse(value);
    if (!exactKeys(parsed, ["t", "a", "u"]) || !Number.isInteger(parsed.u)) return false;

    const track = x.tracks.find((item) => item.k === parsed.t);
    if (!track || !exactKeys(parsed.a, track.stages.map((stage) => stage.k))) return false;

    const selected = track.stages.map((stage) =>
      stage.items.find((item) => item.k === parsed.a[stage.k]),
    );
    if (selected.some((item) => !item)) return false;

    return selected.reduce((sum, item) => sum + item.weight, 0) === parsed.u;
  } catch {
    return false;
  }
}

export function h2(req, res) {
  res.set("Cache-Control", "no-store");
  const keys = Object.keys(req.body || {});
  const acceptedShape = keys.length === 2 && keys.every((key) => allowedKeys.has(key));

  if (!acceptedShape || req.body.a !== true || !validDigest(req.body.d)) {
    return res.status(400).json({ ok: false, code: "INVALID_DEMO_SHAPE" });
  }

  return res.json({ ok: true, at: new Date().toISOString() });
}
