import React from "react";
import ProductImage from "../components/productDetails/ProductImage";

import DetailsPage from "../components/productDetails/DetailsPage";
import { products } from "../data/productList";

function ProductDetails() {
  return (
    <div className="grid grid-cols-2  gap-4">
      <ProductImage />

      <DetailsPage product={products} />
    </div>
  );
}

export default ProductDetails;
