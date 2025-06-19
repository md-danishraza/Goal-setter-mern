import express from "express";
import {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
} from "../controllers/goalsController.js";

const router = express.Router();

router.get("/", getGoals); // Fetch all goals
router.post("/", setGoals); // Create a new goal
router.put("/:id", updateGoals); // Update a goal by ID
router.delete("/:id", deleteGoals); // Delete a goal by ID

export default router;
