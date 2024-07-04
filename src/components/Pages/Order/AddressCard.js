import React from "react";

function AddressCard({ state, idx }) {
  return (
    <div className="flex flex-col">
      <div className="bg-base-200 collapse collapse-plus border border-black  w-full  ">
        <input type="checkbox" className="peer " />
        <div className="collapse-title  text-primary-content  ">
          Address {idx}
        </div>
        <div className="collapse-content  text-primary-content ">
          <ul className="m-2">
            <li>{state.city}</li>
            <li>{state.ward}</li>
            <li>{state.pincode}</li>
            <li>{state.contact}</li>

          </ul>
          <button className="btn bg-[#45b06a]">Edit</button>
          <button className="btn  bg-red-500 ml-3">Remove</button>

        </div>
      </div>
    </div>
  );
}
export default AddressCard;
