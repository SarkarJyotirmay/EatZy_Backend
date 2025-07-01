import express from "express"
import {getUserProfile, login, register, updateUserProfile, forgotPassword, resetPassword} from "../controllers/user.controlelrs.js"

const UserRouter = express.Router()
UserRouter.post("/register", register)
UserRouter.post("/login", login)
UserRouter.post("/forgot-password", forgotPassword)
UserRouter.post("/reset-password", resetPassword)
UserRouter.post("/update-profile", updateUserProfile)
UserRouter.get("/user-profile", getUserProfile)

export default UserRouter