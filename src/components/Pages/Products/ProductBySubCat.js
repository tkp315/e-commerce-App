import Card from "../../Card";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom"
import { productsFromSubCategory } from "../../../Redux/Slices/categorySlice";
import { useEffect, useState } from "react";
import { HomeLayout } from "../../../Layouts/HomeLayout";
function ProductBySubCat()
{
    const {subCatName}= useParams()
    const navigate = useParams();
    const dispatch = useDispatch();
    const [products,setProducts]=useState([])
    async function sendData()
    {
        
        const res = await dispatch(productsFromSubCategory({subCatName:subCatName}))
        setProducts(res.payload.data.subCategory.product);
        console.log(res.payload.data.subCategory.product);
    }

    useEffect(()=>{sendData()},[dispatch])
    console.log(products)
   
return(
    <HomeLayout>
        <div className=" flex flex-row flex-wrap min-h-[100vh] bg-[#45b06a] justify-center w-full gap-8">

{
    products.map((card)=>{
        return <div>
            <Card data={card}></Card>
        </div>
    })
}
</div>
    </HomeLayout>
)
}
export default ProductBySubCat