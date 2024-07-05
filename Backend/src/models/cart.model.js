import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema(
  {
    productsOfCart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

export const Cart = mongoose.model("Cart", cartSchema);
