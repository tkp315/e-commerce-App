import mongoose from "mongoose";
import { AddressList } from "../models/address.model.js";
import { Locations } from "../models/location.model.js";
import { User } from "../models/user.model.js";
import ApiError from "../utilities/apiError.js";
import { ApiResponse } from "../utilities/apiResponse.js";
import asyncHandlerFunction from "../utilities/asyncHandler.js";

const createAddress = asyncHandlerFunction(async (req, res) => {

  const { city, ward, pincode, contact } = req.body;

  const userId = req.user._id;

  const uid = new mongoose.Types.ObjectId(userId);

  if ([city, ward, pincode, contact].some((e) => e === "")) {
    throw new ApiError("some fields are missing");
  }

  const getAvailablePin = await Locations.findOne({ pinOfAddress: pincode });
 
  if (!getAvailablePin) {
    throw new ApiError(401, "Sorry we are not at this location");
  }

  const newAddress = await AddressList.create({
    city: city,
    ward: ward,
    pincode: pincode,
    contact: contact,
  });

  const addOfUser = await User.findByIdAndUpdate(
    uid,
    {
      $push: {
        addressList: newAddress._id,
      },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200,{ addOfUser, newAddress },"Address is created successfully"));
});

const getAllAddress = asyncHandlerFunction(async (req, res) => {

  const userId = await req.user._id;

  const uid = new mongoose.Types.ObjectId(userId);

  const findUser = await User.findById(uid);

  const addresses = await findUser.populate("addressList");

  return res
    .status(200)
    .json(new ApiResponse(200, { addresses }, "all addresses of a user"));
});

const editAddress = asyncHandlerFunction(async (req, res) => {

  const { newCity, newWard, newPincode, newContact, addressId } = req.body;

  const userId = req.user._id;

  const uid = new mongoose.Types.ObjectId(userId);

  const aid = new mongoose.Types.ObjectId(addressId);

  const user = await User.findById(uid);

  const address = await AddressList.findById(aid);

  const city = address.city;
  const pincode = address.pincode;
  const contact = address.contact;
  const ward = address.ward;

  const updatedData = address.updateOne(
    {
      city: newCity ? newCity : city,
      pincode: newPincode ? newPincode : pincode,
      contact: newContact ? newContact : contact,
      ward: newWard ? newWard : ward,
    },
    { new: true }
  );

  if (!updatedData) {
    throw new ApiError(401, "data is not updated");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { updatedData, user },
        "address is successfully edited"
      )
    );
});

const deleteAddress = asyncHandlerFunction(async (req, res) => {

  const { addressId } = req.body;

  const aid = new mongoose.Types.ObjectId(addressId);

  await AddressList.findByIdAndDelete(aid);

  return res
  .status(200)
  .json(new ApiResponse(200, {}, "data is clear"));
});

export { getAllAddress, createAddress, editAddress, deleteAddress };
