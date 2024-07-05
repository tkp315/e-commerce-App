import { SellerAccount } from "../models/sellerAccount.model.js";
import { User } from "../models/user.model.js";
import ApiError from "../utilities/apiError.js";
import { ApiResponse } from "../utilities/apiResponse.js";
import asyncHandlerFunction from "../utilities/asyncHandler.js";
import mongoose from "mongoose";

const addSellerAccount = asyncHandlerFunction(async (req, res) => {

  const userId = req.user._id;
  const uid = new mongoose.Types.ObjectId(userId);

  const { rozarpayId, rozarpaySecret, fullName } = req.body;

  if (!rozarpayId) throw new ApiError(401, "rozarpayId not found");

  if (!rozarpaySecret) throw new ApiError(401, "rozarpaySecret not found");

  const sellerPaymentAccount = await SellerAccount.create({
    fullName: fullName,
    rozarpayKeyId: rozarpayId,
    rozarpayKeySecret: rozarpaySecret,
  });

  const addInUser = await User.findByIdAndUpdate(
    uid,
    {
      sellerAccount: sellerPaymentAccount._id,
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, { addInUser, sellerPaymentAccount }));
});
export { addSellerAccount };
