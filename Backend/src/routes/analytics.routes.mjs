import express from "express";
import { getDashboardStats } from "../controllers/analytics.controller.mjs";
import { protect } from "../middleware/auth.middleware.mjs";

const router = express.Router();

// All analytics routes require authentication
router.use(protect);

router.get("/dashboard", getDashboardStats);

export default router;
