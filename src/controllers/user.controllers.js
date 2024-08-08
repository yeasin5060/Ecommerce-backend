import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { cloudinaryFileUpdate, cloudinaryFileUpload } from "../utils/cloudinary.js";
import { publicidex } from "../utils/publicidex.js";
import jwt from "jsonwebtoken";


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
                    //user register
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

                //user login
const login = async (req , res) =>{
    try {
        const {email , password} = req.body;
        if([email , password].some((field) => field ?.trim() === "")){
           return res.status(400).json(new ApiError(400 , "all field is require"));
        };

        const userFound = await User.findOne({
            $or : [{email}]
        })
        if(!userFound){
           return res.status(400).json(new ApiError(400 , "invalied user"));
        };

        const isPasswordCorrect = await userFound.isPasswordCorrect(password);
        if(!isPasswordCorrect){
            res.json(new ApiError(400 , "invalid password or email"))
        }
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


            //user logout
const logOut =  async(req , res) => {
    try {
        await User.findByIdAndUpdate(req.user,{
            $set: {
                refreshToken : null
            }
        });
        const logOutUser = await User.findById(req.user._id).select("-password");
        let options = {
            secure : true,
            httpOnly : true
        };
        return res.clearCookie("accessToken" , options).clearCookie("refreshToken" , options).json(new ApiResponse (200 , "successfuly refreshtoken null" , logOutUser));
    
    } catch (error) {
        console.log("logout error" , error.message);
        res.json(new ApiError(400 , "logout filed"));
    };
};
            //upload file in cloudinary
const uploadFile = async (req , res) => {
    try {
        if(req.files){
            const {avatar , cover} = req.files;
                //upload avatar photo
            if(avatar){
                const {path} = avatar[0];
                const {secure_url} = await cloudinaryFileUpload(path , "user");
                if(req.user.avatar){
                    const publicId = publicidex(req.user.avatar);
                    await cloudinaryFileUpdate(publicId);
                };
                req.user.avatar = secure_url;
                await req.user.save();
                const user = await User.findById(req.user._id).select("-password");
                res.json(new ApiResponse(200 , "avatar upload successfully" , user));
            };
                    //upload cover photo
            if(cover){
                const {path} = cover[0];
                const {secure_url} = await cloudinaryFileUpload(path , "user");
                if(req.user.cover){
                    const publicId = publicidex(req.user.cover);
                    await cloudinaryFileUpdate(publicId);
                };
                req.user.cover = secure_url;
                await req.user.save();
                const user = await User.findById(req.user._id).select("-password");
                res.json(new ApiResponse(200 , "cover upload successfully" , user));
            };
        };
    } catch (error) {
        console.log("upload file error" , error.message);
        res.json(new ApiError(400 , "upload file error"));
    };
};
            //generator new access and refresh token
const generatorNewAccessToken = async (req ,res) => {
    try {
        const token = req.cookies?.refreshToken || req.body.refreshToken;
        if(!token){
            return res.json(new ApiError(400 , "refresh token not found"));
        };
        const decodeToken = jwt.verify(token , process.env.GENERATE_REFRESHTOKEN_SECRET);
        if(!decodeToken){
            return res.json(new ApiError(400 , "refresh token  not valied"));
        };
        const user = await User.findById(decodeToken._id);
        if(!user){
            return res.json(new ApiError(401 , "user don't match" ));
        };
        const {accessToken , refreshToken} = await generatorAccessAndRefreshtoken(user);
        const newToken = await User.findById(user._id).select("-password -refreshtoken");
        
        let options = {
            secure : true,
            httpOnly : true
        };
        res.cookie("accessToken" , accessToken , options).cookie("refreshToken" ,refreshToken , options).json(new ApiResponse(200 , "new refresh token create done" , {newToken , accessToken}));
    } catch (error) {
        return res.json(new ApiError(401 , "don't add new refresh token in database" , error.message ));
    }
}

                //get user
const getUser = async (req , res) => {
    try {
        const user = await req.user;
        const getUser = await User.findById(user._id).select("-password");
        return res.status(200).json(new ApiResponse (200 ,getUser , "get user sucessfully"));
    } catch (error) {
        res.json(new ApiError(400 , "invalid user" , error.message))
    }
}

export{ register , 
    login , 
    logOut , 
    uploadFile, 
    generatorNewAccessToken,
    getUser
};