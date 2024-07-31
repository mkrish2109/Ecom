import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function TrendingCard({ product }) {
  const params = useParams();
  const navigate = useNavigate();

  function goToDetails() {
    navigate(`/${product.gender}/${product.category}/${product._id}`);
  }

  return (
    <div className="h-[300px] max-w-[300px] mx-4 overflow-hidden relative border border-slate-400">
      <img
        src={product.images[0]}
        alt="..."
        className="w-full h-full object-cover"
      />
      <div
        onClick={goToDetails}
        className="absolute bottom-0 left-0 right-0 bg-white p-4">
        {product.name} - ₹{product.price}
      </div>
    </div>
  );
}

export default TrendingCard;
