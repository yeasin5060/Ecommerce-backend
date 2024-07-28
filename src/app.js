import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();

app.use(cors({
    origin : "*"
}));
            // all middlewares
app.use(express.json({limit : "16kb"}));
app.use(express.urlencoded({limit : "16kb" , extended : true}));
app.use(cookieParser());
app.use(express.static("public"));


            //import all router
import userRouter from "./routes/user.routes.js";
import product from './routes/product.routes.js';

app.use("/api/v1/user",userRouter);
app.use("/api/v1/",product);

export { app };