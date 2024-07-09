import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import { generateToken } from "../../Redux/Slices/authSlice";
function TokenGenerator() {
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
      const response = await dispatch(generateToken({ email: email })).unwrap();

      if (response?.statusCode === 200) {
        toast.success("Verification sent successfully!");
        navigate("/reset-password");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={sendOTP}
        className="flex flex-col w-[400px] h-[60vh] bg-yellow-200 shadow-lg shadow-cyan-500/50 p-10 gap-10 mt-10 mb-10"
      >
        <div className="text-center text-2xl font-semibold">Generate Token</div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={emailHandler}
            className="input input-bordered"
          ></input>
        </div>
        <button type="submit" className="btn btn-secondary">
          Send OTP
        </button>
      </form>
    </div>
  );
}

export default TokenGenerator;
