import { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import { addProfile } from "../../Redux/Slices/profileSlice";


function Profile()
{
    const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
    const image = useSelector((state)=>state.auth.profilePhoto);
    const dispatch = useDispatch();
    const navigate = useNavigate();
   const[profileData,setProfileData]= useState(
    {
        gender:"",
        city:"",
        username:"",
        profilePhoto:""

    }
   )
   const[profileImage,setImage]=useState("");
   function inputHandler(e)
   {
    
    const {name,value}= e.target;
    setProfileData({...profileData,[name]:value})
    console.log(`${name}:${value}`);
     
   }

   function imageHandler(e)
   {
    e.preventDefault();
    const uploadedImage = e.target.files[0];
    console.log(e.target.files)

    if(uploadedImage)
        {
            setProfileData({
                ...profileData,profilePhoto:uploadedImage
            })

        const fileReader = new FileReader();
        fileReader.readAsDataURL(uploadedImage);
        fileReader.addEventListener("load",
            function(){
                console.log(this.result);
                setImage(this.result)
                
            }
        )
        }
   }

   async function sendData(e)
   {
    e.preventDefault();

    const res = await dispatch(addProfile({gender:profileData.gender,city:profileData.city,username:profileData.username}))

    console.log(res)
   }

return(
<div className="">
<form
      noValidate="true"
      onSubmit={sendData}
        className="flex flex-col w-[500px] min-h-[90vh] bg-yellow-200 shadow-lg
 shadow-cyan-500/50  p-10 gap-10 mt-10 mb-10 justify-center items-center"
      >
        <div className="text-3xl text-center font-semibold">Profile</div>
        <label htmlFor="profilePhoto" className=" cursor-pointer">
          
      
            <BsPersonCircle className="w-16 h-16 rounded-full m-auto"></BsPersonCircle>
          
        </label>
        <input
          type="file"
          id="profilePhoto"
          className="hidden"
          accept=".jpg, .jpeg, .png, .svg"
          name="profilePhoto"
          onChange={imageHandler}
        ></input>

        <div className="flex flex-row gap-4">
          <div className="flex flex-col gap-1">
          <div className="flex flex-col gap-1">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              onChange={inputHandler}
             
              className="select select-bordered w-full max-w-xs"
            >
              <option disabled selected>
                Gender
              </option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>

            </select>
          </div>
            
           
          </div>
         
        </div>

        <div className="flex flex-row gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="email">City</label>
            <input
              id="city"
              type="text"
              placeholder="City Name"
              name="city"
              onChange={inputHandler}
            ></input>
          </div>
        </div>

        <div className="flex flex-row gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="username">username</label>
            <input
              id="username"
              type="text"
              placeholder="username"
              name="username"
              onChange={inputHandler}
            ></input>
          </div>
        </div>
        <button className="btn btn-primary w-full">Save</button>
      </form>
</div>)
}
export default Profile