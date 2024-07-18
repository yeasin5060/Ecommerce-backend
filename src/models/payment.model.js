import mongoose , {Schema} from "mongoose";


const paymentSchema = new Schema({
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    poroduct : [
        {
            type : Schema.Types.ObjectId,
            ref : "Product"
        }
    ],
    paymentmethod : {
        type: String,
        enum: ['Credit Card', 'PayPal', 'Bank Transfer', 'Cash on Delivery'],
        required: true
    },
    amount : {
        type : Number,
        required : true,
        min : 0
    }

},{timestamps :true})


export const Payment = mongoose.model.Payment ?? mongoose.model("Payment" , paymentSchema)