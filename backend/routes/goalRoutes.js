import express from "express";
import { protect } from "../middlewares/auth.js";
import {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
} from "../controllers/goalsController.js";

const router = express.Router();

router.get("/", protect, getGoals); // Fetch all goals
router.post("/", protect, setGoals); // Create a new goal
router.put("/:id", protect, updateGoals); // Update a goal by ID
router.delete("/:id", protect, deleteGoals); // Delete a goal by ID

export default router;
