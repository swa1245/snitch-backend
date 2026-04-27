import mongoose from "mongoose";
import dotenv from "dotenv";
import { ProductModel } from "./models/product.model.js";
import { UserModel } from "./models/user.model.js";
import { CategoryModel } from "./models/category.model.js";
import { fileURLToPath } from 'url';
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const seedCategories = [
  { name: "T-shirts", type: "category", imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80" },
  { name: "Jeans", type: "category", imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80" },
  { name: "Hoodies", type: "category", imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80" },
  { name: "Jackets", type: "category", imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80" },

  { name: "Concert Ready", type: "vibe", imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80", description: "Vibe 01" },
  { name: "Night Out", type: "vibe", imageUrl: "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=1200&q=80", description: "Vibe 02" },
  { name: "Cafe Hopping", type: "vibe", imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80", description: "Vibe 03" },
  { name: "Summer Escape", type: "vibe", imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80", description: "Vibe 04" },

  { name: "Oversized T-Shirts", type: "collection", imageUrl: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80", description: "Drop 01" },
  { name: "Relaxed Fit", type: "collection", imageUrl: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80", description: "Drop 02" },
  { name: "Limited Drop", type: "collection", imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80", description: "Drop 03" }
];

const seedData = [
  // --- OVERSIZED T-SHIRTS ---
  {
    title: "Midnight Onyx Oversized Tee",
    description: "Heavyweight 240GSM cotton. Premium high-density Snitch logo.",
    category: "T-shirts",
    brandCollection: "Oversized T-Shirts",
    occasion: "Concert Ready",
    price: { amount: 1499, currency: "USD" },
    images: [{ url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80" }],
    variants: [{ attributes: new Map([["size", "L"], ["color", "Black"]]), stock: 50, price: { amount: 1499, currency: "USD" }, images: [] }]
  },
  {
    title: "Arctic White Boxy Tee",
    description: "Structured boxy silhouette. Pre-shrunk premium jersey.",
    category: "T-shirts",
    brandCollection: "Oversized T-Shirts",
    occasion: "Cafe Hopping",
    price: { amount: 1299, currency: "USD" },
    images: [{ url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80" }],
    variants: [{ attributes: new Map([["size", "M"], ["color", "White"]]), stock: 100, price: { amount: 1299, currency: "USD" }, images: [] }]
  },
  {
    title: "Dusty Rose Oversized",
    description: "Muted aesthetic. Soft-touch pima cotton blend.",
    category: "T-shirts",
    brandCollection: "Oversized T-Shirts",
    occasion: "Summer Escape",
    price: { amount: 1599, currency: "USD" },
    images: [{ url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80" }],
    variants: [{ attributes: new Map([["size", "S"], ["color", "Rose"]]), stock: 30, price: { amount: 1599, currency: "USD" }, images: [] }]
  },
  {
    title: "Neon Cyber Graphic Tee",
    description: "Back-print limited graphic. Future-forward streetwear.",
    category: "T-shirts",
    brandCollection: "Oversized T-Shirts",
    occasion: "Night Out",
    price: { amount: 1999, currency: "USD" },
    images: [{ url: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80" }],
    variants: [{ attributes: new Map([["size", "XL"], ["color", "Black"]]), stock: 20, price: { amount: 1999, currency: "USD" }, images: [] }]
  },

  // --- RELAXED FIT JEANS/BOTTOMS ---
  {
    title: "Titanium Distressed Denim",
    description: "Italian selvedge denim. Expertly distressed by hand.",
    category: "Jeans",
    brandCollection: "Relaxed Fit",
    occasion: "Night Out",
    price: { amount: 3499, currency: "USD" },
    images: [{ url: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80" }],
    variants: [{ attributes: new Map([["size", "32"], ["color", "Indigo"]]), stock: 25, price: { amount: 3499, currency: "USD" }, images: [] }]
  },
  {
    title: "Stone Washed Relaxed Jeans",
    description: "Classic 90s aesthetic. Wide leg and comfortable waist.",
    category: "Jeans",
    brandCollection: "Relaxed Fit",
    occasion: "Cafe Hopping",
    price: { amount: 2999, currency: "USD" },
    images: [{ url: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80" }],
    variants: [{ attributes: new Map([["size", "30"], ["color", "Light Blue"]]), stock: 45, price: { amount: 2999, currency: "USD" }, images: [] }]
  },
  {
    title: "Olive Utility Cargos",
    description: "Tech-focused utility pants. 8 pockets and water-resistant.",
    category: "Jeans",
    brandCollection: "Relaxed Fit",
    occasion: "Concert Ready",
    price: { amount: 3299, currency: "USD" },
    images: [{ url: "https://images.unsplash.com/photo-1517441662448-f68249826bc1?auto=format&fit=crop&w=800&q=80" }],
    variants: [{ attributes: new Map([["size", "L"], ["color", "Olive"]]), stock: 55, price: { amount: 3299, currency: "USD" }, images: [] }]
  },
  {
    title: "Shadow Black Pleated Pants",
    description: "Semi-formal relaxed trousers. Elegant drape and sharp pleats.",
    category: "Jeans",
    brandCollection: "Relaxed Fit",
    occasion: "Night Out",
    price: { amount: 3999, currency: "USD" },
    images: [{ url: "https://images.unsplash.com/photo-1473963441143-424698305927?auto=format&fit=crop&w=800&q=80" }],
    variants: [{ attributes: new Map([["size", "34"], ["color", "Black"]]), stock: 15, price: { amount: 3999, currency: "USD" }, images: [] }]
  },

  // --- LIMITED DROP JACKETS ---
  {
    title: "Interceptor Varsity Jacket",
    description: "Wool body, leather sleeves. Custom chain-stitch embroidery.",
    category: "Jackets",
    brandCollection: "Limited Drop",
    occasion: "Concert Ready",
    price: { amount: 8999, currency: "USD" },
    images: [{ url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80" }],
    variants: [{ attributes: new Map([["size", "XL"], ["color", "Navy"]]), stock: 10, price: { amount: 8999, currency: "USD" }, images: [] }]
  },
  {
    title: "Ghost Shell Windbreaker",
    description: "Hyper-reflective fabric. 3M piping and stowaway hood.",
    category: "Jackets",
    brandCollection: "Limited Drop",
    occasion: "Night Out",
    price: { amount: 4599, currency: "USD" },
    images: [{ url: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80" }],
    variants: [{ attributes: new Map([["size", "M"], ["color", "Silver"]]), stock: 25, price: { amount: 4599, currency: "USD" }, images: [] }]
  },
  {
    title: "Cognac Suede Biker",
    description: "Premium Italian suede. Hand-burnished edges and YKK zips.",
    category: "Jackets",
    brandCollection: "Limited Drop",
    occasion: "Night Out",
    price: { amount: 12999, currency: "USD" },
    images: [{ url: "https://images.unsplash.com/photo-1520975916090-3105956dac50?auto=format&fit=crop&w=800&q=80" }],
    variants: [{ attributes: new Map([["size", "L"], ["color", "Cognac"]]), stock: 5, price: { amount: 12999, currency: "USD" }, images: [] }]
  },

  // --- HOODIES ---
  {
    title: "Solaris Gradient Hoodie",
    description: "Sunset dip-dye. Heavy fleece with silk-lined hood.",
    category: "Hoodies",
    brandCollection: "Relaxed Fit",
    occasion: "Summer Escape",
    price: { amount: 2999, currency: "USD" },
    images: [{ url: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80" }],
    variants: [{ attributes: new Map([["size", "M"], ["color", "Gradient"]]), stock: 20, price: { amount: 2999, currency: "USD" }, images: [] }]
  },
  {
    title: "Obsidian Core Hoodie",
    description: "The daily essential. Double-needle stitched for durability.",
    category: "Hoodies",
    brandCollection: "Relaxed Fit",
    occasion: "Cafe Hopping",
    price: { amount: 2499, currency: "USD" },
    images: [{ url: "https://images.unsplash.com/photo-1556821840-4c4c66708314?auto=format&fit=crop&w=800&q=80" }],
    variants: [{ attributes: new Map([["size", "L"], ["color", "Black"]]), stock: 60, price: { amount: 2499, currency: "USD" }, images: [] }]
  }
];

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) throw new Error("MONGO_URI not found");

    console.log("Connecting to MongoDB...");
    await mongoose.connect(mongoUri);

    const seller = await UserModel.findOne({ role: "seller" }) || await UserModel.findOne();
    if (!seller) {
      console.error("No user found");
      process.exit(1);
    }

    console.log("Wiping and Re-seeding...");
    await ProductModel.deleteMany({});
    await CategoryModel.deleteMany({});

    await CategoryModel.insertMany(seedCategories);

    const productsToInsert = seedData.map(p => ({ ...p, seller: seller._id }));
    await ProductModel.insertMany(productsToInsert);

    console.log("Database seeded successfully with 20+ items! 🚀");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedDB();
