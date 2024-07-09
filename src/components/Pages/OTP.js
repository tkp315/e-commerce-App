import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HomeLayout } from "../../Layouts/HomeLayout";

import { sendOTPToUser } from "../../Redux/Slices/authSlice";

function OTP() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const sendOTP = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Enter email");
      return;
    }

    try {
      const response = await dispatch(sendOTPToUser({ email: email })).unwrap();

      if (response?.statusCode === 200) {
        toast.success("OTP sent successfully!");
        navigate("/signup");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  return (
    <HomeLayout>
      <div className="flex justify-center items-center bg-[#45b06a]">
        <form
          onSubmit={sendOTP}
          className="flex flex-col w-[400px] h-[60vh] bg-white shadow-lg shadow-cyan-500/50 p-10 gap-5 mt-10 mb-10"
        >
          <div className="text-left text-2xl font-semibold">
            Email Verification
          </div>
          <div className="border border-[#45b06a]"></div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-serif">
              Email
            </label>
            <input
              id="email"
              type="email"
              //
              name="email"
              value={email}
              onChange={emailHandler}
              className="p-3 border border-[#45b06a]  outline-none "
            ></input>
          </div>
          <button type="submit" className="btn btn-secondary mt-4">
            Send OTP
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}

export default OTP;
