import { Router } from "express";
import { isAdmin, verifyJWT } from "../middlewares/auth.middleware.js";
import { allSubCategories, createSubCategory, getProducts } from "../controllers/subCategory.controller.js";

const categoryRoute=  Router();

categoryRoute.route("/create-subCategory").post(verifyJWT,isAdmin,createSubCategory)

categoryRoute.route("/subcategory").post(verifyJWT,allSubCategories)

categoryRoute.route("/products").post(verifyJWT,getProducts)
export {categoryRoute}


