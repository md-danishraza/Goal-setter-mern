import appError from "../utils/appError.js";
import wrapAsync from "../utils/wrapAsync.js";

import { userModel } from "../models/userModel.js";
import bcrypt from "bcrypt";
import { createTokenForUser } from "../utils/auth.js";

// POST api/users/
export const registerUser = wrapAsync(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new appError("Please provide values", 400);
  }
  //   if user exists
  const userExist = await userModel.findOne({ email });

  //   console.log(userExist);
  if (userExist) {
    throw new appError("User already exist with following email", 400);
  }

  //   hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);

  // create user
  const user = await userModel.create({
    name,
    email,
    password: hashedPass,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: createTokenForUser(user),
    });
  } else {
    throw new appError("Invalid user Data", 400);
  }
});
// POST api/users/login
export const loginUser = wrapAsync(async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body);
  if (!email || !password) {
    throw new appError("Please provide values", 400);
  }
  //   check user
  const user = await userModel.findOne({ email: email });
  if (!user) {
    throw new appError("User not found", 400);
  }
  // console.log(user);
  //   compare pass
  const result = await bcrypt.compare(password, user.password);
  // console.log(result);
  if (result) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: createTokenForUser(user),
    });
  } else {
    throw new appError("Incorrect Password", 401);
  }
});
// GET api/users/me
export const getUser = wrapAsync(async (req, res) => {
  // user is already added by auth middleware
  res.status(200).json(req.user);
});
