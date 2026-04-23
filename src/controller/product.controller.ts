import type { Request, Response } from "express";
import { uploadImage } from "../services/storage.service.js";
import { ProductModel } from "../models/product.model.js";


export const createProduct = async (req: Request, res: Response) => {
  const { title, description, priceAmount, priceCurrency, variants } = req.body;
  const seller = req.user as Express.User & { _id: string };

  if (!seller) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!title || !description || !priceAmount || !priceCurrency) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const rawFiles = req.files as Express.Multer.File[] | undefined;
  if (!rawFiles || rawFiles.length === 0) {
    return res.status(400).json({ message: "At least one image is required" });
  }

  try {
    // Separate main images and variant images
    const mainFiles = rawFiles.filter(f => f.fieldname === 'image');
    const variantFilesMap: Record<string, Express.Multer.File[]> = {};
    
    rawFiles.forEach(f => {
      if (f.fieldname.startsWith('variant_images_')) {
        const idx = f.fieldname.replace('variant_images_', '');
        if (!variantFilesMap[idx]) variantFilesMap[idx] = [];
        variantFilesMap[idx].push(f);
      }
    });

    // Upload main images
    const uploadedMainUrls = await Promise.all(
      mainFiles.map(async (file) => {
        return await uploadImage(file.buffer, file.originalname);
      }),
    );
    const mainImages = uploadedMainUrls.filter((url): url is string => !!url).map(url => ({ url }));

    let parsedVariants = [];
    if (variants) {
      try {
        const rawVariants = typeof variants === 'string' ? JSON.parse(variants) : variants;
        
        // Upload variant images for each variant that has files
        parsedVariants = await Promise.all(rawVariants.map(async (v: any, idx: number) => {
          const vFiles = variantFilesMap[idx.toString()] || [];
          let vImages: { url: string }[] = [];
          
          if (vFiles.length > 0) {
            const uploadedVUrls = await Promise.all(vFiles.map(f => uploadImage(f.buffer, f.originalname)));
            vImages = uploadedVUrls.filter((url): url is string => !!url).map(url => ({ url }));
          }

          // Also keep the existing index mapping if provided
          const indexMappedImages = (v.imageIndices || []).map((i: number) => mainImages[i]).filter(Boolean);
          const finalVImages = [...vImages, ...indexMappedImages];

          return {
            ...v,
            images: finalVImages.length > 0 ? finalVImages : undefined
          };
        }));
      } catch (e) {
        console.error("Failed to parse variants:", e);
      }
    }

    const product = await ProductModel.create({
      title,
      description,
      price: {
        amount: Number(priceAmount),
        currency: priceCurrency || "USD",
      },
      seller: seller._id,
      images: mainImages,
      variants: parsedVariants,
    });

    return res
      .status(201)
      .json({ message: "Product created successfully", product });
  } catch (error: any) {
    console.error("Create Product Error:", error);
    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
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

export const getAllProducts = async (req: Request, res: Response) => {
  const products = await ProductModel.find();
  return res
    .status(200)
    .json({ message: "Products fetched successfully", products });
};

export const getProductDetails = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await ProductModel.findById(id);
  if(!product){
    return res.status(404).json({ message: "Product not found" });
  }
  return res
    .status(200)
    .json({ message: "Product details fetched successfully", product });
};


