import mongoose from "mongoose";

// connecting to mongodb
const dbUrl = process.env.DBURL || "mongodb://127.0.0.1:27017/goalSetter";
// const dbUrl = "mongodb://127.0.0.1:27017/goalSetter";

const connectDB = () => {
  mongoose
    .connect(dbUrl)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => console.error("Could not connect to MongoDB", err));
};

export { connectDB };
