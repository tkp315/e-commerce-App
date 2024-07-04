import mongoose, { Schema} from "mongoose";

const ordersSchema = new Schema(
{
    products:
    [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
        }
    ],
    orderDetails:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"OrderPlacement" 
        }
    ]

}
,{timestamps:true})

export const OrderList = mongoose.model("OrderList",ordersSchema);