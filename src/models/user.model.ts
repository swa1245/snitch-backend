import mongoose from "mongoose";

interface User extends mongoose.Document {
  email: string;
  password: string;
  fullName: string;
  contact: string;
  role: "buyer" | "seller";
  googleId?: string;
  
}

const userSchema = new mongoose.Schema<User>({
  email: { type: String, required: true, unique: true },
  password: { 
    type: String, 
    required: function (this: User): boolean {
      return !this.googleId;
    }
  },
  fullName: { type: String, required: true },
  contact: { type: String, required: false },
  role: { type: String, enum: ["buyer", "seller"], default: "buyer" },
  googleId: { type: String, required: false },
});

export const UserModel = mongoose.model<User>("User", userSchema);
