import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    thumbnail: {
      type: String,
    },
    tags: [{ type: String }],

    productImages: [{ type: String }],
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },
    company: {
      type: String,
      lowercase: true,
    },

    specifications: [
      {
        type: String,
        required: true,
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    RatingAndReviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RatingAndReview",
      },
    ],
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    customers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

// productSchema.pre('save', function (next) {
//     this.tags = this.tags.split("#")
//     next();
//   });

export const Product = mongoose.model("Product", productSchema);
