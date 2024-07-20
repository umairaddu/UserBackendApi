import mongoose from "mongoose";


const dbconnect = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/USERS-DB")
        console.log(`connection established to database`)
    } catch (error) {
        console.log(`error in db connnect${error}`) 
    }
}


export default dbconnect