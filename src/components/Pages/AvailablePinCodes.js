import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {  newPincode } from '../../Redux/Slices/profileSlice';
import { HomeLayout } from '../../Layouts/HomeLayout';
 function AvailablePinCodes() {
   
    const [pinOfAddress,setPin]=useState("");
    const[city,setCity]=useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();


    async function location(e)
    {
        e.preventDefault();
     const res = await dispatch(newPincode({pinOfAddress:pinOfAddress,city:city}));
     console.log(res)
    }

  return (
    <HomeLayout>
        <div className="flex justify-center items-center bg-[#45b06a] h-[100vh]">
            <form onSubmit={location} className="flex flex-col w-[400px] h-[90vh] bg-white shadow-lg shadow-cyan-500/50 p-10 gap-5 mt-10 mb-10">
            <div className="text-left text-2xl font-semibold">New Location</div>
            <div className="border border-[#45b06a]"></div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="pincode" className="font-serif">Pincode</label>
                    <input
                        id="pincode"
                        type="text"
                        // placeholder="Enter email"
                        name="pinOfAddress"
                        onChange={(e)=>setPin(e.target.value)}
                 className="p-3 border border-[#45b06a]  outline-none "
                    ></input>
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="city" className="font-serif">City</label>
                    <input
                        id="city"
                        type="text"
                        // placeholder="Enter Password"
                        name="city"
                        onChange={(e)=>setCity(e.target.value)}
                        className="p-3 border border-[#45b06a]  outline-none "
                    ></input>
                </div>
               
               

                <button type="submit" className="btn btn-secondary">Add</button>
            </form>
        </div>
    </HomeLayout>
  )
}
export default AvailablePinCodes