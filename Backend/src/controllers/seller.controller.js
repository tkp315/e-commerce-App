import mongoose from "mongoose";
import asyncHandlerFunction from "../utilities/asyncHandler";
import ApiError from "../utilities/apiError";
import { User } from "../models/user.model";
import { ApiResponse } from "../utilities/apiResponse";

const getOrdersForSeller = asyncHandlerFunction(async (req, res) => {

  const sellerId = req.user._id;
  const sid = new mongoose.Types.ObjectId(sellerId);

  const seller = await User.findById(sid);

  if (!seller) {
    throw new ApiError(401, "You don't have any orders yet");
  }

  const soldList = await seller.populate("soldProductList");

  if (!soldList) {
    throw new ApiError(401, "Product List Not Found");
  }
  
  return res
    .status(200)
    .json(new ApiResponse(200, { soldList }, "Got All Sold Product List"));
});

export { getOrdersForSeller };
