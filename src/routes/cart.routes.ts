import { Router } from "express";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import { addToCart, getCart, removeFromCart, updateQuantity } from "../controller/cart.controller.js";

const router = Router();

router.post("/add", isLoggedIn, addToCart);
router.get("/", isLoggedIn, getCart);
router.delete("/remove", isLoggedIn, removeFromCart);
router.put("/update", isLoggedIn, updateQuantity);

export default router;
