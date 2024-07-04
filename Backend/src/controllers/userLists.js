import mongoose from "mongoose";
import asyncHandlerFunction from "../utilities/asyncHandler.js";
import { User } from "../models/user.model.js";
import ApiError from "../utilities/apiError.js";
import { ApiResponse } from "../utilities/apiResponse.js";


const getOrderList = asyncHandlerFunction(async (req, res) => {
  try {
    const userId = req.user._id;
    const uid = new mongoose.Types.ObjectId(userId);

    // Find the user by ID and populate the orderList field
    const user = await User.findById(uid).populate({
      path: 'orderList',
      populate: [
        {
          path: 'products', // Assuming 'products' is a field in the OrderList model referring to Product model
        },
        {
          path: 'orderDetails',
          populate:[{
            path:"deliveryAddress"
          },
           {
            path:"product"
           },
           {
            path:"paymentInfo"
           },
           {
            path:"deliveryStatus"
           }
        ]
        }
      ]
    });

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const orders = user.orderList;

    // You can process the orders if needed or directly send them in the response
    return res.status(200).json(new ApiResponse(200, { orders }, "Successfully retrieved order list"));
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    throw new ApiError(500, "An error occurred while retrieving order list");
  }
});


export { getOrderList };
