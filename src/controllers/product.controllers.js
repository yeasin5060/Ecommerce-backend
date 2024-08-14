import { Product } from "../models/product.modles.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { cloudinaryFileUpdate, cloudinaryFileUpload } from "../utils/cloudinary.js";

const product = async (req , res) => {
    try {
        const { name , description , categories ,price ,oldprice, image , smallimage} = req.body;
        if([price , image , smallimage , name , description , categories].some((field) => field ?.trim() == "")){
            return res.json(new ApiError(400 , "all filed is require"));
        }; 
        const products = await Product.create({name : name , description : description, categories : categories, price : price, oldprice: oldprice});
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

const getProduct = async (_ , res) => {
  try {
    const getProduct = await Product.find({})
    if(!getProduct){
      throw new ApiError(400 , "get product not found")
    }
    return res.status(200).json(new ApiResponse(200,getProduct,"get product fetch successfully"))
  } catch (error) {
    console.log(" get product error" , error.message);
  }
}

const deleteProduct = async (req ,res) => {
  try {
    const id = req.body._id
    if(!id){
      return res.status(400).json(new ApiError(400 , "product id is require"))
    };
    /*const productId = await Product.findOne({_id:id})
    res.json(new ApiResponse(200 , productId))
    if(!productId){
      return res.status(400).json(new ApiError(400 , "product id not found"))
    }*/
    
    await Product.findOneAndDelete({_id:id});
    console.log("Remove Product");
    return res.status(400).json({
      status : 200 ,
      name : req.body.name
   }); 
  } catch (error) {
    console.log(" delete product error" , error.message);
  }
}
export {product , getProduct , deleteProduct};