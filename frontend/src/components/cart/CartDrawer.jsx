import { Drawer } from "flowbite-react";
import React from "react";
import { HiShoppingCart } from "react-icons/hi";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

function CartDrawer({ isOpen, handleToggle }) {
  const cart = useSelector((store) => {
    return store.cart.cart;
  });
  return (
    <Drawer open={isOpen} onClose={handleToggle} position="right">
      <Drawer.Header titleIcon={HiShoppingCart} title="Cart" />
      <Drawer.Items>
        {cart.map((cartItem) => {
          return <CartItem cartItem={cartItem} />;
        })}
      </Drawer.Items>
    </Drawer>
  );
}

export default CartDrawer;