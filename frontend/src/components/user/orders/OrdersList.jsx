import React, { useEffect, useState } from "react";
import OrderListItem from "./OrderListItem";
import { getUserOrders } from "../../../services/apiServices";

function OrdersList() {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    getUserOrders().then((data) => {
      setOrders(data.data);
    });
  }, []);

  if (!orders) return <p>No orders!</p>;

  console.log(orders);

  return (
    <div>
      <ul className="flex flex-col gap-4">
        {orders.map((order) => {
          return (
            <OrderListItem
              key={order._id}
              order={order}
              setOrders={setOrders}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default OrdersList;