import express from "express"
import multer from "multer"
import { create, getListRestaurant, getRestaurant, updateRestaurant } from "../controllers/restaurant.controller.js"

const RestaurantRouter = express.Router()

const storage = multer.memoryStorage()
const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 mb
    }
 })

RestaurantRouter.post("/create",upload.single("imageFile"), create)
RestaurantRouter.get("/", getRestaurant)
RestaurantRouter.put("/update",upload.single("imageFile"), updateRestaurant)
RestaurantRouter.get("/list/:city", getListRestaurant)

export default RestaurantRouter