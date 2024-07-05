import mongoose from "mongoose";
import ApiError from "../utilities/apiError.js";
import asyncHandlerFunction from "../utilities/asyncHandler.js";

import { User } from "../models/user.model.js";
import { ApiResponse } from "../utilities/apiResponse.js";

const addToCart = asyncHandlerFunction(async (req, res) => {

  const { productId } = req.body;
  const pid = new mongoose.Types.ObjectId(productId);

  if (!productId) {
    throw new ApiError(401, "Product ID is not found");
  }

  const userId = req.user._id;
  const uid = new mongoose.Types.ObjectId(userId);

  const user = await User.findById(uid);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const cartItemList = user.cartList;
  const checkInList = cartItemList.find((item) => item.equals(pid));

  if (checkInList) {
    throw new ApiError(401, "This item is already in your cart");
  }

  user.cartList.push(pid);
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200,{ cartList: user.cartList },"One product added successfully"));
});

const viewCart = asyncHandlerFunction(async (req, res) => {

  const userId = req.user._id;
  const uid = new mongoose.Types.ObjectId(userId);

  const user = await User.findById(uid).populate({
    path: "cartList",
    select: "title price description tags thumbnail"
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const cartItems = user.cartList.map((item) => ({
    productId: item._id,
    title: item.title,
    price: item.price,
    description: item.description,
    thumbnail: item.thumbnail,
    tags: item.tags,
  }));

  return res
    .status(200)
    .json(
      new ApiResponse(200, { user, cartItems }, "Fetched products successfully"));
});

const removeProduct = asyncHandlerFunction(async (req, res) => {

  const userId = req.user._id;
  const uid = new mongoose.Types.ObjectId(userId);

  const { productId } = req.body;
  const pid = new mongoose.Types.ObjectId(productId);

  if (!productId) {
    throw new ApiError(401, "product id not found");
  }

  const user = await User.findById(uid);
  const cart = user.cartList;

  user.cartList = cart.filter((e) => !e.equals(pid));

  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200,{ cartList: user.cartList },"Product removed from cart successfully"));
});

export { addToCart, viewCart, removeProduct };
