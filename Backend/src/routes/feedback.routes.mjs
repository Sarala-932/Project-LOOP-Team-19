import express from "express";
import {
    createFeedback,
    getFeedbacks,
    getFeedbackById,
    updateFeedback,
    deleteFeedback,
} from "../controllers/feedback.controller.mjs";
import {protect, restrictTo} from "../middleware/auth.middleware.mjs";

const router = express.Router();

/** ALL feedback routes require the user to be logged in */

router.use(protect);

/** CREATE - Only Admin & Analyst can add feedback (Viewer is read-only) */

router.post("/", restrictTo("ADMIN", "ANALYST"), createFeedback);

/** READ - All roles (Admin, Analyst, Viewer) can read feedback */

router.get("/", getFeedbacks);
router.get("/:id", getFeedbackById);

/** UPDATE & DELETE - Only Admin & Analyst */

router.put("/:id", restrictTo("ADMIN", "ANALYST"), updateFeedback);
router.delete("/:id", restrictTo("ADMIN", "ANALYST"), deleteFeedback);

export default router;
