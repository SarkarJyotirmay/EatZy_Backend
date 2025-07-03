import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    menuItemId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true, // keep this to match `_id` of menuItem in restaurant
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
      unique: true, // one cart per user
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "restaurants",
      required: true,
    },
    restaurantName: {
      type: String,
      required: true,
    },
    items: [cartItemSchema],
  },
  {
    timestamps: true,
  }
);

const CartModel = mongoose.model("carts", cartSchema);
export default CartModel;
