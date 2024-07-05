import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import ApiError from "../utilities/apiError.js";
import asyncHandlerFunction from "../utilities/asyncHandler.js";
import { redirect } from "react-router-dom";

const verifyJWT = asyncHandlerFunction(async (req, res, next) => {
  try {
  
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      redirect("http://localhost:3000/login")
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user; 

    next();

  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid token");
  }
});

const isAdmin = asyncHandlerFunction(async (req, res, next) => {
  try {

    const accountType = req.user.role;

    if (accountType !== "Admin") {
      throw new ApiError(
        401,
        "This is protected route only for Admin, unathourised access"
      );
    }

    next();

  } catch (error) {
    console.log(error);
    throw new ApiError(401, "This is protected route only for Admin, unathourised access");
  }
});

const isCustormer = asyncHandlerFunction(async (req, res, next) => {
  try {

    const accountType = req.user.role;

    if (accountType !== "Customer") {
      throw new ApiError(
        401,
        "This is protected route only for Customer, unathourised access"
      );
    }
    next();
  } catch (error) {
    console.log(error);
    throw new ApiError(401, "This is protected route only for Customer, unathourised access");
  }
});

const isSeller = asyncHandlerFunction(async (req, res, next) => {
  try {

    const accountType = req.user.role;

    if (accountType !== "Seller") {
      throw new ApiError(
        401,
        "This is protected route only for Seller, unathourised access"
      );
    }
    next();
  } catch (error) {
    console.log(error);
    throw new ApiError(401, "This is protected route only for Seller, unathourised access");
  }
});

export { verifyJWT, isAdmin, isCustormer, isSeller };
