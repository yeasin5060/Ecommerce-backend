import mongoose,{Schema} from "mongoose";

const productSchema = new  Schema({
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
    images : {
        type : String,
        required : true
    },
    categories : {
        type : Schema.Types.ObjectId,
        ref : "Categories"
    }
} , {timestamps : true})


export const Product = mongoose.model.Product?? mongoose.model("Product" , productSchema)