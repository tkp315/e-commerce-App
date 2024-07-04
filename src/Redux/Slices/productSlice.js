import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axios";
import { logoutThunk } from "./authSlice";


const initialState = {
    productData:[],
    totalCartItems:localStorage.getItem('cartItems')||null,
    totalCartPrice:localStorage.getItem('totalPrice')||null

    
}


export const getAllProducts=createAsyncThunk(
    'product/all-products',
    async()=>{
        try {
            const res = await toast.promise(
                axiosInstance.post("/product/get-all-products"),
                {
                    loading:"Fetching all products",
                    success:(result)=>
                    {
                        console.log(result)
                        return result.data.message||"All Products Fetched"
                    },
                    error:(error)=>
                    {
                        return error.response.data.message||"Unable to fetch the products"
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


export const getProduct=createAsyncThunk(
    'product/one-product',
    async(data)=>{
        try {
            const res = await toast.promise(
                axiosInstance.post("/product/details",data),
                {
                    loading:"Fetching product",
                    success:(result)=>
                    {
                        console.log(result)
                        return result.data.message||" Product Fetched"
                    },
                    error:(error)=>
                    {
                        return error.response.data.message||"Unable to fetch the products"
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

export const newProduct = createAsyncThunk(
    'product/a-new-product',
    async (data, thunkAPI) => {
        try {
            const res = await toast.promise(
                axiosInstance.post("/product/add-product", data, { headers: { 'Content-Type': 'multipart/form-data' } }),
                {
                    loading: "Adding new Product",
                    success: (result) => {
                        console.log(result);
                        return result.data.message || "New Product is added";
                    },
                    error: (error) => {
                        return error.response?.data?.message || "Unable to list the products";
                    }
                }
            );
            return res; // Return the whole response as `res` instead of `res.data`
        } catch (error) {
            const errorMessage = error.response?.data?.message || "An error occurred";
            toast.error(errorMessage);
            return thunkAPI.rejectWithValue(errorMessage); // Properly reject the value for createAsyncThunk
        }
    }
);

export const cartAdd = createAsyncThunk(
    'product/cart-page',
    async (data, thunkAPI) => {
        try {
            const res = await toast.promise(
                axiosInstance.post("/product/addtocart", data),
                {
                    loading: "Adding new Product in Cart",
                    success: (result) => {
                        console.log(result);
                        return result.data.message || "New Product is added in Cart";
                    },
                    error: (error) => {
                        return error.response?.data?.message || "Unable to add the product into cart";
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



export const viewCart = createAsyncThunk(
    'product/cart-view',
    async ( thunkAPI) => {
        try {
            const res = await toast.promise(
                axiosInstance.post("/product/viewcart"),
                {
                    loading: "Fetching  cart",
                    success: (result) => {
                        console.log(result);
                        return result.data.message || "all products are fetched";
                    },
                    error: (error) => {
                        return error.response?.data?.message || "Unable to fetch the cart";
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

export const removeFromCart = createAsyncThunk(
    'product/cart-remove',
    async ( data,thunkAPI) => {
        try {
            const res = await toast.promise(
                axiosInstance.post("/product/remove-a-product",data),
                {
                    loading: "deleting..",
                    success: (result) => {
                        console.log(result);
                        return result.data.message || "Removed From Cart";
                    },
                    error: (error) => {
                        return error.response?.data?.message || "Sorryy...";
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

const productSlice = createSlice({
    name:'product',
    initialState,
    reducers:{},
    extraReducers:(builder)=>
    {
     builder
     .addCase(getAllProducts.fulfilled,(state,action)=>
    {
        console.log(action.payload.data.getAllProducts)
        if(action)
        {
            state.productData=[...action.payload.data.getAllProducts];
            // localStorage.setItem('products',JSON.stringify(action.payload.data.getAllProducts))

        }
    })
    .addCase(viewCart.fulfilled,(state,action)=>
    {
        console.log(action?.payload?.data?.cartItems?.length);
        localStorage.setItem('cartItems',action?.payload?.data?.cartItems?.length);
        state.totalCartItems=action?.payload?.data?.cartItems?.length
        let sum =0;
        
        action?.payload?.data?.cartItems?.map((e)=>sum+=e.price);
        state.totalCartPrice=sum;
        localStorage.setItem('price',sum);
        console.log(sum);

    })
    .addCase(removeFromCart.fulfilled,(state,action)=>
        {
            // console.log(action.payload.data.cartItems.length)
            state.totalCartItems= state.totalCartItems-1;
        })

        .addCase(logoutThunk.fulfilled,(state)=>
        {
            state.totalCartItems=null
            localStorage.clear();
        })
    }
})

// export {reducer}
export default productSlice.reducer