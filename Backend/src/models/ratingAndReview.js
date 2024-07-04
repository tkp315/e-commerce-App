import mongoose, { Schema} from "mongoose";

const ratingAndReviewSchema = new Schema(
{
  
   review:
   {
    type:String
   },
   rating:
   {
    type:Number
   },
   customers:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
   ],
   products:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }
   ,

}
,{timestamps:true})

export const RatingAndReview = mongoose.model("RatingAndReview",ratingAndReviewSchema);