import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/authSlice";
import productSliceReducer from "./Slices/productSlice";
import categorySliceReducer from "./Slices/categorySlice";
import sellerSliceReducer from "./Slices/sellerSlice"
import rozarpaySliceReducer from "./Slices/razorpaySlice"
import profileSliceReducer from './Slices/profileSlice'
import trackingReducer from './Slices/trakingSlice'
const store = configureStore(
    {
        reducer:{
            auth:authSliceReducer,
            product:productSliceReducer,
            categories:categorySliceReducer,
            seller:sellerSliceReducer,
            rozarpay:rozarpaySliceReducer,
            profile:profileSliceReducer,
            orderTracking:trackingReducer
        },
        
        devTools:true,

    }
)
export default store