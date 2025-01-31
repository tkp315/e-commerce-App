import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HomeLayout } from "../../../Layouts/HomeLayout";
import { Link } from "react-router-dom";
import { PiCurrencyInr } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { cartAdd, getProduct } from "../../../Redux/Slices/productSlice";
import { useParams } from "react-router-dom";

function ProductDetails() {
  const { productId } = useParams();
  const [state, setState] = useState({
    title: "",
    tags: [],
    price: "",
    description: "",
    productImages: [],
    specifications: [],
  });

  const [categary, setCategory] = useState({ cat: "" });

  const [sellerDetails, setSellerDetails] = useState({
    firstName: "",
    lastName: "",
    contact: "",
  });

  // const [rating, setRating] = useState("");
  // const [reviews, setReviews] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productDetails = async (e) => {
    const res = await dispatch(getProduct({ productId: productId }));
    const allStuff = res.payload.data.product;
    const seller = res.payload.data.sellerDetails;

    setState({
      ...state,
      title: allStuff.title,
      price: allStuff.price,
      description: allStuff.description,
      specifications: allStuff.specifications,
      productImages: allStuff.productImages,
      tags: allStuff.tags,
    });

    setSellerDetails({
      firstName: seller.firstName,
      lastName: seller.lastName,
      contact: seller.phone_No,
    });
  };
  useEffect(() => {
    productDetails();
  }, []);

  async function addToCart() {
    const res = await dispatch(cartAdd({ productId: productId }));
    if (res.payload.statusCode === 200) {
      navigate("/user/cart");
    }
  }
  return (
    <HomeLayout>
      <div className="flex flex-col border border-black m-10 p-3 gap-5">
        <div className="flex flex-row gap-4 h-[70vh] mt-5  justify-center">
          <div className="flex flex-col  ">
            <div className="w-96 carousel h-[50vh] rounded-box mt-5 ">
              {state?.productImages.map((e) => {
                return (
                  <div
                    id=""
                    className="carousel-item w-full border border-[#45b06a]"
                  >
                    <img
                      src={e}
                      className="w-60 justify-center"
                      alt="Tailwind CSS Carousel component"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col w-96  gap-5  p-4 text-center">
            <div className="text-2xl font-semibold">{state.title}</div>

            <span className="flex flex-row items-center justify-center font-semibold text-xl text-center">
              <PiCurrencyInr></PiCurrencyInr>
              {state.price}
            </span>

            <div>
              <div className="flex flex-row gap-2 justify-center mt-7">
                <button
                  onClick={addToCart}
                  className="btn  bg-[#45b06a] text-lg"
                >
                  Add To Cart
                </button>

                <Link to={`/user/order/${productId}`}>
                  <button className="btn btn-primary text-xl">Buy Now</button>
                </Link>
              </div>
            </div>

            <div></div>
          </div>
        </div>

        <div className="bg-base-200 collapse border collapse-plus border-black  w-full">
          <input type="checkbox" className="peer " />
          <div className="collapse-title  text-primary-content  ">
            About Product
          </div>
          <div className="collapse-content  text-primary-content ">
            <p>{state.description}</p>
          </div>
        </div>

        <div className="bg-base-200 collapse collapse-plus border border-black  w-full  ">
          <input type="checkbox" className="peer " />
          <div className="collapse-title  text-primary-content  ">
            Specification
          </div>
          <div className="collapse-content  text-primary-content ">
            {state?.specifications.map((points) => {
              return (
                <ul>
                  <li className=" m-2 "> {points} </li>
                </ul>
              );
            })}
          </div>
        </div>

        <div className="bg-base-200 collapse border collapse-plus border-black  w-full">
          <input type="checkbox" className="peer " />
          <div className="collapse-title  text-primary-content  ">Seller</div>
          <div className="collapse-content  text-primary-content ">
            <div className=" text-wrap flex flex-col">
              <p>{`First Name: ${sellerDetails.firstName}`}</p>
              <p>{`Last Name: ${sellerDetails.lastName}`}</p>
              <p>{`Contact Details: ${sellerDetails.contact}`}</p>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
export default ProductDetails;
