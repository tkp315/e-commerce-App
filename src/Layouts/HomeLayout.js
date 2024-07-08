import { useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { MdArrowDropDown } from "react-icons/md";
import { CiShoppingCart } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutThunk } from "../Redux/Slices/authSlice";

function HomeLayout({ children }) {
    const [cart,setCart] = useState("");
    const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
    const image = useSelector((state)=>state.auth.profilePhoto);
    const role = useSelector((state)=>state.auth.role);
    const totalCartItems= useSelector((state)=>state.product.totalCartItems)
    const totalCartPrice = useSelector((state)=>state.product.totalCartPrice);
    console.log(totalCartItems)
    
    console.log(image)
    const navigate = useNavigate();
    const dispatch = useDispatch();
   async function logoutUser(e)
    {
      e.preventDefault();
      const res = dispatch(logoutThunk());

      
      if(res)
      {
        navigate("/");
       
      }
    }


  return (
    <div className="">
      {/* 1.NavBar
       a)three lines
       b)logo
       c)searchBar
       d)cart 
       e)UserAccount
     */}
     
     <div className="flex flex-col rounded-md ">

        
<div className="flex flex-row items-center  navbar gap-10 justify-evenly shadow-xl">

<div className="flex-none relative">


<div className="drawer z-20">
<input id="my-drawer" type="checkbox" className="drawer-toggle" />
<div className="drawer-content">
{/* Page content here */}
<label htmlFor="my-drawer" className=" drawer-button"><MdMenu className="text-3xl bg-transparent text-[#45b06a]  cursor-pointer"></MdMenu ></label>
</div> 
<div className="drawer-side ">
<label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
<ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content ">
{/* Sidebar content here */}
<li><Link to="/">Home</Link></li>
<li><Link to="/all-products">All Products</Link></li>

<li><Link to="/shop-by-category">Shop By Category</Link></li>
<li><Link to="/admin/total-orders">All Orders</Link></li>



<li><Link to="/aboutUs">About Us</Link></li>
{
role==="Admin"?<li><Link to="/create-category">Create Category</Link></li>:""
}

<li>
<Link to="/product/add-product">Add Product</Link>
</li>

<li>
<Link to="/category/create-subcategory">Add Sub-Category</Link>
</li>

<li>
<Link to="/add-pincode">Add PinCode</Link>
</li>

<li>
<Link to="/user/add-account">Add Seller Account</Link>
</li>

<li>
<Link to="/user/total-orders">Order Got</Link>
</li>

</ul>
<div className="flex flex-row gap-4 absolute bottom-0 justify-center items-center mx-auto my-auto">

{
isLoggedIn?<Link to="/profile"><button className= "btn btn-primary rounded-md ">Profile</button></Link>:
<Link to="/login"><button className= "btn btn-primary rounded-md ">Login</button></Link>
}

{
isLoggedIn?<Link to="/logout"><button onClick={logoutUser} className= "btn btn-secondary rounded-md ">Logout</button></Link>:
<Link to="/sendotp"><button className="btn btn-secondary rounded-md">Signup</button></Link>

}
</div>
</div>
</div>



</div>


  <h1 className=" text-xl text-[#45b06a] font-semibold">Apni Dukan</h1>

  <div className="border border-1 border-[#45b06a]  flex flex-row items-center rounded-lg w-96 h-[8vh]">
    <input
      className=" outline-none p-2   rounded-lg  "
      type="text"
      placeholder="Search"
    ></input>
    <span className=" text-[#45b06a] text-2xl">|</span>
    <div className="">
      <div className="dropdown dropdown-bottom ">
        <div
          tabIndex={0}
          role="button"
          className="flex flex-row items-center"
        >
          <div
            tabIndex={0}
            role="button"
            className="m-1 rounded-lg text-[#45b06a] font-semibold"
          >
            Category{" "}
          </div>

          <MdArrowDropDown className="text-2xl text-[#45b06a]"></MdArrowDropDown>
        </div>

        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
        >
          <li>
            <Link>Sprouts</Link>
          </li>
          <li>
            <Link>Pantry Staples</Link>
          </li>
          <li>
            <Link>Snacks</Link>
          </li>
          <li>
            <Link>Breakfast and Cereals</Link>
          </li>
          <li>
            <Link>Baking and Cooking Ingredients</Link>
          </li>

          <li>
            <Link>Sauces</Link>
          </li>
          
          <li>
            <Link>Household Essentials</Link>
          </li>

        </ul>
      </div>
    </div>
    <div className="">
      <button className="ml-1 p-2 text-lg text-white bg-[#45b06a]  w-[6.32rem]  rounded-tr-lg rounded-br-lg  hover:bg-[#298449]">
        Search
      </button>
    </div>
  </div>

  <div className=" flex flex-row gap-14">
  <div className="dropdown dropdown-end">
  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
  <div className="indicator">
   <CiShoppingCart className="text-3xl"></CiShoppingCart>
    <span className="badge badge-sm indicator-item" >{totalCartItems}</span>
  </div>
</div>
<div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
  <div className="card-body">
    <span className="font-bold text-lg">Total Items: {totalCartItems}</span>
    <span className="text-info text-lg">Subtotal:{" "}{totalCartPrice}{" Rs"}</span>
    <div className="card-actions">


     <Link to="/user/cart">
     <button className="btn btn-primary text-[#45b06a] btn-block">View cart</button>

     </Link>

    </div>
  </div>
</div>
 </div>

 <div>
  {
      isLoggedIn?<div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="rounded-full relative text-2xl" >
         {
            image?<img src={image} alt="none"></img>:
            <FaUserCircle></FaUserCircle>
         }
        </div>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <Link to={"/profile"} className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><Link to={'/settings'}>Settings</Link></li>
        <li><Link to={'/user/address/details'}>My Address</Link></li>

        <li><Link to={'/user/order/list'}>My Orders</Link></li>

        <li><Link to={'/logout'} onClick={logoutUser}>Logout</Link></li>
      </ul>
    </div>:<Link to="/login"><button  className="btn rounded-md h-2 w-14 p-4"> 
            Login
       </button> </Link>
    
  }
</div>
  </div>


</div>
</div>
{/* <div className="bg-[#45b06a] w-full h-[7vh] flex flex-row gap-3 px-20 items-center " >
<Link to="/" className=" link-hover text-white">Home</Link>
<Link to="/all-products" className=" link-hover text-white">Shop</Link>
<Link to="/contactUs" className=" link-hover text-white">Contact Us</Link>
<Link to="/aboutUs" className=" link-hover text-white">About Us</Link>



</div> */}
      {/* Children */}


      {children}


      {/* Footer */}

      <footer className="footer p-10 bg-neutral text-neutral-content">
  <aside>
    <svg width="50" height="50" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" className="fill-current"><path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path></svg>
    <p>ACME Industries Ltd.<br/>Providing reliable tech since 1992</p>
  </aside> 
  <nav>
    <h6 className="footer-title">Social</h6> 
    <div className="grid grid-flow-col gap-4">
      <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></a>
      <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a>
      <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a>
    </div>
  </nav>
</footer>
    </div>
  );
}
export { HomeLayout };
