import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getOrderList } from '../../../Redux/Slices/profileSlice';
import { HomeLayout } from '../../../Layouts/HomeLayout';
import CartCard from '../../../Helpers/CartCard';

function OrderList  () {

    const dispatch = useDispatch();
    const navigate= useNavigate();
    const [orderArray,setOrderList]=useState([]);
    const[paymentInfo,setPaymentInfo]=useState({});
    const[deliveryAddress,setDeliveryAddress]=useState([])
    const[deliveryStatus,setDeliveryStatus]=useState("");
    const[product,setProduct]=useState({});
    
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
   <HomeLayout>
    <div className='flex flex-col min-h-[100vh]'>
      {
        orderArray.map((item)=>
        {
 return <CartCard data={item.product} orderId={item._id} trackId={item.trackingId} isButton={false}></CartCard>
 
          
        })
      }
    </div>
   </HomeLayout>
  )
}
export default OrderList