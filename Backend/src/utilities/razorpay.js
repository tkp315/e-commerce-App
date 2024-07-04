import Razorpay from 'razorpay'

const razorPayInstance = (keyId,keySecret)=>
{
    const instance = new Razorpay(
        {
         key_id:keyId,
         key_secret:keySecret
        }
    )
    return instance;
}

export {razorPayInstance}
