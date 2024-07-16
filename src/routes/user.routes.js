import { Router } from "express";
import { generatorNewAccessToken, login, logOut, register, uploadFile } from "../controllers/user.controllers.js";
import { auth } from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = Router()

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(auth , logOut);
router.route("/newaccesstoken").post(auth , generatorNewAccessToken);
router.route("/uploadfile").post(auth , upload.fields([
    {
        name : "avatar",
        maxCount: 1
        
    },
    {
        name : "cover",
        maxCount: 1
        
    }
]) , uploadFile);


export default router