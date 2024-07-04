import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { payment } from "../../../Redux/Slices/razorpaySlice";
import { getProduct } from "../../../Redux/Slices/productSlice";
import { getAllAddress } from "../../../Redux/Slices/profileSlice";
import AddressCard from "./AddressCard";
import { HomeLayout } from "../../../Layouts/HomeLayout";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { LuRectangleHorizontal } from "react-icons/lu";
import toast from "react-hot-toast";
function Placement() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  console.log("This is productId:", productId);
  const [state, setState] = useState({
    title: "",
    thumbnail: "",
    price: "",
  });
  const productDetails = async (e) => {
    const res = await dispatch(getProduct({ productId: productId }));

    console.log(res);
    const allStuff = res.payload.data.product;

    setState({
      ...state,
      title: allStuff.title,
      price: allStuff.price,
      thumbnail: allStuff.thumbnail,
    });
  };
  useEffect(() => {
    productDetails();
  }, []);

  const [quantity, setQuantity] = useState(1);
  const [key,setKey]=useState("")
  const [amount,setAmount]=useState("")
  const [orderId,setOrderId]=useState("")
  const [address,setAddress]=useState([]);

  
  async function showAddresses(e)
  {
  
      const res = await dispatch(getAllAddress());
      console.log(res?.payload?.data?.addresses.addressList);
      if((res?.payload?.data?.addresses.addressList).length===0)
      {
          navigate("/user/add-address")
      }
      else{
      setAddress(res.payload.data.addresses.addressList);
  
      }
  }
  useEffect(()=>{showAddresses()},[dispatch])

  const [addressId,setAddressId]=useState("");

  console.log("This is quantity:",quantity)
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleSelect = (index) => {
    setAddressId(index);
    console.log(addressId)
  };


  function quantityHandler(e) {
    e.preventDefault();
    setQuantity(e.target.value);
    console.log(e.target.value);
  }

  const sendData = async (e) => {
    e.preventDefault();
    const res = await dispatch(
      payment({ productId, quantity,addressId:addressId }));

      if(res.payload.statusCode===200)
        {
          setAddressId("");
          setQuantity("")
        }

 
    setAmount(res.payload.data.paymentResponse.amount_due);
    setOrderId(res.payload.data.paymentResponse.id);

    console.log(res.payload.data.paymentResponse.amount_due);

    // Load the Razorpay script and open the payment modal
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      const options = {
        key: res.payload.data.razorpayKeyId,
        amount: res.payload.data.paymentResponse.amount_due,
        currency: "INR",
        name: "Apni Dukan By Family",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: res.payload.data.paymentResponse.id,
        callback_url: "http://localhost:8003/api/v1/payment/verify",
        prefill: {
          name: "", // your customer's name
          email: "gaurav.kumar@example.com",
          contact: "9000090000", // Provide the customer's phone number
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    };

    document.body.appendChild(script);
  };


// **************payment gateway**********************

  return (
    <HomeLayout><form onSubmit={sendData} className=" flex justify-center">
      <div  className="flex flex-col mt-5 mb-2  mr-4 p-5 w-[800px] gap-10 min-h-[100vh] border-2 ">
      
      <div className=" bg-[#45b06a]  shadow-xl collapse mt-2 border border-black">
  <input type="checkbox" className="peer" />
  <div
    className="collapse-title text-primary-content ">
     DELIVERY ADDRESS
  </div>
  <div
    className="collapse-content bg-white  text-primary-content">
    <div className="flex flex-col gap-2">
        {
          address.map((e,idx)=>
          {
            return (<div className="flex flex-row gap-3 ">
              <input type="radio"
              name="addressId"
              className="  radio-warning"
              value={e._id}
              checked={addressId===e._id}
              onChange={(e)=>{setAddressId(e.target.value);
                
                console.log("This is Address Id",addressId)
              }}
              
              ></input>
             <AddressCard state={e} idx={idx+1}></AddressCard>
            </div>)
          })
        }
      </div>
  </div>
</div>

<div className=" bg-[#45b06a]  shadow-xl collapse mt-2 border border-black">
<input type="checkbox" className="peer" />
  <div
    className="collapse-title text-primary-content ">
     ORDER SUMMARY
  </div>
  <div
    className="collapse-content bg-white  text-primary-content">

<div className="flex flex-row w-full h-[50vh] gap-10 mt-3  bg-white text-xl  border border-black">
        <div className=" border flex flex-col gap-4 p-5">
          <img
            className="h-[35vh] w-[300px]"
            alt="thumbnail"
            src={state.thumbnail}
          ></img>

          <div className="flex flex-row gap-4 items-center ">
            <div className=" ">
            <CiCircleMinus 
            onClick={(e)=>{setQuantity(quantity-1)}}
            className="text-3xl  cursor-pointer"></CiCircleMinus>
            </div>
            <div className=" w-11 h-6 border border-black text-center">
              <p className=" text-center align-middle">{quantity}</p>
            </div>

            <div className="">
              
              <CiCirclePlus
              onClick={()=>setQuantity(quantity+1)}
               className="text-3xl cursor-pointer"></CiCirclePlus>
            </div>
          </div>
        </div>
        <div className=" flex flex-col p-5 gap-6">
          <div className=" font-serif text-pretty ">{state.title}</div>

          <div className=" font-serif ">{"Price: RS "}{state.price}</div>
          
          
        </div>
      </div>
  </div>

</div>
<button className="btn ">Place Order</button>
</div>

    </form>
    </HomeLayout>
  );
}
export default Placement;
