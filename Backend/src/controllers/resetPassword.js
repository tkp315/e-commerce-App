import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import { sendMail } from "../utilities/mailSender.js";
import { ApiResponse } from "../utilities/apiResponse.js";
import asyncHandlerFunction from "../utilities/asyncHandler.js";
import ApiError from "../utilities/apiError.js";

const generateToken = asyncHandlerFunction(async (req, res) => {

  const { email } = req.body;

  const findUser = await User.findOne({ email: email });

  const userId = findUser._id;
  const uid = new mongoose.Types.ObjectId(userId);

  if (!findUser) {
    throw new ApiError(401, "User is not registered");
  }

  const token = crypto.randomUUID();
  const updatedToken = await User.findByIdAndUpdate(uid, {
    token: token,
    resetPasswordExpires: Date.now() + 10 * 60 * 1000,
  },{new:true});

  const url = `http://localhost:8003/api/v1/user/reset-password${token}`;

  const sendEmailMessage = await sendMail(
    `reset your password using this email:${url} token:${token}`,
    email,
    "Password reset "
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { token: token, url: url },
        "token created successfully"
      )
    );
});

const resetPassword = asyncHandlerFunction(async (req, res) => {
  const { newPass, confirmPass, token } = req.body;

  if (!newPass || !confirmPass) throw new ApiError(401, "missing fields");

  if (newPass !== confirmPass) {
    throw new ApiError(401, "passwords are not matching");
  }

  if (!token) {
    throw new ApiError(401, "token is not found");
  }

  const findUser = await User.findOne({ token: token });
  const mail = findUser.email;
  
  if (findUser.resetPasswordExpires < Date.now()) {
    throw new ApiError(401, "token is expired");
  }

  const userId = findUser._id;
  const uid = new mongoose.Types.ObjectId(userId);

  const encryptedPass = await bcrypt.hash(newPass, 10);
  if (!encryptedPass) throw new ApiError(401, "Encrypted pass not found");
  const updatePassword = await User.findByIdAndUpdate(
    uid,
    {
      password: encryptedPass,
    },
    { new: true }
  );

  await sendMail(
    "Dear user, your password is reset successfully",
    mail,
    "Password Reset"
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { updatePassword },
        "password is updated successfully"
      )
    );
});

export { generateToken, resetPassword };
