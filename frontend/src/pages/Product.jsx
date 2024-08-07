import React, { useEffect, useState } from "react";
import FlowBreadCrumb from "../components/comman/FlowBreadCrumb";
import ProductCard from "../components/product/ProductCard";
import ProductFilter from "../components/product/filter/ProductFilter";
import Filter from "../components/product/Filter";
import { Select } from "flowbite-react";
import { getAllProducts } from "../services/apiServices";
import { useParams } from "react-router-dom";

function Product() {
  const [products, setProducts] = useState(null);
  const { gender, category } = useParams();
  console.log("category", category);
  useEffect(() => {
    getAllProducts({ gender, category }).then((data) => {
      setProducts(data.data);
    });
  }, []);
  console.log(products);
  if (!products) return null;
  return (
    <div>
      <div className="p-8">
        <FlowBreadCrumb />
      </div>

      <div className="grid grid-cols-[294px_minmax(294px,_1fr)] ">
        <div>
          <h2 className="px-8 uppercase font-[700] tracking-wider text-base">
            Filter
          </h2>
        </div>
        <div className="flex justify-between items-center  px-2 pb-4"></div>
      </div>
      <div className="grid grid-cols-[294px_minmax(294px,_1fr)] ">
        <div>
          <Filter />
        </div>

        <div className="grid grid-cols-4 gap-3 md:grid-cols-4 sm:grid-cols-2  px-2 ">
          {products.map((product) => {
            return <ProductCard key={product._id} product={product} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Product;
