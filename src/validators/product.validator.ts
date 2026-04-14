import { body,validationResult } from "express-validator";
import type { Request, Response, NextFunction } from "express";

function validateRequest(   req: Request, res: Response, next: NextFunction ) {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            message:"validation error"
        })
        errors.array()
    }
}

export const createProductValidator = [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("priceAmount").isNumeric().withMessage("Price amount must be a number"),
    body("priceCurrency").optional().isString().withMessage("Price currency must be a string"),
    validateRequest
];