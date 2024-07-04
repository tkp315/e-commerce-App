import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createAddress } from "../../../Redux/Slices/profileSlice";
import { HomeLayout } from "../../../Layouts/HomeLayout";
import { useNavigate } from "react-router-dom";
function Address() {
  const [data, setData] = useState({
    city: "",
    ward: "",
    pincode: "",
    contact: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleUserInput(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }
  async function submitResponse(e) {
    e.preventDefault();
    const res = await dispatch(
      createAddress({
        city: data.city,
        ward: data.ward,
        pincode: data.pincode,
        contact: data.contact,
      })
    );
    console.log(res);
    if(res.payload.statusCode===200)
    {
        navigate("/user/address/details")
    }
  }

  return (
    <div>
      <HomeLayout>
        <div className="flex justify-center items-center bg-[#45b06a]">
          <form
            noValidate="true"
            onSubmit={submitResponse}
            className="flex flex-col w-[600px] min-h-[90vh] bg-white shadow-lg shadow-cyan-500/50 p-10 gap-5 mt-10 mb-10"
          >
            <div className="text-3xl text-left font-semibold ">New Address</div>
            <div className="border border-[#45b06a]"></div>

            <div className="flex flex-col gap-1">
              <label htmlFor="city" className=" font-serif">
                City
              </label>
              <input
                id="city"
                type="text"
                name="city"
                onChange={handleUserInput}
                className="p-3 border border-[#45b06a]  outline-none "
              />
            </div>
            <div className=" pricetag flex flex-col gap-1">
              <label htmlFor="ward" className=" font-serif">
                Ward
              </label>
              <input
                id="ward"
                type="text"
                // placeholder="Price"
                name="ward"
                onChange={handleUserInput}
                className="p-3 border border-[#45b06a]  outline-none  appearance-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="pincode" className=" font-serif">
                Pincode
              </label>
              <input
                id="pincode"
                type="text"
                name="pincode"
                onChange={handleUserInput}
                className="p-3 border border-[#45b06a]  outline-none "
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="contact" className=" font-serif">
                Contact
              </label>
              <input
                id="contact"
                type="number"
                // placeholder="Description"
                name="contact"
                onChange={handleUserInput}
                className="p-3 border border-[#45b06a]  outline-none "
              />
            </div>

            <button className="btn bg-[#45b06a] hover:bg-[#12dc59]">
              Create Address
            </button>
          </form>
        </div>
      </HomeLayout>
    </div>
  );
}
export default Address;
