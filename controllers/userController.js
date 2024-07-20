import { response } from "express"
import UserModel from "../models/userModel.js"



let usercreate = async (req, res) => {
    try {
        let { name, gmail, Number, Password } = req.body

        const user = await UserModel.create({ name, gmail, Number, Password })

        res.status(201).json({
            success: true,
            user: user
        })
    } catch (error) {
        console.log(`error controller ${error}`)
    }


}


// const getUserbyId = async (req, res) => {

//     try {
//         const id = req.params.id
//         // console.log(id);
//         const userData = await UserModel.findById({id})
//         console.log(userData);
//         if(!userData){
//             throw new Error('Invalid credential')
//         }
//         const {Password,Number,...data} = userData._doc
//         res.status(200).json({
//             success: true,
//             userData:data
//         })
//         console.log(userData);
//     } catch (error) {
//         res.status(404).json({
//             success:false,
//             message:error
//         })
//         console.log(`error in user get controller ${error}`);
//     }
// }
const getUserbyId = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const userData = await UserModel.findById(id);
        if (!userData) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const { Password, Number, ...data } = userData._doc;
        res.status(200).json({
            success: true,
            userData: data
        });
        console.log(userData);
    }catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
        console.log(`Error in getUserById controller: ${error}`);
    }
};



const deleteuserbyid = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);

        const userdata = await UserModel.findByIdAndDelete(id);
        if (!userdata) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

       return res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        console.log(`Error in deleteUserById controller: ${error}`);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};




export { usercreate, getUserbyId, deleteuserbyid }