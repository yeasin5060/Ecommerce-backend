import { app } from "./app.js";
import { PORT } from "./constant.js";
import dotenv from "dotenv"
import { dbConnection } from "./db/index.js";


dotenv.config({
    path : "./.env"
})
dbConnection()
app.listen(PORT , () => {
    console.log("server is running on the port " , PORT);
})