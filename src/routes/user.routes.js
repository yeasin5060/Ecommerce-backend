import { Router } from "express";
import { login, logOut, register } from "../controllers/user.controllers.js";
import { auth } from "../middlewares/auth.middlewares.js";

const router = Router()

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(auth , logOut);


export default router