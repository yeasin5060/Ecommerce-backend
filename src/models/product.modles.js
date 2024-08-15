import mongoose,{Schema} from "mongoose";

const productSchema = new  Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    description : {
        type : String,
        required : true,
        trim : true
    },
    price : {
        type : Number,
        required : true,
        trim : true
    },
    oldprice :{
        type : Number,
        required : true,
        trim : true
    },
    descount : {
        type : String,
    },
    inStock: {
        type: Boolean,
        default: true
    },
    image : {
        type : String,
    },
    smallimage : {
        type : String,
    },
    categories : {
        type : String,
        required : true
    }
} , {timestamps : true});


export const Product = mongoose.model.Product?? mongoose.model("Product" , productSchema);