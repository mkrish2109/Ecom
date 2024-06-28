import React from "react";
import ProductImage from "../components/productDetails/ProductImage";

import DetailsPage from "../components/productDetails/DetailsPage";

function ProductDetails() {
  return (
    <div className="grid grid-cols-2  gap-4">
      <ProductImage />

      <DetailsPage />
    </div>
  );
}

export default ProductDetails;
