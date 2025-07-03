import express from "express"
import { getMyOrders, placeOrder } from "../controllers/order.controller.js";

const OrderRouter = express.Router()

OrderRouter.post("/place", placeOrder);
OrderRouter.get("/my-orders", getMyOrders)

export default OrderRouter