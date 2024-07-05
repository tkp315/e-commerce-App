import { OrderPlacement } from "../models/orderDetails.model.js";
import { DeliveryTracking } from "../models/deliveryTracking.model.js";
import asyncHandlerFunction from "../utilities/asyncHandler.js";
import ApiError from "../utilities/apiError.js";
import { ApiResponse } from "../utilities/apiResponse.js";

const updateDeliveryStatus = asyncHandlerFunction(async (req, res) => {

  const { orderId, newStatus } = req.body;

  if (!orderId) {
    throw new ApiError(401, "Order ID is required");
  }

  const orderDetails = await OrderPlacement.findById(orderId);

  if (!orderDetails) {
    throw new ApiError(404, "Order not found");
  }

  const deliveryTrackingId = orderDetails.deliveryStatus;

  if (!deliveryTrackingId) {
    throw new ApiError(404, "Delivery tracking ID not found");
  }

  const delivery = await DeliveryTracking.findById(deliveryTrackingId);

  if (delivery.deliveryStatus === "Delivered") {
    throw new ApiError(400, "Order is already delivered");
  }

  delivery.deliveryUpdates.push({
    status: newStatus,
    timestamp: Date.now(),
  });

  delivery.deliveryStatus = newStatus;
  await delivery.save();

  const updateInOrderDetails = await orderDetails.updateOne({
    deliveryStatus: delivery._id,
  });

  res
    .status(200)
    .json(new ApiResponse(200,{ delivery, orderDetails, updateInOrderDetails },"Delivery status updated successfully"));
});

export { updateDeliveryStatus };
