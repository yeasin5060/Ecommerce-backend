import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const register = async (req ,res) => {

   try {
    const {username , fullname , email , password} = req.body

                        // check validation user
    if([username , fullname , email , password].some((field) => field?.trim() === "")){
        console.log("all filed is require");
        return res.json(new ApiError( 400 , "all filed is require"))
    }
                        //check existing user
    const existingUser = await User.findOne({
        $or : [{username},{email}]
    })

    if(existingUser){
       return res.json({
        status : 400,
        message : "this user all ready esisted"
       });
    };
                                        //create user details in database
    const user = await User.create({username : username , fullname : fullname , email :email , password : password});
    const createUser = await User.findById(user._id).select("-password -refrshToken");

    if(!createUser){
        return res.json(new ApiError( 400 , "invalide user"));
    };
                            //send the response in frontend
    res.status(200).json(new ApiResponse(200 , "user create successfully" , createUser));

   } catch (error) {
        console.log("register error" , error.message);
   };
    
};

export{ register}