import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
  {
    catName: {
      type: String,
      required: true,
    },
    subCat: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",
      },
    ],
    product: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],

    description: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Category = mongoose.model("Category", categorySchema);
