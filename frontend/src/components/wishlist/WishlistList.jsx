import React from "react";
import WishlistItem from "./WishlistItem";

function WishlistList() {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-center mb-8">Wishlist</h2>
      <div className="flex flex-col gap-4">
        <WishlistItem />
        <WishlistItem />
        <WishlistItem />
        <WishlistItem />
      </div>
    </div>
  );
}

export default WishlistList;
