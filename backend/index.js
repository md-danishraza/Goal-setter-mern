import { config } from "dotenv";
config();
import goalRoutes from "./routes/goalRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { protect } from "./middlewares/auth.js";

import appError from "./utils/appError.js";
import { connectDB } from "./config/index.js";

import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// db connection
connectDB();

// Routes
app.use("/api/goals", goalRoutes);
app.use("/api/users", userRoutes);

// if no url is matched
app.use((req, res, next) => {
  next(new appError("Page not found", 404));
});

// custom error handler
app.use((err, req, res, next) => {
  const { message = "something went wrong", status } = err;
  // res.send("something went wrong");
  res.status(status || 500).json({ message, status });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
