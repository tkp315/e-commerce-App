import mongoose, { Schema } from "mongoose";

const sellerAccountSchema = new Schema(
  {
    rozarpayKeyId: { type: String, required: true },
    fullName: {
      type: String,
    },
    rozarpayKeySecret: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const SellerAccount = mongoose.model(
  "SellerAccount",
  sellerAccountSchema
);
