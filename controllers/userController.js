import { response } from "express"
import UserModel from "../models/userModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



let usercreate = async (req, res) => {
    try {
        let { name, gmail, Number, Password } = req.body

        const hashPassword = await bcrypt.hash(Password , 10)

        const user = await UserModel.create({ name, gmail, Number, Password:hashPassword })

        res.status(201).json({
            success: true,
            user: user
        })
    } catch (error) {
        console.log(`error controller ${error}`)
    }


}


export const userLogin = async (req, res) => {
    try {
        const { gmail, Password } = req.body;

        // Check if the user is already registered
        let user = await UserModel.findOne({ gmail });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found, Register the user first...",
            });
        }

        if (!gmail || !Password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });

        }

        // user hai ki nahi  hai
        // all fields are require
        // password check

        const isMatch = await bcrypt.compare(Password , user.Password)
     
        // Generate JWT token and set it in a cookie
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        user.Password = undefined

        res.status(201).cookie("token", token, {
            httpOnly: true,
            maxAge: 10 * 60 * 10000,
        }).json({
            success: true,
            message: `${user.name} login successfully.`,
            user: user,
            token: token
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while login user.",
            error: error.message,
        });
    }
}



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


const patchUserById = async (req, res) => {
    try {
        const id = req.params.id;
        // const {} = req.body
        // console.log(id);
        
        const userdata = await UserModel.findByIdAndUpdate(id , req.body , {new : true});
        
        if (!userdata) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        
        
        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: userdata,
        });
        
    } catch (error) {
        console.log(`Error in controller patchUserById: ${error}`);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};


export const userLogout = (req, res) => {
    try {
        res.status(200).cookie("token", "", {
            expires: new Date(Date.now())
        }).json({
            success: true,
            message: "User logged-Out successfully..."
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while logged-Out user",
            error: error.message
        })
    }
}


export const getMyProfile = (req, res) => {
    try {
        res.status(200).json({
            success: true,
            user: req.user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while logged-Out user",
            error: error.message
        })
    }
}

export { usercreate, getUserbyId, deleteuserbyid,patchUserById }