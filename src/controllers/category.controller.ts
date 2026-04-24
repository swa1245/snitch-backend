import type { Request, Response } from "express";
import { CategoryModel } from "../models/category.model.js";

export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const { type } = req.query;
        const filter: any = { isActive: true };
        if (type) filter.type = type;

        const categories = await CategoryModel.find(filter);
        res.status(200).json(categories);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const createCategory = async (req: Request, res: Response) => {
    try {
        const category = await CategoryModel.create(req.body);
        res.status(201).json(category);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
