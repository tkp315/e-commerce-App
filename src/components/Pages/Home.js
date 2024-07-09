import { HomeLayout } from "../../Layouts/HomeLayout";
import SubCategoryCard from "./Products/SubCategoryCard";
import { cleaning, snacks } from "../../Helpers/dataForDisplaying";

import { useNavigate } from "react-router-dom";
function Home() {
  let index = Math.floor(Math.random() * 10);
  const navigate = useNavigate();

  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex flex-col gap-3 mt-2 mb-2 ">
        <div className=" border border-[#45b06a] p-1">
          <h1 className="text-lg font-bold">Popular in Snacks</h1>
          <div className="w-full h-[55vh] flex flex-row items-center overflow-x-auto overflow-y-hidden">
            {snacks.map((e) => {
              return (
                <div
                  onClick={() =>
                    navigate(`subcategory-products/${e.name.toLowerCase()}`)
                  }
                  key={index}
                >
                  <SubCategoryCard
                    name={e.name}
                    description={e.des}
                    thumbnail={e.photo}
                    price={e.price}
                    size="60"
                    cardHeight="48vh"
                    imageHeight="28"
                  ></SubCategoryCard>
                </div>
              );
            })}
          </div>
        </div>

        <div className=" border border-[#45b06a] p-2">
          <h1 className="text-lg font-bold">Cleaning & Household</h1>
          <div className="w-full h-[32vh] flex flex-row items-center overflow-x-auto overflow-y-hidden justify-center">
            {cleaning.map((e) => {
              return (
                <div key={index} className="">
                  <SubCategoryCard
                    name={e.name}
                    thumbnail={e.photo}
                    size="60"
                    cardHeight="30vh"
                    imageHeight="28"
                  ></SubCategoryCard>
                </div>
              );
            })}
          </div>
        </div>

        <div className=" border border-[#45b06a] p-1">
          <h1 className="text-lg font-bold">Best Sellers</h1>
          <div className="w-full h-[55vh] flex flex-row items-center overflow-x-auto overflow-y-hidden">
            {snacks.map((e) => {
              return (
                <div key={index}>
                  <SubCategoryCard
                    name={e.name}
                    description={e.des}
                    thumbnail={e.photo}
                    price={e.price}
                    size="60"
                    cardHeight="48vh"
                    imageHeight="28"
                  ></SubCategoryCard>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
export default Home;
