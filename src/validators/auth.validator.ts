import { body, validationResult } from "express-validator";
import type { NextFunction, Request, Response } from "express";

function validateRequest(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

export const registerValidator = [
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("fullName")
    .isLength({ min: 2 })
    .withMessage("Full name must be at least 2 characters long")
    .notEmpty()
    .withMessage("Full name is required"),
  body("contact")
    .notEmpty()
    .withMessage("Contact information is required")
    .matches(/^\d{10}$/)
    .withMessage("Contact must be a valid 10-digit number"),
  body("role")
    .isIn(["buyer", "seller"])
    .withMessage("Role must be either 'buyer' or 'seller'"),
  body("isSeller")
    .isBoolean()
    .withMessage("isSeller must be a boolean"),

    validateRequest
];

export const loginValidator = [
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

    validateRequest
];
