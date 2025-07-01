import RestaurantModel from "../model/restaurant.model.js";
import cloudinary from "cloudinary";

export const create = async (req, res) => {
  //1. check if user already an restaurant sent response that can't create multiple restaurant
  // 2. create data uri string
  try {
    const existingRestaurant = await RestaurantModel.findOne({
      userId: req.user._id,
    });

    // 1.
    if (existingRestaurant) {
      return res.status(429).json({
        success: false,
        message: "User already have an restaurant",
      });
    }

    // ! 2
    const image = req.file;
    // console.log((image.buffer).toString("base64"));
    const base64Image = Buffer.from(image.buffer).toString("base64");
    // console.log(base64Image);
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;

    const uploadresponse = await cloudinary.v2.uploader.upload(dataURI);

    const restaurant = await RestaurantModel.create({
      ...req.body,
      imageUrl: uploadresponse.url,
      userId: req.user._id,
    });
    
    res.json({
      success: true,
      restaurant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Could not create restaurant, something went wrong",
    });
  }
};
