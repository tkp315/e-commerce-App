import { Router } from "express";
import { isAdmin,  verifyJWT } from "../middlewares/auth.middleware.js";
import { Orders } from "../controllers/allOrders.controller.js";
import { updateDeliveryStatus } from "../controllers/deliveryupdate.controller.js";
import { trackOrder } from "../controllers/orderTracking.controller.js";

const trackingRoute = Router();

trackingRoute.route("/all-orders/details").post(verifyJWT,isAdmin,Orders)

trackingRoute.route("/update/delivery-status").post(verifyJWT,isAdmin,updateDeliveryStatus)

trackingRoute.route("/order").post(verifyJWT, trackOrder)

export { trackingRoute };
