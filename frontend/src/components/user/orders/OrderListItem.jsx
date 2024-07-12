import React from "react";
// import OrderStatusChip from "../../common/OrderStatusChip";

function OrderListItem() {
  return (
    <li className="flex items-center gap-4">
      <div className="h-[60px] w-[60px] rounded-full border border-gray-500 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 justify-between">
          <h3 className="font-bold">Lorem ipsum dolor sit amet.</h3>
          <div className="flex gap-2 items-center">
            {/* <OrderStatusChip status="delivered" /> */}
            <p>$100</p>
          </div>
        </div>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Exercitationem, doloribus.
        </p>
      </div>
    </li>
  );
}

export default OrderListItem;
