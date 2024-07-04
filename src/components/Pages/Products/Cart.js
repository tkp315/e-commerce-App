import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { viewCart } from "../../../Redux/Slices/productSlice";
import CartCard from "../../../Helpers/CartCard";
import { HomeLayout } from "../../../Layouts/HomeLayout";

function Cart() {
  // const {state} = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const totalCartItems= useSelector((state)=>state.product.totalCartItems)
    const totalCartPrice = useSelector((state)=>state.product.totalCartPrice);

  async function sendData() {
    const res = await dispatch(viewCart());
    console.log(res.payload.data.cartItems);
    setCartItems([...res.payload.data.cartItems]);
  }

  useEffect(() => {
    sendData();
  }, []);

  console.log(cartItems);

  return (
    <HomeLayout>
        <div className="flex flex-row gap-32">
      <div className="flex flex-col min-h-[100vh]">
        {cartItems.map((e) => {
          return <CartCard data={e} isButton="true"></CartCard>;
        })}
      </div>
     <div className="w-60  h-36 border-1 border-black mt-4 bg-white shadow-xl flex flex-col gap-10 p-6 ">
        <div className="font-semibold">
            Total Items: {totalCartItems}
        </div>

        <div className="font-semibold">
            Total Price: {totalCartPrice} {" RS"}
        </div>
     </div>
      </div>
    </HomeLayout>
  );
}
export default Cart;
