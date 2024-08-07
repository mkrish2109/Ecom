import { Button } from "flowbite-react";
import React from "react";
import { HiPencil, HiTrash } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

function ProductsListItem({ product, handleDelete }) {
  const navigate = useNavigate();

  function handleEdit() {
    navigate(`/admin/products/${product._id}`);
  }

  return (
    <div className="flex items-center gap-2 py-2 border-b border-b-slate-300">
      <div className="w-16 h-16 rounded-full border border-slate-300 overflow-hidden">
        <img
          src={product.images[0] || ""}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div className="grow-[1]">
        <h3 className="font-bold">{product.name}</h3>
        <p className="whitespace-nowrap overflow-hidden text-clip max-w-[200px]">
          {product.desc}
        </p>
        <p>₹{product.price}</p>
      </div>
      <div className="flex gap-2">
        <Button  color="primary" pill onClick={handleEdit}>
          <HiPencil />
        </Button>
        <Button  color="primary"
          pill
          onClick={() => {
            handleDelete(product._id);
          }}>
          <HiTrash />
        </Button>
      </div>
    </div>
  );
}

export default ProductsListItem;
