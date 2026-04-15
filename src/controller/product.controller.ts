import type { Request, Response } from "express";
import { uploadImage } from "../services/storage.service.js";
import { ProductModel } from "../models/product.model.js";


export const createProduct = async (req: Request, res: Response) => {
  const { title, description, priceAmount, priceCurrency } = req.body;
  const seller = req.user as Express.User & { _id: string };
  if (!seller) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (!title || !description || !priceAmount || !priceCurrency) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const files = req.files as Express.Multer.File[] | undefined;
  if (!files || files.length === 0) {
    return res.status(400).json({ message: "At least one image is required" });
  }

  const uploadedUrls = await Promise.all(
    files.map(async (file) => {
      return await uploadImage(file.buffer, file.originalname);
    }),
  );
  const images = uploadedUrls
    .filter((url): url is string => url !== undefined)
    .map((url) => ({ url }));

  const product = await ProductModel.create({
    title,
    description,
    price: {
      amount: priceAmount,
      currency: priceCurrency || "USD",
    },
    seller: seller._id,
    images,
  });
  return res
    .status(201)
    .json({ message: "Product created successfully", product });
};

export const getSellerProducts = async (req: Request, res: Response) => {
  const seller = req.user as Express.User & { _id: string };
  if (!seller) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const products = await ProductModel.find({ seller: seller._id });
  return res
    .status(200)
    .json({ message: "Seller products fetched successfully", products });
};
