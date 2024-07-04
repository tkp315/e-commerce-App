import { sendMail } from "./mailSender.js";

const sendVerificationEmail=async (email,otp)=>
    {
       try{
        if(!email)
        {
            console.log("email is not found")
        }
         const mailResponse = await sendMail(`verification code for registration on Apni Dukan: ${otp} `,email,"Verification code")
         console.log("Email sent Successfully",mailResponse)
    
       }
       catch(e)
       {
          console.log("error occured while sending otp",e)
       }
    }
export {sendVerificationEmail}