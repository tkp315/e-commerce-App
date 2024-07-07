import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axios";



const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' || false,
    role: localStorage.getItem('role') || "",
    // data: JSON.parse(localStorage.getItem('data')) || {},
    // profilePhoto:localStorage.getItem("image")||""
};

// Thunk: used to delay the actions

export const createAccount = createAsyncThunk("/auth/signup",
    async (data) => {
        try {
            const res = await toast.promise(
                axiosInstance.post("/user/register",data),
                {
                    loading:"Wait! creating your account",
                    success:(result)=>{
                        return result.data.message || "Account is created Successfully";
                    },
                    error: (error) => {
                        return error.response?.data?.message || "Failed to send OTP";
                    }
                }
            ) // Added await here
           
            return await res.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "An error occurred";
            toast.error(errorMessage);
            throw error;
           }
    }
);

export const sendOTPToUser = createAsyncThunk("/auth/sendotp",
    async (formData) => {
        try {
            const res = await toast.promise(
                axiosInstance.post("/user/sendOTP", formData),
                {
                    loading: "Sending OTP",
                    success: (result) => {
                        return result.data.message || "OTP sent successfully";
                    },
                    error: (error) => {
                        return error.response?.data?.message || "Failed to send OTP";
                    }
                }
            );
            return res.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "An error occurred";
            toast.error(errorMessage);
            throw error;  // Ensure the error is thrown so the promise gets rejected
        }
    }
);

export const generateToken = createAsyncThunk("auth/token",
    async(data)=>
    {
        try {
            
            const res = await toast.promise(
                axiosInstance.post("/user/password-reset-token",data),
                {
                    loading: "Wait! Sending token to email",
                    success:(result)=>
                        {
                            return result.data.message||"Token is Sent"
                        },
                        error:(err)=>
                        {
                            return err.response?.data?.message || "Failed to send verification code";
                        }
                  
                }
            )
            return res.data
        } catch (error) {
            const errorMessage = error.response?.data?.message || "An error occurred";
            toast.error(errorMessage);
            throw error; 
        }
    }
)

export const passwordReset = createAsyncThunk("auth/password-reset",
    async(data)=>
    {
        try {
            
            const res = await toast.promise(
                axiosInstance.post("/user/reset-password",data),
                {
                    loading: "Wait! changing password",
                    success:(result)=>
                        {
                            return result.data.message||"Password is Changed"
                        },
                        error:(err)=>
                        {
                            return err.response?.data?.message || "Failed to change Password";
                        }
                  
                }
            )
            return res.data
        } catch (error) {
            const errorMessage = error.response?.data?.message || "An error occurred";
            toast.error(errorMessage);
            throw error; 
        }
    }
)


export const logoutThunk = createAsyncThunk("auth/logout",
    async()=>
    {
        try {
            
            const res = await toast.promise(
                axiosInstance.post("/user/logout"),
                {
                    loading: "Wait! logging out",
                    success:(result)=>
                        {
                            return result.data.message||"Password is Changed"
                        },
                        error:(err)=>
                        {
                            return err.response?.data?.message || "Failed to change Password";
                        }
                  
                }
            )
            return res.data
        } catch (error) {
            const errorMessage = error.response?.data?.message || "An error occurred";
            toast.error(errorMessage);
            throw error; 
        }
    }
)

export const loginThunk = createAsyncThunk(
    "auth/login",
    async (data, { rejectWithValue }) => {
      try {
        const res = await toast.promise(
          axiosInstance.post("/user/login", data), // Ensure this URL is correct
          {
            loading: "Wait! we are processing",
            success: (result) => {
                console.log(result.headers)
              return result?.data.message || "Logged in successfully";
            },
            error: (error) => {
              return error.response?.data?.message || "Failed to login";
            }
          }
        );
        console.log(res.headers)
        return await res.data; // Ensure the correct response data is returned
      } catch (error) {
        const errorMessage = error.response?.data?.message || "An error occurred";
        toast.error(errorMessage);
        return rejectWithValue(errorMessage); // Properly reject the thunk with a value
      }
    }
  );



const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers:(builder)=>
    {
        builder
        .addCase(loginThunk.fulfilled,(state,action)=>
        {
           console.log(action.payload.data)
            // localStorage.setItem("data",JSON.stringify(action?.payload?.data?.addressList));
            localStorage.setItem("isLoggedIn",true);
            localStorage.setItem("role",action?.payload?.data?.userInDB?.role)
            // localStorage.setItem("image",action?.payload?.data?.userInDB?.profilePhoto)
        //    state.data= action.payload.data.addressList
           

           state.isLoggedIn=true;
           state.role =action?.payload?.data?.userInDB?.role
        //    state.profilePhoto=action?.payload?.data?.userInDB?.profilePhoto

        })
        .addCase(logoutThunk.fulfilled,(state)=>
        {
            localStorage.clear();
            state.data={};
            state.isLoggedIn=false;
            state.role ="";
            // state.profilePhoto="";

        })
       

    }
  
});


// export const {} = authSlice.actions
export default authSlice.reducer;
