import mongoose , {Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

            //userSchema model
const userSchema =  new Schema( 
    {
        username : {
            type : String,
            required : true,
            unique : true,
            lowercase : true,
            trim : true
        },
        fullname : {
            type : String,
            required : true,
        },
        email : {
            type : String,
            required : true,
            unique : true,
            lowercase : true,
            trim : true,
        },
        password : {
            type : String,
            required : true,
        },
        avatar : {
            type : String,
        },
        cover : {
            type : String,
        },
        refreshToken : {
            type : String,
        },

    } , {timestamps : true});

                    //the plane passwors modifielsd hash password
    userSchema.pre("save" , async function(next){
       if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password , 10);
        next();
       }else{
         return next();
       }
    });

                        //the compare password and hash password
    userSchema.methods.isPasswordCorrect = async function(password) {
        return await bcrypt.compare( password , this.password);
    };

                        //generator access token
    userSchema.methods.generatorAccessToken = async function () {
        const accesstoken = jwt.sign({_id : this._id , username : this.username , email : this.email},process.env.GENERATE_ACCESSTOKEN_SECRET,{
            expiresIn :process.env.ACCESSTOKEN_EXPIRY
        });
        return accesstoken;
    };
                        //generator refresh token
    userSchema.methods.generatorRefreshToken = async function () {
        const refreshtoken = jwt.sign({_id : this._id , email : this.email},process.env.GENERATE_REFRESHTOKEN_SECRET,{
            expiresIn :process.env.REFRESHTOKEN_EXPIRY
        });
        return refreshtoken;
    };
                            //export user model
    export const User = mongoose.model.User?? mongoose.model("User" , userSchema);