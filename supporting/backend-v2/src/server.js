import express from "express";

import a7 from "./routes/a7.js";
import b4 from "./routes/b4.js";

const app = express();
const port = 5050;

app.use(express.json({ limit: "64kb" }));
app.disable("x-powered-by");
app.use((req, res, next) => {
  res.set("Referrer-Policy", "no-referrer");
  res.set("X-Content-Type-Options", "nosniff");
  next();
});
app.use("/r/a7", a7);
app.use("/r/b4", b4);

app.use((req, res) => {
  res.status(404).json({ success: false, error: "Route not found." });
});

app.listen(port, "127.0.0.1", () => {
  console.log(`Isolated demo service ready on local port ${port}.`);
});
