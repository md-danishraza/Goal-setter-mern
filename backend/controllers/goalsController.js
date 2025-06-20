import appError from "../utils/appError.js";
import wrapAsync from "../utils/wrapAsync.js";
import { Goal } from "../models/goalModel.js";

export const getGoals = wrapAsync(async (req, res) => {
  // find goals of a user
  const goals = await Goal.find({ user: req.user._id });

  res.status(200).json(goals);
});

export const setGoals = wrapAsync(async (req, res) => {
  if (!req.body.text) {
    throw new appError("Provide text field", 400);
  }
  const newGoal = await Goal.create({
    text: req.body.text,
    user: req.user._id,
  });

  res.status(201).json(newGoal);
});

export const updateGoals = wrapAsync(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new appError("Goal ID is required", 400);
  }
  if (!req.body.text) {
    throw new appError("Provide text field", 400);
  }

  const updatedGoal = await Goal.findByIdAndUpdate(id, req.body, { new: true });

  res.status(200).json(updatedGoal);
});

export const deleteGoals = wrapAsync(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new appError("Goal ID is required", 400);
  }
  await Goal.findByIdAndDelete(id);
  res.status(200).json({ message: `delete goal with ID: ${id}` });
});
