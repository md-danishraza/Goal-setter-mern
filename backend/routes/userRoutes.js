import express from "express";
import { protect } from "../middlewares/auth.js";

const userRouter = express.Router();
import {
  registerUser,
  getUser,
  loginUser,
} from "../controllers/userController.js";

userRouter.post("/", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/me", protect, getUser);

export default userRouter;
