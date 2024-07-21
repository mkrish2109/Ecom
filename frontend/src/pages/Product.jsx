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
        <h3 className="pt-3  font-bold tracking-wider text-lg	">
          Mens T-Shirts
        </h3>
      </div>

      <div className="grid grid-cols-[294px_minmax(294px,_1fr)] ">
        <div>
          <h2 className="px-8 uppercase font-[700] tracking-wider text-base">
            Filter
          </h2>
        </div>
        <div className="flex justify-between items-center  px-2 pb-4">
          <div className="flex gap-4">
            <p>Bundles</p>
            <p>Country of Origin</p>
            <p>Size</p>
          </div>
          <div>
            <Select>
              <option className="capitalize" value="recommended">
                Recommended
              </option>
              <option className="capitalize" value="What's New?">
                What's New?
              </option>
              <option className="capitalize" value="popularity">
                popularity
              </option>
              <option className="capitalize" value="price high to low">
                price: high to low
              </option>
              <option className="capitalize" value="price low to high">
                price: low to high
              </option>
            </Select>
          </div>
        </div>
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
