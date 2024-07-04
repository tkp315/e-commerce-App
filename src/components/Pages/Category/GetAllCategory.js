import { useDispatch,useSelector} from "react-redux"
import { allCategory } from "../../../Redux/Slices/categorySlice";
import { useEffect } from "react";

function GetAllCategory()
{
    const dispatch = useDispatch();
  
    async function cat()
  {
    const res=  await dispatch(allCategory());
    console.log(res)
  }
   
  useEffect(()=>
{
    cat()
},[])
  
    // if (categories.length===0) {
    //   return <div>Loading...</div>;
    // }

    // const data = useSelector((state)=>state.categories)
    // console.log(data)
return(
    <>
      <div>
      <h1>Categories</h1>
      <button className="btn btn-primary" onClick={cat}>Get All Category</button>
    </div>
    </>
)
}
export default GetAllCategory