import { type Request, type Response } from "express";
import { CartModel } from "../models/cart.model.js";

export const addToCart = async (req: any, res: Response) => {
  try {
    const { productId, variantIndex, quantity = 1 } = req.body;
    const userId = req.user.id;

    let cart = await CartModel.findOne({ user: userId });

    if (!cart) {
      cart = new CartModel({
        user: userId,
        items: [{ product: productId, variantIndex, quantity }]
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item: any) => item.product.toString() === productId && (item.variantIndex == variantIndex)
      );

      if (itemIndex > -1 && cart.items[itemIndex]) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ product: productId, variantIndex, quantity });
      }
    }

    await cart.save();
    const updatedCart = await CartModel.findById(cart._id).populate("items.product");
    return res.status(200).json({ message: "Product added to cart", cart: updatedCart });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCart = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    const cart = await CartModel.findOne({ user: userId }).populate("items.product");
    
    if (!cart) {
      return res.status(200).json({ items: [] });
    }

    return res.status(200).json(cart);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const removeFromCart = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    const { productId, variantIndex } = req.body;

    const cart = await CartModel.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item: any) => !(item.product.toString() === productId && (item.variantIndex == variantIndex))
    );

    await cart.save();
    const updatedCart = await CartModel.findById(cart._id).populate("items.product");
    return res.status(200).json({ message: "Product removed from cart", cart: updatedCart });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateQuantity = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    const { productId, variantIndex, quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const cart = await CartModel.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item: any) => item.product.toString() === productId && (item.variantIndex == variantIndex)
    );

    if (itemIndex > -1 && cart.items[itemIndex]) {
      cart.items[itemIndex].quantity = quantity;
      await cart.save();
      const updatedCart = await CartModel.findById(cart._id).populate("items.product");
      return res.status(200).json({ message: "Quantity updated", cart: updatedCart });
    } else {
      return res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
