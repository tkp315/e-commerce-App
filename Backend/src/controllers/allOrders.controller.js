import { OrderPlacement } from "../models/orderDetails.model.js";
import { ApiResponse } from "../utilities/apiResponse.js";
import asyncHandlerFunction from "../utilities/asyncHandler.js";

const Orders = asyncHandlerFunction(async(req,res)=>
{
    const orders = await OrderPlacement.find({}).populate("customer")
    .populate("product")
    .populate("paymentInfo")
    .populate("seller")
    .populate("deliveryStatus")
    .populate("deliveryAddress")
    
    
    return res.status(200).json(new ApiResponse(200,{orders},"Got All orders"))
})
export {Orders}