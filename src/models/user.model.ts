import mongoose from "mongoose";

interface User extends mongoose.Document {
  email: string;
  password: string;
  fullName: string;
  contact: string;
  role: "buyer" | "seller";
}

const userSchema = new mongoose.Schema<User>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  contact: { type: String, required: true },
  role: { type: String, enum: ["buyer", "seller"], default: "buyer" },
});

export const UserModel = mongoose.model<User>("User", userSchema);
