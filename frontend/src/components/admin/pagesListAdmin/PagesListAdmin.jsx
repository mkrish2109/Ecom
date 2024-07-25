import React, { useEffect, useState } from "react";
import AdminPageTitle from "../../comman/AdminPageTitle";
import { Button } from "flowbite-react";
import PagesListItem from "./PagesListItem";
import { useNavigate } from "react-router-dom";

function PagesListAdmin() {
  const navigate = useNavigate();
  const [pages, setPages] = useState([]);

  useEffect(() => {
    // getAllProducts().then((data) => {
    //   setProducts(data.data);
    // });
  }, []);

  function goToAddUpdateProducts() {
    navigate("/admin/pages/add");
  }

  async function handleDelete(id) {
    const input = window.confirm("Are you sure you want to delete this?");
    if (input) {
      //   await deleteProduct(id);
      alert("Deleted successfully.");
      //   const data = await getAllProducts();
      //   setProducts(data.data);
    }
  }
  return (
    <div>
      <div className="flex items-center justify-between">
        <AdminPageTitle title="Pages" />
        <Button className="h-fit" onClick={goToAddUpdateProducts}>
          Add Page
        </Button>
      </div>
      <div className="mt-8">
        {pages.map((value) => {
          return (
            <PagesListItem
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

export default PagesListAdmin;
