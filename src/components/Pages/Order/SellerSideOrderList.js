import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { getOrderList } from '../../../Redux/Slices/profileSlice';

 function SellerSideOrderList() {
    const dispatch = useDispatch();
    const navigate= useNavigate();
    const [orderArray,setOrderList]=useState([]);
    const[paymentInfo,setPaymentInfo]=useState({});
    const[deliveryAddress,setDeliveryAddress]=useState([])
    const[deliveryStatus,setDeliveryStatus]=useState("");
    const[product,setProduct]=useState({});
    const[trackingId]=useState();
    async function List()
    {
      const res = await dispatch(getOrderList());
      console.log(res.payload.data.orders[0].orderDetails);
    //   const singleProductDetails = res.payload.data.orders[0].orderDetails;
      setOrderList(res.payload.data.orders[0].orderDetails);

    }
useEffect(()=>{
    List()
},[dispatch])
  return (
    <div>
      
    </div>
  )
}
export default SellerSideOrderList
