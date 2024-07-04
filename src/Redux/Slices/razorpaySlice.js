import { createSlice } from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axios";
import toast from "react-hot-toast";

const initialState = {
    paymentId:""
}


export const payment = createAsyncThunk(
    'user/payment-gateway',
    async (data, thunkAPI) => {
        try {
            const res = await toast.promise(
                axiosInstance.post("/payment/orderplacement",data),
                {
                    loading: "Wait! displaying gateway",
                    success: (result) => {
                        console.log(result);
                        return result.data.message || "payment Successfull";
                    },
                    error: (error) => {
                        return error.response?.data?.message || "Unable to Place order";
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

export const verification = createAsyncThunk(
    'user/payment-gateway',
    async ( thunkAPI) => {
        try {
            const res = await toast.promise(
                axiosInstance.post("/payment/verify"),
                {
                    loading: "Wait! displaying gateway",
                    success: (result) => {
                        console.log(result);
                        return result.data.message || "payment Successfull";
                    },
                    error: (error) => {
                        return error.response?.data?.message || "Unable to Place order";
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




const rozarpaySlice = createSlice(
    {
        name:'payment',
        initialState,
        reducers:{},
        extraReducers:(builder)=>
        {

        }

    }
    
)
export default rozarpaySlice.reducer