import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom";
import { removeFromCart } from "../Redux/Slices/productSlice";

function CartCard({data,isButton,orderId,trackId})
{
const navigate = useNavigate();
const {state} = useLocation();
const dispatch = useDispatch();
async function remove(){
    const res = await dispatch(removeFromCart({productId:data.productId}))
    console.log(res)
    if(res.payload.statusCode===200)
    {
        navigate("/user/cart")
    }
}

async function track()
{
 navigate(`/order/tracking/${orderId}/${trackId}`)
}
    
return(



<div className="flex flex-row w-[600px] h-[30vh] mt-1 mb-1 bg-white items-center border border-black gap-28">

<div className="w-[100px]  ">
 <img   className="" alt="thumbnail" src={data.thumbnail}>
 </img>
</div>
<div className=" flex flex-col gap-2 ">
<div className="font-serif text-xl">
{
    data.title
}
</div>

<div className=" font-semibold">
{
    data.price
}{" Rs"}
</div>

<div className="flex flex-row gap-2">


    <button className="btn bg-[#45b06a]" onClick={isButton?remove:track}>{isButton?"Remove":"Track Order"}</button>


</div>
</div>


</div>


)
}
export default CartCard