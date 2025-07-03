import CartModel from "../model/cart.model.js";
import RestaurantModel from "../model/restaurant.model.js";
import OrderModel from "../model/order.model.js";

export const placeOrder = async (req, res) => {
  const { _id: userId } = req.user;
  const address = req.body.address || req.user.address;

  try {
    const cart = await CartModel.findOne({ userId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    const restaurant = await RestaurantModel.findById(cart.restaurantId);
    if (!restaurant) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not found" });
    }

    const subtotal = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const totalAmount = subtotal + restaurant.deliveryPrice * 100;

    const order = await OrderModel.create({
      userId,
      restaurantId: restaurant._id,
      restaurantName: restaurant.restaurantName,
      items: cart.items,
      deliveryPrice: restaurant.deliveryPrice,
      totalAmount,
      address,
    });

    await CartModel.findByIdAndDelete(cart._id);

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    console.error("Place order error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// GET /api/order/my-orders
export const getMyOrders = async (req, res) => {
  const { _id: userId } = req.user;

  try {
    const orders = await OrderModel.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("Get orders error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

