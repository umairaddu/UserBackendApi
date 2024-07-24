import express from "express"
import { deleteuserbyid, getMyProfile, getUserbyId, patchUserById, usercreate, userLogin, userLogout } from "../controllers/userController.js"
import { isAuth } from "../middlewares/auth.js"
 
let userRouter=express.Router()


userRouter.post('/usercreate',usercreate)
userRouter.get('/getUserById/:id',getUserbyId)
userRouter.post('/login',userLogin)
userRouter.delete('/deleteUserBy/:id',deleteuserbyid)
userRouter.patch('/patchuserBy/:id',patchUserById)
userRouter.get('/myprofile', isAuth,getMyProfile)
userRouter.get('/logout',userLogout)


export default userRouter
