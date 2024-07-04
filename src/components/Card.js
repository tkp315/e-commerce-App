import { useNavigate } from "react-router-dom"
import { FaStar } from "react-icons/fa";
function Card({data})
{

  // thumbnail title rating review price
    const navigate = useNavigate();
return(<div onClick={()=>navigate(`/details/${data._id}`)}>
    <div className="card w-60  bg-white shadow-xl h-[70vh]  flex flex-col  cursor-pointer overflow-hidden p-5 mt-1 mb-1 ">
  <figure className=""><img 
  className="w-full h-96    scale-50"
  src={data.thumbnail} alt="Shoes" />
  </figure>

  <div className="">
    <h2 className="card-title">{data.title}</h2>
    
    {/* <p>{data.description}</p> */}

    <div className=" flex flex-row gap-2 items-center">
        <div className="text-white bg-[#45b06a] px-3 flex flex-row items-center gap-1 rounded-full">4.4 {" "} <FaStar className=" inline"></FaStar></div>
    

        <div className="">{`(${123})`}</div>

    </div>
    <div className="card-actions justify-start mt-3">
      <button className=" font-bold text-lg">{data.price} {" "}Rs</button>
    </div>
 
</div>



</div>

</div>)
}

export default Card