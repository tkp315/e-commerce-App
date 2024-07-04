import { useDispatch, useSelector } from "react-redux";
import { allCategory, createSubCategories } from "../../../Redux/Slices/categorySlice";
import { useState ,useEffect} from "react";


function AddSubCategory()
{
    const dataOfCategory = useSelector((state) => state.categories).categories;
    const dispatch = useDispatch();
    const [data,setData]=useState(
        {
            catId:"", 
            nameOfsubCat:""
        }
    )
async function subcategoryHandler(e)
{
    e.preventDefault();
    const res =await dispatch(createSubCategories({catId:data.catId,nameOfsubCat:data.nameOfsubCat}));
    console.log(res);
}

async function fetchCategories() {
    await dispatch(allCategory());
  }
  useEffect(() => {
    fetchCategories();
  }, [dispatch]);


function subcatData(e)
{
 const {name,value}= e.target;
 setData({...data,
    [name]:value
 })
 console.log(`${name}:${value}`)
}


return(
    <div className="flex justify-center items-center bg-[#45b06a] h-[100vh]">
            <form onSubmit={subcategoryHandler}  className="flex flex-col w-[400px] h-[70vh] bg-white shadow-lg shadow-cyan-500/50 p-10 gap-5 mt-10 mb-10">
            <div className="text-left text-2xl font-semibold">Create Sub-Category</div>
            <div className="border border-[#45b06a]"></div>
                
            <div className="flex flex-col gap-2 ">
              <label className="font-serif">Category</label>
              <select
                id="category"
                onChange={subcatData}
                name="catId"
              className="p-3 select  border border-[#45b06a]  outline-none  font-serif  "
              >
                <option disabled selected>
                  Category
                </option >

                {dataOfCategory.map((e) => (
                  <option key={e._id} value={e._id} className=" text-md bg-[#45b06a]">
                    {e.catName}
                  </option>
                ))}
              </select>

             </div>


             <div className="flex flex-col gap-1">
                    <label htmlFor="subcat" className="font-serif">SubCategory</label>
                    <input
                        id="subcat"
                        type="text"
                        // placeholder="Enter email"
                        name="nameOfsubCat"
                        onChange={subcatData}
                 className="p-3 border border-[#45b06a]  outline-none "
                    ></input>
                </div>




                <button type="submit" className="btn btn-secondary">Create</button>
            </form>
        </div>
)
}
export default AddSubCategory