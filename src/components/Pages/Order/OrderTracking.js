import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { orderTracking } from "../../../Redux/Slices/trakingSlice";
import { HomeLayout } from "../../../Layouts/HomeLayout";

function OrderTracking() {
  const { oid, tid } = useParams();

  const [orderStatus, setOrderStatus] = useState([]);

  const dispatch = useDispatch();

  async function ordertrack() {
    const res = await dispatch(
      orderTracking({ trackingId: tid, orderId: oid })
    );
    setOrderStatus(res.payload.data.order.deliveryStatus.deliveryUpdates);
  }
  useEffect(() => {
    ordertrack();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <HomeLayout>
      <div className="flex justify-center items-center min-h-[100vh] bg-[#45b06a]">
        <div className=" bg-white w-[600px] border border-black">
          Delivery Status:
          {orderStatus.length
            ? orderStatus.map((e) => {
                return (
                  <div className=" flex flex-row gap-4">
                    <div className=" font-semibold text-sky-600 ">
                      {new Date(e.timestamp).toLocaleString()}
                    </div>
                    <div className=" font-semibold text-red-800">
                      {e.status}
                    </div>
                  </div>
                );
              })
            : "Order Status is not updated"}
        </div>
      </div>
    </HomeLayout>
  );
}
export default OrderTracking;
