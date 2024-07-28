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
    descound : {
        type : Number,
    },
    quantity : {
        type : Number,
        required : true,
        default : 0
    },
    inStock: {
        type: Boolean,
        default: true
    },
    image : {
        type : String,
        required : true
    },
    smallimage : {
        type : String,
        required : true
    },
    categories : {
        type : String,
        required : true
    }
} , {timestamps : true});


export const Product = mongoose.model.Product?? mongoose.model("Product" , productSchema);