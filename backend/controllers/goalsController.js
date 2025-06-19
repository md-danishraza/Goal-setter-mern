import appError from "../utils/appError.js";
import wrapAsync from "../utils/wrapAsync.js";
// import GoalsModel from "../models/";

export const getGoals = wrapAsync(async (req, res) => {
  res.status(200).json({ message: "get goals" });
});

export const setGoals = wrapAsync(async (req, res) => {
  if (!req.body.text) {
    throw new appError("Provide text field", 400);
  }
  res.status(201).json({ message: "post goals" });
});

export const updateGoals = wrapAsync(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new appError("Goal ID is required", 400);
  }

  res.status(200).json({ message: `update goal with ID: ${id}` });
});

export const deleteGoals = wrapAsync(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new appError("Goal ID is required", 400);
  }
  res.status(200).json({ message: `delete goal with ID: ${id}` });
});
