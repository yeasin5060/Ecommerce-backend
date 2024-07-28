import { Product } from "../models/product.modles.js"
import { User } from "../models/user.models.js"

const order = async (req , res) => {
    try {
        const user = await User.findById(_id)
        const product = await Product.findById(_id)
    } catch (error) {
        
    }
}

export {order}