import mongoose, { Schema } from "mongoose";

const addressSchema = new Schema(
{
    city:
    {
        type:String,
        required:true,
    },
    ward:
    {
        type:String,
        required:true
    },
    pincode:
    {
        type:String,
        required:true
    },
    contact:
    {
        type:Number,
        required:true
    }

}
,{timestamps:true})

export const AddressList = mongoose.model("AddressList",addressSchema);