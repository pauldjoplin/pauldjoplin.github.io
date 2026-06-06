import express from "express";
import { h1 } from "../handlers/h1.js";

const router = express.Router();
router.get("/", h1);

export default router;
