import mongoose from "mongoose";
import { RatingAndReview } from "../models/ratingAndReview";
import ApiError from "../utilities/apiError";
import asyncHandlerFunction from "../utilities/asyncHandler";
import { User } from "../models/user.model";
import { Product } from "../models/product.model";
import { ApiResponse } from "../utilities/apiResponse";

const ratingAndReview =  asyncHandlerFunction(async(req,res)=>
{
    // product id,userid,rating,review
    // validate 
    // create 
    // add in user
    //add in product

    const {productId,rating,review}=req.body;
    const userId= req.user._id;
    const uid= new mongoose.Types.ObjectId(userId);
    const pid= new mongoose.Types.ObjectId(productId)

    if(!productId)throw new ApiError(401,"product id is not found");

    if(!rating||!review)throw new ApiError(401,"please rate and us")
   const product= await Product.findById(pid);
   const customerid= product.customers
   const customer= new mongoose.Types.ObjectId(customerid);

   if(customerid!==uid)throw new ApiError(401,"you have not bought the product");

   const alreadyReviewed= await RatingAndReview.findOne(
    {
        customers:customer,
        products:productId

    }
   )

   if(alreadyReviewed)
{
    throw new ApiError(401,"you already reviewed it")
}

    const ratingandreview = await RatingAndReview.create({
        rating:rating,
        review:review?review:"",
        customers:userId
    })

    const findUser = await User.findByIdAndUpdate(uid,{
        $push:
        {
            Reviews:ratingandreview._id
        }
    })

    const findProduct = await Product.findByIdAndUpdate(pid,
        {
            $push:{
                RatingAndReviews:ratingandreview._id
            }
        }
    )

    return res.status(200).json(new ApiResponse(200,{findProduct,findUser,ratingandreview}))
})
// get avg rating

const getAverageRating =asyncHandlerFunction(async(req,res)=>
{
const {productId}=req.user._id;

const ratingandreview = await RatingAndReview.aggregate([
    {
        $match:
        {
            products:new mongoose.Types.ObjectId(productId)
        },
        $group:
        {
            _id:null,averageRating:{$avg:"$rating"}
        }
    }
])

if (result.length <= 0) {
    throw new ApiError(401, "we not got avg rating");
  }
  return res
  .status(200)
  .json(
    new ApiResponse(
      200,
      { averageRating: result[0].averageRating },
      "we have calculated average rating"
    )
  );

})
const getAllRatingAndReview= asyncHandlerFunction(async(req,res)=>
{
    // productId,
    // valid 
    const {productId}= req.body;

    const pid = new mongoose.Types.ObjectId(productId);

    const result = await Product.findById(productId).populate("RatingAndReviews").exec()

    if(!result)
    {
        throw new ApiError(401,"we have not got rating and review")
    }
    return res.status(200).json(new ApiResponse(200,{result},"we have succefully got rating and reviews"))
})

export{ratingAndReview,
    getAllRatingAndReview,
    getAverageRating}
