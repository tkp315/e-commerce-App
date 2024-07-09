import { useState } from "react";
import { useDispatch } from "react-redux";
import { sellerAccount } from "../../../Redux/Slices/sellerSlice";

function Account() {
  const dispatch = useDispatch();
  const [sellerData, setSellerData] = useState({
    rozarpayId: "",
    rozarpaySecret: "",
    fullName: "",
  });
  function inputChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setSellerData({ ...sellerData, [name]: value });
  }

  async function accountCreation(e) {
    e.preventDefault();

    const res = await dispatch(sellerAccount(sellerData));
  }

  return (
    <div className="flex justify-center items-center bg-[#45b06a]">
      <form
        onSubmit={accountCreation}
        className="bg-white flex flex-col gap-5 w-[500px] mt-10 p-10"
      >
        <div className="text-center text-3xl font-semibold ">
          Create Account
        </div>
        <div className="flex flex-col gap-1">
          RozarpayId
          <input
            type="text"
            placeholder="Enter razorpayId"
            name="rozarpayId"
            onChange={inputChange}
          ></input>
        </div>

        <div className="flex flex-col gap-1">
          RozarpaySecret
          <input
            type="text"
            placeholder="Enter razorpayId"
            name="rozarpaySecret"
            onChange={inputChange}
          ></input>
        </div>

        <div className="flex flex-col gap-1">
          Full Name
          <input
            type="text"
            placeholder="Enter razorpayId"
            name="fullName"
            onChange={inputChange}
          ></input>
        </div>

        <button className=" w-full btn btn-primary">Add Account</button>
      </form>
    </div>
  );
}
export default Account;
