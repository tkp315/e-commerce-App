import React from "react";
import { useDispatch } from "react-redux";

import { useState, useEffect } from "react";
import { getOrderList } from "../../../Redux/Slices/profileSlice";

function SellerSideOrderList() {
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
  return <div></div>;
}
export default SellerSideOrderList;
