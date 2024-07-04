import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { HomeLayout } from '../Layouts/HomeLayout';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateOrderDeliveryStatus } from '../Redux/Slices/trakingSlice';

 function UpdateStatus() {
    const {oid}=useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [newStatus,setStatus] = useState("");
    const [code,setCode]=useState("");
    async function updateorderstatus(e)
    {
        e.preventDefault()
        const res = await dispatch(updateOrderDeliveryStatus({orderId:oid,newStatus:newStatus}))
        console.log(res.payload)
        
            // navigate("/admin/total-orders
            setCode(res.payload.statusCode);
        
    }
    useEffect(() => {
        if (code === 200) {
          navigate('/admin/total-orders');
        }
      }, [code, navigate]);

  return (
   <HomeLayout>
     <form onSubmit={updateorderstatus} className=' flex justify-center items-center min-h-[100vh] bg-[#45b06a]'>
      <div className='bg-white h-[50vh] w-[400px] p-5 flex flex-col gap-6'>
      <h1 className='border-b border-[#45b06a]  text-xl font-semibold  pb-4 '>Update Delivery Status</h1>

      <div className="flex flex-col gap-1">
            <label htmlFor="status" className="font-serif">Status</label>
            <select
              id="status"
              onChange={(e)=>{setStatus(e.target.value)
                console.log(e.target.value)
              }}
              name="newStatus"
               className="p-3 select  border border-[#45b06a]  outline-none  font-serif  "
            >
              <option disabled selected>
                Order Status
              </option>
              <option>Pending</option>
              <option>Shipped</option>
              <option>Out For Delivery</option>
              <option>Delivered</option>
              <option>Failed</option>
            </select>
          </div>     
           
           <div onClick={updateorderstatus} className=' btn '>Update</div>


      </div>
     

      
    </form>
   </HomeLayout>
  )
}
export default UpdateStatus
