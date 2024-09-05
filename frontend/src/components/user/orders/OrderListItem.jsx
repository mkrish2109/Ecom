import React from "react";
import OrderStatusChip from "../../comman/OrderStatusChip";
import { Button } from "flowbite-react";
import {
  getUserOrders,
  updateOrderStatus,
} from "../../../services/apiServices";

function OrderListItem({ order, setOrders }) {
  async function handleCancel() {
    const input = window.confirm("Are you sure you want to cancel this?");
    if (input) {
      await updateOrderStatus(order._id, { status: "cancelled" });
      alert("Cancelled successfully.");
      const data = await getUserOrders();
      setOrders(data.data);
    }
  }
  return (
    <li className="flex items-center gap-4">
      <div className="h-[60px] w-[60px] shrink-0 rounded-full border border-gray-500 overflow-hidden">
        <img
          src={order.orderItems[0].image}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center gap-2 justify-between">
          <h3 className="font-bold grow-[1]">{order._id}</h3>
          <div className="flex gap-2 items-center">
            <OrderStatusChip status={order.status} />
            <p>₹{order.total}</p>
            <Button size="xs" pill onClick={handleCancel}>
              Cancel Order
            </Button>
          </div>
        </div>
        <p className="flex">{order.orderItems.map((v) => v.name).join(", ")}</p>
      </div>
    </li>
  );
}

export default OrderListItem;
