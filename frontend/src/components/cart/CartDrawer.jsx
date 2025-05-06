import { Button, Drawer } from "flowbite-react";
import React, { useEffect } from "react";
import { HiShoppingCart } from "react-icons/hi";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCart } from "../../redux/slices/cartSlice";

function CartDrawer({ isOpen, handleToggle }) {
  const navigate = useNavigate();
  const { cart, total, status, error } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // console.log("cart",  cart);
  // console.log(total);
  // console.log(status);
  // console.log(error);
  
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
