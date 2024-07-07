import {toast} from "react-hot-toast"
import { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAccount } from "../../Redux/Slices/authSlice";
import { HomeLayout } from "../../Layouts/HomeLayout";
import { Link } from "react-router-dom";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [previewImage, setPreviewImage] = useState("");
  // const [image, setImage] = useState("");

  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    confirmPassword: "",
    email: "",
    role: "",
    password: "",
    phone_No: "",
    otp: "",
    // profilePhoto: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });

    console.log(`${name}:${value}`);
  }
  // function imageHandler(e) {
  //   e.preventDefault();
  //   const uploadedImage = e.target.files[0];
  //   console.log(e.target.files);

  //   if (uploadedImage) {
  //     setSignupData({
  //       ...signupData,
  //       profilePhoto: uploadedImage,
  //     });
  //     const fileReader = new FileReader();
  //     fileReader.readAsDataURL(uploadedImage);
  //     fileReader.addEventListener("load", function () {
  //       console.log(this.result);
  //       setPreviewImage(this.result);
  //     });
  //   }
  // }

  // send data through axios
  async function createNewAccount(e)
  {
    e.preventDefault();
  if([signupData.firstName ,signupData.lastName,signupData.confirmPassword ,signupData.email , signupData.role , signupData.password,signupData.phone_No,signupData.otp].some((e)=>e===""))
    {
      toast.error("Please Fill All The Details");
      return
    }
    // checking valid emailId

    if(!signupData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/))
    {
      toast.error("Invalid email id");
      return 
    }

   const formData = new FormData();
   formData.append("firstName",signupData.firstName);
   formData.append("lastName",signupData.lastName);
   formData.append("email",signupData.email);
   formData.append("password",signupData.password);
   formData.append("confirmPassword",signupData.confirmPassword);
   formData.append("role",signupData.role);
   formData.append("phone_No",signupData.phone_No);
  //  formData.append("profilePhoto",signupData.profilePhoto);
   formData.append("otp",signupData.otp);

console.log(formData)
   //dispatch create account action
   const response = await dispatch(createAccount(formData))

   if(response)
  {
   navigate("/login")

  }
   setSignupData(
    {
      firstName: "",
    lastName: "",
    confirmPassword: "",
    email: "",
    role: "",
    password: "",
    phone_No: "",
    otp: "",
    profilePhoto: "",
    }
   )

  //  setPreviewImage("");




  }

  return (
 
    <HomeLayout>
      <div className="flex justify-center items-center  bg-[#45b06a] ">
      {/* signup form  */}
      {/* send form on api through axios*/}
      {/* add on localStorage */}
      {/* create auth slice for storing the data*/}

      <form
      noValidate="true"
      onSubmit={createNewAccount}
        className="flex flex-col w-[600px] min-h-[90vh] shadow-lg bg-white
 shadow-cyan-500/50 justify-center  p-10 gap-5 mt-10 mb-10"
      >
        <div className="text-3xl text-left font-semibold">Registration</div>
        <div className="border border-[#45b06a]"></div>
        

        
          <div className="flex flex-col gap-1">
            <label htmlFor="firstName" className="font-serif">First Name</label>
            <input
              id="firstName"
              type="text"
              placeholder="Enter First Name"
              name="firstName"
              onChange={handleUserInput}
               className="p-3 border border-[#45b06a]  outline-none "
            ></input>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="lastName" className="font-serif">Last Name</label>
            <input
              id="lastName"
              type="text"
              placeholder="Enter Last Name"
              name="lastName"
              onChange={handleUserInput}
               className="p-3 border border-[#45b06a]  outline-none "
            ></input>
          </div>
       

        
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-serif">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={handleUserInput}
               className="p-3 border border-[#45b06a]  outline-none "
            ></input>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="phone" className="font-serif">Phone</label>
            <input
              id="phone"
              type="number"
              placeholder="Enter phone number"
              name="phone_No"
              onChange={handleUserInput}
               className="p-3 border border-[#45b06a]  outline-none "
            ></input>
          </div>
      

        
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className=" font-serif">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={handleUserInput}
               className="p-3 border border-[#45b06a]  outline-none "
            ></input>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="confirmPassword" className="font-serif">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Enter Confirm Password"
              name="confirmPassword"
              onChange={handleUserInput}
               className="p-3 border border-[#45b06a]  outline-none "
            ></input>
          </div>
      

      
          <div className="flex flex-col gap-1">
            <label htmlFor="otp" className="font-serif">OTP</label>
            <input
              id="otp"
              type="text"
              placeholder="Enter OTP"
              name="otp"
              onChange={handleUserInput}
               className="p-3 border border-[#45b06a]  outline-none "
            ></input>
          </div>
          
          <div className="flex flex-col gap-1">
            <label htmlFor="role" className="font-serif">Role</label>
            <select
              id="role"
              onChange={handleUserInput}
              name="role"
               className="p-3 select  border border-[#45b06a]  outline-none  font-serif  "
            >
              <option disabled selected>
                Role
              </option>
              <option>Customer</option>
              <option>Seller</option>
            </select>
          </div>
     

        <button className=" btn btn-secondary">Create Account</button>
        <div className="">
          Already Have an Account  <span> <Link to="/login" className=" link-hover text-blue-400">Login</Link> </span>
        </div>
      </form>
    </div>
  
    </HomeLayout>
  
  );
}
export default Signup;
