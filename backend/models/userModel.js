import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  email: {
    type: String,
    required: [true, "please add an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please add an email"],
  },
});

const userModel = mongoose.model("User", userSchema);

export { userModel };
