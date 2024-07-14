import mongoose from "mongoose";

export const dbConnection = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_CONNECTION_URL)
        .then(() => {
            console.log("mongodb connected");
        })
    } catch (error) {
        console.log("mongodb connection error" , error.message);
    }
}