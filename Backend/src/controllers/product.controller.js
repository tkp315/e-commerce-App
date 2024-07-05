import { Product } from "../models/product.model.js";
import { Category } from "../models/category.model.js";
import { User } from "../models/user.model.js";
import ApiError from "../utilities/apiError.js";
import asyncHandlerFunction from "../utilities/asyncHandler.js";
import { uploadOnCloudinary } from "../utilities/cloudinary.js";
import { ApiResponse } from "../utilities/apiResponse.js";
import mongoose from "mongoose";
import { sendMail } from "../utilities/mailSender.js";
import { SubCategory } from "../models/subCategory.js";

const createProduct = asyncHandlerFunction(async (req, res) => {
  const {
    title,
    company,
    price,
    description,
    catId,
    specifications,
    tags,
    subCatId,
  } = req.body;

  const userId = req.user._id;
  const uid = new mongoose.Types.ObjectId(userId);

  if (
    [title, price, description, catId, subCatId, company].some((e) => e === "")
  ) {
    throw new ApiError(401, "something is missing");
  }

  const parsedTag = JSON.parse(tags);

  const parsedSpecifications = JSON.parse(specifications);

  
  if (parsedTag.length === 0) {
    throw new ApiError(401, "tags not found");
  }

  if (parsedSpecifications.length === 0) {
    throw new ApiError(401, "Specifications are not found");
  }

  req.files.productImages.map((e) => console.log(e.path));
  if (!req.files || req.files.length === 0) {
    throw new ApiError(401, "photos are not found in local storage");
  }

  const thumbnailLocalStorage = req.files.thumbnail[0]?.path;
  
  if (!thumbnailLocalStorage) {
    throw new ApiError(401, "Thumbnail not found");
  }

  const thumbnail = await uploadOnCloudinary(thumbnailLocalStorage);

  if (!thumbnail) {
    throw new ApiError(401, "not uploaded on cloudinary");
  }

  const productImages = await Promise.all(
    req.files.productImages.map((img) => uploadOnCloudinary(img.path))
  );

  if (productImages.some((e) => !e)) {
    throw new ApiError(401, "photos are not uploaded on cloudinary");
  }

  const addProduct = await Product.create({
    productImages: productImages.map((img) => img.url),
    title: title,
    company: company,
    price: price,
    description: description,
    specifications: parsedSpecifications.map((e) => e),
    category: catId,
    subCategory: subCatId,
    seller: userId,
    tags: parsedTag.map((e) => e),
    thumbnail: thumbnail?.url,
  });
  
  const addInSellerAccount = await User.findByIdAndUpdate(
    uid,
    {
      $push: {
        productList: addProduct._id,
      },
    },
    { new: true }
  );

  const email = addInSellerAccount.email;

  const sendMessage = await sendMail(
    "your product is listed on Apni dukaan Thanks for using it",
    email,
    "Product Listed"
  );

  const addInCategory = await Category.findByIdAndUpdate(
    catId,
    {
      $push: {
        product: addProduct._id,
      },
    },
    { new: true }
  );

  const addInSubCategory = await SubCategory.findByIdAndUpdate(
    subCatId,
    {
      $push: {
        product: addProduct._id,
      },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { addInCategory, addInSellerAccount, addProduct, addInSubCategory },
        "Product added successfully"
      )
    );
});

const getProducts = asyncHandlerFunction(async (req, res) => {

  const userId = req.user._id;

  const products = await User.findById(userId)
    .populate({
      path: "productList",
      populate: {
        path: "RatingAndReviews",
        populate: {
          path: "customers",
        },
      },
    })
    .exec();

  return res
    .status(200)
    .json(new ApiResponse(200, { products }, "get all products"));
});

const allProducts = asyncHandlerFunction(async (req, res) => {
  const getAllProducts = await Product.find({}).populate(
    {
      path: "category",
    }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, { getAllProducts }, "all products"));
});

const productDetails = asyncHandlerFunction(async (req, res) => {

  const { productId } = req.body;
  const pid = new mongoose.Types.ObjectId(productId);

  if (!productId) throw new ApiError(401, "not get product");
  
  const getProductDetails = await Product.findById(pid)
    .populate("category")
    .select("catName")
    .populate("subCategory")
    .select("name")
    .populate("productImages");
  const product = await Product.findById(pid);
  const sellerId = product.seller._id;

  if (!sellerId) {
    throw new ApiError(401, "not get product");
  }
  const sid = new mongoose.Types.ObjectId(sellerId);
  const seller = await User.findById(sid);
  const sellerDetails = await User.findById(sid).select("firstName lastName phone_No");
  const productFromSameSeller = seller.populate("productList");

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { getProductDetails, sellerDetails, productFromSameSeller, product },
        "got all details of product "
      )
    );
});

const editProduct = asyncHandlerFunction(async (req, res) => {

  const { productId, newprice, newspecifications } = req.body;

  const pid = new mongoose.Types.ObjectId(productId);
  const findProduct = await Product.findById(pid);

  const oldprice = findProduct.price;
  const oldSpecifications = findProduct.specifications;

  const updatedProduct = findProduct.updateOne(
    { price: newprice ? newprice : oldprice },
    {
      specifications: newspecifications ? newspecifications : oldSpecifications,
    }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, { updatedProduct }, "got all details of product ")
    );
});

const deleteProduct = asyncHandlerFunction(async (req, res) => {
  const { productId } = req.body;
  const pid = new mongoose.Types.ObjectId(productId);

  const findProduct = await Product.findByIdAndDelete(pid);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "deleted all details of product "));
});

const findProductByTag = asyncHandlerFunction(async (req, res) => {

  const tag = req.body.tag;

  if (!tag) {
    throw new ApiError(401, "tag is not found");
  }

  const productDetails = await Product.find({ tags: { $in: [tag] } });

  if (productDetails.length === 0)
    throw new ApiError(401, "Product are not found");

  return res
    .status(200)
    .json(new ApiResponse(200, { productDetails }, `Products from ${tag}`));
});

export {
  createProduct,
  getProducts,
  allProducts,
  productDetails,
  editProduct,
  deleteProduct,
  findProductByTag,
};
