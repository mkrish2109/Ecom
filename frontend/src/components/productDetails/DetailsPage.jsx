import { Button, Select } from "flowbite-react";
import React, { useState } from "react";
import { HiStar } from "react-icons/hi";
import { addToCart } from "../../redux/slices/cartSlice";
import { useDispatch } from "react-redux";

function DetailsPage({ product }) {
  const dispatch = useDispatch();
  function handleAddToCart(e) {
    e.stopPropagation();
    dispatch(addToCart({ ...product, qty: 1 }));
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">{product.name}</h2>
        <p className="text-xl text-slate-500">{product.desc}</p>
        <div className="flex">
          <div className="flex items-center p-1 border">
            <p>{product.rating}</p>
            <HiStar className="text-amber-600" />
          </div>
          <div className="p-1 border">
            <p>800 Ratings</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <p className="text-xl font-bold flex gap-3">
            <span className="font-normal text-slate-500">MRP</span>
            <span>₹{product.price}</span>
          </p>
          <p className="text-green-700">inc of all taxes</p>
        </div>
        <div>
          <p className="mb-2 font-bold uppercase">Select Size</p>
          <div className="flex gap-2">
            {/* {product.sizes.map((value, index) => {
              return (
                <Button
                  key={index}
                  className="w-8 h-8 rounded-full items-center ">
                  {value}
                </Button>
              );
            })} */}
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <Button pill onClick={handleAddToCart}>
          Add to Cart
        </Button>
        <Button pill>Wish List</Button>
      </div>
    </div>
  );
}

export default DetailsPage;
