import express from "express"
import { getUserbyId, usercreate } from "../controllers/userController.js"
 
let userRouter=express.Router()


userRouter.post('/usercreate',usercreate)
userRouter.get('/getUserById/:id',getUserbyId)

export default userRouter
