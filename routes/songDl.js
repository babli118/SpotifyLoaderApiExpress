import express from "express";
import { getSong } from "../controllers/getSong.js";

const router = express.Router();
router.post("/", getSong);

export default router;
