import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addDetails, changePhoto, editDetails } from "../controllers/addtionalDetails.controller.js";
import { getUserDetails } from "../controllers/addtionalDetails.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { addSellerAccount } from "../controllers/createSellerAccount.js";
import { getOrderList } from "../controllers/userLists.js";


const profileRoute= Router();

profileRoute.route("/add-profile").post(verifyJWT,addDetails);
profileRoute.route("/details").post(verifyJWT,getUserDetails)
profileRoute.route("/update-profile").post(verifyJWT,editDetails)
profileRoute.route("/update-profileImage").post(verifyJWT, upload.single("newProfilePhoto"),changePhoto)
profileRoute.route("/add-sellerAccount").post(verifyJWT,addSellerAccount)
profileRoute.route("/my-orders").post(verifyJWT,getOrderList);

export {profileRoute}