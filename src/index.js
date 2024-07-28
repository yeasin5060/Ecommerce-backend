import { app } from "./app.js";
import { PORT } from "./constant.js";
import dotenv from "dotenv";
import { dbConnection } from "./db/index.js";

        //connected env file
dotenv.config({
    path : "./.env"
});
        //connected database
dbConnection();

        //listen server
app.listen(PORT , () => {
    console.log("server is running on the port " , PORT);
});