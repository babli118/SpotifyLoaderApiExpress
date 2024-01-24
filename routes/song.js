import express from "express";
import { getSongInfo } from "../controllers/getSongInfo.js";

const router = express.Router();
router.post("/", getSongInfo);

export default router;
