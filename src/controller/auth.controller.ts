import type { Request, Response } from "express";
import { UserModel } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {config} from "../config/config.js";

export const register = async (req: Request, res: Response) => {
  const { email, password, fullName, contact, role } = req.body;
  if (!email || !password || !fullName || !contact || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const isExistingUser = await UserModel.findOne({
      $or: [{ email }, { contact }],
    });
    if (isExistingUser) {
      return res
        .status(400)
        .json({ message: "Email or contact already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({
        email,
        password: hashPassword,
        fullName,
        contact,
        role
    })
    const token = jwt.sign({
        id: newUser._id
    },config.JWT_SECRET as string)
    
    return res.status(201).json({ message: "User registered successfully", token });

  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal server error" });
  }
};
