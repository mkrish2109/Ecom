import { Button } from "flowbite-react";
import React from "react";
import { HiMinus, HiPlus, HiTrash } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQty,
  increaseQty,
  removeFromCart,
  removeFromCartAsync,
  updateCartItemAsync,
} from "../../redux/slices/cartSlice";
import {  getUserCart } from "../../services/apiServices";

function CartItem({ cartItem }) {
  const dispatch = useDispatch();
  

  function handleRemove() {
    // dispatch(removeFromCart(cartItem._id));
    dispatch(removeFromCartAsync(cartItem._id));
  }

  function handleIncreaseQty() {
    // dispatch(increaseQty(cartItem._id));
    console.log("cartItem", cartItem._id);
    dispatch(updateCartItemAsync({ productId: cartItem._id, qty: cartItem.qty + 1 }));

  }

  function handleDecreaseQty() {
    // dispatch(decreaseQty(cartItem._id));
    console.log("cartItem", cartItem);
    dispatch(updateCartItemAsync({ productId: cartItem._id, qty: cartItem.qty - 1 }));

  }

  const { subTotal } = useSelector((store) => {
    return store.cart;
  });
  const taxAmount = (cartItem.price * cartItem.taxRate) / 100;
  const CartSubTotal = cartItem.price + taxAmount;
  return (
    <div className="flex items-center gap-2 border-b border-cyan-200 pb-2">
      <div className="h-[48px] w-[48px] overflow-hidden rounded-sm">
        <img
          src={cartItem.images[0]}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div className="grow-[1]">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center justify-between grow-[1]">
            <h5>{cartItem.name}</h5>
            <p>${CartSubTotal + subTotal}</p>
          </div>
          <div>
            <Button pill size="xs" color="failure" onClick={handleRemove}>
              <HiTrash />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleDecreaseQty} color="primary" pill size="xs">
            <HiMinus />
          </Button>
          <p>{cartItem.qty}</p>
          <Button onClick={handleIncreaseQty} color="primary" pill size="xs">
            <HiPlus />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
