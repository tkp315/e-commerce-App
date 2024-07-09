import React from "react";
import { useNavigate } from "react-router-dom";

 function OrderCard({
  product,
  seller,
  customer,
  deilivery,
  address,
  orderid,
}) {
  const navigate = useNavigate();
  function btnHandler() {
    navigate(`/admin/update-delivery-status/${orderid}`);
  }
  return (
    <div className=" p-8">
      <div className="flex flex-row w-full  min-h-[40vh] p-7 mt-1 mb-1 bg-white items-center border border-black gap-28">
        <div className="flex flex-col gap-2 justify-center">
          <h3 className="font-semibold">Product Details</h3>
          <div className=" flex flex-row gap-4">
            <div>
              <img
                src={
                  product.thumbnail
                    ? product.thumbnail
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-gukc7EnLg2lXrV35IoDl3SrhFbupHeJhuw&s"
                }
                className=" w-[100px]"
                alt="pic"
              ></img>
            </div>
            <div className="flex flex-col gap-4">
              <div className=" text-pretty">{product.title}</div>

              <div className=" text-pretty">
                {"Rs "}
                {product.price}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-semibold">Customer Details</h3>

          <div className=" text-pretty">{customer.firstName.toUpperCase()}</div>

          <div className=" text-pretty">{customer.lastName.toUpperCase()}</div>
          <div className=" text-pretty">{customer.phone_No}</div>
          <div className=" text-pretty">
            {address.ward} {address.city} {address.pincode}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-semibold">Seller Details</h3>
          <div className=" text-pretty">{seller.firstName.toUpperCase()}</div>

          <div className=" text-pretty">{seller.lastName.toUpperCase()}</div>
          <div className=" text-pretty">{seller.phone_No}</div>
        </div>

        <div className="flex flex-row gap-1">
          <h3 className="font-semibold">Delivery Status </h3>
          <h2 className="font-semibold bg-[#45b06a] rounded-full w-28 h-10 text-center">
            {deilivery.deliveryStatus}
          </h2>
        </div>

        <div className="  btn btn-success" onClick={btnHandler}>
          Update Status
        </div>
      </div>
    </div>
  );
}
export default OrderCard