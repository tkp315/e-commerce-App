import mongoose from "mongoose";
import ApiError from "../utilities/apiError.js";
import asyncHandlerFunction from "../utilities/asyncHandler.js";
// import { User } from "../models/user.model.js";
import { OrderPlacement } from "../models/orderDetails.model.js";

import { ApiResponse } from "../utilities/apiResponse.js";



const trackOrder = asyncHandlerFunction(async(req,res)=>
{
    const {trackingId,orderId} = req.body
    if(!trackingId)
    {
        throw new ApiError(401,"Tracking id not found");
    }

   
    const oid = new mongoose.Types.ObjectId(orderId);


  

    const orderInDB = await OrderPlacement.findById(oid);
    const order = await OrderPlacement.findOne({ trackingId })
        .populate({
            path: 'deliveryStatus',
            populate: {
                path: 'deliveryUpdates'
            }
        })
        .populate('customer seller deliveryAddress product paymentInfo');

    console.log(order)
    const trackId = orderInDB.trackingId;
    console.log(trackId,"%%%%%%%%%%%")
    
    

if(trackId!==trackingId)
{
throw new ApiError(401,"Enter id");    
}






return res
.status(200).json(new ApiResponse(200,{order},"getting delivery status"))

})

export{trackOrder}