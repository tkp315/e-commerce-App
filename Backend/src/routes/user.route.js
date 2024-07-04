import { ApiResponse } from "../utilities/apiResponse.js";
import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { userRegistration,userLogin, userLogout,  sendOTP } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { generateToken, resetPassword } from "../controllers/resetPassword.js";
import { getOrderList } from "../controllers/userLists.js";




const router = Router();

router.route("/register").post(upload.single("profilePhoto"),userRegistration);
router.route("/sendOTP").post(sendOTP);
router.route("/login").post(userLogin);
router.route("/logout").post( verifyJWT, userLogout);
router.route("/password-reset-token").post(generateToken);
router.route("/reset-password").post(resetPassword);
router.route("/orderlist").post(verifyJWT,getOrderList);



// router.route("/reset-password").post()




    

export default router;