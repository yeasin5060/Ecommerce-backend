import { Product } from "../models/product.modles.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { cloudinaryFileUpdate, cloudinaryFileUpload } from "../utils/cloudinary.js";

const product = async (req , res) => {
    try {
        const { name , description , categories ,price , image , smallimage , quantity} = req.body;
        if([price , image , smallimage , quantity , name , description , categories].some((field) => field ?.trim() == "")){
            return res.json(new ApiError(400 , "all filed is require"));
        }; 
        const products = await Product.create({name : name , description : description, categories : categories, price : price , quantity : quantity});
        if(req.files){
            const {image , smallimage} = req.files;
            if(image){
              const {path} = image[0];
              const {secure_url} = await cloudinaryFileUpload(path , "image");
              products.image = secure_url;
              await products.save();  
            }else{
             return res.json(new ApiError( 400 , "product image upload field"));
            }
            
            if(smallimage){
              const {path} = smallimage[0];
              const {secure_url} = await cloudinaryFileUpload(path , "image");
              products.smallimage = secure_url;
              await products.save();
            }else{
              return res.json(new ApiError( 400 , "small image upload field"));
            };  
        };
        return res.json(new ApiResponse(200 , "the product create is successfully" , products));
    } catch (error) {
        console.log("product error" , error.message);

    };
};

export {product};