import { useState } from "react"
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
import { loginThunk } from "../../Redux/Slices/authSlice";

function Login()
{
const[email,setEmail]=useState(null);
const[password,setPassword]=useState(null);
const dispatch = useDispatch();
const navigate = useNavigate();

async function loginHandler(e)
{
 e.preventDefault();
 console.log(email)
 console.log(password)

if(!email)
{
    toast.error("Enter Email Here")
    return
}

if(!password)
    {
        toast.error("Enter Password")
        return 
    }
const formData = new FormData();
 formData.append("email",email);
 formData.append("password",password);
 console.log(formData.get("email"))

 try {
    //dispatch
    const response = await dispatch(loginThunk({email:email,password:password}));

    // console.log(response.payload)
    // if(send)navigate
    if(response.payload?.statusCode===200)
    {
        navigate("/")
    }
    console.log(email)
    // empty 
    // setEmail("");
    // setPassword("")
 } catch (error) {
    toast.error("An error occurred");
    console.error("Login Error:", error);
 }
}



return(
<div className="flex justify-center items-center bg-[#45b06a] h-[100vh]">
            <form onSubmit={loginHandler}  className="flex flex-col w-[400px] h-[90vh] bg-white shadow-lg shadow-cyan-500/50 p-10 gap-5 mt-10 mb-10">
            <div className="text-left text-2xl font-semibold">Login</div>
            <div className="border border-[#45b06a]"></div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="font-serif">Email</label>
                    <input
                        id="email"
                        type="email"
                        // placeholder="Enter email"
                        name="email"
                        value={email}
                        onChange={(e)=>{
                            console.log(e.target.value)
                            setEmail(e.target.value)
                        }}
                 className="p-3 border border-[#45b06a]  outline-none "
                    ></input>
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="font-serif">Password</label>
                    <input
                        id="password"
                        type="password"
                        // placeholder="Enter Password"
                        name="password"
                        value={password}
                        onChange={(e)=>{
                            console.log(e.target.value)
                            setPassword(e.target.value)
                        }}
                        className="p-3 border border-[#45b06a]  outline-none "
                    ></input>
                </div>
                <div className="">
                    Forgot Password
                    {"   "}
                    <Link to="/generate-token" className=" link-primary">Reset Password</Link>

                </div>
                <div className=" text-md ">
                    Don't have an account
                    <span> <Link className=" link-primary" to="/sendotp">Signup</Link> </span>
                </div>

                <button type="submit" className="btn btn-secondary">Login</button>
            </form>
        </div>
)
}
export default Login