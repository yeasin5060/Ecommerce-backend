import { Router } from "express";
import { auth } from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { product } from "../controllers/product.controllers.js";

const router = Router();
router.route("/product").post(auth,upload.fields([
    {
        name : "image",
        maxCount : 1
    },
    {
        name : "smallimage",
        maxCount : 4
    }
]),product);

export default router;