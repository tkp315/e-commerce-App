import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { newProduct } from "../../../Redux/Slices/productSlice";
import { HomeLayout } from "../../../Layouts/HomeLayout";
import { allCategory, allSubCategories } from "../../../Redux/Slices/categorySlice";

function ProductCreation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dataOfCategory = useSelector((state) => state.categories).categories;

  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const [specifications, setSpecifications] = useState([]);
  const [currentSpecification, setCurrentSpecification] = useState("");
  const [catId,setCat]=useState("");
  const [subCat,setSubCat]=useState([]);


  function handleTagInputChange(e) {
    setCurrentTag(e.target.value);
  }
  function handleSpecificationInputChange(e)
  {
    setCurrentSpecification(e.target.value)
  }
  function handleAddTag(e) {
    e.preventDefault();
    if (currentTag.trim()) {
      setTags((prevTags) => [...prevTags, currentTag.trim()]);
      setCurrentTag(""); // Clear the input field after adding the tag
    }
  }

  function handleAddSpecifications(e) {
    e.preventDefault();
    if (currentSpecification.trim()) {
      setSpecifications((prevspec) => [...prevspec, currentSpecification.trim()]);
      setCurrentSpecification(""); // Clear the input field after adding the tag
    }
  }

  async function fetchCategories() {
    await dispatch(allCategory());
  }
  useEffect(() => {
    fetchCategories();
  }, [dispatch]);

  const [data, setData] = useState({
    title: "",
    price: "",
    description: "",
    catId: "",
    subCatId:"",
    productImages: [],
    company:"",
    thumbnail: null,
  });

  function handleImageUpload(e) {
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      setData((prevData) => ({ ...prevData, thumbnail: uploadedImage }));
    }
  }

  function handleUserInput(e) {
    const { name, value } = e.target;
    
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    console.log(`${name}:${value}`)
  
  }
  function setcategoryId(e)
  {
    console.log(e.target.value)
    setCat(e.target.value);
    console.log("This is cat:", catId)
     setData({...data,catId:e.target.value})
  }
  async function subcategory(e)
  {
    
    const res = await dispatch(allSubCategories({catId:catId}));
    console.log(res.payload.data.subCategoryDetails);
    setSubCat(res.payload.data.subCategoryDetails)
  }
  
  useEffect(() => {
    if (catId) {
      subcategory(catId);
    }
  }, [catId, dispatch]);

  const handleProductImages = (e) => {
    const files = Array.from(e.target.files);
    setData((prevData) => ({
      ...prevData,
      productImages: files,
    }));

  };

  async function submitResponse(e) {
    e.preventDefault();

    if (!data.catId || !data.description || !data.price || !data.productImages.length || !specifications.length || !tags.length || !data.thumbnail || !data.title) {
      toast.error("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("catId", data.catId);
    formData.append("subCatId", data.subCatId);

    formData.append("specifications",JSON.stringify(specifications));
    formData.append("tags", JSON.stringify(tags)); // Append tags as a JSON string

    if (data.thumbnail) {
      formData.append("thumbnail", data.thumbnail);
    }

    for (const file of data.productImages) {
      formData.append("productImages", file);
    }

    const res = await dispatch(newProduct(formData));
    console.log(res);

    if (res.payload.status===200) {
      navigate("/all-products");
      
       // Redirect to a specific page if needed
       
    }
  }

  return (
    <div>
      <HomeLayout>
        <div className="flex justify-center items-center bg-[#45b06a]">
          <form
            noValidate="true"
            onSubmit={submitResponse}
            className="flex flex-col w-[600px] min-h-[90vh] bg-white shadow-lg shadow-cyan-500/50 p-10 gap-5 mt-10 mb-10"
          >
            <div className="text-3xl text-left font-semibold ">New Product</div>
            <div className="border border-[#45b06a]"></div>

         
              <div className="flex flex-col gap-1">
                <label htmlFor="title" className=" font-serif">Title</label>
                <input
                  id="title"
                  type="text"
                  
                  name="title"
                  value={data.title}
                  onChange={handleUserInput}
                  className="p-3 border border-[#45b06a]  outline-none "
                />
              </div>
              <div className=" pricetag flex flex-col gap-1">
                <label htmlFor="price" className=" font-serif">Price</label>
                <input
                  id="price"
                  type="number"
                  // placeholder="Price"
                  name="price"
                  value={data.price}
                  onChange={handleUserInput}
                  
                  className="p-3 border border-[#45b06a]  outline-none  appearance-none"

                />
              </div>
            
              <div className="flex flex-col gap-1">
                <label htmlFor="company" className=" font-serif">Brand</label>
                <input
                  id="company"
                  type="text"
                  
                  name="company"
                  value={data.company}
                  onChange={handleUserInput}
                  className="p-3 border border-[#45b06a]  outline-none "
                />
              </div>
            
              <div className="flex flex-col gap-1">
                <label htmlFor="description" className=" font-serif">Description</label>
                <textarea
                  id="description"
                  type="text"
                  // placeholder="Description"
                  name="description"
                  value={data.description}
                  onChange={handleUserInput}
                  
                  className="p-3 border border-[#45b06a]  outline-none resize-none"
                />
              </div>

             <div className="flex flex-col gap-2 ">
              <label className="font-serif">Category</label>
              <select
                id="category"
                onChange={setcategoryId}
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

             <div className="flex flex-col gap-2 ">
             <label className="font-serif">Sub-Category</label>
              <select
                id="subcategory"
                onChange={handleUserInput}
                name="subCatId"
                // className="select select-bordered w-full max-w-xs"
                  className="p-3 select  border border-[#45b06a]  outline-none  font-serif  "
              >
                <option disabled selected>
                  Sub-Category
                </option>

                {subCat.map((e) => (
                  <option key={e._id} value={e._id}>
                    {e.name}
                  </option>
                ))}
              </select>
             </div>
          
            <div className="flex flex-col gap-1 ">
              <div className=" flex flex-col gap-1">
              <label className=" font-serif">Specifications</label>
              
              </div>
              <div className="flex flex-row gap-3">
              <input
                type="text"
                placeholder="Click button to add more specifications"
                value={currentSpecification}
                onChange={handleSpecificationInputChange}
                 className="p-3 w-full border border-[#45b06a]  outline-none "
                name="specifications"
              />

<button onClick={handleAddSpecifications} className="btn font-serif">
                Add
              </button>
              </div>
              
            </div>

            <div className="flex flex-col gap-1 ">
              <div className=" flex flex-col gap-1">
              <label className=" font-serif">Tags</label>
              
              </div>
              <div className="flex flex-row gap-3">
              <input
                type="text"
                placeholder="Click button to add more Tags"
                value={currentTag}
                onChange={handleTagInputChange}
                 className="p-3 w-full border border-[#45b06a]  outline-none "
                name="tags"
              />

<button onClick={handleAddTag} className="btn font-serif">
                Add
              </button>
              </div>
              
            </div>            










            <div className="flex flex-col gap-1">
              <label className=" font-serif">Thumbnail</label>
              <div>
                <input className="file-input file-input-bordered file-input-success w-full max-w-xs" type="file" name="thumbnail" onChange={handleImageUpload} />
              </div>
            </div>
 
 {/* Tags */}
            {/* <div className="flex flex-row gap-4">
              <label>Tags</label>
              <input
                type="text"
                placeholder="Enter tag"
                value={currentTag}
                onChange={handleTagInputChange}
                name="tags"
              />
              <button onClick={handleAddTag} className="btn">
                Add
              </button>
            </div> */}

            <div className="flex flex-col gap-1 ">
              <label className=" font-serif">Product Images</label>
              <input   className="file-input file-input-bordered file-input-success w-full max-w-xs" type="file" onChange={handleProductImages} name="productImages" multiple />
            </div>

            <button className="btn bg-[#45b06a] hover:bg-[#12dc59]">List Product</button>
          </form>
        </div>
      </HomeLayout>
    </div>
  );
}

export default ProductCreation;
