import mongoose, { Schema } from "mongoose";
import crypto from "crypto";
import { sendMail } from "../utilities/mailSender.js";
import { User } from "./user.model.js";


const orderPlacementSchema = new Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  deliveryAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AddressList",
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    default: 1,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: { type: String, default: "created" },
  razorpayOrderId: { type: String, required: true },
  paymentInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payment",
  },
  trackingId: {
    type: String,
  },
  deliveryStatus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DeliveryTracking",
  },
}, { timestamps: true });

orderPlacementSchema.pre("save", async function (next) {
  if (!this.trackingId) {
    this.trackingId = crypto.randomUUID();
  }
  next();
});

orderPlacementSchema.post("save", async function (doc, next) {
  const user = await User.findById(doc.customer);
  if (user) {
    const email = user.email;
  
    await sendMail(`Tracking ID: ${doc.trackingId}`, email, "Order Placed");
  }
  next();
});

export const OrderPlacement = mongoose.model("OrderPlacement", orderPlacementSchema);
