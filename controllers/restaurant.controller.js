import RestaurantModel from "../model/restaurant.model.js";
import cloudinary from "cloudinary";

const uploadImage = async (file) => {
  const base64Image = Buffer.from(file.buffer).toString("base64");
  const dataURI = `data:${file.mimetype};base64,${base64Image}`;

  const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
  return uploadResponse.url;
};

export const create = async (req, res) => {
  //1. check if user already an restaurant sent response that can't create multiple restaurant
  // 2. create data uri string
  try {
    const existingRestaurant = await RestaurantModel.findOne({
      userId: req.user._id,
    });

    // 1.
    if (existingRestaurant) {
      return res.status(409).json({
        success: false,
        message: "User already have an restaurant",
      });
    }

    // ! 2
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is missing",
      });
    }

    const imageUrl = await uploadImage(req.file)

    const restaurant = await RestaurantModel.create({
      ...req.body,
      imageUrl: imageUrl,
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

export const getRestaurant = async (req, res) => {
  try {
    const restaurant = await RestaurantModel.findOne({ userId: req.user._id });
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }
    res.json({
      success: true,
      restaurant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Can't get restaurant from DB",
    });
  }
};

export const updateRestaurant = async (req, res) => {
  console.log("update restaurant called");
  console.log("req.body: ",req.body);
  
  
  try {
    const restaurant = await RestaurantModel.findOne({
      userId: req.user._id,
    });

    console.log("Restaurant: ",restaurant);
    

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    restaurant.restaurantName = req.body.restaurantName;
    restaurant.city = req.body.city;
    restaurant.state = req.body.state;
    restaurant.deliveryPrice = req.body.deliveryPrice;
    restaurant.deliveryTime = req.body.deliveryTime;
    restaurant.cuisines = req.body.cuisines;
    restaurant.menuItems = req.body.menuItems;

    if (req.file) {
      console.log("Image file is present to be update");
      
    const imageUrl =  await uploadImage(req.file)
     restaurant.imageUrl = imageUrl
    }

   await restaurant.save()
   console.log("Restaurant after update: ", restaurant);
   

   res.json({
    success: true,
    restaurant
   })
  } catch (error) {
    console.log("Error in updating restaurant", error);
    
    res.status(500).json({
      success: false,
      message: "Unable to update restaurant",
    });
  }
};
