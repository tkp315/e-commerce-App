import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { passwordReset } from "../../Redux/Slices/authSlice";

function ResetPassword() {
  const [token, setToken] = useState("");
  const [newPass, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function resetPwd(e) {
    e.preventDefault();

    if (!token) {
      toast.error("Enter Token Here");
      return;
    }

    if (!newPass) {
      toast.error("Enter Password");
      return;
    }

    try {
      //dispatch
      const response = await dispatch(
        passwordReset({
          token: token,
          newPass: newPass,
          confirmPass: confirmPass,
        })
      );

      if (response.payload?.statusCode === 200) {
        navigate("/login");
      }
    } catch (error) {
      toast.error("An error occurred");
      console.error("Login Error:", error);
    }
  }

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={resetPwd}
        className="flex flex-col w-[400px] h-[80vh] bg-[#45b06a] shadow-lg shadow-cyan-500/50 p-10 gap-5 mt-10 mb-10"
      >
        <div className="text-center text-2xl font-semibold">Reset Password</div>
        <div className="flex flex-col gap-1">
          <label htmlFor="token">Token</label>
          <input
            id="token"
            type="text"
            placeholder="Enter Token"
            name="token"
            value={token}
            onChange={(e) => {
              console.log(e.target.value);
              setToken(e.target.value);
            }}
            className="input input-bordered"
          ></input>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter Password"
            name="newPass"
            value={newPass}
            onChange={(e) => {
              console.log(e.target.value);
              setPassword(e.target.value);
            }}
            className="input input-bordered"
          ></input>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            name="confirmPass"
            value={confirmPass}
            onChange={(e) => {
              console.log(e.target.value);
              setConfirmPass(e.target.value);
            }}
            className="input input-bordered"
          ></input>
        </div>

        <button type="submit" className="btn btn-secondary">
          Change Password
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
