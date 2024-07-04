import mongoose from "mongoose";
import { SubCategory } from "../models/subCategory.js";
import ApiError from "../utilities/apiError.js";
import asyncHandlerFunction from "../utilities/asyncHandler.js";
import { ApiResponse } from "../utilities/apiResponse.js";
import { Category } from "../models/category.model.js";

const createSubCategory = asyncHandlerFunction(async (req, res) => {
  const { catId, nameOfsubCat } = req.body;
  if (!catId) {
    throw new ApiError(401, "category is not found");
  }

  if (!nameOfsubCat) {
    throw new ApiError(401, "category is not found");
  }
  const alreadySubCat = await SubCategory.findOne({ name: nameOfsubCat });
  if (alreadySubCat)
    throw new ApiError(401, "already this sub category existed");

  const newSubCategory = await SubCategory.create({
    name: nameOfsubCat.toLowerCase(),
    category: new mongoose.Types.ObjectId(catId),
  });
  const addInCategory = await Category.findByIdAndUpdate(new mongoose.Types.ObjectId(catId), {
    $push: {
      subCat: newSubCategory._id,
    },
  },{new:true});

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { addInCategory, newSubCategory },
        "new Sub category is created"
      )
    );
});

const allSubCategories = asyncHandlerFunction(async (req, res) => {
  const { catId } = req.body;

  if (!catId) {
    throw new ApiError(400, "Category ID is required");
  }

  const category = await Category.findById(catId);
  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  const subCategoryIds = category.subCat;
  const subCategoryDetails = await SubCategory.find({
    _id: { $in: subCategoryIds },
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, { subCategoryDetails }, "Got all subcategories")
    );
});

const getProducts = asyncHandlerFunction(async (req, res) => {
  const { subCatName } = req.body;
  const scn = subCatName.toLowerCase();
  const subCategory = await SubCategory.findOne({name:scn}).populate("product")
  
  if(!subCategory)
{
    throw new ApiError(401,"sub category is not found");
}

  return res
    .status(200)
    .json(
      new ApiResponse(200, { subCategory }, "All Products from this category")
    );
});

export { createSubCategory, allSubCategories, getProducts };
