import mongoose, { Schema } from "mongoose";
const userSchema = new mongoose.Schema({
  name: "string",
  email: {
    type: "string",
    unique: true,
    required: [true, "email is required"],
  },
  password: {
    type: "string",
    required: [true, "password is required"],
  },
  about: "string",
  profileUrl: "string",
});
export const User =
  mongoose.models.users || mongoose.model("users", userSchema);
