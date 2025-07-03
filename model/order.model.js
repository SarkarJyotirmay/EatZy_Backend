
import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    menuItemId: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
    quantity: Number,
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "restaurants",
      required: true,
    },
    restaurantName: String,
    items: [orderItemSchema],
    totalAmount: Number, // in paise
    deliveryPrice: Number, // in rupees
    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "DELIVERED"],
      default: "PENDING",
    },
    address: {
      addressLine1: String,
      addressLine2: String,
      landmark: String,
      city: String,
      state: String,
      pincode: String,
    },
  },
  {
    timestamps: true,
  }
);

const OrderModel = mongoose.model("orders", orderSchema);
export default OrderModel;
