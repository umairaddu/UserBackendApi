import express from "express"
import { deleteuserbyid, getUserbyId, patchUserById, usercreate } from "../controllers/userController.js"
 
let userRouter=express.Router()


userRouter.post('/usercreate',usercreate)
userRouter.get('/getUserById/:id',getUserbyId)
userRouter.delete('/deleteUserBy/:id',deleteuserbyid)
userRouter.patch('/patchuserBy/:id',patchUserById)


export default userRouter
