import mongoose from "mongoose";
import { Schema } from "mongoose";

const locationShema = new Schema({
    pinOfAddress:
    {
        type:String,
        required:true
    },
    city:
    {
        type:String,
        required:true
    }
},{timestamps:true})

export const Locations= mongoose.model("Locations",locationShema)