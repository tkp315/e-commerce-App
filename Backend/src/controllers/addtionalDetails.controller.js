import mongoose from "mongoose";
import { AdditionalDetails } from "../models/additionalDetails.model.js";
import { User } from "../models/user.model.js";
import ApiError from "../utilities/apiError.js";
import asyncHandlerFunction from "../utilities/asyncHandler.js";
import { ApiResponse } from "../utilities/apiResponse.js";
import { uploadOnCloudinary } from "../utilities/cloudinary.js";

const addDetails = asyncHandlerFunction(async (req, res) => {

  const { gender, username, city } = req.body;

  const userId = req.user._id;
  const uid = new mongoose.Types.ObjectId(userId);

  if (!userId) throw new ApiError(401, "userid not found");

  if (!userId) {
    throw new ApiError(401, "user id is missing");
  }

  if (!gender || !username || !city) {
    throw new ApiError(401, "gender or username or city is missing");
  }

  const createAdditionalDetails = await AdditionalDetails.create({
    gender,
    username,
    city,
  });

  const addInUser = await User.findByIdAndUpdate(
    uid,
    {
      additionalDetails: createAdditionalDetails._id,
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200,{ addInUser, createAdditionalDetails },"additional details created"));
});

const getUserDetails = asyncHandlerFunction(async (req, res) => {

  const userId = new mongoose.Types.ObjectId(req.user._id);

  const userDetails = await User.findById(userId)
    .select("firstName lastName email phone_No role profilePhoto")
    .populate("additionalDetails")
    .exec();

  return res
    .status(200)
    .json(new ApiResponse(200, { userDetails }, "Got user details"));
});

const editDetails = asyncHandlerFunction(async (req, res) => {

  const { city, username } = req.body;

  const userId = req.user._id;
  const uid = new mongoose.Types.ObjectId(userId);

  const findUser = await User.findById(uid);
  const addDetailsOfUser = findUser.additionalDetails._id;

  const aid = new mongoose.Types.ObjectId(addDetailsOfUser);
  const additionalDetails = await AdditionalDetails.findById(aid);
  const previousCity = additionalDetails.city;
  const previousUsername = additionalDetails.username;
  
  const findAddDetails = await AdditionalDetails.findByIdAndUpdate(aid, {
    city: city ? city : previousCity,
    username: username ? username : previousUsername,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, { findAddDetails }, "details are updated"));
});

const changePhoto = asyncHandlerFunction(async (req, res) => {

  const userId = req.user._id;
  const uid = new mongoose.Types.ObjectId(userId);

  const newProfilePhotoLocalStorage = req.file?.path;
  
  if (!newProfilePhotoLocalStorage) {
    throw new ApiError(401, "profile photo not found on local storage ");
  }

  const newProfilePhoto = await uploadOnCloudinary(newProfilePhotoLocalStorage);

  if (!newProfilePhoto) {
    throw new ApiError(401, "profile photo not uploaded on cloudinary ");
  }

  const user = await User.findByIdAndUpdate(
    uid,
    {
      profilePhoto: newProfilePhoto.url,
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, { user }, "profile photo updated successfully"));
});

export { addDetails, getUserDetails, editDetails, changePhoto };
