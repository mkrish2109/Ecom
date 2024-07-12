import { Button } from "flowbite-react";
import React from "react";
import { HiMinus, HiPlus, HiTrash } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/slices/cartSlice";

function CartItem({ cartItem }) {
  const dispatch = useDispatch();

  function handleRemove() {
    dispatch(removeFromCart(cartItem.id));
  }

  return (
    <div className="flex items-center gap-2 border-b border-cyan-200 pb-2">
      <div className="h-[48px] w-[48px] overflow-hidden rounded-sm">
        <img src={cartItem.img} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="grow-[1]">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center justify-between grow-[1]">
            <h5>{cartItem.name}</h5>
            <p>${cartItem.price}</p>
          </div>
          <div>
            <Button pill size="xs" color="failure" onClick={handleRemove}>
              <HiTrash />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button pill size="xs">
            <HiMinus />
          </Button>
          <p>{cartItem.qty}</p>
          <Button pill size="xs">
            <HiPlus />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
