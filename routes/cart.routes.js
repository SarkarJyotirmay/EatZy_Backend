import express from "express";
import { addToCart, clearCart, getCart, removeFromCart, updateCartQuantity } from "../controllers/cart.controller.js";


const CartRouter = express.Router();

// GET: Get current user's cart
CartRouter.get("/", getCart);

// POST: Add an item to cart
CartRouter.post("/add", addToCart);

// DELETE: Remove a specific item from cart
CartRouter.delete("/remove", removeFromCart);

// PATCH: Update quantity of a cart item
CartRouter.patch("/update", updateCartQuantity);

// DELETE: Clear the entire cart
CartRouter.delete("/clear", clearCart);

export default CartRouter;
