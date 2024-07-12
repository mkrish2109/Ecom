import React from "react";
import OrderListItem from "./OrderListItem";

function OrdersList() {
  return (
    <div>
      <ul className="flex flex-col gap-4">
        <OrderListItem />
        <OrderListItem />
        <OrderListItem />
        <OrderListItem />
      </ul>
    </div>
  );
}

export default OrdersList;
