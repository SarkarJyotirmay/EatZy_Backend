// utils/razorpay.js
import Razorpay from "razorpay";
import dotenv from "dotenv"
dotenv.config()

const razorpay = new Razorpay({
  key_id: process.env.RZP_KEY,
  key_secret: process.env.RZP_SECRET,
});

export default razorpay;
