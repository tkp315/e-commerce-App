import { useDispatch } from "react-redux";
import { allCategory } from "../../../Redux/Slices/categorySlice";
import { useEffect } from "react";

function GetAllCategory() {
  const dispatch = useDispatch();

  async function cat() {
    await dispatch(allCategory());
  }

  useEffect(() => {
    cat();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  // if (categories.length===0) {
  //   return <div>Loading...</div>;
  // }

  // const data = useSelector((state)=>state.categories)
  // console.log(data)
  return <></>;
}
export default GetAllCategory;
