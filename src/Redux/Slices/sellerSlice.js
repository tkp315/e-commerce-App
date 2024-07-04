import { createSlice } from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axios";
import toast from "react-hot-toast";

const initialState = {
    sellerData:localStorage.getItem("seller")||[],
}


export const sellerAccount = createAsyncThunk(
    'user/account-seller',
    async (data, thunkAPI) => {
        try {
            const res = await toast.promise(
                axiosInstance.post("/profile/add-sellerAccount",data),
                {
                    loading: "Wait! creating account",
                    success: (result) => {
                        console.log(result);
                        return result.data.message || "Account Created";
                    },
                    error: (error) => {
                        return error.response?.data?.message || "Unable to Create account";
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

const sellerSlice = createSlice(
    {
        name:'seller',
        initialState,
        reducers:{},
        extraReducers:(builder)=>
        {

        }

    }
    
)
export default sellerSlice.reducer