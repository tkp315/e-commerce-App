import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axios";
import toast from "react-hot-toast";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  gender: "",
  city: "",
  profilePhoto: localStorage.getItem("profilePhoto"),
  username: "",
  addressList: [],
  permanetAddress: localStorage.getItem("permanent") || [],
  // Pincodes:localStorage.getItem('availablePinCodes')
};

export const addProfile = createAsyncThunk(
  "profile/create-profile",
  async (data) => {
    try {
      const res = await toast.promise(
        axiosInstance.post("/profile/add-profile", data),
        {
          loading: "adding profile",
          success: (result) => {
            console.log(result?.data?.message);
            return result.data.message || "Profile created";
          },
          error: (error) => {
            return error.response.data.message || "Unable to add profile";
          },
        }
      );
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
      throw error;
    }
  }
);

export const createAddress = createAsyncThunk(
  "profile/create-address",
  async (data) => {
    try {
      const res = await toast.promise(
        axiosInstance.post("/address/create-address", data),
        {
          loading: "adding Address",
          success: (result) => {
            console.log(result?.data?.message);
            return result.data.message || "Address created";
          },
          error: (error) => {
            return error.response.data.message || "Unable to add profile";
          },
        }
      );
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
      throw error;
    }
  }
);

export const newPincode = createAsyncThunk(
  "profile/add-pincode",
  async (data) => {
    try {
      const res = await toast.promise(
        axiosInstance.post("/address/available-location", data),
        {
          loading: "adding Pin Code",
          success: (result) => {
            console.log(result?.data?.message);
            return result.data.message || "Pin Code created";
          },
          error: (error) => {
            return error.response.data.message || "Unable to add PinCodes";
          },
        }
      );
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
      throw error;
    }
  }
);

export const getAllAddress = createAsyncThunk(
  "profile/address-details",
  async () => {
    try {
      const res = await toast.promise(axiosInstance.post("/address/details"), {
        loading: "Fetching All Addresses",
        success: (result) => {
          console.log(result?.data?.message);
          return result.data.message || "All Addresses Fetched";
        },
        error: (error) => {
          return error.response.data.message || "Unable to Fetch Addresses";
        },
      });
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
      throw error;
    }
  }
);

export const getOrderList = createAsyncThunk("profile/order-list", async () => {
  try {
    const res = await toast.promise(axiosInstance.post("/user/orderlist"), {
      loading: "Getting order List",
      success: (result) => {
        console.log(result?.data?.message);
        return result.data.message || "Fetched Order List";
      },
      error: (error) => {
        return error.response.data.message || "Unable to Fetch Order List";
      },
    });
    return res.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    toast.error(errorMessage);
    throw error;
  }
});

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAddress.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(getAllAddress.fulfilled, (state, action) => {
        console.log(action.payload.data.addresses);
        state.addressList = action?.payload?.addresses;
        console.log(state);
      });
  },
});

export default profileSlice.reducer;
