import React from "react";
import { getAllOrders, updateOrderStatus } from "../../../services/apiServices";
import AdminPageTitle from "../../comman/AdminPageTitle";
import CommonList from "../../comman/list/CommonList";
import { useNavigate } from "react-router-dom";
import { HiAcademicCap, HiArchive } from "react-icons/hi";
import { Select } from "flowbite-react";

function OrdersListAdmin() {
  const navigate = useNavigate();

  function handleEdit(id) {
    navigate(`/admin/orders/${id}`);
  }

  function getImage(value) {
    return value.orderItems[0].image || "/image/placeholder.jpg";
  }

  async function handleChange(id, e, setOrders) {
    const input = window.confirm("Are you sure you want to cancel this?");
    if (input) {
      await updateOrderStatus(id, { status: e.target.value });
      alert("Updated successfully.");
      const data = await getAllOrders();
      setOrders(data.data);
    }
  }

  return (
    <div>
      <AdminPageTitle title="Orders" />
      <div className="mt-8">
        <CommonList
          fields={{ title: "_id" }}
          getAllItems={getAllOrders}
          handleEdit={handleEdit}
          getImage={getImage}
          hideDelete={true}
          actions={[
            {
              renderAction: function (id, value, setOrders) {
                console.log("value", value);
                return (
                  <Select
                    value={value.status}
                    onChange={(e) => {
                      handleChange(id, e, setOrders);
                    }}>
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="failed">Failed</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </Select>
                );
              },
            },
          ]}
        />
      </div>
    </div>
  );
}

export default OrdersListAdmin;
