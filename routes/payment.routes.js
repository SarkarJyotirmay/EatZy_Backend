import express from "express"
import { createPaymentOrder } from "../controllers/payment.controller.js";

const PaymentRouter = express.Router()

PaymentRouter.post("/create", createPaymentOrder);

export default PaymentRouter