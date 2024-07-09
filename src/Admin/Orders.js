import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { adminAllOrders } from '../Redux/Slices/trakingSlice';
import OrderCard from './OrderCard';
import { HomeLayout } from '../Layouts/HomeLayout';


 function Orders() {
    const dispatch = useDispatch();
 
    const[orders,setOrders]=useState([]);

    async function getAllOrders()
    {
        const res = await dispatch(adminAllOrders());
        const orderDetails = res.payload.data.orders
        setOrders(orderDetails)
    }
   useEffect(()=>
{
    getAllOrders()
// eslint-disable-next-line react-hooks/exhaustive-deps
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