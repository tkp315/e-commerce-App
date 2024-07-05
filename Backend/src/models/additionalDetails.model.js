import mongoose, { Schema } from "mongoose";

const addDetailSchema = new Schema(
  {
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    username: {
      type: String,
    },
    city: {
      type: String,
    },
  },
  { timestamps: true }
);

export const AdditionalDetails = mongoose.model(
  "AdditionalDetails",
  addDetailSchema
);
