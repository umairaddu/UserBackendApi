import express, { Router } from "express"
import dotenv from "dotenv"
import userRouter from "./routes/user.js"
import dbconnect from "./DB/db.js"
import cookieParser from "cookie-parser"
dotenv.config()
const app=express()

const port=process.env.PORT

dbconnect()

app.use('/',(req,res)=>{
res.send("start")
})

app.use(express.json())
app.use(cookieParser())
app.use('/',userRouter)



app.listen(port,()=>{

    console.log(`server started at port number ${port}`)
    })
