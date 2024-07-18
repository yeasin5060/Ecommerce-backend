import mongoose , {Schema} from "mongoose";

const cartItemSchema = new Schema({
    quantity : {
        type : Number,
        default : 0
    },
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    cart : [
        {
            type : Schema.Types.ObjectId,
            ref : "Cart"
        }
    ]

},{timestamps : true})


export const Cartitem = mongoose.model.Cartitem ?? mongoose.model("Cartitem" , cartItemSchema)