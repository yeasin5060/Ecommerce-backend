import mongoose from "mongoose"
import { Product } from "../models/product.modles.js"
import { User } from "../models/user.models.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"

const order = async (req , res) => {
    try {
        const {quantity} = req.body
        if(!quantity){
            throw new ApiError(400 , "quantity is require")
        }
        const userOder = await User.aggregate([
            {
                $match : {
                    _id : new mongoose.Types.ObjectId(req.user._id)
                }
            },
            {
                $lookup : {
                    from : "users",
                    localdField : "owner",
                    foreginFiled : "_id",
                    as : "owner"
                }
            },
            {
                $match : {
                    _id : new mongoose.Types.ObjectId()
                }
            }
           ])
       
    } catch (error) {
        
    }
}

export {order}