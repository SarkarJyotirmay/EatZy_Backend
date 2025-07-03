// controllers/payment.controller.js
import razorpay from "../utils/razorPay.js"

export const createPaymentOrder = async (req, res) => {
  const { totalAmount } = req.body;

  if (!totalAmount) {
    return res.status(400).json({ success: false, message: "Amount is required" });
  }

  try {
    const order = await razorpay.orders.create({
      amount: totalAmount, // in paise
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    });

    res.status(201).json({ success: true, order });
  } catch (error) {
    console.error("Razorpay order creation failed", error);
    res.status(500).json({ success: false, message: "Payment order creation failed" });
  }
};
