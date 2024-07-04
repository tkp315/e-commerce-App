import mongoose, { Schema} from "mongoose";
import { sendVerificationEmail } from "../utilities/verificationCode.js";

const otpSchema = new Schema(
{
  otp:
  {
    type:String,
    required:true
  },
  email:
  {
    type:String,
    required:true
  },
 expiresIn:
 {
  type:Date,
  default:Date.now()+10*1000*60
 }
}
,{timestamps:true})


otpSchema.pre("save",async function(next){

  await sendVerificationEmail(this.email,this.otp)
  next()
})

export const OTP = mongoose.model("OTP",otpSchema);