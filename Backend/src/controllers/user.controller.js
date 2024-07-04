import { OTP } from '../models/otp.model.js';
import bcrypt from'bcrypt'
import asyncHandlerFunction from "../utilities/asyncHandler.js";
import ApiError from "../utilities/apiError.js";
import { User } from "../models/user.model.js";

import { uploadOnCloudinary } from "../utilities/cloudinary.js";
import { ApiResponse } from "../utilities/apiResponse.js";

import { newOTP } from '../utilities/otpGenerator.js';
import { sendMail } from '../utilities/mailSender.js';
function validateEmail(email) {
   
    let pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
}

async function generateAccessAndRefreshToken(userId)
{
    try
    {
    const user = await User.findById(userId);
    if(!user)console.log("user from database is not retrieved");
    const accessToken = await user.generateAccessToken()
    
   
    const refreshToken = await user.generateRefreshToken();
    if(refreshToken) console.log(`Refresh Token :::::::::${refreshToken}\n`);
    else console.log("refresh token is missing")
    user.refreshToken = refreshToken; // adding ref token in user model (db)
   
    console.log(`This is user Token: ::: ${user.refreshToken}`);

    await user.save({validateBeforeSave:false})
    if(accessToken)console.log(`Access Token:::::${accessToken}\n`);
    else console.log("accessToken is undefined");
    return {accessToken,refreshToken};
    }
    catch(err)
    {
        console.log("something went wrong",err)
        
    }


}
const accessTokenGenerator = async (user_id)=>
{
    try
    {
    const user = await User.findById(user_id);
    if(!user)console.log("user from database is not retrieved");
    const accessToken = await user.generateAccessToken()
    if(accessToken)console.log(`Access Token:::::${accessToken}\n`);
    else console.log("accessToken is undefined");
    return accessToken;
    }
    catch(err)
    {
        console.log("something went wrong",err)
        
    }
}


const refreshTokenGenerator=async(user_id)=>
{
    try
    {
    const user = await User.findById(user_id);
    if(!user)console.log("user from database is not retrieved");
    

    const refreshToken = await user.generateRefreshToken();
    if(refreshToken) console.log(`Refresh Token :::::::::${refreshToken}\n`);
    else console.log("refresh token is missing")
    user.refreshToken = refreshToken; // adding ref token in user model (db)
    await user.save({validateBeforeSave:false})

    return refreshToken;
    }
    catch(err)
    {
        console.log("something went wrong",err)
        
    }
}
// login
// logout
// password reset 
// login with google
// create user with google

const sendOTP = asyncHandlerFunction(async(req,res)=>
    {
        const {email}= req.body
        const alreadyLoggedIn = await User.findOne({email});
           console.log(req.body)
        if(alreadyLoggedIn)throw new ApiError("user is already logged in ");
    
        let uniqueOTP= newOTP(5);
        let otpIndb= await OTP.findOne({otp:uniqueOTP})
       
        while(otpIndb)
        {
            otpIndb=await OTP.findOne({otp:uniqueOTP})
            uniqueOTP= newOTP(5);
        }
        console.log("OTP:",uniqueOTP)
    
        const saveIndb = await OTP.create({
            email,
            otp:uniqueOTP,
            createdAt:Date.now()+10*1000*60
        })
    
        const otpTosend = saveIndb.otp;
       if(!saveIndb)
        {
            throw new ApiError(401,"otp not saved")
        }
     

        
        return res.status(200).json(new ApiResponse(200,saveIndb,"otp saved successfully"))
    })

const userRegistration=asyncHandlerFunction(async(req,res)=>
{
    // get firstname,lastname,username,phoneno, password,email,profilePhoto
    // check for them
    // check if user already registered or not
    // if not then take password, profilePhoto
    
    // if user already registerd then throw an error
    // create user in database;
    const {firstName,lastName,phone_No,password,confirmPassword,email,role,otp}= req.body;
  
    // if([firstName,lastName,username,phone_No,email].some((e)=>e===""))
    //     {
    //         throw new ApiError(400,"anything is missing");
    //     }
    console.log(req.body)
    if(otp==null)
    {
        throw new ApiError(401,"OTP not found")
    }
    if([firstName, lastName,phone_No,password,confirmPassword,email,role,otp].some((e)=> e===""))
   {
    throw new ApiError(401,"some fields are missing ")
   }
   if(!validateEmail(email))
    {
        throw new ApiError(402,"Enter email in correct formate");
    }

    // check wheather user already exist or not

    const alreadyUser = await User.findOne(
        {
            $or:[{email},{phone_No}]
        }
    )
    // console.log(alreadyUser)
    if(alreadyUser)
    {
        throw new ApiError(401, "user is already exist with this email or Phone no");
    }
    
    const findOtp = await OTP.findOne({email:email}).sort({expiresIn:-1}).limit(1);
    const userOtp = findOtp.otp
    if(!userOtp)
    {
        throw new ApiError(401,"otp not found for this email")
    }
    // console.log("This is user otp",userOtp);
    
    if(otp===userOtp)
    {
        console.log(
            "you can process further")
    }
    
    if(otp!==userOtp)
    {
        throw new ApiError(401,"enter correct otp")
    }

   

    if(password && confirmPassword)
    {
      if(password!==confirmPassword)
    {
        throw new ApiError(400, "Password not matched");
    }
    else 
    {
        console.log("Password Matched");
    }
    }
    // validate email
 
  
    // profilePhoto

    const profilePhotoLocalStorage = await req.file?.path;
    console.log("this is path of profile photo ",profilePhotoLocalStorage)
    
    const profilePhoto = await uploadOnCloudinary(profilePhotoLocalStorage);

    if(!profilePhoto)
    {
        throw new ApiError(400,"profile photo is not uploaded on cloudinary");
    }
    // now create user 

    const user = await User.create(
        {
            firstName,
            lastName,
            email,
            password,
            phone_No,
            profilePhoto:(profilePhoto? profilePhoto.url:""),
            role,
            otp
        }
    )
    const createdUser = await User.findById(user?._id).select("-password -refreshToken");
    console.log("This is created user",createdUser)

    if(!createdUser)
    {
        throw new ApiError(500, "user not created");
    }
   
    await sendMail("Your account on Apni Dukan is registered successfully",email,"Account Registration")
return res
       .status(200)
       .json(
        
         new ApiResponse(200,user,"user is created successfully")
        
       )

});



const userLogin= asyncHandlerFunction(async(req,res)=>
{
    const{email,password}=req.body
    console.log(req.body)


    if(!(email))
    {
        throw new ApiError(401, "enter email here");
    }
   

    const userInDB = await User.findOne(
        {
            email
        }
    )
    if(!userInDB)
    {
      throw new ApiError(400,"user not found");
     }
    
    if(!password)
    {
        throw new ApiError(401, "Enter password");
    }
    console.log(`  email:: ${email} \n password::${password}`);

    const isPasswordCorrect = await bcrypt.compare(password,userInDB.password);
 console.log(isPasswordCorrect,"password")


if(!isPasswordCorrect)
{
    throw new ApiError(400, "please enter correct password");
}

// generating tokens now 

//  const {accessToken,refreshToken}= await generateAccessAndRefreshToken(userInDB._id).then(()=>
// {
//     console.log("generating tokens");
    
// }).catch((err)=>{console.log("not generating tokens",err)});


const accessToken = await userInDB.generateAccessToken();
const refreshToken = await userInDB.generateRefreshToken();

if(accessToken)
    {
        console.log("Access Token::",accessToken)
    }



// console.log(`This is response ::::::::: ${generateAccessAndRefreshToken(userInDB._id)}`);
// console.log(`access token at the end :::${accessToken}`)



const loggedInUser = await User.findById(userInDB._id).select("-password -refreshToken")
                         .populate("addressList")
                       

if(!loggedInUser)
{
    throw new ApiError(400, "logged in user not found");
}
// sending cookies 
const options = 
 {
    httpOnly:true,
    // secure:true  
 
 }




sendMail("user is logged in ",email,"LogIn")
return res
.status(200)
.cookie("accessToken",accessToken,options)
.cookie("refreshToken",refreshToken,options)
.json(
    new ApiResponse(200,{userInDB:loggedInUser,accessToken,refreshToken,addressList:loggedInUser.addressList },"user logged in succesfully")
)


})

const userLogout = asyncHandlerFunction(async(req,res)=>
{
   await User.findByIdAndUpdate(req.user._id
      , {$set:{refreshToken:undefined}},
      {new:true}
    )

    const options= 
    {
        httpOnly:true,
        // secure:true 
    }

return res
.status(200)
.clearCookie("accessToken",options)
.clearCookie("refreshToken",options)
.json(
    new ApiResponse(200,{},"User logged out",true)
)

})



export{
    userRegistration,
    userLogin,
    userLogout,
    sendOTP
}
// seller address
// isSeller middlerw and seller address