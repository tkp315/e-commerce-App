import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllProducts } from "../../../Redux/Slices/productSlice";
import Card from "../../Card";
import { HomeLayout } from "../../../Layouts/HomeLayout";

function ProductList()
{
    const dispatch = useDispatch()
    const prductData=useSelector((state)=>state.product.productData);

    console.log(prductData)

    async function loadProducts()
    {
        const products= await dispatch(getAllProducts());
    }

    useEffect(()=>{
     loadProducts();
    },[])

return(
<HomeLayout>
<div className="flex flex-row">

<div className=" flex flex-row flex-wrap min-h-[100vh] justify-center w-full gap-8 bg-[#45b06a] ">
{
    prductData.map((e)=>
    {
       return  <Card data={e} key={e._id}></Card>
    })
}
</div>
</div>
</HomeLayout>
)
}
export default ProductList