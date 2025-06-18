import { config } from "dotenv";
// loading env variables if app in development
if (process.env.NODE_ENV !== "production") {
  config();
}

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// cors
app.use(cors());

// connecting to the server
const mongo = process.env.MONGO_URL || "mongodb://localhost:27017/memories";
mongoose
  .connect(mongo)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("server is running on port ", PORT);
});
