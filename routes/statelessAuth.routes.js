import express from "express"
import { statelessLogin } from "../controllers/statelessAuth.controller.js"

const statelessAuthRouter = express.Router()

statelessAuthRouter.get("/stateless-login", statelessLogin)

export default statelessAuthRouter