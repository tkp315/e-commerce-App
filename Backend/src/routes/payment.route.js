import { Router } from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { capturePayment, verifySignature } from "../controllers/payment.controller.js"

const paymentRoute = Router()

paymentRoute.route("/orderplacement").post(verifyJWT,capturePayment)
paymentRoute.route("/verify").post(verifyJWT,verifySignature)


export {paymentRoute}