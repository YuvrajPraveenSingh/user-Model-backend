import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/user/user.controllers.js";
import {upload} from "../middlewares/multer.middlewares.js";
import { verifyJwtToken } from "../middlewares/Auth.middlewaers.js";

 
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
router.route("/login").post(loginUser)


                    /* secure Routes  */

router.route("/logout").post(verifyJwtToken ,logoutUser)

export default router;
