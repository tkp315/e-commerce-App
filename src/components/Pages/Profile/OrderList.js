import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { getOrderList } from "../../../Redux/Slices/profileSlice";
import { HomeLayout } from "../../../Layouts/HomeLayout";
import CartCard from "../../../Helpers/CartCard";

function OrderList() {
  const dispatch = useDispatch();

  const [orderArray, setOrderList] = useState([]);

  async function List() {
    const res = await dispatch(getOrderList());

    setOrderList(res.payload.data.orders[0].orderDetails);
  }
  useEffect(() => {
    List();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  return (
    <HomeLayout>
      <div className="flex flex-col min-h-[100vh]">
        {orderArray.map((item) => {
          return (
            <CartCard
              data={item.product}
              orderId={item._id}
              trackId={item.trackingId}
              isButton={false}
            ></CartCard>
          );
        })}
      </div>
    </HomeLayout>
  );
}
export default OrderList;
