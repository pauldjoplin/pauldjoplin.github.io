import express from "express";
import { h2 } from "../handlers/h2.js";

const router = express.Router();
router.post("/", h2);

export default router;
