import { createSlice } from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axios";
import toast from "react-hot-toast";

const initialState ={
    trackingId:localStorage.getItem("track")
}

export const adminAllOrders = createAsyncThunk(
    'admin/all-orderlist',
    async ( thunkAPI) => {
        try {
            const res = await toast.promise(
                axiosInstance.post("/tracking/all-orders/details"),
                {
                    loading: "Wait! Getting all orders ",
                    success: (result) => {
                        console.log(result);
                        return result.data.message || "Found All Orders";
                    },
                    error: (error) => {
                        return error.response?.data?.message || "Unable to Fetch Orders";
                    }
                }
            );
            return res.data; // Return the whole response as `res` instead of `res.data`
        } catch (error) {
            const errorMessage = error.response?.data?.message || "An error occurred";
            toast.error(errorMessage);
            return thunkAPI.rejectWithValue(errorMessage); // Properly reject the value for createAsyncThunk
        }
    }
);

export const updateOrderDeliveryStatus = createAsyncThunk(
    'admin/update-delivery-status/product',
    async (data, thunkAPI) => {
        try {
            const res = await toast.promise(
                axiosInstance.post("/tracking/update/delivery-status",data),
                {
                    loading: "Wait! updating status ",
                    success: (result) => {
                        console.log(result);
                        return result.data.message || "Status updated";
                    },
                    error: (error) => {
                        return error.response?.data?.message || "Unable to update tracking Status";
                    }
                }
            );
            return res.data; // Return the whole response as `res` instead of `res.data`
        } catch (error) {
            const errorMessage = error.response?.data?.message || "An error occurred";
            toast.error(errorMessage);
            return thunkAPI.rejectWithValue(errorMessage); // Properly reject the value for createAsyncThunk
        }
    }
);

export const orderTracking = createAsyncThunk(
    'user/track-order',
    async (data, thunkAPI) => {
        try {
            const res = await toast.promise(
                axiosInstance.post("/tracking/order",data),
                {
                    loading: "Wait! Getting Status ",
                    success: (result) => {
                        console.log(result);
                        return result.data.message || "Status Got Successfully";
                    },
                    error: (error) => {
                        return error.response?.data?.message || "Unable to see any tracking Status";
                    }
                }
            );
            return res.data; // Return the whole response as `res` instead of `res.data`
        } catch (error) {
            const errorMessage = error.response?.data?.message || "An error occurred";
            toast.error(errorMessage);
            return thunkAPI.rejectWithValue(errorMessage); // Properly reject the value for createAsyncThunk
        }
    }
);


const trackingSlice = createSlice(
    {
        name:"orderTracking",
        initialState,
        reducers:{}


    }
)

export default trackingSlice.reducer