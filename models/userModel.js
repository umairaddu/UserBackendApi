import mongoose from "mongoose";

const UserSchema= new mongoose.Schema({
    name:{type:String,requred:true },
    gmail:{type:String,requred:true},
    Number:{type:Number,requred:true },
    Password:{type:String,requred:true},
})


const UserModel=mongoose.model("userRegiterDetail",UserSchema)


export default UserModel