import { OTP } from "../models/otp.model.js";
import bcrypt from "bcrypt";
import asyncHandlerFunction from "../utilities/asyncHandler.js";
import ApiError from "../utilities/apiError.js";
import { User } from "../models/user.model.js";

import { uploadOnCloudinary } from "../utilities/cloudinary.js";
import { ApiResponse } from "../utilities/apiResponse.js";

import { newOTP } from "../utilities/otpGenerator.js";
import { sendMail } from "../utilities/mailSender.js";


function validateEmail(email) {
  let pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
}

const sendOTP = asyncHandlerFunction(async (req, res) => {

  const { email } = req.body;

  const alreadyLoggedIn = await User.findOne({ email });
  
  if (alreadyLoggedIn) throw new ApiError("user is already logged in ");

  let uniqueOTP = newOTP(5);
  let otpIndb = await OTP.findOne({ otp: uniqueOTP });

  while (otpIndb) {
    otpIndb = await OTP.findOne({ otp: uniqueOTP });
    uniqueOTP = newOTP(5);
  }
 
  const saveIndb = await OTP.create({
    email,
    otp: uniqueOTP,
    createdAt: Date.now() + 10 * 1000 * 60,
  });

  const otpTosend = saveIndb.otp;

  if (!saveIndb) {
    throw new ApiError(401, "otp not saved");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, saveIndb, "otp saved successfully"));
});

const userRegistration = asyncHandlerFunction(async (req, res) => {

  const {
    firstName,
    lastName,
    phone_No,
    password,
    confirmPassword,
    email,
    role,
    otp,
  } = req.body;

  if (otp == null) {
    throw new ApiError(401, "OTP not found");
  }

  if (
    [
      firstName,
      lastName,
      phone_No,
      password,
      confirmPassword,
      email,
      role,
      otp,
    ].some((e) => e === "")
  ) {
    throw new ApiError(401, "some fields are missing ");
  }

  if (!validateEmail(email)) {
    throw new ApiError(402, "Enter email in correct formate");
  }

  const alreadyUser = await User.findOne({
    $or: [{ email }, { phone_No }],
  });
  
  if (alreadyUser) {
    throw new ApiError(
      401,
      "user is already exist with this email or Phone no"
    );
  }

  const findOtp = await OTP.findOne({ email: email })
    .sort({ expiresIn: -1 })
    .limit(1);
  const userOtp = findOtp.otp;

  if (!userOtp) {
    throw new ApiError(401, "otp not found for this email");
  }

  if (otp === userOtp) {
    console.log("you can process further");
  }

  if (otp !== userOtp) {
    throw new ApiError(401, "enter correct otp");
  }

  if (password && confirmPassword) {
    if (password !== confirmPassword) {
      throw new ApiError(400, "Password not matched");
    } 
  }
  
  const profilePhotoLocalStorage = await req.file?.path;
 
  console.log(req.file,"This is profile photo ");
  const profilePhoto = await uploadOnCloudinary(profilePhotoLocalStorage);
  console.log("uploded on cloudinary",profilePhoto);

  if (!profilePhoto) {
    throw new ApiError(400, "profile photo is not uploaded on cloudinary");
  }

  
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    phone_No,
    profilePhoto: profilePhoto ? profilePhoto.secure_url : "",
    role,
    otp,
  });
  const createdUser = await User.findById(user?._id).select(
    "-password -refreshToken"
  );
 
  if (!createdUser) {
    throw new ApiError(500, "user not created");
  }

  await sendMail(
    "Your account on Apni Dukan is registered successfully",
    email,
    "Account Registration"
  );

  return res
    .status(200)
    .json(new ApiResponse(200, user, "user is created successfully"));
});

const userLogin = asyncHandlerFunction(async (req, res) => {
  const { email, password } = req.body;
 
  if (!email) {
    throw new ApiError(401, "enter email here");
  }

  const userInDB = await User.findOne({
    email,
  });

  if (!userInDB) {
    throw new ApiError(400, "user not found");
  }

  if (!password) {
    throw new ApiError(401, "Enter password");
  }

  const isPasswordCorrect = await bcrypt.compare(password, userInDB.password);
  
  if (!isPasswordCorrect) {
    throw new ApiError(400, "please enter correct password");
  }

  const accessToken = await userInDB.generateAccessToken();
  const refreshToken = await userInDB.generateRefreshToken();

  if (accessToken) {
    console.log("Access Token::", accessToken);
  }

  const loggedInUser = await User.findById(userInDB._id)
    .select("-password -refreshToken")
    .populate("addressList");

  if (!loggedInUser) {
    throw new ApiError(400, "logged in user not found");
  }
 
  const options = {
    
    secure:process.env.NODE_ENV==='production',
    sameSite:'none'
  };

  sendMail("user is logged in ", email, "LogIn");
  return res
    .status(200)
    .cookie("accessToken", accessToken,options)
    .cookie("refreshToken", refreshToken,options)
    .json(
      new ApiResponse(
        200,
        {
          userInDB: loggedInUser,
          accessToken,
          refreshToken,
          addressList: loggedInUser.addressList,
        },
        "user logged in succesfully"
      )
    );
});

const userLogout = asyncHandlerFunction(async (req, res) => {

  await User.findByIdAndUpdate(
    req.user._id,
    { $set: { refreshToken: undefined } },
    { new: true }
  );

  const options = {
  
    secure:process.env.NODE_ENV==='production',
    sameSite: 'none',
  };

  return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200, {}, "User logged out", true));
});

export { userRegistration, userLogin, userLogout, sendOTP };
