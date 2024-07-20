import express from "express"
import { deleteuserbyid, getUserbyId, usercreate } from "../controllers/userController.js"
 
let userRouter=express.Router()


userRouter.post('/usercreate',usercreate)
userRouter.get('/getUserById/:id',getUserbyId)
userRouter.delete('/deleteUserBy/:id',deleteuserbyid)

export default userRouter
