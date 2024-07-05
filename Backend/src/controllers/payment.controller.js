import crypto from "crypto";
import mongoose from "mongoose";
import asyncHandlerFunction from "../utilities/asyncHandler.js";
import { razorPayInstance } from "../utilities/razorpay.js";
import ApiError from "../utilities/apiError.js";
import { Product } from "../models/product.model.js";
import { OrderPlacement } from "../models/orderDetails.model.js";
import { User } from "../models/user.model.js";
import { OrderList } from "../models/orders.model.js";
import { DeliveryTracking } from "../models/deliveryTracking.model.js";
import { ApiResponse } from "../utilities/apiResponse.js";
import { redirect } from "react-router-dom";
import { Payment } from "../models/payment.model.js";


const capturePayment = asyncHandlerFunction(async (req, res) => {
  const { productId, quantity, addressId } = req.body;
  const userId = req.user._id;
  const pid = new mongoose.Types.ObjectId(productId);
  const uid = new mongoose.Types.ObjectId(userId);
  const aid = new mongoose.Types.ObjectId(addressId);

  if (!productId) {
    throw new ApiError(401, "productId not found");
  }

  if (!userId) {
    throw new ApiError(401, "User not found");
  }

  let productDetails;
  try {
    productDetails = await Product.findById(pid);
    if (!productDetails) {
      throw new ApiError(401, "Product details not found");
    }
  } catch (error) {
    throw new ApiError(500, "Error retrieving product details");
  }

  const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
  const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

  const razorpayInstance = razorPayInstance(razorpayKeyId, razorpayKeySecret);
  const sellerId = productDetails.seller;
  const seller = await User.findById(sellerId);
  const soldList = seller.soldProductList;
  const amount = quantity * productDetails.price;
  const currency = "INR";
  if (amount < 1) {
    throw new ApiError(
      400,
      "Order amount is less than the minimum allowed amount"
    );
  }

  const options = {
    amount: amount * 100,
    currency,
    receipt: Math.random(Date.now()).toString(),
    notes: {
      productId: pid,
      userId: uid,
      sellerId: productDetails.seller,
    },
  };

  try {
    const paymentResponse = await razorpayInstance.orders.create(options);

    const deliveryTracking = await DeliveryTracking.create({
      customer: uid,
      seller: productDetails.seller,
      deliveryStatus: "Pending",
      timestamps: Date.now(),
    });

    const newOrder = await OrderPlacement.create({
      customer: uid,
      seller: productDetails.seller,
      product: pid,
      amount,
      razorpayOrderId: paymentResponse.id,
      status: "created",
      deliveryStatus: deliveryTracking._id,
      deliveryAddress: aid,
    });

    const addInOrderList = await OrderList.findByIdAndUpdate(
      uid,
      {
        $push: {
          products: pid,
          orderDetails: newOrder._id,
        },
      },
      { new: true, upsert: true }
    );

    const addInUser = await User.findByIdAndUpdate(
      uid,
      {
        $push: {
          orderList: addInOrderList._id,
        },
      },
      { new: true }
    );

    const addInSeller = await User.findByIdAndUpdate(
      sellerId,
      {
        $push: {
          soldProductList: addInOrderList._id,
        },
      },
      { new: true }
    );

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          paymentResponse,
          addInOrderList,
          addInUser,
          newOrder,
          deliveryTracking,
          razorpayKeyId,
          razorpayKeySecret,
        },
        "Order created "
      )
    );
  } 
  
  catch (error) {
    console.log("Could not initiate order: ", error);
    throw new ApiError(500, "Could not initiate order");
  }

});

const verifySignature = asyncHandlerFunction(async (req, res) => {

  const razorpayOrderId = req.body.razorpay_order_id;

  const razorpayPaymentId = req.body.razorpay_payment_id;

  const order = await OrderPlacement.findOne({
    razorpayOrderId: razorpayOrderId,
  });

  if (!order) {
    throw new ApiError(401, "order not found or razorpayId is wrong");
  }

  let body = razorpayOrderId + "|" + razorpayPaymentId;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");
  console.log("sig received", req.body.razorpay_signature);
  console.log(expectedSignature);

  let response = { signatureIsValid: false };
  if (expectedSignature === req.body.razorpay_signature) {
    response = { signatureIsValid: true };

    const newPaymentInfo = await Payment.create({
      razorpay_order_id: razorpayOrderId,
      razorpay_payment_id: razorpayPaymentId,
      razorpay_signature: expectedSignature,
    });
    const addPayment = await order.updateOne(
      {
        paymentInfo: newPaymentInfo._id,
      },
      { new: true }
    );

    redirect(
      `http://localhost:3000/payment/verify?refrence=${req.body.razorpay_payment_id}`
    );
  }

  res.send(response);
 
});

export { capturePayment, verifySignature };
