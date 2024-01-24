import express from "express";
import { getPlayListInfo } from "../controllers/getPlayListInfo.js";

const router = express.Router();
router.post("/", getPlayListInfo);

export default router;
