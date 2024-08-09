import { Button } from "flowbite-react";
import React from "react";
import { HiTrash } from "react-icons/hi";
import { deleteWhishList } from "../../services/apiServices";

function WishlistItem({ list, handleDelete }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-[48px] w-[48px] overflow-hidden rounded-full">
        <img
          src={list.images[0]}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div className="grow-[1]">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center justify-between grow-[1]">
            <h5>{list.name}</h5>
            <p>₹ {list.price}</p>
          </div>
          <div>
            <Button
              pill
              size="xs"
              color="failure"
              onClick={() => {
                handleDelete(list._id);
              }}>
              <HiTrash />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WishlistItem;
