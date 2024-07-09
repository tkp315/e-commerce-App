import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createCategory } from "../../../Redux/Slices/categorySlice";
import { HomeLayout } from "../../../Layouts/HomeLayout";

function AddCategory() {
  const [catName, setCatName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function createCat(e) {
    e.preventDefault();
    const res = await dispatch(
      createCategory({ catName: catName, description: description })
    );
    if (res?.payload?.statusCode === 200) {
      navigate("/");
    }
  }

  return (
    <HomeLayout>
      <div className="flex justify-center items-center">
        <form
          onSubmit={createCat}
          className="flex flex-col w-[400px] h-[80vh] bg-yellow-200 shadow-lg shadow-cyan-500/50 p-10 gap-5 mt-10 mb-10"
        >
          <div className="text-center text-2xl font-semibold">Add Category</div>
          <div className="flex flex-col gap-1">
            <label htmlFor="categoryName">Category Name</label>
            <input
              id="categoryName"
              type="text"
              placeholder="Enter categoryName"
              name="catName"
              onChange={(e) => {
                setCatName(e.target.value);
              }}
              className="input input-bordered"
            ></input>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="description">description</label>
            <input
              id="description"
              type="text"
              placeholder="Enter Description"
              name="description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              className="input input-bordered"
            ></input>
          </div>

          <button type="submit" className="btn btn-secondary">
            Create Category
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}
export default AddCategory;
