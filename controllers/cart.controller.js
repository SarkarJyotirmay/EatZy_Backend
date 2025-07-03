import CartModel from "../model/cart.model.js";
import RestaurantModel from "../model/restaurant.model.js";

// GET /api/cart - Get current user's cart
export const getCart = async (req, res) => {
  console.log("get cart hit");

  const { _id } = req.user; // userId
  const userId = _id;

  try {
    const cart = await CartModel.findOne({ userId });

    if (!cart) {
      // Return empty cart structure instead of 400 error
      return res.status(200).json({
        success: true,
        data: {
          userId,
          restaurantId: null,
          restaurantName: null,
          items: [],
        },
      });
    }

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    console.error("Get cart error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// POST /api/cart/add - Add item to cart
export const addToCart = async (req, res) => {
  const { _id } = req.user; // userId
  const userId = _id;

  const { restaurantId, menuItemId } = req.body;

  try {
    const restaurant = await RestaurantModel.findById(restaurantId);
    if (!restaurant) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not found" });
    }

    const menuItem = restaurant.menuItems.find(
      (item) => item._id.toString() === menuItemId
    );

    if (!menuItem) {
      return res
        .status(404)
        .json({ success: false, message: "Menu item not found" });
    }

    let cart = await CartModel.findOne({ userId });

    // If cart exists
    if (cart) {
      if (cart.restaurantId.toString() !== restaurantId) {
        // If trying to add from a different restaurant, reset cart
        cart.restaurantId = restaurant._id;
        cart.restaurantName = restaurant.restaurantName;
        cart.items = [];
      }

      const existingItem = cart.items.find(
        (item) => item.menuItemId.toString() === menuItemId
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.items.push({
          menuItemId: menuItem._id,
          name: menuItem.name,
          price: menuItem.price,
          quantity: 1,
        });
      }

      await cart.save();
    } else {
      // Create new cart
      cart = await CartModel.create({
        userId,
        restaurantId,
        restaurantName: restaurant.restaurantName,
        items: [
          {
            menuItemId: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ],
      });
    }

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// DELETE /api/cart/remove - Remove item from cart
export const removeFromCart = async (req, res) => {
  const { _id } = req.user; // userId
  const userId = _id;
  const { menuItemId } = req.body;

  try {
    const cart = await CartModel.findOne({ userId });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.menuItemId.toString() !== menuItemId
    );

    await cart.save();
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    console.error("Remove from cart error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// PATCH /api/cart/update - Update quantity
export const updateCartQuantity = async (req, res) => {
  const { _id } = req.user; // userId
  const userId = _id;
  const { menuItemId, quantity } = req.body;

  try {
    const cart = await CartModel.findOne({ userId });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    const item = cart.items.find(
      (item) => item.menuItemId.toString() === menuItemId
    );

    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Item not in cart" });
    }

    item.quantity = quantity;
    await cart.save();

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    console.error("Update cart error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// DELETE /api/cart/clear - Clear cart
export const clearCart = async (req, res) => {
   const { _id } = req.user; // userId
  const userId = _id;

  try {
    const cart = await CartModel.findOne({ userId });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    cart.items = [];
    await cart.save();

    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    console.error("Clear cart error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
