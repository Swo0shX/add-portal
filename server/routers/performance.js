import express from "express";
import { getPerfDetails } from "../controllers/performance.js";

const router = express.Router();

router.get("/:user", getPerfDetails);

export default router;
