import { Router } from "express";
import { allCategories, createCategory } from "../controllers/category.controller.js";
import { isAdmin, isSeller, verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { allProducts, createProduct, findProductByTag, getProducts, productDetails } from "../controllers/product.controller.js";
import { addToCart, removeProduct, viewCart } from "../controllers/cart.controller.js";

const productRoute = Router();

productRoute.route("/category").post(verifyJWT,isAdmin,createCategory)
productRoute.route("/add-product").post(
    verifyJWT,
   
    upload.fields(
    [
        {name:"productImages",maxCount:5},
        {name:"thumbnail",maxCount:1}
    ]
    ) ,
     createProduct)

productRoute.route("/get-products").post(verifyJWT,isSeller,getProducts)
export{productRoute};

productRoute.route("/add-product").post(
    verifyJWT,
   
    upload.fields(
    [
        {name:"productImages",maxCount:5},
        {name:"thumbnail",maxCount:1}
    ]
    ) ,createProduct
      )
     




productRoute.route("/get-all-products").post(verifyJWT,allProducts)

productRoute.route("/details").post(verifyJWT,productDetails)

productRoute.route("/edit-details").post(verifyJWT,isSeller,productDetails)

productRoute.route("/delete-details").post(verifyJWT,isSeller,productDetails)

productRoute.route("/get-all-category").get(verifyJWT,allCategories)

productRoute.route("/addtocart").post(verifyJWT,addToCart)
productRoute.route("/viewcart").post(verifyJWT,viewCart)

productRoute.route("/remove-a-product").post(verifyJWT,removeProduct)

productRoute.route("/product-by-tag").post(verifyJWT,findProductByTag);



