import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const generatorAccessAndRefreshtoken = async (user) => {
    try {
        const accessToken = await user.generatorAccessToken()
        const refreshToken = await user.generatorRefreshToken()
        user.refreshToken = refreshToken
        await user.save()
        return {accessToken , refreshToken}
    } catch (error) {
        console.log("Generator Access And Refreshtoken error" , error.message);
        throw new Error("Token generation failed");
    }
}

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
        res.status(400).json(new ApiError(400 , "register error" , error.message));
   };
    
};

const login = async (req , res) =>{
    try {
        const {email , password} = req.body;
        if([email , password].some((field) => field ?.trim() === "")){
           return res.status(400).json(new ApiError(400 , "all field is require"));
        };

        const userFound = await User.findOne({email})
        if(!userFound){
           return res.status(400).json(new ApiError(400 , "invalied user"));
        };

        const {accessToken , refreshToken} = await generatorAccessAndRefreshtoken(userFound);
        const loginUser = await User.findById(userFound._id).select("-password");

        let options = {
            secure : true,
            httpOnly : true
        };

        res.cookie("accessToken" , accessToken , options).cookie("refreshToken" , refreshToken , options).json(new ApiResponse (200 , "user login successfully" , {loginUser , accessToken}));

    } catch (error) {
        console.log("login error");
        res.status(400).json(new ApiError(400 , "login error" , error.message));
    };
};

export{ register , login};