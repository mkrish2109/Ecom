import { Button, Drawer } from "flowbite-react";
import React from "react";
import { HiShoppingCart } from "react-icons/hi";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CartDrawer({ isOpen, handleToggle }) {
  const navigate = useNavigate();
  const { cart, total } = useSelector((store) => {
    return store.cart;
  });

  function goToCheckout() {
    navigate("/checkout");
    handleToggle();
  }
  return (
    <Drawer open={isOpen} onClose={handleToggle} position="right">
      <Drawer.Header titleIcon={HiShoppingCart} title="Cart" />
      <Drawer.Items>
        {cart.map((cartItem, i) => {
          return <CartItem key={i} cartItem={cartItem} />;
        })}
      </Drawer.Items>
      <div className="flex items-center justify-between mt-4">
        <span>Total:</span>
        <span>${total}</span>
      </div>
      <Button
        pill
        size="sm"
        className="w-auto absolute bottom-[16px] left-[16px] right-[16px]"
        onClick={goToCheckout}>
        Checkout
      </Button>
    </Drawer>
  );
}

export default CartDrawer;
