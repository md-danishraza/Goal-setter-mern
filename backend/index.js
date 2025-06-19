import { configDotenv } from "dotenv";
import goalRoutes from "./routes/goalRoutes.js";
import appError from "./utils/appError.js";
import mongoose from "mongoose";
if (process.env.NODE_ENV !== "production") {
  configDotenv();
}

import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// connecting to mongodb
const dbUrl = process.env.DBURL || "mongodb://127.0.0.1:27017/goalSetter";
mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Routes
app.use("/api/goals", goalRoutes);

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
