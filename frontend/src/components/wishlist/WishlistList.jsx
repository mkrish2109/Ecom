import React, { useEffect, useState } from "react";
import WishlistItem from "./WishlistItem";
import { deleteWhishList, getAllWhishList } from "../../services/apiServices";

function WishlistList() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    getAllWhishList().then((data) => {
      setWishlist(data.data);
    });
  }, []);

  async function handleRemoveWhishList(id) {
    const data = await deleteWhishList(id);
    setWishlist(data);
  }

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-center mb-8">Wishlist</h2>
      <div className="flex flex-col gap-4">
        {wishlist?.map((value) => {
          return (
            <WishlistItem list={value} handleDelete={handleRemoveWhishList} />
          );
        })}
      </div>
    </div>
  );
}

export default WishlistList;
