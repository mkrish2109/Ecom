import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminPageTitle from "../../comman/AdminPageTitle";
import ProductsListItem from "./ProductsListItem";
import { deleteProduct, getAllProducts } from "../../../services/apiServices";
import { toast } from "react-toastify";

function ProductsListAdmin() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts().then((data) => {
      setProducts(data.data);
    });
  }, []);

  function goToAddUpdateProducts() {
    navigate("/admin/products/add");
  }

  async function handleDelete(id) {
    const input = window.confirm("Are you sure you want to delete this?");
    if (input) {
      await deleteProduct(id);
      toast.success("Deleted successfully.");
      const data = await getAllProducts();
      setProducts(data.data);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <AdminPageTitle title="Products" />
        <Button className="h-fit" onClick={goToAddUpdateProducts}>
          Add Product
        </Button>
      </div>
      <div className="mt-8">
        {products.map((value) => {
          return (
            <ProductsListItem
              key={value._id}
              product={value}
              handleDelete={handleDelete}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ProductsListAdmin;
