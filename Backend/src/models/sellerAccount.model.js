
import mongoose, { Schema} from "mongoose";
import { decryption, encryption } from '../utilities/crypto.js';



const sellerAccountSchema = new Schema(
{
 rozarpayKeyId:
 {type:String,
required:true},
fullName:
{
type:String
},
 rozarpayKeySecret:{
    type:String,
    required:true
 }


},{timestamps:true})


// save 


// sellerAccountSchema.pre('save',async function(next)
// {
//     if (this.isModified('razorpayKeyId')) {
//         this.razorpayKeyId = encryption(this.razorpayKeyId);
//       }
//       if (this.isModified('razorpayKeySecret')) {
//         this.razorpayKeySecret = encryption(this.razorpayKeySecret);
//       }
//       next();
// })

// sellerAccountSchema.methods.getRozorpayCredentials = function()
// {
//     return {
//         razorpayKeyId:decryption(this.razorpayKeyId),
//         razorpayKeySecret:decryption(this.razorpayKeySecret)
//     };
// };


export const SellerAccount= mongoose.model("SellerAccount",sellerAccountSchema)