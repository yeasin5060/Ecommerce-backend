import mongoose , {Schema} from "mongoose";

const reviewSchema = new Schema({
    comment : {
        type : String,
        trim : true
    },
    rating : {
        type : String,
    },
    owner : {
        type :Schema.Types.ObjectId,
        ref : "User"
    },
    product : [
        {
            type : Schema.Types.ObjectId,
            ref : "Product"
        }
    ]
} , {timestamps : true});

export const Review = mongoose.model.Review?? mongoose.model("Review" , reviewSchema);