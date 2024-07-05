import mongoose, { Schema } from "mongoose";
import bcrypt from'bcrypt'
import  Jwt  from "jsonwebtoken";

const userSchema = new Schema(
{

firstName:{
    type:String,
    required:true,
    lowercase:true
},
lastName:{
    type:String,
    required:true,
    lowercase:true
},

sellerAccount:
{
  type:mongoose.Schema.Types.ObjectId,
  ref:"SellerAccount",
  // required:true
},
phone_No:
{
 type:Number,
 required:true
},
password:
{
    type:String,
    required:true
},
confirmPassword:
{
    type:String,
    // required:true
},
email:
{
    type:String,
    required: true
},
profilePhoto: 
{
  type:String // url from cloudinary
},
refreshToken:
{
    type:String
},
role:
{
  type: String,
  enum:["Customer","Admin","Seller"]
},
otp:
{
type:String,
// required:true
},
soldProductList:

  [
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"OrderList"
    }
  ],
orderList:
  [
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"OrderList"
    }
  ],
  productList:
 [
  {
type:mongoose.Schema.Types.ObjectId,
ref:"Product"
  }
 ],

  addressList:
  [
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"AddressList"
    }
  ],
  cartList:
  [
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }
  ],
  additionalDetails:
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"AdditionalDetails"
    }
  ,
  payment:[
  { 
    // credit card details, upi details
    type: mongoose.Schema.Types.ObjectId,
    ref:"Payment"
  }],
  Reviews:
[
  {
    type: mongoose.Schema.Types.ObjectId,
    ref:"RatingAndReview"
  }
],
token:
{
  type:String
},
resetPasswordExpires:
        {
          type: Date
        },
},{timestamps:true})

userSchema.pre("save",async function (next){
  if(!(this.isModified("password")))return next();

    this.password = await bcrypt.hash(this.password,10)


    if(!(this.isModified("confirmPassword")))return next();
    this.confirmPassword = await bcrypt.hash(this.confirmPassword,10);
    next();
})

// custom methods 

userSchema.methods.isPasswordCorrect = async function(password)
{
  const res = await bcrypt.compare(password,this.password) //takes to parameter given password and encrypted password
  return res;
}

userSchema.methods.generateAccessToken =  function()
{
  return Jwt.sign(
    {
      _id : this._id,
      email:this.email,
      phone_No:this.phone_No,
      role: this.role
      
  
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}

userSchema.methods.generateRefreshToken =  function()
{
  return Jwt.sign(
    {
      _id : this._id,
      email:this.email,
      phone_No:this.phone_No,
      role: this.role
      
      
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}

export const User = mongoose.model("User",userSchema);

