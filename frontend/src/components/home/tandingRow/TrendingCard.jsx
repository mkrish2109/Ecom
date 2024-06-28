import React from "react";

function TrendingCard({ product }) {
  return (
    <div className="h-[300px] overflow-hidden">
      <img
        src={product.url}
        alt="..."
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export default TrendingCard;
