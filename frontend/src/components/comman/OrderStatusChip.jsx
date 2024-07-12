import React from "react";

function OrderStatusChip({ status }) {
  let chipClassName = "";

  if (status === "pending") {
    chipClassName = "text-black border-black";
  } else if (status === "confirmed") {
    chipClassName = "text-amber-600 border-amber-600";
  } else if (status === "delivered") {
    chipClassName = "text-green-600 border-green-600";
  }

  return (
    <div className={`py-1 px-2 border rounded-full text-xs ${chipClassName}`}>
      {status}
    </div>
  );
}

export default OrderStatusChip;
