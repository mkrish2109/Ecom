import { Button } from "flowbite-react";
import React from "react";
import { useSelector } from "react-redux";
import { createOrder } from "../../services/apiServices";

function PaymentSection({ setClientSecret, setOrder }) {
  const { cart } = useSelector((store) => {
    return store.cart;
  });

  async function handleCheckout(e) {
    const cartItems = cart.map((value) => {
      return { productId: value._id, qty: value.qty };
    });
    const result = await createOrder({ cartItems });
    setOrder(result.order);
    setClientSecret(result.clientSecret);
  }

  return (
    <div className="mt-8">
      <Button onClick={handleCheckout}>Proceed to Checkout</Button>
    </div>
  );
}

export default PaymentSection;
