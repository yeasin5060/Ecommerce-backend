import mongoose , {Schema} from "mongoose";

const orderSchema = new Schema({
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    product : [
        {
            tyep : Schema.Types.ObjectId,
            ref : "Product"
        }
    ],
    totalamount : {
        type: Number,
        required: true,
        min: 0
    },
    status : {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    paymentMethod: {
        type: String,
        enum: ['Credit Card', 'PayPal', 'Bank Transfer', 'Cash on Delivery'],
        required: true
    },
}, {timestamps : true})

export const Order = mongoose.model.Order?? mongoose.model("Order" , orderSchema)