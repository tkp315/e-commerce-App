import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { verification } from "../../../Redux/Slices/razorpaySlice";
import { useParams } from "react-router-dom";

function Verification()
{
    const dispatch = useDispatch();
    const {ref_No}= useParams();
    
    async function sendData()
    {
      await dispatch(verification());
   
    }
    useEffect(()=>
    {
       sendData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dispatch])
return (<div className="min-h-[100vh] flex justify-center items-center  bg-slate-500 text-3xl text-white">
      
     <div>
        Payment Successfull
     </div>
     <div>
        {ref_No}
     </div>
</div>)
}
export default Verification