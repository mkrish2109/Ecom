import React, { useEffect, useState } from "react";
import ProductImage from "../components/productDetails/ProductImage";

import DetailsPage from "../components/productDetails/DetailsPage";
import { products } from "../data/productList";
import { getSingleProduct } from "../services/apiServices";
import { useParams } from "react-router-dom";

function ProductDetails() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getSingleProduct(id).then((data) => {
      setProduct(data.data);
    });
  }, []);

  if (!product) return null;
  return (
    <div className="grid grid-cols-2  gap-4">
      <ProductImage images={product.images} />
      <DetailsPage product={product} />
    </div>
  );
}

export default ProductDetails;
