import { Button } from "flowbite-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import AdminPageTitle from "../../comman/AdminPageTitle";

function ProductsListAdmin() {
  const navigate = useNavigate();

  function goToAddUpdateProducts() {
    navigate("/admin/products/add");
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <AdminPageTitle title="Products" />
        <Button className="h-fit" onClick={goToAddUpdateProducts}>
          Add Product
        </Button>
      </div>
    </div>
  );
}

export default ProductsListAdmin;
