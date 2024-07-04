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
     const res = await dispatch(verification());
     console.log(res);
    }
    useEffect(()=>
    {

    },[dispatch])
return (<div className="min-h-[100vh] flex justify-center items-center  bg-slate-500 text-3xl text-white">
     
     <div>
        Payment Successfull
     </div>
     <div>
        ref_No
     </div>
</div>)
}
export default Verification