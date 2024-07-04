import mongoose, { Schema } from "mongoose";

const deliveryTrackingSchema = new Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  deliveryUpdates: [
    {
      status: {
        type: String,
        enum: ["Pending", "Shipped", "Out For Delivery", "Delivered", "Failed"]
      },
      timestamp: {
        type: Date,
        default: Date.now
      }
    }
  ],
  deliveryStatus: {
    type: String,
    enum: ["Pending", "Shipped", "Out For Delivery", "Delivered"],
    default: "Pending"
  },
  trackingId: {
    type:String,    
  }
}, { timestamps: true });

export const DeliveryTracking = mongoose.model("DeliveryTracking", deliveryTrackingSchema);
