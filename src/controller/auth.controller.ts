import type { Request, Response } from "express";
import { UserModel } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export const register = async (req: Request, res: Response) => {
  const { email, password, fullName, contact, role, isSeller } = req.body;
  if (!email || !password || !fullName || !contact || !role || !isSeller) {
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
      role: isSeller ? "seller" : "buyer"
    })
    const token = jwt.sign({
      id: newUser._id
    }, config.JWT_SECRET as string)

    res.cookie("token", token)

    return res.status(201).json({ message: "User registered successfully", token });

  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  const {email,password} = req.body
  if(!email || !password){
    return res.status(400).json({message:"All fields are required"})
  }
  try {
    const user = await UserModel.findOne({email})
    if(!user){
      return res.status(404).json({message:"User not found"})
    }
    const isPasswordValid = await bcrypt.compare(password,user.password)
    if(!isPasswordValid){
      return res.status(401).json({message:"Invalid password"})
    }
    const token = jwt.sign({id:user._id},config.JWT_SECRET as string)
    res.cookie("token",token)
    return res.status(200).json({message:"User logged in successfully",token})
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Internal server error"})
  }
}

export const googleAuth = async (req: Request, res: Response) => {
  // This function will be called after successful authentication with Google
  // You can access the authenticated user's information through req.user
  // For example, you can create a JWT token for the user and send it back in the response
  console.log(req.user);
   const {id,displayName,emails,photos} = req.user as any
    const email = emails[0].value
    const profilePicture = photos[0].value

    const user = await UserModel.findOne({
      email
    })
    if(!user){
      const newUser = await UserModel.create({
        email,
        fullName: displayName,
        googleId: id,
      })
    }
    const token = jwt.sign({id},config.JWT_SECRET as string)
    res.cookie("token",token)
    res.redirect("http://localhost:5173/") // Redirect to frontend after successful authentication
    return res.status(200).json({message:"User authenticated with Google successfully",token})
}