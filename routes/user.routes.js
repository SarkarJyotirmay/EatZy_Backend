import express from "express"
import {getUserProfile, login, register, updateUserProfile, forgotPassword, resetPassword, changePassword} from "../controllers/user.controlelrs.js"
import { auth } from "../middlewares/auth.middleware.js"

const UserRouter = express.Router()
UserRouter.post("/register", register)
UserRouter.post("/login", login)
UserRouter.post("/forgot-password", forgotPassword)
UserRouter.post("/reset-password", resetPassword)
UserRouter.post("/update-profile", updateUserProfile)
UserRouter.get("/user-profile", getUserProfile)
UserRouter.post("/change-password", auth, changePassword)

export default UserRouter