import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user/user.controllers.js";
import {upload} from "../middlewares/multer.middlewares.js";


const  router = Router();

router.route("/register").post(
   await upload.fields([
        {
            name: "avatar",
            maxCount: 1,
        },
        {
            name: "coverImage",
            maxCount: 1,
        },
    ]),
    registerUser
);
router.route("/login").get(loginUser)

export default router;
