import { Category } from "../models/category.model.js";
import ApiError from "../utilities/apiError.js";
import { ApiResponse } from "../utilities/apiResponse.js";
import asyncHandlerFunction from "../utilities/asyncHandler.js";

const createCategory = asyncHandlerFunction(async(req,res)=>
{
    const {catName, description}= req.body
    const alreadyCat = await Category.findOne({catName:catName})
    console.log(req.body)
    if(alreadyCat)
    {
        throw new ApiError(401,"Category is already creaed")
    }
    if(!catName||!description)
    {
        throw new ApiError(401,"category name or description not found");
    }

    const createCategory = await Category.create(
        {
            catName:catName
            ,description:description
        }
    )

    return res.status(200).json(
        new ApiResponse(200,{createCategory},"category is created successfully")
    )
})

const allCategories = asyncHandlerFunction(async(req,res)=>
{
const getAllcategories = await Category.find({})

return res.status(200).json(new ApiResponse(200,getAllcategories,"got all categories"))
})
export{createCategory,allCategories}