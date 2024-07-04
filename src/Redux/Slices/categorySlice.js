import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../Helpers/axios"

const initialState ={
    categories:JSON.parse(localStorage.getItem("categories"))||[],
}

export const createCategory = createAsyncThunk('/category/createCategory',
    async(data)=>
    {
        try {
            
            const res = await toast.promise(
                axiosInstance.post("/product/category",data),
                {
                    loading:"Creating category",
                    success:(result)=>
                    {
                        console.log(result?.data?.message)
                        return result?.data?.message||"Successfully created category"
                    },
                    error:(err)=>
                    {
                        console.log(err?.response?.data?.message);
                        return err?.response?.data?.message
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

export const allCategory =createAsyncThunk('/category/all-category',
    async()=>
        {
            try {
                const res = await toast.promise(
                    axiosInstance.get("/product/get-all-category"),
                    {
                        loading:"getting categories",
                        success:(result)=>
                            {
                                return result?.data?.message||"Fetched all Categories"
                            },
                            error:(error)=>
                                {
                                    return error?.response?.data?.message
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

export const allSubCategories =createAsyncThunk('/category/all-sub-category',
    async(data)=>
        {
            try {
                const res = await toast.promise(
                    axiosInstance.post("/category/subcategory",data),
                    {
                        loading:"getting categories",
                        success:(result)=>
                            {
                                return result?.data?.message||"Fetched all sub Categories"
                            },
                            error:(error)=>
                                {
                                    return error?.response?.data?.message
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


export const createSubCategories =createAsyncThunk('/category/create-sub-category',
    async(data)=>
        {
            try {
                const res = await toast.promise(
                    axiosInstance.post("/category/create-subCategory",data),
                    {
                        loading:"getting categories",
                        success:(result)=>
                            {
                                return result?.data?.message||"Fetched all sub Categories"
                            },
                            error:(error)=>
                                {
                                    return error?.response?.data?.message
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


export const productsFromSubCategory =createAsyncThunk('/category/products-sub-category',
    async(data)=>
        {
            try {
                const res = await toast.promise(
                    axiosInstance.post("/category/products",data),
                    {
                        loading:"getting Products",
                        success:(result)=>
                            {
                                return result?.data?.message||"Fetched all Products"
                            },
                            error:(error)=>
                                {
                                    return error?.response?.data?.message
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

const categorySlice = createSlice(
    {
        name:'categories',
        initialState,
        reducers:{},
       extraReducers:(builder)=>
        {
            builder
            .addCase(allCategory.fulfilled,(state,action)=>
            {
                // console.log(action);
                localStorage.setItem('categories',JSON.stringify(action?.payload?.data))
                state.categories= action?.payload?.data
            })
        }
    }
)

export default categorySlice.reducer