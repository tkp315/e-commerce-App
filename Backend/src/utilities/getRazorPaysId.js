import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";
import { SellerAccount } from "../models/sellerAccount.model.js";
import { decryption } from "./crypto.js";
import mongoose from "mongoose";
const getIds = async(pid,uid)=>
{
    const product = await Product.findById(pid);
    const sellerId = product.seller;
    const sid =new mongoose.Types.ObjectId(sellerId);
    console.log("Seller Id:",sid)

    const seller = await User.findById(sid);

    const sellerAccount = seller.sellerAccount;
    console.log("AccountId",sellerAccount)

    const sellerAccountId = new mongoose.Types.ObjectId(sellerAccount);

    const findSellerAccount = await SellerAccount.findById(sellerAccountId)

    const rozarpayKeyId = findSellerAccount.rozarpayKeyId;
    console.log("rozarpaykeyId",rozarpayKeyId)

    const rozarpayKeySecret =findSellerAccount.rozarpayKeySecret;
    
    console.log("rozarpaySecret",rozarpayKeySecret)
  // decrypt 
  
  

  return {rozarpayKeyId,rozarpayKeySecret}

}

export {getIds}