import twilio from 'twilio'

async function sendMessage(phone,body)
{
    const accountSid=process.env.TWILLO_ACCOUNT_SID;
    const authToken= process.env.TWILLO_AUTH_TOKEN;
    
    const client= new twilio(accountSid,authToken,{
        autoRetry:true,
        maxRetries:3,
        lazyLoading:false,
        region:'india'
        
    
    });
   

    client.messages.create(
        {
            body:body,
            to:phone,
            from:process.env.TWILLO_PHONE_NO
        }
    ).then((message)=>console.log(message.sid))
    .catch((error)=>console.log("Error occured while sending sms",error))

}

export {sendMessage}