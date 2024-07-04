import mongoose, { Schema } from "mongoose";

const subCategorySchema = new Schema(
    {
        name:{
            type:String,
            lowercase:true,
            required:true,
        },
        category:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Category"
        },
        product:
        [
           {
              type:mongoose.Schema.Types.ObjectId,
                 ref:"Product"
            }
        ],
    }
    ,{timestamps:true})

export const SubCategory= mongoose.model("SubCategory",subCategorySchema);