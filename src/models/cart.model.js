import mongoose , {Schema} from "mongoose";

const cartSchema = new Schema({
    owner : { 
        type : Schema.Types.ObjectId,
        ref : "User"
    }
}, {timestamps : true})

export const Cart = mongoose.model.Cart?? mongoose.model("Cart" , cartSchema)