import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";
import CartSection from "../components/checkout/CartSection";
import CheckoutForm from "../components/checkout/CheckoutForm";
import PaymentSection from "../components/checkout/PaymentSection";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

function Checkout() {
  const [order, setOrder] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="p-8">
      <CartSection />
      {/* <AddressSection /> */}
      <PaymentSection setClientSecret={setClientSecret} setOrder={setOrder} />
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm order={order} />
        </Elements>
      )}
    </div>
  );
}

export default Checkout;
