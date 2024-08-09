import { Button, Select } from "flowbite-react";
import React, { useState } from "react";
import { HiStar } from "react-icons/hi";
import { addToCart } from "../../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import { addWhishList, deleteWhishList } from "../../services/apiServices";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";

function DetailsPage({ product }) {
  const dispatch = useDispatch();
  function handleAddToCart(e) {
    e.stopPropagation();
    dispatch(addToCart({ ...product, qty: 1 }));
  }
  const [whishListAdded, setWhishListAdded] = useState(false);

  console.log("product", product);
  async function handleWhishList() {
    // Add to wishlist functionality
    if (whishListAdded === true) {
      await addWhishList(product._id);
      setWhishListAdded(false);
    } else {
      await deleteWhishList(product._id);
      setWhishListAdded(true);
    }
  }

  return (
    <div className="flex flex-col gap-8 ">
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
            {product.sizes.map((value, index) => {
              return (
                <Button
                  color="primary"
                  key={index}
                  className="w-10 h-8 rounded-full items-center uppercase px-6  ">
                  {value}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <Button onClick={handleWhishList} pill>
          {whishListAdded ? (
            <FaRegHeart fontSize="1.25rem" />
          ) : (
            <FaHeart fontSize="1.25rem" color="red" />
          )}
        </Button>
        <Button pill onClick={handleAddToCart}>
          <IoMdCart fontSize="1.25rem" />
        </Button>
      </div>
    </div>
  );
}

export default DetailsPage;
