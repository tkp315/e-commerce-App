import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { adminAllOrders } from '../Redux/Slices/trakingSlice';
import OrderCard from './OrderCard';
import { HomeLayout } from '../Layouts/HomeLayout';


 function Orders() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const[orders,setOrders]=useState([]);

    async function getAllOrders()
    {
        const res = await dispatch(adminAllOrders());
        const orderDetails = res.payload.data.orders
        console.log(res.payload.data);
        setOrders(orderDetails)
    }
   useEffect(()=>
{
    getAllOrders()
},[dispatch])
  return (
    <HomeLayout>
        <div>
      {
       orders.slice(40).map((e,idx)=>
        {
         return <OrderCard key={idx+1} product={e.product} customer={e.customer} seller={e.seller} payment={e.paymentInfo} address={e.deliveryAddress} deilivery={e.deliveryStatus} orderid={e._id} ></OrderCard>
        })
      }
    </div>
    </HomeLayout>
  )
}

export default Orders