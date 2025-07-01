import mongoose from "mongoose";

const menuItemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
})

const restaurantSchema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "users"
    },
    restaurantName: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    deliveryPrice: {
        type: Number,
        required: true,
    },
    deliveryTime: {
        type: Number,
        required: true,
    },
    cuisines: [{type: String, required: true}],
    menuItems: [menuItemSchema], // to be created
    imageUrl: {
        type: String,
        required: true
    }
}, {timestamps: true})

const RestaurantModel = mongoose.model("restaurants", restaurantSchema)
export default RestaurantModel