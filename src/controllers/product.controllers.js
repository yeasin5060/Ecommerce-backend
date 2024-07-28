import { Product } from "../models/product.modles.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { cloudinaryFileUpdate, cloudinaryFileUpload } from "../utils/cloudinary.js";
import { publicidex } from "../utils/publicidex.js";

const product = async (req , res) => {
    try {
        const { name , description , categories ,price , image , smallimage , quantity} = req.body;
        if([price , image , smallimage , quantity , name , description , categories].some((field) => field ?.trim() == "")){
            return res.json(new ApiError(400 , "all filed is require"))
        }

        if(req.fiels){
            const {image , smallimage} = req.fiels
            if(image){
                const {path} = image[0]
                const {secure_url} = await cloudinaryFileUpload(path , "image")
                if(products.image){
                    const publicId = publicidex(products.image)
                    await cloudinaryFileUpdate(publicId)
                }
                products.image = secure_url
                await products.save()
            }
            if(smallimage){
                const {path} = smallimage
                const {secure_url} = await cloudinaryFileUpload(path , "image")
                if(products.smallimage){
                    const publicId = publicidex(products.smallimage)
                    await cloudinaryFileUpdate(publicId)
                }
                products.smallimage = [{secure_url}]
                await products.save()
            }
        }
    const products = await Product.create({name : name , description : description, categories : categories, price : price , quantity : quantity})
    res.json(new ApiResponse(200 , "the product create is successfully" , products))
    } catch (error) {
        console.log("product error" , error.message);

    }
}

export {product}