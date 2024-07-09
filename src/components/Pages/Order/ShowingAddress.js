import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getAllAddress } from '../../../Redux/Slices/profileSlice';
import { useNavigate } from 'react-router-dom';
import { HomeLayout } from '../../../Layouts/HomeLayout';
import AddressCard from './AddressCard';

function ShowingAddress() {
const dispatch = useDispatch();
const navigate= useNavigate()
const [address,setAddress]=useState([]);

async function showAddresses(e)
{

    const res = await dispatch(getAllAddress());
    if((res?.payload?.data?.addresses.addressList).length===0)
    {
        navigate("/user/add-address")
    }
    else{
    setAddress(res.payload.data.addresses.addressList);

    }
}
 
// eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(()=>{showAddresses()},[dispatch])

  return (
   <HomeLayout>
     <div className='flex justify-center'>
    <div className='flex flex-col mt-5 mb-2  mr-4 p-5 w-[800px] gap-10 min-h-[100vh] border-2'>
     
     {
        
        address.map((e,idx)=>
        {
            return <AddressCard state={e} idx={idx+1}></AddressCard>
        })
     }

      <button
      onClick={()=>navigate("/user/add-address")}
       className='btn bg-[#45b06a]'>Add Address</button>
    </div>
    </div>
   </HomeLayout>
  )
}
export default ShowingAddress

