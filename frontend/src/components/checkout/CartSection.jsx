import React from "react";
import { useSelector } from "react-redux";
import CartItem from "../cart/CartItem";

function CartSection() {
  const { cart, total } = useSelector((store) => {
    return store.cart;
  });
  return (
    <div>
      {cart.map((cartItem, index) => {
        return <CartItem key={index} cartItem={cartItem} />;
      })}
    </div>
  );
}

export default CartSection;
