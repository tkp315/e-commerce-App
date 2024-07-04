import { Router } from "express";
import { isAdmin, isCustormer, verifyJWT } from "../middlewares/auth.middleware.js";
import { createAddress, getAllAddress } from "../controllers/address.controller.js";
import { availableLocations } from "../controllers/location.controller.js";

const addressRoute = Router()

addressRoute.route("/available-location").post(verifyJWT,isAdmin,availableLocations)
addressRoute.route("/create-address").post(verifyJWT,createAddress)
addressRoute.route("/details").post(verifyJWT,getAllAddress);



export {addressRoute}